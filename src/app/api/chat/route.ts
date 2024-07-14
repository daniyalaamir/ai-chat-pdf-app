import { NextRequest } from "next/server";
import { LangChainStream, StreamingTextResponse } from "ai"
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai"
import { CallbackManager } from "langchain/callbacks"
import { VectorDBQAChain } from "langchain/chains"

export async function POST(request: NextRequest) {
  const { messages, fileKey } = await request.json()
  
  const query = messages[messages.length - 1].content

  const { stream, handlers } = LangChainStream()

  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! })
  const index = pinecone.Index(process.env.PINECONE_INDEX!)
  
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex: index,
      namespace: fileKey
    }
  )

  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    streaming: true,
    callbackManager: CallbackManager.fromHandlers(handlers)
  })

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 3,
    returnSourceDocuments: true
  })

  chain.call({ query }).catch(console.error)

  return new StreamingTextResponse(stream)
}
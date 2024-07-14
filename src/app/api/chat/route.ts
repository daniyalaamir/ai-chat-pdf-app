import { NextRequest } from "next/server";
import { LangChainStream, StreamingTextResponse } from "ai"
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai"
import { CallbackManager } from "langchain/callbacks"
import { VectorDBQAChain } from "langchain/chains"
import { Role } from "@prisma/client";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const { messages, fileKey, documentId } = await request.json()
  
  const query = messages[messages.length - 1].content

  await saveMessage(documentId, "user", query, userId)

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

  chain.call({ query })
    .then(async(res) => {
      if (res) {
        await saveMessage(documentId, "assistant", res.text, userId)
      }
    })
    .catch(console.error)

  return new StreamingTextResponse(stream)
}

async function saveMessage(documentId: string, role: Role, content: string, userId: string) {
  const document = await prismadb.document.update({
    where: {
      id: documentId,
      userId
    },
    data: {
      messages: {
        create: {
          content,
          role
        }
      }
    }
  })
  return document
}
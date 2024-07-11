"use server";

import { auth } from "@clerk/nextjs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const embedPdfToPinecone = async (fileKey: string) => {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  let pdfFile = await fetch(`
    https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${fileKey}
  `)

  // split text into small chunks
  const blob = new Blob([ await pdfFile.arrayBuffer() ])
  const loader = new PDFLoader(blob)

  const docs = await loader.load()

  // trim useless metadata for each document
  const trimedDocs = docs.map(doc => {
    const metadata = { ...doc.metadata }
    delete metadata.pdf
    return new Document({ pageContent: doc.pageContent, metadata })
  })

  // split document into smaller chunks
  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 500,
    chunkOverlap: 10
  })

  const splitDocs = await splitter.splitDocuments(trimedDocs)

  // connect to the Pinecone index
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const index = pinecone.Index(process.env.PINECONE_INDEX!)

  // embeddings documents to Pinecone
  await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
    pineconeIndex: index,
    namespace: fileKey
  })
}
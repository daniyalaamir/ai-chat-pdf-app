"use server";

import { auth } from "@clerk/nextjs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";

export const embedPdfToPinecone = async (fileKey: string) => {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  let pdfFile = await fetch(`
    https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${fileKey}
  `)

  const blob = new Blob([ await pdfFile.arrayBuffer() ])
  const loader = new PDFLoader(blob)
  const docs = await loader.load()

  const trimedDocs = docs.map(doc => {
    const metadata = { ...doc.metadata }
    delete metadata.pdf
    return new Document({ pageContent: doc.pageContent, metadata })
  })

  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 500,
    chunkOverlap: 10
  })

  const splitDocs = await splitter.splitDocuments(trimedDocs)

  return splitDocs
}
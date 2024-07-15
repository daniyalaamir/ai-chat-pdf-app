"use server";
import { auth } from "@clerk/nextjs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { needToUpgrade } from "@/lib/subscription";

export const generatePreSignedURL = async (fileName: string, fileType: string) => {
  const { userId } = auth()
  
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const reachedQuota = await needToUpgrade()

  if (reachedQuota) {
    throw new Error("Reached free quota. Please upgrade!")
  }

  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!
    }
  })

  if (!fileName || !fileType) {
    throw new Error("There was a problem with the file!")
  }

  const fileKey = `users/${userId}/${Date.now()}-${fileName}}`

  const putCommand = new PutObjectCommand({
    Key: fileKey,
    ContentType: fileType,
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
  })

  const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 60 })

  return { putUrl, fileKey }
}

export const deleteS3Pdf = async (fileKey: string) => {
  const { userId } = auth()
  
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!
    }
  })

  if (!fileKey) {
    throw new Error("Could not find the file!")
  }

  const command = new DeleteObjectCommand({
    Key: fileKey,
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
  })

  await client.send(command)
}
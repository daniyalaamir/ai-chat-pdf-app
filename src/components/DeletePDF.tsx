"use client";

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Trash2 } from "lucide-react"
import { Document } from "@prisma/client";
import SubmitButton from "@/components/SubmitButton"
import { showToast } from "@/lib/utils";
import { deleteDocument } from "@/actions/db";
import { deleteS3Pdf } from "@/actions/s3";
import { deletePineconeNamespace } from "@/actions/pinecone";

type DeletePDFProps = {
  document: Document
}

export default function DeletePDF({ document }: DeletePDFProps) {
  let [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 className="w-4 h-4 cursor-pointer" style={{ strokeWidth: "3" }} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Delete document</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col mb-2">
          <span className="text-sm mb-4">
            Do you want to delete the following document?
          </span>
          <span className="text-sm font-semibold border-black border-l-2 px-2 whitespace-nowrap w-20">
            {document.fileName}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            type="submit" 
            variant="orange" 
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
                try {
                  const fileKey = document.fileKey
                  deleteS3Pdf(fileKey)
                  deletePineconeNamespace(fileKey)
                  deleteDocument(document.id)
                  setOpen(false)
                } catch(error) {
                  console.error(error)
                  showToast("Could not complete the process")
                }
              })
            }}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 text-white/80 animate-spin" style={{ strokeWidth: "3" }} />
            ) : (
              `Delete`
            )}
          </Button>
          <DialogTrigger asChild>
            <Button variant="light">Cancel</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

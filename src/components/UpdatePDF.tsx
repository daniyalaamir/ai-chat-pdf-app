"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { Document } from "@prisma/client";
import { updateDocument } from "@/actions/db";
import SubmitButton from "@/components/SubmitButton"

type UpdatePDFProps = {
  document: Document
}

export default function UpdatePDF({ document }: UpdatePDFProps) {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [open, setOpen] = useState(false)
  const [documentName, setDocumentName] = useState("")

  const handleOpenDialog = () => {
    setOpen(!open)
    setDocumentName(document.fileName)
  }

  const handleDocumentName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value)
    setIsButtonEnabled(e.target.value !== "")
  }

  const updateDocumentWithId = updateDocument.bind(null, document.id)

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Pencil className="w-4 h-4 cursor-pointer" style={{ strokeWidth: "3" }} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update document</DialogTitle>
        </DialogHeader>
        <form className="space-y-6" action={(data) => updateDocumentWithId(data).then(() => setOpen(false))}>
          <div className="space-y-2">
            <Label htmlFor="url">Name</Label>
            <Input 
              id="documentName" 
              className="font-light"
              name="documentName"
              value={documentName} 
              onChange={handleDocumentName}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SubmitButton title="Update" isButtonEnabled />
            <DialogTrigger asChild>
              <Button variant="light">Cancel</Button>
            </DialogTrigger>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

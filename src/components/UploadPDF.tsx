"use client";

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, UploadCloud, X } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function UploadPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string>("")
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [open, setOpen] = useState(false)

  const onDrop = useCallback((acceptedfiles: File[]) => {
    const pdfFile = acceptedfiles[0]
    if(!pdfFile) {
      alert("Please upload only PDF file.")
      return
    }
    if(pdfFile.size > 10 * 1024 * 1024) {
      alert("Max file size 10Mb")
      return
    }
    setFile(pdfFile)
    setUrl("")
    setIsButtonEnabled(true)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop
  })

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setFile(null)
    setIsButtonEnabled(e.target.value !== "")
  }

  const handleRemoveFile = () => {
    setFile(null)
    setIsButtonEnabled(false)
  }

  const resetForm = () => {
    setFile(null)
    setUrl("")
    setIsButtonEnabled(false)
  }

  const handleOpenDialog = () => {
    setOpen(!open)
    resetForm()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(file) {
      console.log("File uploaded successfully: ", file)
    } else if(url) {
      console.log("URL provided: ", url)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="orange">
          <Upload className="w-4 h-4 mr-2" style={{ strokeWidth: "3" }} /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl">
            <div className="border-dashed border-2 rounded-md bg-gray-50 h-36 w-full">
              {file ? (
                <div className="h-full flex justify-center items-center text-black/70">
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-[200px]">
                    {file?.name}
                  </span>
                  <button className="ml-1 cursor-pointer" onClick={handleRemoveFile}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  {...getRootProps()}
                  className="h-full flex flex-col justify-center items-center cursor-pointer"
                >
                  <Input name="file" {...getInputProps()} />
                  <UploadCloud className="w-10 h-10 text-[#ff612f]" />
                  <p className="mt-2 text-sm text-slate-400">Drag and drop a PDF file here or click</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 uppercase text-gray-600 text-xs">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Import from URL</Label>
            <Input 
              id="url" 
              className="font-light" 
              placeholder="http://cdn.openai.com/papers/gpt-4.pdf" 
              name="url"
              value={url} 
              onChange={handleUrlChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="submit" 
              variant="orange" 
              disabled={!isButtonEnabled}
            >
              Upload
            </Button>
            <DialogTrigger asChild>
              <Button variant="light">Cancel</Button>
            </DialogTrigger>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

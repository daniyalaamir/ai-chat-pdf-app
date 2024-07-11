import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function UploadPDF() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="orange">
          <Upload className="w-4 h-4 mr-2" style={{ strokeWidth: "3" }} /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
        </DialogHeader>
        <form className="space-y-6">
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 uppercase text-gray-600 text-xs">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Import from URL</Label>
            <Input id="url" name="url" className="font-light" placeholder="http://cdn.openai.com/papers/gpt-4.pdf" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" variant="orange">Upload</Button>
            <DialogTrigger asChild>
              <Button variant="light">Cancel</Button>
            </DialogTrigger>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

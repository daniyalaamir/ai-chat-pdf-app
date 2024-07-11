import { ArrowRight, BookOpenCheck } from "lucide-react"
import { Button } from "./ui/button"

export default function Navbar() {
  return (
    <div>
      <header className="static left-0 top-0 z-50 bg-[#f8f5ee] w-full backdrop-blur border-slate-500/10">
        <div className="mx-auto h-[60px] max-w-7xl px-8 md:px-6">
          <div className="flex items-center justify-between h-full">
            <div className="flex">
              <BookOpenCheck className="text-black w-7 h-7 mr-3" />
              <span className="text-lg font-medium text-black">PDF.wisdom</span>
            </div>
            <Button variant="link">
              Get started <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}

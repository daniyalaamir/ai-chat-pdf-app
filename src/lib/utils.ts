import { type ClassValue, clsx } from "clsx"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPdfNameFromUrl(url: string) {
  const matches = url.match(/\/([^/?#]+)[^/]*$/)
  
  if (matches && matches.length > 1) {
    const fileNameWithExtension = matches[1]
    const fileExtension = fileNameWithExtension.split(".").pop()

    if (fileExtension?.toLowerCase() === "pdf") {
      return fileNameWithExtension
    }
  }

  return null
}

export function showToast(message: string) {
  toast(message, { position: "top-right", className: 'foo-bar' })
}

export function formatBytes(bytes: number, decimals: number=2): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "Kb", "Mb", "Gb"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export function scrollToBottom(messageEndRef: React.RefObject<HTMLElement>) {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
}
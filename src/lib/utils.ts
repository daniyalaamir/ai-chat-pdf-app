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
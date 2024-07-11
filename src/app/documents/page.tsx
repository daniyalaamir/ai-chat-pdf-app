import { Button } from "@/components/ui/button";
import UploadPDF from "@/components/UploadPDF";
import { File, Pencil, Trash2, Upload } from "lucide-react";
import Link from "next/link";

export default function Documents() {
  const documents = [
    { fileName: "User_Manual.pdf", fileSize: "1 MB", createdAt: "yesterday" },
    { fileName: "Learn_Python.pdf", fileSize: "7 MB", createdAt: "3 days ago" },
    { fileName: "Google_Financial_Report.pdf", fileSize: "25 MB", createdAt: "4 weeks ago" }
  ]

  return (
    <section className="bg-[#faf9f6] min-h-screen">
      <div className="section-container">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Documents</h1>
          <UploadPDF />
        </div>
        <div className="bg-white rounded shadow w-full">
          <table className="min-w-full">
            <tbody>
              {documents.map((document, index) => (
                <tr key={index} className={index === documents.length - 1 ? "" : "border-b border-gray-200"}>
                  <td className="p-4 text-left flex items-center">
                    <File className="w-4 h-4 mr-2" style={{ strokeWidth: "3" }} />
                    <Link href="#">
                      <span className="text-ellipsis overflow-hidden whitespace-normal max-w-[300px] text-sm font-medium">{document.fileName}</span>
                    </Link>
                  </td>
                  <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">{document.fileSize}</td>
                  <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">{document.createdAt}</td>
                  <td className="p-4 text-right w-4">
                    <Pencil className="w-4 h-4 cursor-pointer" style={{ strokeWidth: "3" }} />
                  </td>
                  <td className="p-4 text-right w-4">
                    <Trash2 className="w-4 h-4 cursor-pointer" style={{ strokeWidth: "3" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

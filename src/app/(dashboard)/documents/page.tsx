import UploadPDF from "@/components/UploadPDF";
import { File, Pencil, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns"
import { formatBytes } from "@/lib/utils";

const Documents = async () => {
  const { userId } = auth()
  const documents = await prismadb.document.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

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
                  <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">{formatBytes(document.fileSize)}</td>
                  <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">{formatDistanceToNow(document.createdAt, { addSuffix: true })}</td>
                  <td className="p-4 text-right w-4">
                    <Pencil className="w-4 h-4 cursor-pointer" style={{ strokeWidth: "3" }} />
                  </td>
                  <td className="p-4 text-right w-4">
                    <Trash2 className="w-4 h-4 cursor-pointer" style={{ strokeWidth: "3" }} />
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr>
                  <td className="p-4 italic">None</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Documents
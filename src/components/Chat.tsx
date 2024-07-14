import { Bot, Send, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export default function Chat() {
  const messages = [
    { role: "user", content: "Who is Tony?" },
    { role: "assistant", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, aperiam? Ad, inventore voluptatibus ducimus libero sequi dolores nobis dolorum explicabo doloremque distinctio saepe, illo quisquam est delectus aut reiciendis. Quam." },
    { role: "user", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, aperiam? Ad, inventore voluptatibus ducimus libero sequi dolores nobis dolorum explicabo doloremque distinctio saepe, illo quisquam est delectus aut reiciendis. Quam." },
    { role: "assistant", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, aperiam? Ad, inventore voluptatibus ducimus libero sequi dolores nobis dolorum explicabo doloremque distinctio saepe, illo quisquam est delectus aut reiciendis. Quam." },
    { role: "user", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, aperiam? Ad, inventore voluptatibus ducimus libero sequi dolores nobis dolorum explicabo doloremque distinctio saepe, illo quisquam est delectus aut reiciendis. Quam." },
    { role: "assistant", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, aperiam? Ad, inventore voluptatibus ducimus libero sequi dolores nobis dolorum explicabo doloremque distinctio saepe, illo quisquam est delectus aut reiciendis. Quam." }
  ]

  return (
    <div className="w-1/2 h-[calc(100vh-60px)] overflow-scroll bg-white">
      <div className="h-full flex flex-col justify-between">
        <div className="overflow-auto bg-white">
          <div className="flex flex-col">
            {messages.map((msg, index) => (
              <div key={index} className={cn("p-6 w-full flex items-start gap-x-8", msg.role === "user" ? "bg-white" : "bg-[#faf9f6]")}>
                <div className="w-4">
                  {msg.role  === "user" ? (
                    <User className="bg-[#ff612f] text-white rounded-sm p-1" />
                  ) : (
                    <Bot className="bg-[#062427] text-white rounded-sm p-1" />
                  )}
                </div>
                <div className="text-sm font-light overflow-hidden leading-7">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#faf9f6]">
          <form className="m-4 p-2 flex items-center justify-between rounded-md border-[#e5e3da] border bg-white">
            <Input 
              placeholder="Enter your question"
              className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            />
            <Button variant="orange" type="submit">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

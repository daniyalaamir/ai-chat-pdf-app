"use client";

import { Bot, Loader2, Send, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn, scrollToBottom } from "@/lib/utils";
import { Message, useChat } from 'ai/react'
import { Document, Message as MessageDB } from "@prisma/client";
import { useEffect, useRef } from "react";

type ChatProps = {
  document: Document & {
    messages: MessageDB[]
  }
}

export default function Chat({ document }: ChatProps) {
  const { messages, input, isLoading, handleInputChange, handleSubmit } = useChat({
    body: {
      documentId: document.id,
      FileKey: document.fileKey
    },
    initialMessages: document.messages
  })
  
  const messageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollToBottom(messageRef)
  }, [messages])

  return (
    <div className="w-1/2 h-[calc(100vh-60px)] overflow-scroll bg-white">
      <div className="h-full flex flex-col justify-between">
        <div className="overflow-auto bg-white">
          <div className="flex flex-col">
            {messages.map((msg: Message, index) => (
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
          <div ref={messageRef}></div>
        </div>
        <div className="bg-[#faf9f6]">
          <form 
            className="m-4 p-2 flex items-center justify-between rounded-md border-[#e5e3da] border bg-white"
            onSubmit={handleSubmit}
          >
            <Input 
              placeholder="Enter your question"
              className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-[#ff612f]/70 animate-spin" style={{ strokeWidth: "3" }} />
            ) : (
              <Button variant="orange" type="submit">
                <Send className="w-4 h-4" />
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

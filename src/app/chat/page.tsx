"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
      {
        role: "assistant",
        content:
          "これはサンプルの応答です。実際のAI応答ロジックを実装してください。",
      },
    ];

    setMessages(newMessages);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            ホームに戻る
          </Link>
        </div>

        <div className="border rounded-lg h-[600px] flex flex-col">
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold">AIアシスタントとチャット</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "assistant" ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.role === "assistant"
                      ? "bg-secondary"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                className="flex-1"
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

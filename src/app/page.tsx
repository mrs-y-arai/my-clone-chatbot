import Link from "next/link";
import { Bot, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="flex items-center space-x-2">
            <Bot className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">AIアシスタント</h1>
          </div>

          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <Link
                href="/chat"
                className="inline-block rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                AIとチャットを始める
              </Link>
            </div>

            <div className="text-center">
              <Link
                href="/admin"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                <Settings className="mr-2 h-4 w-4" />
                管理画面へ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

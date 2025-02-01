import Link from "next/link";
import { Bot, Database, Search } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-2">
            <Bot className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">管理画面</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <Link href="/admin/knowledge" 
              className="group relative rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AIの学習データ管理</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                テキストやPDFファイルを使って、AIが参照する情報を登録・管理します。
              </p>
            </Link>

            <Link href="/admin/search"
              className="group relative rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <Search className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">学習データの検索</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                登録済みの情報を検索・確認できます。
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
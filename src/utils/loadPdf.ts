import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 150,
  chunkOverlap: 15,
});

export async function loadPdf(file: string | File) {
  const loader = new PDFLoader(file);
  const docs = await loader.load();
  const splitDocs = await textSplitter.splitDocuments(docs);
  return splitDocs;
}

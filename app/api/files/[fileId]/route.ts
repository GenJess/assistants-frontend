import { openai } from "@/app/openai";
import { NextResponse } from "next/server";

// download file by file ID
export async function GET(_request, { params: { fileId } }) {
  if (!openai) {
    return NextResponse.json({ error: "OpenAI API key not set" }, { status: 500 });
  }
  const [file, fileContent] = await Promise.all([
    openai.files.retrieve(fileId),
    openai.files.content(fileId),
  ]);
  return new Response(fileContent.body, {
    headers: {
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    },
  });
}

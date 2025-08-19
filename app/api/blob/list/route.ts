import { NextResponse } from "next/server";
import { listBlobs } from "@/utils/blob";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const prefix = searchParams.get("prefix") ?? undefined;
    const blobs = await listBlobs(prefix);
    return NextResponse.json(blobs);
  } catch (err) {
    console.error("Blob list failed:", err);
    return NextResponse.json(
      { error: "Failed to list blobs" },
      { status: 500 }
    );
  }
}

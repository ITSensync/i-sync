import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Simpan file ke folder publik
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(process.cwd(), "public/uploads/captured-image.jpg");

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: "/uploads/captured-image.jpg" });
}

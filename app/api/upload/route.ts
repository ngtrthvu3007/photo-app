import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create a unique filename
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${file.name.split(".")[0]}-${uniqueSuffix}${path.extname(file.name)}`;

  // Save the file
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await writeFile(path.join(uploadDir, filename), buffer);

  // Save the relative path to the database
  const imageUrl = `/uploads/${filename}`;
  const photo = await prisma.photo.create({
    data: { imageUrl },
  });

  return NextResponse.json(photo);
}

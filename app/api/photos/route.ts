import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const photos = await prisma.photo.findMany({
    include: { comments: true },
  });
  return NextResponse.json(photos);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { photoId, content } = await request.json();

  const comment = await prisma.comment.create({
    data: { photoId, content },
  });

  return NextResponse.json(comment);
}

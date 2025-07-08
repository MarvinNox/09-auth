import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
  const search = request.nextUrl.searchParams.get("search") ?? undefined;
  const tag = request.nextUrl.searchParams.get("tag") ?? undefined;
  const params = {
    page: page,
    perPage: 12,
    ...(search ? { search } : {}),
    ...(tag ? { tag } : {}),
  };
  const { data } = await api("/notes", { params });
  if (data) return NextResponse.json(data);

  return NextResponse.json({ error: "Failed to fetch notes!", status: "500" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data } = await api.post("/notes", body);
  if (data) return NextResponse.json(data);
  return NextResponse.json({
    error: "Failed to post note",
    status: "500",
  });
}

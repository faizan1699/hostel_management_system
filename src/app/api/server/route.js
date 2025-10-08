import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "hello world" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

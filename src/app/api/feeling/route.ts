import { NextResponse } from "next/server"
import emotions from "@/app/api/feeling/feeling.json"

export const GET = async () => {
  return new NextResponse(JSON.stringify({ emotions }), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}

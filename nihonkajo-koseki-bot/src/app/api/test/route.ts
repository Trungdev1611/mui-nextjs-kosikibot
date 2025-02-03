import { NextRequest } from "next/server";

//endpoint: localhost://3001/api/test
export async function GET () {
    console.log("chạy qua đây")
    return new Response("GET Request ở đây") 
}
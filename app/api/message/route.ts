import { NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET() {
   const test =  [{title: "asasdas",name: "tien"}] 
   return(
        NextResponse.json({ test })
    )
}
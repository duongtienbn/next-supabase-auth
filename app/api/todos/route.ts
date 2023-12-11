import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import axios from "axios";

// POSTMANでテストできます。
// POST http://localhost:3000/api/todos

const createTodoSchema = z.object({
	title: z.string().min(1, "Title is required.").max(255),
	description: z.string().min(1, "Description is required"),
});

export async function DELETE(request: NextRequest) {
	const body = await request.json();
	console.log("DELETE body=", body);
	const todo = await prisma.todo.findUnique({
		where: { id: body.id },
	});

	if (!todo)
		return NextResponse.json({ error: "Invalid todo" }, { status: 404 });

	const deleteTodo = await prisma.todo.delete({
		where: { id: todo.id },
	});

	return NextResponse.json(deleteTodo, { status: 200 });
}

export async function GET() {
	try {
		console.log("GETsdad")
		const todos = await prisma.todo.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
		return NextResponse.json({ todos });
	} catch (error: any) {
		// if ( error instanceof z.ZodError) return new Response(error)
		return new Response(error.message, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	console.log("create todo body=", body);
	const validation = createTodoSchema.safeParse(body);

	if (!validation.success) {
		console.log("error");
		return NextResponse.json(validation.error.errors);
	}

	const newTodo = await prisma.todo.create({
		data: { title: body.title, description: body.description },
	});
	console.log("newTodo=", newTodo);

	return NextResponse.json(newTodo, { status: 201 });
}

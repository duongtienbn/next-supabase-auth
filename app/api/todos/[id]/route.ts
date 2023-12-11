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

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const body = await request.json();

	console.log("PATCH id=", params.id);
	const todo = await prisma.todo.findUnique({
		where: { id: params.id },
	});

	if (!todo)
		return NextResponse.json({ error: "id not found" }, { status: 404 });

	const updateTodo = await prisma.todo.update({
		where: { id: todo.id },
		data: {
			isCompleted: body.isCompleted,
		},
	});

	return NextResponse.json(updateTodo, { status: 200 });
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	console.log("DELETE id=", params.id);

	const todo = await prisma.todo.findUnique({
		where: { id: params.id },
	});

	if (!todo)
		return NextResponse.json({ error: "id not found" }, { status: 404 });

	const deleteTodo = await prisma.todo.delete({
		where: { id: todo.id },
	});

	return NextResponse.json(deleteTodo, { status: 200 });
}

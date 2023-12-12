"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodoCard from "./TodoCard";

export interface Todo {
	id: string;
	title: string;
	description: string;
	isCompleted: boolean;
	createdAt: string;
	updatedAt: string;
}

const ToDos = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["userToDos"],
		queryFn: async () => {
			const { data } = await axios.get("/api/todos");
			console.log(data);
			return data.todos as Todo[];
		},
	});

	if (isLoading) return <div>Loading todos...</div>;
	if (isError) return <div>There was an error. Reload page.</div>;

	return (
		<div className="flex flex-col mt-5 w-[300px]">
			{data?.map((todo, index) => (
				<TodoCard {...todo} key={index} />
			))}
		</div>
	);
};

export default ToDos;

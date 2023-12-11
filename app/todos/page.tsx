"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";


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
			// const { data }:any = await axios.get("/api/message");
			console.log(data);
			return data.todos as Todo[];
		},
	});

	if (isLoading) return <div>Loading todos...</div>;
	if (isError) return <div>There was an error. Reload page.</div>;
// console.log(data);
    return <div>
        {data?.map((todo,index) => (
            <div key={index}>{todo.title}</div>
        ))}
    </div>
}
export default ToDos;
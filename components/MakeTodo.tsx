"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MakeTodo = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [input, setInput] = useState("");
	const queryClient = useQueryClient();
	const { toast } = useToast();

	useEffect(() => {
		inputRef.current?.focus();
	}, [input]);

	const {
		mutate: submitToDo,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: async () =>
			await axios.post("/api/todos", { title: input, description: "aaaaa" }),
		onSuccess: () => {
			console.log("success");
			inputRef.current?.focus();
			toast({ description: "todoが追加されました" });
			setInput("");
			queryClient.invalidateQueries({ queryKey: ["userToDos"] });
		},
		onError: () => {
			toast({ description: "エラーが発生しました", variant: "destructive" });
		},
	});

	const handleKeyDown = (e: any) => {
		console.log("key=", e.key);
		if (e.nativeEvent.isComposing || e.key !== "Enter") return;
		submitToDo();
	};

	return (
		<div className="flex gap-2">
			<Input
				ref={inputRef}
				placeholder="to do ..."
				value={input}
				onKeyDown={handleKeyDown}
				onChange={(e) => setInput(e.target.value)}
				disabled={isPending}
			/>
			<Button onClick={() => submitToDo()} disabled={isPending}>
				Submit
			</Button>
		</div>
	);
};

export default MakeTodo;

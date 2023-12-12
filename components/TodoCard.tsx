import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Todo } from "./Todos";

import React from "react";

interface Param {
  id: string;
  isCompleted: boolean;
}

const TodoCard = ({ id, isCompleted, title, description }: Todo) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  //削除
  const { mutate: deleteTodo, isPending: deleteLoading } = useMutation({
    mutationFn: async (deleteId: string) =>
      await axios.delete(`/api/todos/${deleteId}`),
    onSuccess: () => {
      toast({ description: "Todoが削除されました" });
      queryClient.invalidateQueries({ queryKey: ["userToDos"] });
    },
    onError: () => {
      toast({ description: "エラーが発生しました", variant: "destructive" });
    },
  });

  //更新
  const { mutate: updateTodo, isPending: updateLoading } = useMutation({
    mutationFn: async (param: Param) =>
      await axios.patch(`/api/todos/${param.id}`, {
        isCompleted: param.isCompleted,
      }),
    onSuccess: () => {
      toast({ description: "Todoが更新されました" });
      queryClient.invalidateQueries({ queryKey: ["userToDos"] });
    },
    onError: () => {
      toast({ description: "エラーが発生しました", variant: "destructive" });
    },
  });

  const clickDelete = (id: string) => {
    console.log("value=", id);
    deleteTodo(id);
  };

  const clickUpdate = (id: string, isCompleted: boolean) => {
    console.log("value=", id);
    const obj = {
      id: id,
      isCompleted: !isCompleted,
    };
    updateTodo(obj);
  };

  return (
    <div className="">
      <div className="flex border-2 w-full justify-between m-1 p-3">
        <div> {title}</div>
        <Button onClick={() => clickDelete(id)} disabled={deleteLoading}>
          {" "}
          削除
        </Button>
      </div>
    </div>
    // <Card className="bg-slate-300 w-full mt-2">
    // 	<CardHeader>
    // 		<CardTitle className={isCompleted ? "line-through" : ""}>
    // 			{title}
    // 		</CardTitle>
    // 		<CardDescription>{description}</CardDescription>
    // 	</CardHeader>
    // 	<CardFooter>
    // 		<div className="flex justify-between min-w-full">
    // 			<Button
    // 				onClick={() => clickUpdate(id, isCompleted)}
    // 				disabled={updateLoading}
    // 			>
    // 				更新
    // 			</Button>
    // 			<Button onClick={() => clickDelete(id)} disabled={deleteLoading}>
    // 				削除
    // 			</Button>
    // 		</div>
    // 	</CardFooter>
    // </Card>
  );
};

export default TodoCard;

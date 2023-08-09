import type { Todo } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Todo };

export const getTodoListings = async () => {
  return prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      body: true,
    },
  });
};

export const getTodos = async () => {
  return prisma.todo.findMany();
};

export const getTodo = async (id: string) => {
  return prisma.todo.findUnique({
    where: { id },
  });
};

export const createTodo = (data: Pick<Todo, "title" | "body">) => {
  return prisma.todo.create({
    data,
  });
};

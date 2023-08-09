import { Link, useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";
import { getTodoListings } from "~/models/todo.server";
import { json } from "@remix-run/node";

type LoaderData = {
  todos: Awaited<ReturnType<typeof getTodoListings>>;
};

export const loader: LoaderFunction = async () => {
  const todos = await getTodoListings();

  return json<LoaderData>({ todos });
};

export default function TodosRoute() {
  const { todos } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-grow flex-col justify-center align-middle">
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={`/todos/${todo.id}`}>
            <Link
              to={todo.id}
              prefetch="intent"
              className="text-blue-600 underline"
            >
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

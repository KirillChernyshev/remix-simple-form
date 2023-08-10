import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { createTodo, getTodoListings } from "~/models/todo.server";

import { json } from "@remix-run/node";

export const formClasses = "flex flex-col space-y-2 min-w-[50vw]";
export const inputClasses = "rounded-md border border-gray-300 px-4 py-2";
export const buttonClasses =
  "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300";

type LoaderData = {
  todos: Awaited<ReturnType<typeof getTodoListings>>;
};

export const loader: LoaderFunction = async () => {
  const todos = await getTodoListings();

  return json<LoaderData>({ todos });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  console.log("title", title);
  return await createTodo({ title });
};

export default function TodosRoute() {
  const { todos } = useLoaderData<LoaderData>();

  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="min-w-[50vw]">
          <h1 className="text-lg font-semibold">Todos</h1>
          <ul className="mt-2">
            {todos.map((todo) => (
              <li key={todo.id}>
                <p>{todo.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <Form className={formClasses} method="post" action="/todos">
          <input className={inputClasses} name="title" />
          <button className={buttonClasses} type="submit">
            Create Todo
          </button>
        </Form>
      </div>
    </div>
  );
}

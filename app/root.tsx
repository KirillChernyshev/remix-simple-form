import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";

import { appTitle } from "./routes/_index";
import { cssBundleHref } from "@remix-run/css-bundle";
import { getUser } from "~/session.server";
import { json } from "@remix-run/node";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col gap-10">
        <header>
          <h1 className="flex h-16 items-center justify-center text-4xl">
            {appTitle}
          </h1>
        </header>
        <main>
          <div className="flex">
            <div className="flex w-screen flex-col items-center justify-center">
              <Outlet />
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

import { Link } from "@remix-run/react";
import type { V2_MetaFunction } from "@remix-run/node";

export const appTitle = "Remix Actions";

export const meta: V2_MetaFunction = () => [{ title: appTitle }];

export default function Index() {
  return <Link to="todos">TODOs</Link>;
}

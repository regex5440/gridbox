import { RedirectType, redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return redirect(`${request.nextUrl.pathname}/1?ps=10`, RedirectType.replace);
}

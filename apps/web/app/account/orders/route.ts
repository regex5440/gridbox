import { RedirectType, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return redirect(request.nextUrl.pathname + "/1?ps=10", RedirectType.replace);
}

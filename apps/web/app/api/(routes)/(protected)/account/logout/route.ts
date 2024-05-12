import { deleteSession } from "@app/controllers/session";
import { redirect } from "next/navigation";

export async function GET() {
  await deleteSession();
  return redirect("/");
}

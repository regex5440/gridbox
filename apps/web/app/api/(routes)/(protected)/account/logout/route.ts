import { redirect } from "next/navigation";
import { deleteSession } from "controllers/session";

export async function GET() {
  await deleteSession();
  return redirect("/");
}

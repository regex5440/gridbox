import { deleteSession } from "controllers/session";
import { redirect } from "next/navigation";

export async function GET() {
  await deleteSession();
  return redirect("/");
}

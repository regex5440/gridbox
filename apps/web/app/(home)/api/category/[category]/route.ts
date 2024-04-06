import { NextRequest } from "next/server";

type Category = "all";

export async function GET(
  request: NextRequest,
  { params: { category } }: { params: { category: Category } }
) {
  switch (category) {
    case "all":
      return { status: 200, body: { data: { category: "all" } } };
  }
  return null;
}

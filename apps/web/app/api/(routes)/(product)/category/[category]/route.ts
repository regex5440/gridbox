import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { category } }: { params: { category: "string" } }
) {
  const url = `${process.env.productAPI}/products/category/${category}`;
  const data = await (await fetch(url)).json();
  if (data) {
    return Response.json(data);
  }
  return Response.json({ error: "Product not found" });
}

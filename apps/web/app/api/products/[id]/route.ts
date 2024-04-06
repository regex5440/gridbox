type ParamObjectType = {
  params: {
    id: string;
  };
};

export async function GET(
  request: Request,
  { params: { id } }: ParamObjectType
) {
  const url = `${process.env.productAPI}/products/${id}`;
  const data = await (await fetch(url)).json();
  if (data) {
    return Response.json({ data });
  }
  return Response.json({ error: "Product not found" });
}

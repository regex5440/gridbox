type Section = "banner" | "related" | "frequent";
type ParamObjectType = {
  params: {
    section: Section;
  };
};

export async function GET(
  request: Request,
  { params: { section } }: ParamObjectType
) {
  let api: string | null = null;
  switch (section) {
    case "banner":
      api = "https://dummyjson.com/products?limit=7";
      break;
  }
  if (!api) return Response.json({ error: "Invalid Category" });

  const response = await fetch(api);
  const data = await response.json();
  if (data?.products) {
    return Response.json({ data: data.products });
  }
  return Response.json({ data: [] });
}

import { NextRoute } from "@types";

export const GET: NextRoute = async (req, { params }) => {
  const url = new URL(req.url);

  const fetchedResponse = await fetch(
    `${process.env.productAPI}/products/search?q=${url.searchParams.get("q")}&select=title,thumbnail`
  );
  const data = await fetchedResponse.json();

  return Response.json(data);
};

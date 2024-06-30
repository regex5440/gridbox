import { Loader } from "@repo/ui";
import { RedirectType, redirect } from "next/navigation";
import SiteMap from "@utils/sitemap";

export default function RedirectOrders() {
  redirect(`${SiteMap.Account.Orders.path}/1?ps=10`, RedirectType.replace);
  return <Loader />;
}

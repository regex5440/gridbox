import { Loader } from "@repo/ui";
import SiteMap from "@utils/sitemap";
import { RedirectType, redirect } from "next/navigation";

export default function RedirectOrders() {
  redirect(`${SiteMap.Account.Orders.path}/1?ps=10`, RedirectType.replace);
  return <Loader />;
}

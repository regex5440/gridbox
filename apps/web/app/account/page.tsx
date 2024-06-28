import { RedirectType, redirect } from "next/navigation";
import SiteMap from "@utils/sitemap";

export default function RedirectFromAccount() {
  return redirect(SiteMap.Account.Profile.path, RedirectType.replace);
}

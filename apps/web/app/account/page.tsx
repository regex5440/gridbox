import SiteMap from "@utils/sitemap";
import { RedirectType, redirect } from "next/navigation";

export default function RedirectFromAccount() {
  return redirect(SiteMap.Account.Profile.path, RedirectType.replace);
}

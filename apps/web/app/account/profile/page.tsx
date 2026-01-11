import type { Metadata } from "next";
import Passkeys from "./Passkeys";
import { getAuthenticUserGeneralInfo } from "@actions/auth";
import { redirect } from "next/navigation";
import SiteMap from "@utils/sitemap";

export default async function Profile() {
  const user = await getAuthenticUserGeneralInfo();
  if (!user.success) {
    return redirect(
      `${SiteMap.Signin.path}?redirect=${SiteMap.Account.Profile.path}`
    );
  }
  //TODO: Implement update profile
  return (
    <div>
      <h1 className="text-2xl font-semibold">Update Profile</h1>
      <p className="mb-4">Upcoming with new release</p>
      <Passkeys user={user} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Account/Profile - GridBox",
  description: "Update your profile on GridBox e-commerce site",
};

import type { Metadata } from "next";

export default function Profile() {
  //TODO: Implement update profile
  return (
    <div>
      <h1 className="text-2xl font-semibold">Update Profile</h1>
      <p>Upcoming with new release</p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Account/Profile - GridBox",
  description: "Update your profile on GridBox e-commerce site",
};

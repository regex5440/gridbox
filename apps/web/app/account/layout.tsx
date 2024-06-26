import ActiveLink from "./ActiveLink";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto lg:mt-4 w-full lg:w-10/12 max-w-screen-lg grid lg:grid-cols-[20%_1fr]">
      <ActiveLink />
      <div className="lg:pl-10 overflow-hidden lg:pb-2 max-lg:px-2 max-lg:py-4 lg:min-h-[40vh]">
        {children}
      </div>
    </div>
  );
}

"use client";
import { MenuIcon, UserIcon } from "lucide-react";
import { Accordion, SidePanel, Navigation } from "@repo/ui";
import Link from "next/link";
import { useEffect } from "react";
import useUserStore from "@lib/store/user";
import type { ProductCategory } from "@types";
import SiteMap from "../utils/sitemap";
import MiniCartContent from "./MiniCartContent";

const {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
  NavigationMenuLink,
} = Navigation;

export default function Header({
  homePath = "/",
  categories,
}: {
  homePath?: string;
  categories: ProductCategory[];
}) {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <header className="w-full flex justify-between items-center sm:py-4 sm:px-8 border-b border-b-primary max-sm:px-2 max-sm:py-3">
      <Link href={homePath}>
        <h1 className="text-4xl max-sm:text-2xl">GridBox</h1>
      </Link>

      <NavigationMenu className="z-50">
        <NavigationMenuList className="items-center">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              asChild
              className="px-3 cursor-pointer rounded-[50%]"
              title="Account"
            >
              {!user ? (
                <UserIcon />
              ) : (
                <span className="text-ternary border">
                  {user.firstName.charAt(0) + user.lastName?.charAt(0)}
                </span>
              )}
            </NavigationMenuTrigger>

            <NavigationMenuContent asChild>
              <div className="bg-surface min-w-32 flex flex-col items-start *:block *:px-2 *:py-2 *:m-0 *:w-full *:rounded-md *:text-base *:font-sans hover:*:bg-primary hover:*:text-regular-inverted">
                {!user ? (
                  <NavigationMenuLink href={SiteMap.Signin.path}>
                    Login
                  </NavigationMenuLink>
                ) : (
                  <>
                    <NavigationMenuLink href={SiteMap.Account.Profile.path}>
                      My Account
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="sm:hidden"
                      href={SiteMap.Cart.path}
                    >
                      Cart Items
                    </NavigationMenuLink>
                    <NavigationMenuLink href={SiteMap.Account.Addresses.path}>
                      Address Book
                    </NavigationMenuLink>
                    <NavigationMenuLink href={SiteMap.Account.Orders.path}>
                      All Orders
                    </NavigationMenuLink>
                    <NavigationMenuLink href={SiteMap.Account.Logout.path}>
                      Logout
                    </NavigationMenuLink>
                  </>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="max-md:hidden">
            <MiniCartContent />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SidePanel.Sheet>
              <SidePanel.SheetOverlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
              <SidePanel.SheetTrigger className="px-3 py-2">
                <MenuIcon />
              </SidePanel.SheetTrigger>
              <SidePanel.SheetContent className="overflow-y-auto bg-surface border-none data-[state=open]:animate-slide-right-in data-[state=closed]:animate-slide-right-out">
                <Accordion.Accordion collapsible type="single">
                  {categories.map(({ name, slug }) => {
                    return (
                      <SidePanel.SheetClose asChild key={slug}>
                        <Link
                          className="block py-4 border-b border-b-primary hover:underline uppercase"
                          href={`${SiteMap.PLP.CategoryWise.path}/${slug}`}
                        >
                          {name}
                        </Link>
                      </SidePanel.SheetClose>
                    );
                    // } else {
                    //   return (
                    //     <Accordion.AccordionItem
                    //       value={key}
                    //       key={key}
                    //       className="border-b border-primary"
                    //     >
                    //       <Accordion.AccordionTrigger className="hover:no-underline font-normal">
                    //         {key}
                    //       </Accordion.AccordionTrigger>
                    //       <Accordion.AccordionContent className="pl-4 bg-surface-secondary">
                    //         {Object.entries(value).map(([key, value]) => {
                    //           return (
                    //             <SidePanel.SheetClose asChild key={key}>
                    //               <Link
                    //                 href={`${SiteMap.PLP.CategoryWise.path}/${value}`}
                    //                 className="block py-4 border-b border-b-primary [&:last-child]:border-b-0 hover:underline"
                    //               >
                    //                 {key}
                    //               </Link>
                    //             </SidePanel.SheetClose>
                    //           );
                    //         })}
                    //       </Accordion.AccordionContent>
                    //     </Accordion.AccordionItem>
                    //   );
                    // }
                  })}
                </Accordion.Accordion>
              </SidePanel.SheetContent>
            </SidePanel.Sheet>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

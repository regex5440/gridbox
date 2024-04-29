import { MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Accordion, SidePanel, Navigation } from "@repo/ui";
import Link from "next/link";
import { Category } from "../utils";
import SiteMap from "../utils/sitemap";

const {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
  NavigationMenuLink,
} = Navigation;

export default function Header({ homePath = "/" }) {
  return (
    <header className="w-full flex justify-between items-center py-4 px-8 border-b border-b-primary max-sm:px-4 max-sm:py-3">
      <Link href={homePath}>
        <h1 className="text-4xl max-sm:text-2xl">Gadget/Grid</h1>
      </Link>

      <NavigationMenu className="z-20">
        <NavigationMenuList className="items-baseline">
          <NavigationMenuItem>
            <NavigationMenuTrigger title="Account" className="px-3">
              <UserIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent asChild>
              <div className="bg-surface min-w-28 flex flex-col items-start *:block *:px-3 *:py-2 *:m-0 *:w-full *:rounded-md *:text-base *:font-sans hover:*:bg-primary hover:*:text-regular-inverted">
                <NavigationMenuLink href={"/signin"}>Login</NavigationMenuLink>
                <NavigationMenuLink href="/account">Profile</NavigationMenuLink>
                <NavigationMenuLink href="/logout">Logout</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SidePanel.Sheet>
              <SidePanel.SheetTrigger className="px-3">
                <ShoppingCartIcon />
              </SidePanel.SheetTrigger>
              <SidePanel.SheetContent className="bg-surface border-none data-[state=open]:animate-slide-right-in data-[state=closed]:animate-slide-right-out">
                <SidePanel.SheetHeader>
                  <SidePanel.SheetTitle className="text-2xl">
                    <Link href="/cart" className="hover:underline">
                      <SidePanel.SheetClose>Cart</SidePanel.SheetClose>
                    </Link>
                  </SidePanel.SheetTitle>
                </SidePanel.SheetHeader>
              </SidePanel.SheetContent>
            </SidePanel.Sheet>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SidePanel.Sheet>
              <SidePanel.SheetOverlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
              <SidePanel.SheetTrigger className="px-3">
                <MenuIcon />
              </SidePanel.SheetTrigger>
              <SidePanel.SheetContent className="overflow-y-auto bg-surface border-none data-[state=open]:animate-slide-right-in data-[state=closed]:animate-slide-right-out">
                <Accordion.Accordion type="single" collapsible>
                  {Object.entries(Category).map(([key, value]) => {
                    if (typeof value === "string") {
                      return (
                        <Link
                          href={`${SiteMap.PLP.CategoryWise.path}/${value}`}
                          key={key}
                          className="block py-4 border-b border-b-primary hover:underline"
                        >
                          <SidePanel.SheetClose>{key}</SidePanel.SheetClose>
                        </Link>
                      );
                    } else {
                      return (
                        <Accordion.AccordionItem
                          value={key}
                          key={key}
                          className="border-b border-primary"
                        >
                          <Accordion.AccordionTrigger className="hover:no-underline font-normal">
                            {key}
                          </Accordion.AccordionTrigger>
                          <Accordion.AccordionContent className="pl-4 bg-surface-secondary">
                            {Object.entries(value).map(([key, value]) => {
                              return (
                                <Link
                                  key={key}
                                  href={`${SiteMap.PLP.CategoryWise.path}/${value}`}
                                  className="block py-4 border-b border-b-primary [&:last-child]:border-b-0 hover:underline"
                                >
                                  <SidePanel.SheetClose>
                                    {key}
                                  </SidePanel.SheetClose>
                                </Link>
                              );
                            })}
                          </Accordion.AccordionContent>
                        </Accordion.AccordionItem>
                      );
                    }
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

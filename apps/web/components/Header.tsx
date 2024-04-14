import { MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Accordion, Menu, SidePanel } from "@repo/ui";
import Link from "next/link";
import { Category } from "../utils";
import SiteMap from "../utils/sitemap";

const { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } =
  Menu;

export default function Header({ homePath = "/" }) {
  return (
    <header className="w-full flex justify-between items-center py-4 px-8 border-b border-b-white max-sm:px-4 max-sm:py-3">
      <Link href={homePath}>
        <h1 className="text-4xl max-sm:text-2xl">Gadget/Grid</h1>
      </Link>

      <Menubar className="gap-6">
        <MenubarMenu>
          <MenubarTrigger title="Account">
            <UserIcon />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Login</MenubarItem>
            <MenubarItem>Profile</MenubarItem>
            <MenubarItem>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <SidePanel.Sheet>
            <SidePanel.SheetTrigger>
              <ShoppingCartIcon />
            </SidePanel.SheetTrigger>
            <SidePanel.SheetContent className="bg-menu-sheet-color border-none data-[state=open]:animate-slide-right-in data-[state=closed]:animate-slide-right-out">
              <SidePanel.SheetHeader>
                <SidePanel.SheetTitle className="text-2xl">
                  Cart
                </SidePanel.SheetTitle>
              </SidePanel.SheetHeader>
            </SidePanel.SheetContent>
          </SidePanel.Sheet>
        </MenubarMenu>
        <MenubarMenu>
          <SidePanel.Sheet>
            <SidePanel.SheetOverlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
            <SidePanel.SheetTrigger>
              <MenuIcon />
            </SidePanel.SheetTrigger>
            <SidePanel.SheetContent className="overflow-y-auto bg-menu-sheet-color border-none data-[state=open]:animate-slide-right-in data-[state=closed]:animate-slide-right-out">
              <Accordion.Accordion type="single" collapsible>
                {Object.entries(Category).map(([key, value]) => {
                  if (typeof value === "string") {
                    return (
                      <Link
                        href={`${SiteMap.PLP.CategoryWise.path}/${value}`}
                        key={key}
                        className="block py-4 border-b border-b-white hover:underline"
                      >
                        <SidePanel.SheetClose>{key}</SidePanel.SheetClose>
                      </Link>
                    );
                  } else {
                    return (
                      <Accordion.AccordionItem value={key} key={key}>
                        <Accordion.AccordionTrigger className="hover:no-underline">
                          {key}
                        </Accordion.AccordionTrigger>
                        <Accordion.AccordionContent className="pl-4 bg-menu-sheet-color-sub">
                          {Object.entries(value).map(([key, value]) => {
                            return (
                              <Link
                                key={key}
                                href={`${SiteMap.PLP.CategoryWise.path}/${value}`}
                                className="block py-4 border-b border-b-white [&:last-child]:border-b-0 hover:underline"
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
        </MenubarMenu>
      </Menubar>
    </header>
  );
}

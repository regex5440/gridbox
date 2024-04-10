import { CrossIcon, MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./MenuBar";
import { Accordion, SidePanel } from ".";
import { Category } from "../utils";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center py-4 px-8 border-b border-b-white max-sm:px-4 max-sm:py-3">
      <h1 className="text-4xl max-sm:text-2xl">Gadget/Grid</h1>

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
                        href={`/${value}`}
                        key={key}
                        className="block py-4 border-b border-b-white hover:underline"
                      >
                        {key}
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
                                href={`/${value}`}
                                className="block py-4 border-b border-b-white [&:last-child]:border-b-0 hover:underline"
                              >
                                {key}
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

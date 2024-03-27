import { MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { ReactNode } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./MenuBar";

export default function Header(): ReactNode {
  return (
    <header className="w-full flex justify-between items-center py-4 px-8 border-b border-b-white">
      <h1 className="text-4xl">Gadget/Grid</h1>

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
          <MenubarTrigger>
            <ShoppingCartIcon />
          </MenubarTrigger>
          <MenubarContent>Shopping</MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenuIcon />
        </MenubarMenu>
      </Menubar>
    </header>
  );
}

import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import LightDarkToggle from './light-dark-toggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserButton from './user-button';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Sellers', href: '/services' },
  { name: 'Buyers', href: '/properties' },
  { name: 'Our Agents', href: '/agents' },
  { name: 'Contact', href: '/contact' },
];

export default function Menu() {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden lg:flex w-full gap-1">
        {menuItems.map(item => (
          <Button key={item.name} asChild variant="ghost">
            <Link href={item.href}>{item.name}</Link>
          </Button>
        ))}
        <LightDarkToggle />
        <UserButton />
      </nav>
      <nav className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <LightDarkToggle />
            {menuItems.map(item => (
              <Button
                key={item.name}
                asChild
                variant="ghost"
                className="w-full"
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}

            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

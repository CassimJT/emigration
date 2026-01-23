import React from 'react'
import { Link } from 'react-router-dom'

import { Home, User, Settings, Menu, MessageCircleQuestionMark, Phone } from 'lucide-react'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Logo from '@/assets/Logo.svg'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-slate-100">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">

         {/* Logo */}
        <div className="h-10 w-auto md:h-12">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-full object-contain" />
          </Link>
        </div>

        {/* Centered Menu */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-2" to="/">
                  <Home size={18} /> Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-2" to="/about">
                  <User size={18} /> About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-2" to="/contacts">
                  <Phone size={18} /> Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-2" to="/faqs">
                  <MessageCircleQuestionMark size={18} /> FAQs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Avatar */}
        <Avatar className="hidden md:flex cursor-pointer bg-pink-300">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu size={26} />
          </SheetTrigger>

          <SheetContent side="left" className="w-64 bg-white border-r p-4 shadow-lg">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 space-y-4">
              <Link className="p-2 rounded hover:bg-gray-200 flex items-center gap-2" to="/">
                <Home size={18} /> Home
              </Link>
              <Link className="p-2 rounded hover:bg-gray-200 flex items-center gap-2" to="/about">
                <User size={18} /> About
              </Link>
              <Link className="p-2 rounded hover:bg-gray-200 flex items-center gap-2" to="/contacts">
                <Phone size={18} /> Contact
              </Link>
              <Link className="p-2 rounded hover:bg-gray-200 flex items-center gap-2" to="/faqs">
                <MessageCircleQuestionMark size={18} /> FAQs
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}

export default Navbar

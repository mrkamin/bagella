"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, Atom, UserIcon, ListOrderedIcon, Search } from "lucide-react";
import { useCart } from "@/context/Cartcontext";
import { useClerk, UserButton } from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {totalItems, user} = useCart();
  const {openSignIn} = useClerk();

  const cartIcon = 
  <>
  
            <ShoppingCart size={17} />
              {totalItems > 0 && 
                <span className=" absolute top-2 left-9 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>}
          
  </>

  
  return (
    <header className="w-full border-b sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex justify-between w-full items-center">
      <div className="flex items-center gap-5 p-4 w-full justify-between ">
        {/* Mobile Toggle */}
        <div className="flex gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.5 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
           <AnimatePresence>
            {!isOpen && totalItems > 0 && (
              <motion.span
                key="badge"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
          
        </button>
        
        <Link href="/" className="flex items-center text-2xl font-bold text-primary cursor-pointer hover:text-secondary">
        <Atom className="transition ease-in-out group-hover:stroke-primary" />
          Bagella
        </Link>
        </div>
        <div className="flex w-full">
            <input type="search" placeholder="Search....." className="border rounded-l-xl w-full px-5"/>
            <Search className="border rounded-r-xl text-primary w-8 h-8 p-1" />
            </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-primary hover:text-secondary transition"
            >
              {link.name}
            </Link>
          ))}
          
          {user
          ? <>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={cartIcon}
                onClick={() => {
                  window.location.href = "/cart"; 
                }}
              />
              <UserButton.Action
                label="Order"
                labelIcon={<ListOrderedIcon size={17} />}
                onClick={() => {
                  window.location.href = "/order"; 
                }}
              />
            </UserButton.MenuItems>
          </UserButton>
          </>
        :
        <button onClick={() => openSignIn()} className="cursor-pointer flex text-primary hover:text-secondary transition">
            <UserIcon />
            Account
          </button>}
         
          
        </nav>

        
      </div>
      <div className="md:hidden">
                {user
          ? <>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={cartIcon}
                onClick={() => {
                  window.location.href = "/cart"; 
                }}
              />
              <UserButton.Action
                label="Order"
                labelIcon={<ListOrderedIcon size={17}/>}
                onClick={() => {
                  window.location.href = "/order"; 
                }}
              />
            </UserButton.MenuItems>
          </UserButton>
          </>
        :
        <button onClick={() => openSignIn()} className="cursor-pointer place-items-center text-primary hover:text-secondary transition">
            <UserIcon />
            Account
          </button>}
          </div>
      </div>
      {/* Mobile Nav */}
      {isOpen && (
        <nav className="flex flex-col md:hidden bg-white border-t px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-[#d4af37] transition"
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Cart Link */}
          <Link
            href="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-[#d4af37]"
          >
            <ShoppingCart size={20} />
              Cart {totalItems > 0 && 
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {`(${totalItems})`}
                </span>}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
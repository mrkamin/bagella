"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart } from "lucide-react";


const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <header className="w-full border-b sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-primary">
          Bagella
        </Link>

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

          {/* Cart Icon with Badge */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-primary hover:text-secondary-foreground" size={24} />
            
          </Link>
        </nav>

        {/* Mobile Toggle */}
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

          
        </button>
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
            
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
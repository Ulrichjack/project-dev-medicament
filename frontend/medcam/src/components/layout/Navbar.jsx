"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/search", label: "Médicaments" },
    { href: "/orders", label: "Mes commandes" },
    { href: "/notifications", label: "Notifications" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full bg-white border-b border-[#E8ECF0] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="MEDCAM" className="h-8 w-auto" />
            <span
              className="text-xl font-bold text-[#2C5F8D]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              MEDCAM
            </span>
          </Link>

          {/* Barre de recherche — desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8C8D]">
                <i className="fa-solid fa-magnifying-glass text-sm" />
              </span>
              <input
                type="text"
                placeholder="Rechercher un médicament..."
                className="w-full pl-10 pr-4 py-2 rounded-[10px] border border-[#E8ECF0] bg-[#F5F7FA] text-sm text-[#2C3E50] placeholder:text-[#B0BEC5] focus:outline-none focus:ring-2 focus:ring-[#2C5F8D] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Actions — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Panier */}
            <Link
              href="/cart"
              className="relative p-2 text-[#7F8C8D] hover:text-[#2C5F8D] transition-colors"
            >
              <i className="fa-solid fa-cart-shopping text-lg" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E74C3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cloche */}
            <Link
              href="/notifications"
              className="relative p-2 text-[#7F8C8D] hover:text-[#2C5F8D] transition-colors"
            >
              <i className="fa-solid fa-bell text-lg" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E74C3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Connexion / Profil */}
            <div className="flex items-center gap-2 ml-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-[#2C5F8D] border border-[#2C5F8D] rounded-[10px] hover:bg-[#2C5F8D] hover:text-white transition-all duration-200"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-[#2C5F8D] rounded-[10px] hover:bg-[#1e4a73] transition-all duration-200"
              >
                S'inscrire
              </Link>
            </div>
          </div>

          {/* Burger — mobile */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/cart" className="relative p-2 text-[#7F8C8D]">
              <i className="fa-solid fa-cart-shopping text-lg" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E74C3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-[#2C3E50] hover:text-[#2C5F8D] transition-colors"
              aria-label="Menu"
            >
              <i className={`fa-solid fa-${menuOpen ? "xmark" : "bars"} text-xl`} />
            </button>
          </div>

        </div>
      </div>

      {/* Drawer mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E8ECF0] bg-white px-4 py-4 flex flex-col gap-3">
          {/* Recherche mobile */}
          <div className="relative w-full mb-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8C8D]">
              <i className="fa-solid fa-magnifying-glass text-sm" />
            </span>
            <input
              type="text"
              placeholder="Rechercher un médicament..."
              className="w-full pl-10 pr-4 py-2 rounded-[10px] border border-[#E8ECF0] bg-[#F5F7FA] text-sm placeholder:text-[#B0BEC5] focus:outline-none focus:ring-2 focus:ring-[#2C5F8D] transition-all"
            />
          </div>

          {/* Liens */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-[10px] text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "bg-[#2C5F8D] text-white"
                  : "text-[#2C3E50] hover:bg-[#F5F7FA]"
              }`}
            >
              {link.href === "/notifications" && (
                <i className="fa-solid fa-bell mr-2" />
              )}
              {link.href === "/orders" && (
                <i className="fa-solid fa-box mr-2" />
              )}
              {link.href === "/search" && (
                <i className="fa-solid fa-pills mr-2" />
              )}
              {link.href === "/" && (
                <i className="fa-solid fa-house mr-2" />
              )}
              {link.label}
            </Link>
          ))}

          {/* Boutons auth mobile */}
          <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-[#E8ECF0]">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-[#2C5F8D] border border-[#2C5F8D] rounded-[10px] hover:bg-[#2C5F8D] hover:text-white transition-all"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-[#2C5F8D] rounded-[10px] hover:bg-[#1e4a73] transition-all"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
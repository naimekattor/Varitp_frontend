"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, UtensilsCrossed, X } from 'lucide-react';
import logo from "@/public/images/Varivo_LOGO_RGB_boja.png"; 

import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/useCartStore';
import { useEffect } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const totalItems = useCartStore((state) => state.totalItems);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    if (session) {
      fetchCart();
    }
  }, [session, fetchCart]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isItemActive = (href: string, activePaths?: string[]) => {
    if (activePaths) {
      return activePaths.includes(pathname);
    }
    return pathname === href;
  };

  const navItems = [
    { href: '/', label: 'Menu' },
    { href: '/cart', label: 'Shopping cart' },
    { href: '/review', label: 'Review' },
    { href: '/contact', label: 'Contact' },
    ...(session 
      ? [
          { href: '/orders', label: 'My Orders' },
          { href: '/', label: 'Logout', onClick: () => signOut({ callbackUrl: '/' }) }
        ]
      : [{ href: '/auth/register', label: 'Signup', activePaths: ['/auth', '/auth/register', '/auth/login'] }]
    ),
    
  ];

  return (
    <>
      <header className="w-full bg-white relative z-[100] shadow-[0_2px_15px_rgb(0,0,0,0.03)] border-b border-gray-100 py-4">
        <div className="max-w-[1600px] mx-auto px-6 py-[50px] lg:py-[40px] flex items-center justify-end relative">
          
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="2xl:hidden absolute left-6 top-1/2 -translate-y-1/2 text-gray-900 hover:text-[#E86F24] transition-colors p-2 -ml-2 flex items-center"
            aria-label="Open mobile menu"
          >
            <Menu size={30} strokeWidth={1.7} />
          </button>

          {/* Logo - Using Next.js Image */}
          <Link 
            href="/" 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Image
              src={logo}
              alt="Varivo Logo"
              className="h-40 lg:h-44 w-auto object-contain"
              priority // High priority loading for header
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden 2xl:flex items-center gap-10 text-[15px] font-serif font-medium text-gray-900 pr-2">
            {navItems.map((item) => (
              item.onClick ? (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="transition-colors hover:text-[#E86F24] cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href || '#'}
                  className={`transition-colors flex items-center gap-2 ${
                    isItemActive(item.href!, item.activePaths) ? 'text-[#E86F24]' : 'hover:text-[#E86F24]'
                  }`}
                >
                  {item.label}
                  {item.href === '/cart' && totalItems > 0 && (
                    <span className="bg-[#E86F24] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[120] 2xl:hidden">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <aside className="relative h-full w-[280px] max-w-[85vw] bg-white border-r border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.18)] px-6 py-6 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-left"
              >
                <Image
              src={logo}
              alt="Varivo Logo"
              className="h-40 lg:h-44 w-auto object-contain"
              priority // High priority loading for header
            />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#E86F24] hover:border-[#E86F24] transition-colors flex items-center justify-center"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      item.onClick!();
                    }}
                    className="w-full text-left px-4 py-3 rounded-2xl text-[15px] font-serif font-medium text-gray-800 hover:bg-gray-50 hover:text-[#E86F24] transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href || '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-[15px] font-serif font-medium transition-colors flex items-center justify-between ${
                      isItemActive(item.href!, item.activePaths)
                        ? 'bg-orange-50 text-[#E86F24]'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-[#E86F24]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.href === '/cart' && totalItems > 0 && (
                      <span className="bg-[#E86F24] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
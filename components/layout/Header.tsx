"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Building, User } from 'lucide-react';
import logo from "@/public/images/Varivo_LOGO_RGB_boja.png"; 
import { Link, usePathname, useRouter } from '@/src/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/useCartStore';
import { useEffect } from 'react';

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
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
  const locales = ["hr", "en"] as const;

  const switchLocale = (nextLocale: "hr" | "en") => {
    router.replace(pathname, { locale: nextLocale });
  };

  const isItemActive = (href: string, activePaths?: string[]) => {
    if (activePaths) {
      return activePaths.includes(pathname);
    }
    return pathname === href;
  };

  const navItems = [
    { href: '/', label: t('menu') },
    { href: '/cart', label: t('cart') },
    { href: '/review', label: t('review') },
    { href: '/contact', label: t('contact') },
    ...(session 
      ? [
          { href: '/orders', label: t('orders') },
          { href: '/', label: t('logout'), onClick: () => signOut({ callbackUrl: `/${locale}` }) }
        ]
      : [{ href: '/auth/register', label: t('signup'), activePaths: ['/auth', '/auth/register', '/auth/login'] }]
    ),
    
  ];

  const renderLanguageToggle = (mobile = false) => (
    <div
      className={`inline-flex items-center rounded-full border border-gray-100 bg-gray-50 p-1 shadow-sm ${mobile ? "w-fit mx-4 mt-4" : ""}`}
      aria-label={t("language")}
    >
      {locales.map((item) => {
        const active = item === locale;
        return (
          <button
            key={item}
            type="button"
            onClick={() => switchLocale(item)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
              active
                ? "bg-[#E86F24] text-white shadow-[0_8px_18px_-8px_#E86F24]"
                : "text-gray-400 hover:text-[#E86F24]"
            }`}
            aria-pressed={active}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <header className="w-full bg-white relative z-[100] shadow-[0_2px_15px_rgb(0,0,0,0.03)] border-b border-gray-100 py-4">
        <div className="max-w-[1600px] mx-auto px-6 py-[50px] lg:py-[40px] flex items-center justify-end relative">
          
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="2xl:hidden absolute left-6 top-1/2 -translate-y-1/2 text-gray-900 hover:text-[#E86F24] transition-colors p-2 -ml-2 flex items-center"
            aria-label={t("openMenu")}
          >
            <Menu size={30} strokeWidth={1.7} />
          </button>

          {/* Desktop Business Account Badge (Left Side) */}
          {session?.user?.role === "business_owner" && (
            <div className="hidden 2xl:block absolute left-6 top-1/2 -translate-y-1/2">
              <Link href="/profile" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-orange-100 text-[#E86F24] border border-orange-200 shadow-2xs hover:bg-orange-200/50 transition-all">
                <Building size={12} strokeWidth={2.5} />
                <span>{t("businessAccount")}</span>
              </Link>
            </div>
          )}

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
          <nav className="hidden 2xl:flex items-center gap-6 text-[15px] font-serif font-medium text-gray-900 pr-2">
            {session && session.user.role !== "business_owner" && (
              <Link href="/profile" className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-100 text-[#E86F24] border border-orange-200 hover:bg-orange-200/50 transition-all font-serif font-bold text-sm shadow-2xs" title={session.user.email}>
                {session.user.first_name ? session.user.first_name[0].toUpperCase() : <User size={15} />}
              </Link>
            )}
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
            {renderLanguageToggle()}
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
              {session?.user?.role === "business_owner" ? (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mx-4 mb-4 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-orange-100 text-[#E86F24] border border-orange-200 w-fit hover:bg-orange-200/50 transition-all"
                >
                  <Building size={13} strokeWidth={2.5} />
                  <span>{t("businessAccount")}</span>
                </Link>
              ) : session ? (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mx-4 mb-4 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold bg-orange-50 text-[#E86F24] border border-orange-100 w-fit hover:bg-orange-100/50 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold border border-orange-200">
                    {session.user.first_name ? session.user.first_name[0].toUpperCase() : <User size={12} />}
                  </div>
                  <span>{session.user.first_name || session.user.email.split('@')[0]}</span>
                </Link>
              ) : null}
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
              {renderLanguageToggle(true)}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

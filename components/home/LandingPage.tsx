"use client";

import { useEffect, useState, useMemo } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight, Check, Loader2, Clock } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useMenuStore } from "@/store/useMenuStore";
import { useSession } from "next-auth/react";
import MenuSkeleton from "./MenuSkeleton";
import LoginRequiredModal from "../auth/LoginRequiredModal";

// Fallback images from public/images folder
const heroImageFallback = "/images/GOJ_3134.jpg";
const ctaBanner = "/images/GOJ_3170.jpg";

// Helper to generate a window of dates around a center date
const getVisibleDates = (centerDateStr: string) => {
  const center = new Date(centerDateStr);
  const dates = [];
  for (let i = -2; i <= 2; i++) {
    const d = new Date(center);
    d.setDate(center.getDate() + i);
    dates.push({
      full: d.toISOString().split("T")[0],
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleString("default", { month: "short" }),
    });
  }
  return dates;
};

export default function LandingPage({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const { data: session } = useSession();
  const addItem = useCartStore((state) => state.addItem);
  const { 
    menu, 
    loading, 
    error, 
    selectedDate, 
    fetchMenu, 
    setSelectedDate 
  } = useMenuStore();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Fetch menu on mount and when selectedDate changes
  useEffect(() => {
    fetchMenu(selectedDate);
  }, [selectedDate, fetchMenu]);

  // Derive categories from the current menu
  const menuCategories = useMemo(() => {
    if (!menu?.foods) return [];
    const categoriesMap = new Map();
    menu.foods.forEach((food) => {
      if (!categoriesMap.has(food.category)) {
        categoriesMap.set(food.category, {
          id: food.category,
          name: food.category,
          img: food.images[0]?.image || heroImageFallback,
        });
      }
    });
    return Array.from(categoriesMap.values());
  }, [menu]);

  // Set default category when menu changes
  useEffect(() => {
    if (menuCategories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(menuCategories[0].id);
    } else if (menuCategories.length > 0 && !menuCategories.find(c => c.id === selectedCategoryId)) {
      setSelectedCategoryId(menuCategories[0].id);
    }
  }, [menuCategories, selectedCategoryId]);

  const visibleDates = useMemo(() => getVisibleDates(selectedDate), [selectedDate]);
  
  const selectedMenu = useMemo(() => {
    return menu?.foods.find((f) => f.category === selectedCategoryId) || null;
  }, [menu, selectedCategoryId]);

  const handleAddToCart = async () => {
    if (!selectedMenu) return;
    if (!session) {
      setShowLoginModal(true);
      return;
    }
    await addItem(selectedMenu.id, 1);
    onNavigate("cart");
  };

  const changeDate = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d.toISOString().split("T")[0]);
  };


  const hasNutrition = false; 

  return (
    <div className="bg-[#FAFAFA] font-sans overflow-x-hidden text-gray-900 flex-1 w-full relative">
      <LoginRequiredModal 
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => onNavigate("login")}
        onRegister={() => onNavigate("register")}
      />
      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-24 md:pt-20 xl:min-h-[75vh] flex flex-col xl:flex-row items-center max-w-[1400px] mx-auto">
        {/* Background abstract elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/40 rounded-full blur-3xl opacity-60 mix-blend-multiply translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply -translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute sm:top-24 sm:left-24 top-10 left-10 w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-80"></div>
          <div className="absolute top-[30%] sm:right-1/3 right-1/4 w-3.5 h-3.5 bg-red-500 rotate-45 transform"></div>
          <div className="absolute bottom-10 center left-[45%] w-3 h-3 bg-yellow-400 rounded-full opacity-70"></div>
          <svg
            className="absolute top-[45%] left-[-5%] w-[110%] h-[300px] text-green-300 opacity-60"
            preserveAspectRatio="none"
            viewBox="0 0 1000 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 10"
          >
            <path d="M0,150 Q150,50 300,100 T600,150 T900,80 T1100,120" />
          </svg>
        </div>

        {/* Left Content */}
        <div className="w-full xl:w-[45%] xl:pr-12 z-10 text-center xl:text-left">
          <p className="text-[#E86F24] font-semibold text-sm mb-4 tracking-wide font-sans">
            Get Your best food here!
          </p>
          <h1 className="text-5xl sm:text-6xl xl:text-[5rem] font-serif leading-[1.1] text-gray-900 mb-6 font-medium">
            Welcome to the <br className="hidden lg:block" /> Varivo bistro!
          </h1>
          <p className="text-gray-500/90 text-lg md:text-[1.1rem] max-w-md mx-auto xl:mx-0 mb-10 leading-relaxed">
            Fresh, traditional dishes prepared daily and delivered straight to
            your doorstep.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("cart")}
            className="bg-[#E86F24] mb-6 hover:bg-[#d4621c] text-white px-10 py-4 lg:py-5 rounded-2xl font-medium transition-colors shadow-[0_10px_25px_-5px_#E86F24] hover:shadow-[0_15px_30px_-5px_#E86F24] text-[15px]"
          >
            Order Now
          </button>
        </div>

        <div className="w-full lg:w-[55%] mt-20 lg:mt-0 relative flex justify-center lg:justify-end z-10">
          <div className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px]">
            <div className="absolute inset-0 rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] z-10 bg-white flex items-center justify-center">
              <div className="w-[98%] h-[98%] rounded-full overflow-hidden">
                <Image
                  src={selectedMenu?.images[0]?.image || heroImageFallback}
                  alt={selectedMenu?.name || "Varivo Special Dish"}
                  fill
                  className="object-cover scale-[1.02] rounded-full"
                  priority
                />{" "}
              </div>
            </div>

            {/* Floating mini bowls from categories */}
            {menuCategories.slice(0, 4).map((cat, idx) => {
              const positions = [
                "top-[65%] -left-6 sm:-left-16 w-[70px] h-[70px] sm:w-[110px] sm:h-[110px]",
                "-bottom-8 left-16 sm:bottom-0 sm:left-32 w-[60px] h-[60px] sm:w-[90px] sm:h-[90px]",
                "-bottom-12 right-24 sm:-bottom-8 sm:right-32 w-[55px] h-[55px] sm:w-[80px] sm:h-[80px]",
                "top-[25%] -right-8 sm:-right-16 w-[65px] h-[65px] sm:w-[100px] sm:h-[100px]"
              ];
              return (
                <div key={cat.id} className={`absolute ${positions[idx]} rounded-full shadow-2xl overflow-hidden z-20 transition-transform bg-white p-[3px]`}>
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      className="object-cover scale-110"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Date & Submenu Slider */}
      <section className="px-6 py-16 flex flex-col items-center mt-10 md:mt-0 relative z-20">
        <div className="flex items-center gap-8 text-gray-300 mb-10">
          <button
            type="button"
            onClick={() => changeDate(-1)}
            className="hover:text-[#E86F24] transition-colors"
            aria-label="Show previous date"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          
          <div className="flex gap-4 overflow-hidden px-2">
            {visibleDates.map((d) => (
              <button
                key={d.full}
                onClick={() => setSelectedDate(d.full)}
                className={`flex flex-col items-center leading-none transition-all ${d.full === selectedDate ? "scale-110 opacity-100" : "scale-90 opacity-40 hover:opacity-70"}`}
              >
                <span className={`text-[2rem] font-bold tracking-tight ${d.full === selectedDate ? "text-gray-900" : "text-gray-400"}`}>
                  {d.day}
                </span>
                <span className={`text-[10px] font-medium mt-1 uppercase tracking-wider ${d.full === selectedDate ? "text-gray-900" : "text-gray-400"}`}>
                  {d.month}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => changeDate(1)}
            className="hover:text-[#E86F24] transition-colors"
            aria-label="Show next date"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-14 text-sm font-semibold max-w-4xl w-full">
          {menuCategories.map((item) => {
            const isActive = item.id === selectedCategoryId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCategoryId(item.id)}
                className="flex flex-col items-center gap-3 cursor-pointer group"
                aria-pressed={isActive}
              >
                <div
                  className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full p-1 transition-all duration-300 ${isActive ? "border-2 border-[#E86F24] scale-110 drop-shadow-md" : "border-2 border-transparent scale-100 group-hover:scale-105 opacity-60 group-hover:opacity-100"}`}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full rounded-full object-cover shadow-inner"
                  />
                </div>
                <span
                  className={`text-[11px] tracking-widest uppercase mt-1 ${isActive ? "text-[#E86F24]" : "text-gray-400 group-hover:text-gray-700"}`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Product Feature */}
      <section className="px-6 pb-20 pt-10 text-center flex flex-col items-center relative z-20 min-h-[600px]">
        {loading ? (
          <MenuSkeleton />
        ) : (error && error !== "Menu items not found") ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
               <span className="text-3xl">⚠️</span>
            </div>
            <div>
              <p className="text-gray-900 font-bold text-xl mb-2">{error}</p>
              <p className="text-gray-400 text-sm">We encountered an issue loading the menu. Please try again.</p>
            </div>
            <button 
              onClick={() => fetchMenu(selectedDate)} 
              className="bg-[#E86F24] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#d4621c] transition-all active:scale-95 shadow-lg"
            >
              Try again
            </button>
          </div>
        ) : (!selectedMenu || error === "Menu items not found") ? (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in zoom-in duration-700">
            <div className="w-48 h-48 bg-[#FFF2E8] rounded-full flex items-center justify-center mb-10 relative">
              <div className="absolute inset-0 bg-[#E86F24] rounded-full opacity-5 animate-ping"></div>
              <div className="text-6xl">👨‍🍳</div>
              <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-lg border border-orange-50">
                <Clock size={24} className="text-[#E86F24]" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
              Menu is not cooked yet for this date
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed mb-10">
              Our chefs are still preparing the perfect selection for this day. Please check back later or explore other dates.
            </p>
            
            <button
              onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}
              className="bg-white border-2 border-gray-100 hover:border-[#E86F24] hover:text-[#E86F24] text-gray-500 px-8 py-3.5 rounded-2xl font-bold transition-all active:scale-95 shadow-sm"
            >
              Check Today's Menu
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-[2.5rem] font-serif text-gray-900 mb-4 tracking-[-0.02em] font-medium uppercase">
              {selectedMenu.name}
            </h2>
            <p className="text-gray-400 text-[15px] max-w-lg mb-8 font-light">
              {selectedMenu.short_details || selectedMenu.category}
            </p>

            <div className="flex items-center gap-6 mb-16">
              <span className="text-[2rem] font-semibold text-[#E86F24]">
                ${selectedMenu.price}
              </span>
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-[#E86F24] hover:bg-[#d4621c] text-white px-7 py-3 rounded-full font-medium transition-all shadow-[0_8px_20px_-5px_#E86F24] text-[15px] flex items-center gap-2.5"
              >
                <ShoppingCart size={18} /> Add to cart
              </button>
            </div>

            <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full mx-auto flex items-center justify-center -mt-8">
              <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="43"
                    stroke="#F07A24"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="6 7"
                    opacity="0.95"
                  />
                </svg>
              </div>
              <div className="w-[74%] h-[74%] rounded-full overflow-hidden relative shadow-[0_22px_42px_-10px_rgba(0,0,0,0.28)]">
                <Image
                  src={selectedMenu.images[0]?.image || heroImageFallback}
                  alt={selectedMenu.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = heroImageFallback;
                  }}
                />
              </div>
            </div>
          </>
        )}
      </section>

      {/* Detail Text Section */}
      {selectedMenu && (
        <section className="px-6 py-24 mb-10 max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 md:order-2 relative">
            <div className="relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full mx-auto md:ml-auto md:mr-0 flex items-center justify-center">
              <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="43"
                    stroke="#F07A24"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="6 7"
                    opacity="0.95"
                  />
                </svg>
              </div>
              <div className="w-[74%] h-[74%] rounded-full overflow-hidden relative shadow-[0_22px_42px_-10px_rgba(0,0,0,0.22)] bg-white p-1.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={selectedMenu.images[1]?.image || selectedMenu.images[0]?.image || heroImageFallback}
                    alt={selectedMenu.name}
                    fill
                    className="object-cover scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = heroImageFallback;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-1 text-center md:text-left">
            <h3 className="text-[2.2rem] font-serif text-gray-900 mb-8 leading-tight font-medium">
              {selectedMenu.name}
            </h3>
            <div className="space-y-6 text-gray-500/80 text-[16px] leading-relaxed font-light whitespace-pre-line">
              <p>{selectedMenu.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Ingredients Box - Only show if data exists (not in current API) */}
      {/* Nutrition info - Only show if data exists (not in current API) */}
      {hasNutrition && (
        <section className="px-6 pb-32 pt-20 max-w-4xl mx-auto">
          {/* ... existing nutrition code if you want to keep it as placeholder ... */}
        </section>
      )}

      {/* CTA Footer Banner */}
      <section className="relative w-full min-h-[290px] md:min-h-[320px] flex items-center justify-center overflow-hidden mb-0">
        <Image
          src={ctaBanner}
          alt="Pot"
          fill
          className="object-cover object-center opacity-[0.72]"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.36)_55%,rgba(0,0,0,0.42)_100%)]"></div>
        <div className="relative z-10 text-center px-6 max-w-[760px] mx-auto py-14 md:py-16">
          <h2 className="text-[2.4rem] md:text-[3.1rem] font-serif text-white mb-6 tracking-tight leading-[1.02]">
            Ready to enjoy
            <br />
            your meal?
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-10 gap-y-3 mb-7 text-[13px] md:text-[14px] text-white/90 font-medium">
            <div className="flex items-center gap-1.5">
              <Check size={14} strokeWidth={3} className="text-white" />{" "}
              <span>Fresh ingredients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} strokeWidth={3} className="text-white" />{" "}
              <span>Ready in 10 mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} strokeWidth={3} className="text-white" />{" "}
              <span>Delivered daily</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("cart")}
            className="bg-[#E86F24] hover:bg-[#d4621c] text-white px-6 py-3 rounded-lg font-semibold shadow-[0_10px_24px_-8px_#E86F24] text-[14px]"
          >
            Select Meal
          </button>
        </div>
      </section>
    </div>
  );
}

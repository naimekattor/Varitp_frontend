import React from "react";
import Image from "next/image";
import { UtensilsCrossed, Heart, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Varivo_LOGO_RGB_boja.png"
            alt="Varivo background"
            fill
            className="object-contain opacity-[0.03] scale-150 rotate-12"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight">
            Our Story, Your <span className="text-[#E86F24]">Experience</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Varivo was founded on a simple principle: high-quality, chef-prepared meals should be accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <UtensilsCrossed size={32} className="text-[#E86F24]" />,
                title: "Chef Prepared",
                desc: "Every dish is crafted by professional chefs using traditional techniques and modern flair."
              },
              {
                icon: <Heart size={32} className="text-[#E86F24]" />,
                title: "Made with Love",
                desc: "We believe food tastes better when it's prepared with genuine care and passion."
              },
              {
                icon: <ShieldCheck size={32} className="text-[#E86F24]" />,
                title: "Quality First",
                desc: "We source only the freshest, highest-quality ingredients from local suppliers."
              },
              {
                icon: <Users size={32} className="text-[#E86F24]" />,
                title: "Community",
                desc: "We're not just a service; we're a part of your daily ritual and your community."
              }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:border-orange-100 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[#E86F24]/10 z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
                alt="Chef cooking"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <span className="text-[#E86F24] font-bold tracking-widest uppercase text-xs">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Bringing the Bistro Experience <span className="italic font-normal">to your home.</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                At Varivo, we understand that life can be busy. That&apos;s why we&apos;ve made it our mission to provide nutritious, delicious, and chef-prepared meals that save you time without sacrificing quality.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Whether you&apos;re looking for a quick lunch or a decadent dinner, we&apos;re here to serve you the very best.
              </p>
              <div className="pt-6">
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm font-serif font-bold text-[#E86F24]">V</div>
                  <div>
                    <p className="text-gray-900 font-bold">Varivo</p>
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Founder of Varivo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#111827] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Ready to taste the <span className="text-[#E86F24]">Difference?</span></h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied food lovers who enjoy Varivo every day.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-12 py-5 bg-[#E86F24] hover:bg-[#d4621c] text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
          >
            Explore our Menu
          </Link>
        </div>
      </section>
    </div>
  );
}

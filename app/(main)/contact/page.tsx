"use client"
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-white font-sans overflow-x-hidden text-gray-900 mx-auto w-full flex-1">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFF5F0]/60 to-white pt-24 pb-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <p className="text-[#E86F24] font-semibold text-[11px] mb-4 tracking-widest uppercase">Get in touch</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 tracking-tight font-medium">Contact Us</h1>
          <p className="text-gray-400 text-[14px] max-w-md mx-auto leading-relaxed">
            Have a question or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-6 py-8 md:py-16 min-h-[60vh]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-[32%] shrink-0 space-y-10">
            <div className="space-y-8">
              {/* Location */}
              <div className="flex items-start gap-5">
                <div className="bg-[#FFF5F0] p-3.5 rounded-2xl text-[#E86F24] shrink-0">
                  <MapPin size={22} strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h4 className="text-[14px] font-semibold text-gray-900 mb-1.5 font-sans">Our Location</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed font-light">Koledinecka 94, 10410<br/>Velika Gorica<br/>Croatia</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="bg-[#FFF5F0] p-3.5 rounded-2xl text-[#E86F24] shrink-0">
                  <Phone size={22} strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h4 className="text-[14px] font-semibold text-gray-900 mb-1.5 font-sans">Phone Number</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed font-light">+385 1 5504 242<br/>+1 (555) 987-6543</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="bg-[#FFF5F0] p-3.5 rounded-2xl text-[#E86F24] shrink-0">
                  <Mail size={22} strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h4 className="text-[14px] font-semibold text-gray-900 mb-1.5 font-sans">Email Address</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed font-light">info@varivo.hr<br/>support@varivobistro.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-5">
                <div className="bg-[#FFF5F0] p-3.5 rounded-2xl text-[#E86F24] shrink-0">
                  <Clock size={22} strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h4 className="text-[14px] font-semibold text-gray-900 mb-1.5 font-sans">Business Hours</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed font-light">Mon - Fri: 08:30 - 22:00<br/>Sat: 10:00 - 23:00<br/>Sun: 10:00 - 21:00</p>
                </div>
              </div>
            </div>

            {/* Micro Map */}
            <div className="w-full h-[180px] rounded-[1.5rem] overflow-hidden relative shadow-sm border border-gray-100 bg-[#E5EADD]">
              <div className="absolute inset-0 bg-[#f0f4eb]">
                <div className="absolute top-1/4 left-[-10%] w-[120%] h-3 bg-white transform -rotate-6"></div>
                <div className="absolute top-1/2 left-[-10%] w-[120%] h-4 bg-white transform rotate-3"></div>
                <div className="absolute top-[-10%] left-1/3 w-3 h-[120%] bg-white transform rotate-12"></div>
                <div className="absolute top-[-10%] left-2/3 w-2 h-[120%] bg-white transform -rotate-12"></div>
                <div className="absolute top-1/3 left-0 w-full h-8 bg-[#D0E8E1] transform rotate-12 opacity-80"></div>
              </div>
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Map Texture" className="w-full h-full object-cover opacity-15 mix-blend-overlay max-h-none block" />
              
              <div className="absolute inset-0 flex items-center justify-center mt-4 mr-4">
                <div className="flex flex-col items-center drop-shadow-md">
                   <MapPin size={32} className="text-[#E86F24] fill-white" strokeWidth={1.5} />
                   <div className="w-1.5 h-1 bg-black/20 rounded-[100%] mt-0.5 blur-[1px]"></div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Form */}
          <div className="w-full bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
             <h2 className="text-[1.35rem] font-serif font-medium text-gray-900 mb-8">Send Us a Message</h2>
             
             <form className="space-y-6" onSubmit={e => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="name" className="text-[12px] font-bold text-gray-800">Your Name *</label>
                   <input type="text" id="name" placeholder="John Doe" className="w-full bg-white px-5 py-3.5 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 font-light" />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="email" className="text-[12px] font-bold text-gray-800">Email Address *</label>
                   <input type="email" id="email" placeholder="john@example.com" className="w-full bg-white px-5 py-3.5 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 font-light" />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="phone" className="text-[12px] font-bold text-gray-800">Phone Number</label>
                   <input type="tel" id="phone" placeholder="+1 (555) 123-4567" className="w-full bg-white px-5 py-3.5 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 font-light" />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="subject" className="text-[12px] font-bold text-gray-800">Subject *</label>
                   <input type="text" id="subject" className="w-full bg-white px-5 py-3.5 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 font-light" />
                 </div>
               </div>

               <div className="space-y-2">
                 <label htmlFor="message" className="text-[12px] font-bold text-gray-800">Your Message *</label>
                 <textarea 
                   id="message"
                   rows={6}
                   placeholder="Tell us more about your inquiry..." 
                   className="w-full bg-white px-5 py-4 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 resize-none font-light"
                 ></textarea>
               </div>

               <button type="submit" className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-medium transition-colors shadow-sm text-[14px] mt-4">
                 Send Message
               </button>
             </form>
          </div>

        </div>
      </main>
    </div>
  );
}
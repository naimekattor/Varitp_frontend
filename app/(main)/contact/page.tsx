"use client"
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';
import api from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | null, message: string | null }>({ type: null, message: null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: null });

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'warning', message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/other/api/v1/support-messages/', formData);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setStatus({ type: 'success', message: 'Message Sent! We will get back to you shortly.' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus({ type: 'error', message: 'Failed to Send. Something went wrong. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

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

            {/* Real Map Iframe */}
            <div className="w-full h-[220px] rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 relative group">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src={`https://maps.google.com/maps?q=Koledinecka%2094%2C%2010410%20Velika%20Gorica%20Croatia&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              ></iframe>
              <div className="absolute top-4 right-4 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#E86F24] shadow-sm border border-orange-50 uppercase tracking-widest">Velika Gorica</div>
              </div>
            </div>

          </div>

          {/* Right Column - Form */}
          <div className="w-full bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
             <h2 className="text-[1.35rem] font-serif font-medium text-gray-900 mb-8">Send Us a Message</h2>
             
             <form className="space-y-6" onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="name" className="text-[12px] font-bold text-gray-800">Your Name *</label>
                   <input 
                     type="text" 
                     id="name" 
                     required
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     placeholder="John Doe" 
                     className="w-full bg-white px-5 py-3.5 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 font-light" 
                   />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="email" className="text-[12px] font-bold text-gray-800">Email Address *</label>
                   <input 
                     type="email" 
                     id="email" 
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     placeholder="john@example.com" 
                     className="w-full bg-white px-5 py-3.5 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 font-light" 
                   />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="phone" className="text-[12px] font-bold text-gray-800">Phone Number</label>
                   <input 
                     type="tel" 
                     id="phone" 
                     value={formData.phone}
                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     placeholder="+1 (555) 123-4567" 
                     className="w-full bg-white px-5 py-3.5 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 font-light" 
                   />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="subject" className="text-[12px] font-bold text-gray-800">Subject *</label>
                   <input 
                     type="text" 
                     id="subject" 
                     required
                     value={formData.subject}
                     onChange={(e) => setFormData({...formData, subject: e.target.value})}
                     className="w-full bg-white px-5 py-3.5 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 font-light" 
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label htmlFor="message" className="text-[12px] font-bold text-gray-800">Your Message *</label>
                 <textarea 
                   id="message"
                   rows={6}
                   required
                   value={formData.message}
                   onChange={(e) => setFormData({...formData, message: e.target.value})}
                   placeholder="Tell us more about your inquiry..." 
                   className="w-full bg-white px-5 py-4 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-400 resize-none font-light"
                 ></textarea>
               </div>

               <button 
                 type="submit" 
                 disabled={submitting}
                 className="w-full bg-[#E86F24] hover:bg-[#d4621c] disabled:bg-gray-400 text-white py-4 rounded-xl font-medium transition-colors shadow-sm text-[14px] mt-4 flex justify-center items-center gap-2"
               >
                 {submitting ? (
                   <><Loader2 className="animate-spin" size={16} /> Sending...</>
                 ) : (
                   'Send Message'
                 )}
               </button>

               {status.message && (
                 <div className={`mt-4 p-4 rounded-xl text-sm font-medium text-center ${
                   status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 
                   status.type === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                   'bg-red-50 text-red-700 border border-red-100'
                 }`}>
                   {status.message}
                 </div>
               )}
             </form>
          </div>

        </div>
      </main>
    </div>
  );
}
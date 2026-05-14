import React from "react";

export default function PrivacyPage() {
  const lastUpdated = "May 14, 2026";

  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            Privacy <span className="text-[#E86F24]">Policy</span>
          </h1>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-orange max-w-none text-gray-600 space-y-12">
          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              At Varivo, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our delivery services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">2. Collection of Your Information</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us.</li>
              <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">3. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li>Create and manage your account.</li>
              <li>Process your orders and payments.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">4. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-6 p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="font-bold text-gray-900">Varivo Support Team</p>
              <p>Email: privacy@varivo.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 1033 West Glebe Road, Alexandria, VA 22305</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

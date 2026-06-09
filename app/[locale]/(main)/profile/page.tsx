"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import api from "@/lib/api";
import {
  Building,
  Globe,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Shield,
} from "lucide-react";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const tAuth = useTranslations("Auth");
  const { data: session, status } = useSession();
  const router = useRouter();

  // Core state management
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Profile forms state
  const [profileForm, setProfileForm] = useState({
    name: "",
    location: "",
    country: "",
    street: "",
    city: "",
    tax_id: "",
    zip_code: "",
    contact_person: "",
    contact_number: "",
    contact_email: "",
    website: "",
    description: "",
  });

  const isBusinessOwner = session?.user?.role === "business_owner";

  // Redirect if unauthorized
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Fetch business profile data if role is business_owner
  const fetchBusinessProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get("/auth/api/v1/business-profile/");
      const data = response.data?.data || response.data;

      if (data) {
        setProfileForm({
          name: data.name || "",
          location: data.location || "",
          country: data.country || "",
          street: data.street || "",
          city: data.city || "",
          tax_id: data.tax_id || "",
          zip_code: data.zip_code || "",
          contact_person: data.contact_person || "",
          contact_number: data.contact_number || "",
          contact_email: data.contact_email || "",
          website: data.website || "",
          description: data.description || "",
        });
      }
    } catch (err: any) {
      console.error("Error fetching business profile:", err);
      setError(t("fetchError"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && isBusinessOwner) {
      fetchBusinessProfile();
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status, isBusinessOwner]);

  const updateField = (field: string, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBusinessOwner) return;

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    // Basic frontend validations for mandatory fields
    const requiredFields = [
      profileForm.name,
      profileForm.country,
      profileForm.city,
      profileForm.street,
      profileForm.tax_id,
      profileForm.zip_code,
      profileForm.contact_person,
      profileForm.contact_number,
      profileForm.contact_email,
      profileForm.website,
      profileForm.description,
    ];

    if (requiredFields.some((f) => !f || f.trim() === "")) {
      setError(tAuth("requiredFields"));
      setIsSaving(false);
      return;
    }

    try {
      // Auto-compile location string if empty
      const locationString =
        profileForm.location.trim() !== ""
          ? profileForm.location
          : `${profileForm.street}, ${profileForm.zip_code} ${profileForm.city}, ${profileForm.country}`;

      const payload = {
        name: profileForm.name,
        location: locationString,
        country: profileForm.country,
        street: profileForm.street,
        city: profileForm.city,
        tax_id: profileForm.tax_id,
        zip_code: profileForm.zip_code,
        contact_person: profileForm.contact_person,
        contact_number: profileForm.contact_number,
        contact_email: profileForm.contact_email,
        website: profileForm.website,
        description: profileForm.description,
      };

      console.log("Submitting business profile PATCH payload:", JSON.stringify(payload, null, 2));
      const response = await api.patch("/auth/api/v1/business-profile/", payload);

      if (response.status === 200 || response.status === 204 || response.data?.status) {
        setSuccessMessage(t("saveSuccess"));
        // Temporarily clear success message after 4s
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      console.error("Error patching business profile:", err);
      setError(err.response?.data?.message || t("saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 w-80 bg-gray-100 rounded-md mb-12"></div>
        <div className="space-y-6">
          <div className="h-44 bg-gray-50/50 rounded-2xl border border-gray-100"></div>
          <div className="h-64 bg-gray-50/50 rounded-2xl border border-gray-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-[15px]">
          {t("subtitle")}
        </p>
      </div>

      {/* Messaging States */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2.5 animate-in fade-in duration-300">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {!isBusinessOwner ? (
        /* REGULAR USER PROFILE VIEW */
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-sm relative overflow-hidden max-w-[800px] mx-auto">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/40 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-[#E86F24]">
              <User size={26} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-gray-900">
                {`${session?.user?.first_name || ""} ${session?.user?.last_name || ""}`.trim() || session?.user?.email}
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 mt-1">
                {tAuth("roleUser")}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-gray-50 pb-6">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  {tAuth("emailAddress")}
                </span>
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  {session?.user?.email}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  {tAuth("phoneNumber")}
                </span>
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  {session?.user?.phone || "-"}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                {tAuth("address")}
              </span>
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                {session?.user?.address || "-"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* BUSINESS OWNER SETTINGS FORM */
        <form onSubmit={handleProfileSubmit} className="space-y-8 max-w-[900px] mx-auto">
          {/* Card 1: Business Profile Info */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/40 rounded-full blur-3xl -z-10"></div>
            
            <div className="flex items-center gap-3.5 mb-6 border-b border-gray-50 pb-4">
              <Building className="text-[#E86F24]" size={22} />
              <h2 className="text-lg font-serif font-bold text-gray-900">
                {t("title")} {/* Profile settings or details */}
              </h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {tAuth("companyName")} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                    <Building size={18} />
                  </div>
                  <input
                    type="text"
                    value={profileForm.name}
                    disabled={isSaving}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {tAuth("oib")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <FileText size={18} />
                    </div>
                    <input
                      type="text"
                      value={profileForm.tax_id}
                      disabled={isSaving}
                      onChange={(e) => updateField("tax_id", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {tAuth("website")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <Globe size={18} />
                    </div>
                    <input
                      type="url"
                      value={profileForm.website}
                      disabled={isSaving}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {tAuth("businessDescription")} *
                </label>
                <textarea
                  value={profileForm.description}
                  disabled={isSaving}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50 resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Card 2: Business Location */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3.5 mb-6 border-b border-gray-50 pb-4">
              <MapPin className="text-[#E86F24]" size={22} />
              <h2 className="text-lg font-serif font-bold text-gray-900">
                {tAuth("businessLocation")}
              </h2>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {tAuth("country")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      value={profileForm.country}
                      disabled={isSaving}
                      onChange={(e) => updateField("country", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {tAuth("city")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      value={profileForm.city}
                      disabled={isSaving}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {tAuth("streetAddress")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      value={profileForm.street}
                      disabled={isSaving}
                      onChange={(e) => updateField("street", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {tAuth("postalCode")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      value={profileForm.zip_code}
                      disabled={isSaving}
                      onChange={(e) => updateField("zip_code", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Contact Person */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3.5 mb-6 border-b border-gray-50 pb-4">
              <User className="text-[#E86F24]" size={22} />
              <h2 className="text-lg font-serif font-bold text-gray-900">
                {t("contactPerson")}
              </h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {tAuth("contactName")} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={profileForm.contact_person}
                    disabled={isSaving}
                    onChange={(e) => updateField("contact_person", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {tAuth("contactEmail")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      value={profileForm.contact_email}
                      disabled={isSaving}
                      onChange={(e) => updateField("contact_email", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {tAuth("contactPhone")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      value={profileForm.contact_number}
                      disabled={isSaving}
                      onChange={(e) => updateField("contact_number", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#E86F24] hover:bg-[#d4621c] text-white px-8 py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(232,111,36,0.35)] active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{t("saving")}</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>{t("saveChanges")}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

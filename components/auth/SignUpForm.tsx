import { MapPin, Phone, Lock, Eye, EyeOff, Mail, Building, Globe, FileText, User } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  form: any;
  updateField: (field: string, value: string) => void;
  showPassword: boolean;
  togglePassword: () => void;
  showConfirmPassword: boolean;
  toggleConfirmPassword: () => void;
  onSignIn: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function SignUpForm({
  form,
  updateField,
  showPassword,
  togglePassword,
  showConfirmPassword,
  toggleConfirmPassword,
  onSignIn,
  onSubmit,
  isLoading,
}: Props) {
  const t = useTranslations("Auth");
  
  const isBusiness = form.role === "business_owner";

  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
      {/* Role Toggle */}
      <div className="flex p-1.5 bg-gray-50 border border-gray-100 rounded-xl mb-6 shadow-sm">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => updateField("role", "user")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
            !isBusiness
              ? "bg-white text-[#E86F24] shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {t("roleUser")}
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => updateField("role", "business_owner")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
            isBusiness
              ? "bg-white text-[#E86F24] shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {t("roleBusiness")}
        </button>
      </div>

      <form className="w-full space-y-5" onSubmit={onSubmit}>
        {!isBusiness ? (
          /* REGULAR USER FLOW */
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {t("firstName")} *
                </label>
                <input
                  type="text"
                  placeholder={t("firstName")}
                  value={form.firstName}
                  disabled={isLoading}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                  required
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {t("lastName")} *
                </label>
                <input
                  type="text"
                  placeholder={t("lastName")}
                  value={form.lastName}
                  disabled={isLoading}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                {t("emailAddress")} *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                  <Mail size={18} strokeWidth={2} />
                </div>
                <input
                  type="email"
                  placeholder={t("enterEmailAddress")}
                  value={form.email}
                  disabled={isLoading}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                {t("address")} *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                  <MapPin size={18} strokeWidth={2} />
                </div>
                <input
                  type="text"
                  placeholder={t("enterAddress")}
                  value={form.address}
                  disabled={isLoading}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                {t("phoneNumber")} *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                  <Phone size={18} strokeWidth={2} />
                </div>
                <input
                  type="tel"
                  placeholder={t("enterPhone")}
                  value={form.phone}
                  disabled={isLoading}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 relative z-10 transition-all">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                {t("password")} *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                  <Lock size={18} strokeWidth={2} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={form.password}
                  disabled={isLoading}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-300 disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors disabled:opacity-50"
                >
                  {showPassword ? (
                    <Eye size={18} strokeWidth={1.5} />
                  ) : (
                    <EyeOff size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                {t("confirmPassword")} *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                  <Lock size={18} strokeWidth={2} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={form.confirmPassword}
                  disabled={isLoading}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-300 disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={toggleConfirmPassword}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors disabled:opacity-50"
                >
                  {showConfirmPassword ? (
                    <Eye size={18} strokeWidth={1.5} />
                  ) : (
                    <EyeOff size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* BUSINESS OWNER FLOW */
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* 1. Account Information */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-serif font-bold text-gray-900 border-b border-gray-100 pb-1.5">
                {t("welcomeBack")} {/* Account Information heading */}
              </h3>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {t("emailAddress")} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                    <Mail size={18} strokeWidth={2} />
                  </div>
                  <input
                    type="email"
                    placeholder={t("enterEmailAddress")}
                    value={form.email}
                    disabled={isLoading}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 relative z-10 transition-all">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("password")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <Lock size={18} strokeWidth={2} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={form.password}
                      disabled={isLoading}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-300 disabled:opacity-50"
                      required
                    />
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={togglePassword}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors disabled:opacity-50"
                    >
                      {showPassword ? (
                        <Eye size={18} strokeWidth={1.5} />
                      ) : (
                        <EyeOff size={18} strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("confirmPassword")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <Lock size={18} strokeWidth={2} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={form.confirmPassword}
                      disabled={isLoading}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-300 disabled:opacity-50"
                      required
                    />
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={toggleConfirmPassword}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#E86F24] focus:outline-none transition-colors disabled:opacity-50"
                    >
                      {showConfirmPassword ? (
                        <Eye size={18} strokeWidth={1.5} />
                      ) : (
                        <EyeOff size={18} strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Personal Contact Information */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-serif font-bold text-gray-900 border-b border-gray-100 pb-1.5">
                {t("personal")} {/* Personal Contact Information heading */}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("firstName")} *
                  </label>
                  <input
                    type="text"
                    placeholder={t("firstName")}
                    value={form.firstName}
                    disabled={isLoading}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("lastName")} *
                  </label>
                  <input
                    type="text"
                    placeholder={t("lastName")}
                    value={form.lastName}
                    disabled={isLoading}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {t("phoneNumber")} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                    <Phone size={18} strokeWidth={2} />
                  </div>
                  <input
                    type="tel"
                    placeholder={t("enterPhone")}
                    value={form.phone}
                    disabled={isLoading}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 3. Business Information */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-serif font-bold text-gray-900 border-b border-gray-100 pb-1.5">
                {t("businessInfo")}
              </h3>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {t("companyName")} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                    <Building size={18} strokeWidth={2} />
                  </div>
                  <input
                    type="text"
                    placeholder={t("companyPlaceholder")}
                    value={form.companyName}
                    disabled={isLoading}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("oib")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <FileText size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      placeholder={t("oibPlaceholder")}
                      value={form.oib}
                      disabled={isLoading}
                      onChange={(e) => updateField("oib", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("website")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <Globe size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="url"
                      placeholder={t("websitePlaceholder")}
                      value={form.website}
                      disabled={isLoading}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {t("businessDescription")} *
                </label>
                <div className="relative">
                  <textarea
                    placeholder={t("descriptionPlaceholder")}
                    value={form.businessDescription}
                    disabled={isLoading}
                    onChange={(e) => updateField("businessDescription", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50 resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 4. Business Location */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-serif font-bold text-gray-900 border-b border-gray-100 pb-1.5">
                {t("businessLocation")}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("country")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <MapPin size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      placeholder={t("countryPlaceholder")}
                      value={form.country}
                      disabled={isLoading}
                      onChange={(e) => updateField("country", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("city")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <MapPin size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      placeholder={t("cityPlaceholder")}
                      value={form.city}
                      disabled={isLoading}
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
                    {t("streetAddress")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <MapPin size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      placeholder={t("streetPlaceholder")}
                      value={form.streetAddress}
                      disabled={isLoading}
                      onChange={(e) => updateField("streetAddress", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("postalCode")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <MapPin size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      placeholder={t("postalPlaceholder")}
                      value={form.postalCode}
                      disabled={isLoading}
                      onChange={(e) => updateField("postalCode", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Contact Person / Manager */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-serif font-bold text-gray-900 border-b border-gray-100 pb-1.5">
                {t("contactPerson")}
              </h3>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-700 ml-1">
                  {t("contactName")} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                    <User size={18} strokeWidth={2} />
                  </div>
                  <input
                    type="text"
                    placeholder={t("contactNamePlaceholder")}
                    value={form.contactName}
                    disabled={isLoading}
                    onChange={(e) => updateField("contactName", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("contactEmail")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <Mail size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="email"
                      placeholder={t("contactEmailPlaceholder")}
                      value={form.contactEmail}
                      disabled={isLoading}
                      onChange={(e) => updateField("contactEmail", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-gray-700 ml-1">
                    {t("contactPhone")} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E86F24]">
                      <Phone size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="tel"
                      placeholder={t("contactPhonePlaceholder")}
                      value={form.contactPhone}
                      disabled={isLoading}
                      onChange={(e) => updateField("contactPhone", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-sm placeholder:text-gray-400 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 transition-all">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 rounded-xl font-bold transition-all text-[15px] shadow-[0_10px_25px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t("creatingAccount")}
              </>
            ) : (
              t("createAccount")
            )}
          </button>
        </div>
      </form>

      <p className="mt-10 text-[14px] text-gray-400 transition-all text-center pb-2">
        {t("alreadyHaveAccount")}{" "}
        <button
          type="button"
          onClick={onSignIn}
          className="text-[#E86F24] font-bold hover:underline ml-1"
        >
          {t("signIn")}
        </button>
      </p>
    </div>
  );
}

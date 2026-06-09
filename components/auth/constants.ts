export const OTP_LENGTH = 5;

export const createEmptyOtp = () =>
  Array.from({ length: OTP_LENGTH }, () => "");

export const createEmptySignInForm = () => ({
  email: "",
  password: "",
});

export const createEmptySignUpForm = () => ({
  role: "user", // "user" or "business_owner"
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phone: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  oib: "",
  website: "",
  businessDescription: "",
  country: "",
  city: "",
  streetAddress: "",
  postalCode: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
});

export const createEmptyResetPasswordForm = () => ({
  password: "",
  confirmPassword: "",
});
export const OTP_LENGTH = 5;

export const createEmptyOtp = () =>
  Array.from({ length: OTP_LENGTH }, () => "");

export const createEmptySignInForm = () => ({
  username: "",
  password: "",
});

export const createEmptySignUpForm = () => ({
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

export const createEmptyResetPasswordForm = () => ({
  password: "",
  confirmPassword: "",
});
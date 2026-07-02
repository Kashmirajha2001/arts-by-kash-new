export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isStrongPassword = (password) =>
  password.length >= 8;

export const isValidPhone = (phone) => {
  if (!phone.trim()) return true; // optional field

  return /^[6-9]\d{9}$/.test(phone);
};
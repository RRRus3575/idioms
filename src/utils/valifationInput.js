const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const isValidEmail = (value) => {
  if (!value) return false;
  return emailRegex.test(value.trim());
};

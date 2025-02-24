export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must include at least 1 lowercase letter.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least 1 uppercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must include at least 1 number.";
  }
  if (!/[!@#$%^&*()_\-+=<>?{}[\]~]/.test(password)) {
    return "Password must include at least 1 special character.";
  }
  return false;
};

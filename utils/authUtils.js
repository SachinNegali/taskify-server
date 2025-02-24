import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (enteredPassword, hashedPassword) => {
  const whats = await bcrypt.compare(enteredPassword, hashedPassword);
  console.log(whats);

  return await bcrypt.compare(enteredPassword, hashedPassword);
};

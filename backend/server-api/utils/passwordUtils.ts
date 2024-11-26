import bcrypt from "bcryptjs";

/**
 * Hash the plain text password.
 * @param password - Plain text password to hash.
 * @returns Hashed password string.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate salt
  return bcrypt.hash(password, salt); // Generate hash
};

/**
 * Compare the plain text password with the hashed password.
 * @param plainPassword - Plain text password.
 * @param hashedPassword - Hashed password from the database.
 * @returns True if the passwords match, false otherwise.
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword); // Compare
};

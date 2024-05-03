/**
 * The Email type is used to signal to developers that the function expects an email-formatted string, but the actual validation logic still relies on JavaScript runtime checks, such as regex testing, to enforce the email pattern.
 */
export type EmailT = string;

export function setEmail(email: EmailT) {
  // Here you would use a regex to validate the email format at runtime
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
}

// Usage
// try {
//   setEmail("test@example.com"); // Valid usage
//   setEmail("not-an-email"); // This will throw an error at runtime
// } catch (error) {
//   console.error(error);
// }

export function encodeCredentialsToBase64(username: string, password: string): string {
    // Combine username and password with a colon
    const combined = `${username}:${password}`;
    // Encode the combined string to Base64
    const base64Encoded = Buffer.from(combined).toString('base64');
    return base64Encoded;
}

// Example usage
// const username = "myUsername";
// const password = "myPassword";
// const encodedCredentials = encodeCredentials(username, password);

// console.log(encodedCredentials); // Logs the Base64-encoded credentials

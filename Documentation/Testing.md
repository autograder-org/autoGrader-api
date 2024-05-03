
# Creating a user

1. As a user, I want to create an account by providing the following information.
Email Address
Password
First Name
Last Name

```shell
curl --location --request POST 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "ajay@northeastern.edu",
  "password": "ajay-pass-123",
  "firstName": "Ajay",
  "lastName": "Balasubramani"
}'
```
("./../images/Post-%20create%20user.png")

2. account_created field for the user should be set to the current time when user creation is successful.

Failing - this field only has the date not the time in the return value - check above resposne

3. Users should not be able to set values for account_created and account_updated. Any value provided for these fields must be ignored.

Failing partially - 400 error is being thrown with a payload 

```shell
    at basicAuthMiddleware (file:///Users/dhruvparthasarathy/Documents/northeastern/cloud/cloud-assignments/webapp-fork/[eval1]:1074:5) {
  fields: {
    'userDetails.dateCreated': {
      message: '"dateCreated" is an excess property and therefore is not allowed',
      value: 'dateCreated'
    }
  },
  status: 400
}
```

4. Invalid json object passed is faling with a 500 internal server error

Fixed

5. 400 bad request when email already exists

[](./images/400%20bad%20request%20when%20email%20already%20exists.png)


6. As a user, I expect my password to be stored securely using the BCrypt password hashing scheme with salt.

[](./images//password%20saved%20in%20db.png)

7. As a user, I want to update my account information. I should only be allowed to update the following fields.
First Name
Last Name
Password

Passed

8. As a user, I want to get my account information. Response payload should return all fields for the user except for password.

Fixed 

```shell
curl --location --request GET 'http://localhost:3000/user' \
--header 'Authorization: Basic YWpheS12aXNoYWxAbm9ydGhlYXN0ZXJuLmVkdTphamF5LXZpc2hhbC1wYXNzLTQ1Ng=='
```

```json
{
    "id": "27dc1af2-7866-4f1e-857a-91aad6115fd1",
    "dateCreated": "2024-02-07",
    "lastModified": "2024-02-07",
    "email": "ajay-vishal@northeastern.edu",
    "firstName": "Ajay",
    "lastName": "Bala"
}
```

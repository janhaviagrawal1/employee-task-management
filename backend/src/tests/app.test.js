jest.setTimeout(30000);

const request = require("supertest");
const app = require("../app");

const testUser = {
  name: "Test User",
  email: `test${Date.now()}@gmail.com`,
  password: "Password123",
  role: "Employee",
};

let token = "";

describe("Root API", () => {
  test("GET / should return success message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });
});

describe("Auth API", () => {
  test("REGISTER user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    console.log("REGISTER RESPONSE:");
    console.log(response.body);

    expect([200, 201]).toContain(
      response.statusCode
    );
  });

  test("LOGIN user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    console.log("LOGIN RESPONSE:");
    console.log(response.body);

    expect(response.statusCode).toBe(200);

    token = response.body.token;
  });

  test("LOGIN wrong password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: "WrongPassword",
      });

    console.log("WRONG PASSWORD RESPONSE:");
    console.log(response.body);

    expect(response.statusCode).toBe(401);
  });

  test("LOGOUT user", async () => {
    const response = await request(app)
      .post("/api/auth/logout")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    console.log("LOGOUT RESPONSE:");
    console.log(response.body);

    expect(response.statusCode).toBe(200);
  });
});
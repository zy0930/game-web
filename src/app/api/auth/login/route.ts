import { NextResponse } from "next/server";

// DEV ONLY: Hardcoded credentials for testing
const DUMMY_CREDENTIALS = {
  email: "admin@test.com",
  password: "password123",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // DEV ONLY: Check against dummy credentials
    if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
      const user = {
        id: "1",
        email,
        name: "Admin User",
        createdAt: new Date(),
      };

      return NextResponse.json({ user, token: "mock-jwt-token" });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

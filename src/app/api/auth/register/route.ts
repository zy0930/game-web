import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // TODO: Replace with actual registration logic
    // This is a placeholder for demonstration purposes
    if (name && email && password) {
      // Simulate successful registration
      const user = {
        id: "1",
        email,
        name,
        createdAt: new Date(),
      };

      return NextResponse.json({ user, token: "mock-jwt-token" });
    }

    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

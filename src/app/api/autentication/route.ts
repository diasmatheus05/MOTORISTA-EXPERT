import axios from "axios";
import FormData from "form-data";
import { NextResponse } from "next/server";

interface ExchangeResponse {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token: string;
  scope: "offline_access";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")!;

  const form = new FormData();
  form.append("client_secret", "-qPAL3618C32LLGX-_aUUlNav2sS9Zpmqen6zXy8");
  form.append("client_id", "JlpY-80AUWOOySeCC4QoGv4iRFQ-hOVy");
  form.append("grant_type", "authorization_code");
  form.append("redirect_uri", "http://localhost:3000/dashboard");
  form.append("code", code);

  const response = await axios.post<ExchangeResponse>(
    "https://login.uber.com/oauth/v2/token",
    form
  );
  // @ts-ignore
  // cookies().set("me-token", response.data.access_token);

  return NextResponse.json({ data: response.data });
}

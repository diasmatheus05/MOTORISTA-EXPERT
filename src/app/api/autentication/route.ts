import axios from "axios";
// import FormData from "form-data";
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
  // form.append("redirect_uri", "https://localhost:3000/api/autentication");
  form.append(
    "redirect_uri",
    "https://motorista-expert.vercel.app/api/autentication"
  );
  form.append("code", code);

  const { data } = await axios.post<ExchangeResponse>(
    "https://login.uber.com/oauth/v2/token",
    form
  );

  const { access_token, expires_in } = data;
  const redirectURL = new URL("/dashboard", request.url);

  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=${access_token}; Path=/; max-age=${expires_in};`,
    },
  });
}

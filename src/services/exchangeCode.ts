import axios from "axios";

interface ExchangeResponse {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token: string;
  scope: "offline_access";
}

export async function exchangeCode(code: string) {
  const response = await axios.get<ExchangeResponse>(
    "http://localhost:3000/api/autentication?code=" + code
  );
  return response.data;
}

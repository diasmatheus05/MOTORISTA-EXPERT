import Image from "next/image";

import { LinkButton } from "@/components";

import UberLogo from "public/Uber.png";

const CLIENT_ID = "JlpY-80AUWOOySeCC4QoGv4iRFQ-hOVy";
const RESPONSE_TYPE = "code";
const SCOPE = "partner.accounts,partner.payments,partner.trips";
const REDIRECT_URI = "https://localhost:3000/dashboard";

export default function Home() {
  const login_url =
    "https://login.uber.com/oauth/v2/authorize" +
    "?client_id=" +
    CLIENT_ID +
    "&response_type=" +
    RESPONSE_TYPE +
    "&scope" +
    SCOPE +
    "&redirect_uri" +
    REDIRECT_URI;

  return (
    <div className="h-full p-4 flex items-center justify-center">
      <div className="px-10 py-14 flex items-center justify-center flex-col gap-8 border-2 border-white rounded-2xl">
        <Image
          src={UberLogo}
          alt="Logo da empresa Uber"
          width={64}
          height={64}
        />
        <h3 className="font-bold text-2xl">Faça login com sua conta da Uber</h3>
        <LinkButton to={login_url}>LOGIN</LinkButton>
      </div>
    </div>
  );
}

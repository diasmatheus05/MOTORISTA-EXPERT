import Image from "next/image";

import { LinkButton } from "@/components";

import UberLogo from "public/Uber.png";

export default function Home() {
  const handleClickLogin = () => {};

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
        <LinkButton
          // onClick={handleClickLogin}
          to="/dashboard"
        >
          LOGIN
        </LinkButton>
      </div>
    </div>
  );
}

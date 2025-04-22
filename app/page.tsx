import Image from "next/image";
import Logo from "../public/vercel.svg";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col justify-center gap-[32px] row-start-2 items-center sm:items-start">
        <Image src={Logo} width={200} height={200} alt="" />
        <h2 className="text-4xl font-bold text-white text-center border-amber-200 border-2 rounded-md p-2">
          Rupia AI
        </h2>
      </main>
    </div>
  );
}

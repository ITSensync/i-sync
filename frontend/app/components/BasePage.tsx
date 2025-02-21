import Image from "next/image";
import Footer from "./Footer";

export default function BasePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen"> {/* Wrapper utama */}
      {/* Konten utama */}
      <div className="flex flex-col flex-grow items-center md:pt-6 pt-3">
        <div className="lg:text-4xl md:text-2xl text-center font-lexend_deca font-extrabold mt-2 flex flex-row justify-center items-center gap-3">
          <Image
            src={"/sensync-logo.png"}
            height={40}
            width={40}
            alt="Logo Sensync"
            className="w-7 sm:w-12"
          />
          <p>Sensync Inventory</p>
        </div>
        <div className="w-full mt-6 md:mt-10 flex justify-center">{children}</div>
      </div>

      {/* Footer tetap di bawah */}
      <Footer />
    </div>
  );
}

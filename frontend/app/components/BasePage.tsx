import Image from "next/image";

export default function BasePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col w-fit items-center py-6">
        <div className="lg:text-4xl md:text-2xl text-center font-lexend_deca font-extrabold mt-4 flex flex-row justify-center items-center gap-3">
          <Image
            src={"/sensync-logo.png"}
            height={40}
            width={40}
            alt="Logo Sensync"
          />
          <p>Sensync Inventory System</p>
        </div>
        <div className="w-full mt-12 flex justify-center">{children}</div>
      </div>
    </div>
  );
}

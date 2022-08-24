import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-center max-w-[1620px] w-full mx-auto py-20 px-8 z-50 relative font-sans">
      <div>
        <div className="flex items-center gap-x-4">
          <div className="h-[60px] w-[60px] relative mx-auto">
            <Image
              src="/pepe.png"
              alt="Pepe masta"
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
          <h1 className="font-extrabold text-2xl md:text-4xl text-cyan-900">
            La Pepe scammer exchange
          </h1>
        </div>

        <div className="mt-4 md:mt-0 md:text-right">
          <p className="text-gray-400">We love stonk and make monies</p>
        </div>
      </div>
    </nav>
  );
};

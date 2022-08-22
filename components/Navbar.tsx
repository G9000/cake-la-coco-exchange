import * as React from "react";
import Image from "next/image";

export const Navbar = () => {
  const [date, setDate] = React.useState(new Date());
  /// Quick fix for Hydration issue https://github.com/vercel/next.js/discussions/35773
  const [isSSR, setIsSSR] = React.useState(true);
  let dateConfig = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  function formattedDate() {
    return new Date(date).toLocaleDateString("en-US", dateConfig);
  }

  React.useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    setIsSSR(false);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="flex items-center justify-center max-w-[1620px] w-full mx-auto py-20 px-8 z-50 relative">
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
          <h1 className="font-extrabold text-transparent text-2xl md:text-4xl bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-400">
            La coco scammer exchange
          </h1>
        </div>

        <div className="mt-4 md:mt-0 md:text-right">
          <p className="text-gray-400">We love stonk and make monies</p>
          {/* <p className="text-gray-400 text-xs">
            Trusted online crypto exchange. Powered by{" "}
            <a
              href="https://www.coingecko.com/"
              target="_blank"
              rel="noreferrer"
            >
              Coingecko
            </a>
            . {!isSSR && formattedDate() + " " + date.toLocaleTimeString()}
          </p> */}
        </div>
      </div>
    </nav>
  );
};

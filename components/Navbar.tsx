import * as React from "react";

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
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="font-extrabold text-transparent text-3xl md:text-4xl bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-400 leading-relaxed">
          La Coco Exchange
        </h1>
        <div className="text-gray-400 font-semibold">
          {!isSSR && formattedDate() + " " + date.toLocaleTimeString()}
        </div>
      </div>
    </nav>
  );
};

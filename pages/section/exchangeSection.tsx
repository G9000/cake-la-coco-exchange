import { Input } from "@/components/Input";
import type { CoinMarket } from "@/types/index";
import * as React from "react";
import BigNumber from "bignumber.js";
import { SwitchVerticalIcon } from "@heroicons/react/solid";
import Image from "next/image";

interface PropsTypes {
  coinLists?: CoinMarket[];
}

interface InputStateType {
  type: string;
  amount: number | undefined;
}

enum InputTypes {
  Swap = "swap",
  Want = "want",
}

const ExchangeSection = ({ coinLists = [] }: PropsTypes) => {
  /// Quick fix for Hydration issue https://github.com/vercel/next.js/discussions/35773
  const [isSSR, setIsSSR] = React.useState(true);
  const [swapToken, setSwapToken] = React.useState(coinLists[0]);
  const [buyToken, setBuyToken] = React.useState(coinLists[6]);
  const [swapAmount, setSwapAmount] = React.useState(new BigNumber(""));
  const [buyAmount, setBuyAmount] = React.useState(new BigNumber(""));
  const [inputSelected, setInputSelected] = React.useState<InputTypes>();
  const [exchangeRate, setExchangeRate] = React.useState<BigNumber | string>(
    new BigNumber("")
  );
  const [rate, setRate] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const currencyRate = new BigNumber(rate);

  // Calculate exchange price
  function calculateExcahnge(
    swapPrice: number,
    wantPrice: number,
    { type, amount = 0 }: InputStateType
  ) {
    if (
      typeof swapPrice !== "number" ||
      typeof wantPrice !== "number" ||
      typeof amount !== "number"
    ) {
      throw new Error(`Make sure your input type is correct`);
    }
    const exchange =
      type === InputTypes.Swap ? swapPrice / wantPrice : wantPrice / swapPrice;
    setRate(exchange);

    const totalExchangeValue = amount * exchange;

    return totalExchangeValue;
  }

  React.useEffect(() => {
    const exchangeValue = calculateExcahnge(
      swapToken.current_price,
      buyToken.current_price,
      inputSelected === InputTypes.Swap
        ? {
            type: InputTypes.Swap,
            amount: new BigNumber(swapAmount).toNumber(),
          }
        : {
            type: InputTypes.Want,
            amount: new BigNumber(buyAmount).toNumber(),
          }
    );

    const rate = new BigNumber(exchangeValue);
    setExchangeRate(
      rate.isLessThanOrEqualTo(0.1) && rate.isGreaterThan(0)
        ? rate.toFixed(8)
        : rate.toFixed(2)
    );
  }, [inputSelected, swapAmount, swapToken, buyAmount, buyToken]);

  function handleInputSwap() {
    let temp = buyToken;
    setBuyToken(swapToken);
    setInputSelected(
      inputSelected === InputTypes.Swap ? InputTypes.Swap : InputTypes.Want
    );

    setSwapToken(temp);
  }

  React.useEffect(() => {
    if (
      inputSelected === InputTypes.Want &&
      new BigNumber(swapAmount).isGreaterThan(0)
    ) {
      setSwapAmount(new BigNumber(""));
    } else if (
      inputSelected === InputTypes.Swap &&
      new BigNumber(buyAmount).isGreaterThan(0)
    ) {
      setBuyAmount(new BigNumber(""));
    }
  }, [inputSelected, swapAmount, buyAmount]);

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
    <div className="relative justify-center w-full max-w-[375px] mx-auto z-50">
      <div className=" bg-gray-100 rounded-2xl">
        <Input
          title={`${swapToken.symbol} to swap`}
          tokenImg={swapToken.image}
          onChange={(e) => {
            setInputSelected(InputTypes.Swap);
            setSwapAmount(e.target.value);
          }}
          value={
            inputSelected === InputTypes.Want
              ? new BigNumber(exchangeRate).toFixed(2)
              : swapAmount
          }
          dropdownData={{
            tokenData: swapToken,
            onTokenChange: setSwapToken,
            lists: coinLists,
            activeList: buyToken,
          }}
          containerStyle="rounded-t-2xl border-b border-cyan-400 border-opacity-60"
          testID="swap"
        />
        <div
          className="absolute inset-x-1/2 -ml-4 z-40"
          style={{
            top: "4rem",
            bottom: "4rem",
          }}
        >
          <SwitchVerticalIcon
            onClick={handleInputSwap}
            className="h-10 w-10 text-cyan-600 p-2 rounded-full bg-sky-200 bg-opacity-60 cursor-pointer"
            aria-hidden="true"
            data-testid="switch-token"
          />
        </div>

        <Input
          title={`${buyToken.symbol} to buy`}
          tokenImg={buyToken.image}
          onChange={(e) => {
            setInputSelected(InputTypes.Want);
            setBuyAmount(e.target.value);
          }}
          value={
            inputSelected === InputTypes.Swap
              ? new BigNumber(exchangeRate).toFixed(2)
              : buyAmount
          }
          dropdownData={{
            tokenData: buyToken,
            onTokenChange: setBuyToken,
            lists: coinLists,
            activeList: swapToken,
          }}
          containerStyle="rounded-b-2xl"
          tokenBgStyle="rounded-b-2xl"
          testID="buy"
        />
      </div>
      <div className="mt-10 border border-cyan-400 border-opacity-40 px-4 py-6 bg-gray-100 rounded-2xl">
        <div className="flex items-center gap-x-4">
          <div className="text-cyan-600 text-sm">Current exchange rate</div>
          <div className="w-fit flex">
            <div className="bg-gray-200 p-1 rounded-full flex items-center text-center absolute">
              <Image
                src={swapToken.image}
                alt={`${swapToken.id} logo`}
                width={19}
                height={19}
                data-testid="swap-token"
              />
            </div>

            <div className="bg-gray-200 p-1 rounded-full flex items-center text-center ml-5 z-40">
              <Image
                src={buyToken.image}
                alt={`${buyToken.id} logo`}
                width={19}
                height={19}
                data-testid="buy-token"
              />
            </div>
          </div>
        </div>

        <div
          className="text-cyan-600 text-3xl font-bold mt-2 font-mono"
          data-testid="exchange-rate"
        >
          {inputSelected &&
          (new BigNumber(swapAmount).isGreaterThan(0) ||
            new BigNumber(buyAmount).isGreaterThan(0))
            ? currencyRate.isLessThanOrEqualTo(0.1) &&
              currencyRate.isGreaterThan(0)
              ? currencyRate.toFixed(8)
              : currencyRate.toFixed(2)
            : "N/A"}
        </div>
        <p className="text-cyan-600 text-opacity-60 text-xs mt-14">
          Trusted online crypto exchange. For sure will make your bank account
          <strong> STONK</strong>. Powered by{" "}
          <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">
            Coingecko
          </a>
          . {!isSSR && formattedDate() + " " + date.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ExchangeSection
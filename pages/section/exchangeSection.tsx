import { Input } from "@/components/Input";
import type { CoinMarket } from "@/types/index";
import * as React from "react";
import BigNumber from "bignumber.js";

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

export const ExchangeSection = ({ coinLists = [] }: PropsTypes) => {
  const [swapToken, setSwapToken] = React.useState(coinLists[0]);
  const [wantToken, setWantToken] = React.useState(coinLists[6]);
  const [swapAmount, setSwapAmount] = React.useState(new BigNumber(""));
  const [wantAmount, setWantAmount] = React.useState(new BigNumber(""));
  const [inputSelected, setInputSelected] = React.useState<InputTypes>();
  const [exchangeRate, setExchangeRate] = React.useState<BigNumber | string>(
    new BigNumber("")
  );
  const [rate, setRate] = React.useState(0);

  const currencyRate = new BigNumber(rate);

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
      throw new Error(
        `Either swapPrice or wantPrice or Amount is not a number`
      );
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
      wantToken.current_price,
      inputSelected === InputTypes.Swap
        ? {
            type: InputTypes.Swap,
            amount: new BigNumber(swapAmount).toNumber(),
          }
        : {
            type: InputTypes.Want,
            amount: new BigNumber(wantAmount).toNumber(),
          }
    );

    const rate = new BigNumber(exchangeValue);
    setExchangeRate(
      rate.isLessThanOrEqualTo(0.1) && rate.isGreaterThan(0)
        ? rate.toFixed(8)
        : rate.toFixed(2)
    );
  }, [inputSelected, swapAmount, swapToken, wantAmount, wantToken]);

  function handleInputSwap() {
    let temp = wantToken;
    setWantToken(swapToken);
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
      new BigNumber(wantAmount).isGreaterThan(0)
    ) {
      setWantAmount(new BigNumber(""));
    }
  }, [inputSelected, swapAmount, wantAmount]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-y-6">
        <Input
          title={`${swapToken.symbol} to swap`}
          tokenImg={swapToken.image}
          onChange={(e) => {
            setInputSelected(InputTypes.Swap);
            setSwapAmount(e.target.value);
          }}
          value={inputSelected === InputTypes.Want ? exchangeRate : swapAmount}
          dropdownData={{
            tokenData: swapToken,
            onTokenChange: setSwapToken,
            lists: coinLists,
            activeList: wantToken,
          }}
          testID="swap"
        />
        <Input
          title={`${wantToken.symbol} to buy`}
          tokenImg={wantToken.image}
          onChange={(e) => {
            setInputSelected(InputTypes.Want);
            setWantAmount(e.target.value);
          }}
          value={inputSelected === InputTypes.Swap ? exchangeRate : wantAmount}
          dropdownData={{
            tokenData: wantToken,
            onTokenChange: setWantToken,
            lists: coinLists,
            activeList: swapToken,
          }}
          testID="want"
        />
      </div>
      <div className="mt-10 border border-cyan-400 border-opacity-20 px-4 py-6">
        <div>
          <div className="flex items-center gap-x-4 text-cyan-400 text-sm">
            <div>Current exchange rate</div>
            <div className="font-bold uppercase py-1 px-2 bg-cyan-900">
              {swapToken.symbol}-{wantToken.symbol}
            </div>
          </div>

          <div className="text-cyan-400 text-2xl font-bold">
            {inputSelected &&
            (new BigNumber(swapAmount).isGreaterThan(0) ||
              new BigNumber(wantAmount).isGreaterThan(0))
              ? currencyRate.isLessThanOrEqualTo(0.1) &&
                currencyRate.isGreaterThan(0)
                ? currencyRate.toFixed(8)
                : currencyRate.toFixed(2)
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

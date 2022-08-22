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
  const [inputSelected, setInputSelected] = React.useState<InputTypes>(
    InputTypes.Swap
  );
  const [exchangeRate, setExchangeRate] = React.useState(new BigNumber(""));
  const [rate, setRate] = React.useState(0);

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
    const exchangeValue = new BigNumber(
      calculateExcahnge(
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
      )
    ).toFixed(2);

    setExchangeRate(new BigNumber(exchangeValue));
  }, [inputSelected, swapAmount, swapToken, wantAmount, wantToken]);

  function handleInputSwap() {
    let temp = wantToken;
    setWantToken(swapToken);
    setInputSelected(
      inputSelected === InputTypes.Swap ? InputTypes.Swap : InputTypes.Want
    );

    setSwapToken(temp);
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-y-6">
        <Input
          title={`${swapToken.symbol} to swap`}
          onChange={(e) => {
            setInputSelected(InputTypes.Swap);
            setSwapAmount(e.target.value);
          }}
          value={inputSelected === InputTypes.Want ? exchangeRate : swapAmount}
          testID="swap"
        />
        <Input
          title={`${wantToken.symbol} to buy`}
          onChange={(e) => {
            setInputSelected(InputTypes.Want);
            setWantAmount(e.target.value);
          }}
          value={inputSelected === InputTypes.Swap ? exchangeRate : wantAmount}
          testID="want"
        />
      </div>
      <div className="mt-10">
        <div>
          <div className="text-cyan-400 text-sm">Current exchange rate</div>
          <div className="text-cyan-400 text-2xl font-semibold">
            {new BigNumber(rate).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

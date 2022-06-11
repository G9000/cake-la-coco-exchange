import * as React from "react";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { Dropdown } from "./Dropdown";
import { SelectorIcon } from "@heroicons/react/solid";
import type { CoinMarket } from "@/types/index";

enum InputType {
  Swap = "swap",
  Want = "want",
}

interface PropsType {
  coinLists?: CoinMarket[];
}

function calculateExcahnge(
  swapToken: number,
  wantToken: number,
  { type = "swap", amount = 1 }
) {
  if (
    typeof swapToken !== "number" ||
    typeof wantToken !== "number" ||
    typeof amount !== "number"
  ) {
    throw new Error(
      `${swapToken} or ${wantToken} or ${amount} must be a number`
    );
  }

  const exchange =
    type === "swap" ? swapToken / wantToken : wantToken / swapToken;

  const totalExchangeValue = amount * exchange;

  return totalExchangeValue;
}

export function Exchange({ coinLists = [] }: PropsType) {
  const [swapToken, setSwapToken] = React.useState(coinLists[0]);
  const [wantToken, setWantToken] = React.useState(coinLists[1]);
  const [swapAmount, setSwapAmount] = React.useState(1);
  const [wantAmount, setWantAmount] = React.useState(0);
  const [inputSelected, setInputSelected] = React.useState<InputType>(
    InputType.Swap
  );
  const [exchangeRate, setExchangeRate] = React.useState(0);

  React.useEffect(() => {
    const newValue = calculateExcahnge(
      swapToken.current_price,
      wantToken.current_price,
      inputSelected === InputType.Want
        ? { type: InputType.Want, amount: wantAmount }
        : { type: InputType.Swap, amount: swapAmount }
    );
    setExchangeRate(newValue);
  }, [swapAmount, wantAmount, wantToken, swapToken, inputSelected]);

  function handleInputSwap() {
    let temp = wantToken;
    setWantToken(swapToken);
    setInputSelected(
      inputSelected === InputType.Swap ? InputType.Swap : InputType.Want
    );

    setSwapToken(temp);
  }

  function handleInputChange({
    type,
    amount,
  }: {
    type: InputType;
    amount: number;
  }) {
    if (typeof amount !== "number") {
      throw new Error(`${amount} must be a number`);
    }
    type === InputType.Swap ? setSwapAmount(amount) : setWantAmount(amount);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center h-full mx-auto relative z-40">
      <div className="flex rounded-t-3xl border-2 bg-gray-50">
        <div className="flex flex-col pl-6 py-4">
          <label className="text-sm font-bold uppercase text-gray-400">
            To Swap
          </label>
          <input
            onChange={(e) => {
              setInputSelected(InputType.Swap);
              handleInputChange({
                type: InputType.Swap,
                amount: Number(e.target.value),
              });
            }}
            pattern="[0-9]*"
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
            type="number"
            value={
              inputSelected === InputType.Want
                ? new BigNumber(exchangeRate).toFixed()
                : swapAmount
            }
            className="focus:outline-none bg-transparent text-xl md:text-4xl font-bold w-full h-full"
            data-cy="swap-input"
          />
        </div>

        <Dropdown
          data={swapToken}
          onChange={setSwapToken}
          lists={coinLists}
          activeList={wantToken}
          buttonTestId="swap-dropdown"
        />
      </div>

      <button
        className={clsx(
          "rounded-full z-40 rotate-45 absolute flex border-4 gap-x-4 items-center",
          "hover:border-cyan-400 hover:ring-4 hover:ring-cyan-400 hover:ring-opacity-20 hover:bg-gray-600 hover:text-gray-100",
          "text-gray-600 font-bold p-2 md:p-4 bg-gray-100"
        )}
        onClick={handleInputSwap}
        data-cy="swap-button"
      >
        <SelectorIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="flex rounded-b-3xl border-2 border-t-0 bg-gray-50">
        <div className="flex flex-col pl-6 py-4">
          <label className="text-sm font-bold uppercase text-gray-400">
            To Buy
          </label>
          <input
            onChange={(e) => {
              setInputSelected(InputType.Want);
              handleInputChange({
                type: InputType.Want,
                amount: Number(e.target.value),
              });
            }}
            pattern="[0-9]*"
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
            type="number"
            value={
              inputSelected === InputType.Swap
                ? new BigNumber(exchangeRate).toFixed()
                : wantAmount
            }
            className="focus:outline-none bg-transparent text-xl md:text-4xl font-bold w-full h-full"
            data-cy="want-input"
          />
        </div>

        <Dropdown
          data={wantToken}
          onChange={setWantToken}
          lists={coinLists}
          activeList={swapToken}
          buttonTestId="want-dropdown"
        />
      </div>
    </div>
  );
}

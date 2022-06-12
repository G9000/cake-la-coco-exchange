import * as React from "react";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { Dropdown } from "./Dropdown";
import { SelectorIcon } from "@heroicons/react/solid";
import type { CoinMarket } from "@/types/index";

enum InputTypes {
  Swap = "swap",
  Want = "want",
}

interface PropsTypes {
  coinLists?: CoinMarket[];
}

interface InputStateType {
  type: string;
  amount: number | undefined;
}

// Calculate exchange rate
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
    throw new Error(`Either swapPrice or wantPrice or Amount is not a number`);
  }

  const exchange =
    type === InputTypes.Swap ? swapPrice / wantPrice : wantPrice / swapPrice;

  const totalExchangeValue = amount * exchange;

  return totalExchangeValue;
}

export function Exchange({ coinLists = [] }: PropsTypes) {
  const [swapToken, setSwapToken] = React.useState(coinLists[0]);
  const [wantToken, setWantToken] = React.useState(coinLists[6]);
  const [swapAmount, setSwapAmount] = React.useState("");
  const [wantAmount, setWantAmount] = React.useState("");
  const [inputSelected, setInputSelected] = React.useState<InputTypes>();
  const [exchangeRate, setExchangeRate] = React.useState<string | undefined>();

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
    ).toFixed();

    setExchangeRate(exchangeValue);
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
    <div className="w-full flex flex-col items-center justify-center h-full mx-auto relative z-40">
      <div className="flex rounded-t-3xl border-2 bg-gray-50">
        <div className="flex flex-col pl-6 py-4">
          <label className="text-sm font-bold uppercase text-gray-400">
            To Swap
          </label>
          <input
            type="number"
            onChange={(e) => {
              setInputSelected(InputTypes.Swap);
              setSwapAmount(e.target.value);
            }}
            pattern="[0-9]*"
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
            value={
              inputSelected === InputTypes.Want ? exchangeRate : swapAmount
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
          "hover:border-emerald-400 hover:ring-4 hover:ring-emerald-400 hover:ring-opacity-20 hover:bg-cyan-900 hover:text-gray-100",
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
            type="number"
            onChange={(e) => {
              setInputSelected(InputTypes.Want);
              setWantAmount(e.target.value);
            }}
            pattern="[0-9]*"
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
            value={
              inputSelected === InputTypes.Swap ? exchangeRate : wantAmount
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

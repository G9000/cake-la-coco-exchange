import BigNumber from "bignumber.js";
import * as React from "react";
import { Dropdown } from "@/components/Dropdown";
import type { CoinMarket } from "@/types/index";

interface DropdownProps {
  tokenData: CoinMarket;
  lists: CoinMarket[];
  activeList: Pick<CoinMarket, "id">;
  onTokenChange: (value: CoinMarket) => void;
}
interface InputProps {
  title: string;
  tokenImg: string;
  testID: string;
  onChange: (e: any) => void;
  value: BigNumber | string;
  dropdownData: DropdownProps;
}

export const Input = ({
  title,
  testID,
  onChange,
  value,
  tokenImg,
  dropdownData,
}: InputProps) => {
  return (
    <div className="relative flex items-center">
      <div
        className="relative flex overflow-hidden bg-contain border-b border-cyan-400 border-opacity-60 items-center justify-between h-[60px] bg-cyan-400 bg-opacity-5 px-6"
        data-testid={testID}
      >
        <div
          className="absolute bg-no-repeat bg-contain h-full w-full -ml-6"
          style={{
            backgroundImage: `url(${tokenImg || ""})`,
            backgroundPosition: "left -10px top 20px",
            opacity: 0.25,
          }}
        />

        <label className="text-xs text-cyan-400 font-sans w-4/12 uppercase">
          {title}
        </label>
        <input
          type="number"
          onChange={onChange}
          pattern="[0-9]*"
          onKeyDown={(evt) =>
            ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
          }
          value={
            isNaN(new BigNumber(value).toNumber())
              ? ""
              : new BigNumber(value).toNumber()
          }
          className="z-50 w-full focus:outline-none bg-transparent text-2xl font-bold text-cyan-200 font-mono ml-2"
          data-testid={`${testID}-input`}
        />
      </div>
      <Dropdown
        data={dropdownData.tokenData}
        onChange={dropdownData.onTokenChange}
        lists={dropdownData.lists}
        activeList={dropdownData.activeList}
        buttonTestId="swap-dropdown"
        containerStyle="absolute h-6 w-full right-0 z-50"
      />
    </div>
  );
};

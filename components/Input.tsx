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
  containerStyle?: string;
  tokenBgStyle?: string;
}

export const Input = ({
  title,
  testID,
  onChange,
  value,
  tokenImg,
  dropdownData,
  containerStyle,
  tokenBgStyle,
}: InputProps) => {
  return (
    <div className="relative flex items-center">
      <div
        className={`flex overflow-hidden bg-contain items-center justify-between h-[85px] bg-cyan-400 bg-opacity-10 px-6 ${containerStyle}`}
        data-testid={testID}
        style={{
          zIndex: 25,
        }}
      >
        <div
          className={`absolute bg-no-repeat bg-contain h-full w-full -ml-6 ${tokenBgStyle}`}
          style={{
            backgroundImage: `url(${tokenImg || ""})`,
            backgroundPosition: "right -10px top 20px",
            opacity: 0.25,
          }}
        />

        <div className="z-50 w-10/12">
          <label
            className="text-xs text-cyan-600 font-sans uppercase font-bold"
            data-testid={`${testID}-label`}
          >
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
                : new BigNumber(value).toFixed()
            }
            className="w-full focus:outline-none bg-transparent text-2xl font-bold text-cyan-600 font-mono"
            data-testid={`${testID}-input`}
          />
        </div>
      </div>

      <Dropdown
        data={dropdownData.tokenData}
        onChange={dropdownData.onTokenChange}
        lists={dropdownData.lists}
        activeList={dropdownData.activeList}
        containerStyle="absolute h-full w-full right-0 top-9"
        testID={`${testID}-dropdown`}
      />
    </div>
  );
};

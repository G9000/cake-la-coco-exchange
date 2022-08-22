import BigNumber from "bignumber.js";

interface InputProps {
  title: string;
  testID: string;
  onChange: (e: any) => void;
  value: BigNumber;
}

export const Input = ({ title, testID, onChange, value }: InputProps) => {
  return (
    <div
      className="flex border-b border-cyan-400 border-opacity-60 items-center h-[60px] bg-cyan-400 bg-opacity-5 px-6"
      data-testid={testID}
    >
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
        className="w-full focus:outline-none bg-transparent text-2xl font-bold text-cyan-200 font-mono ml-2"
        data-testid={`${testID}-input`}
      />
    </div>
  );
};

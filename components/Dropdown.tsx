import * as React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowCircleDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import type { CoinMarket } from "@/types/index";

export function Dropdown({
  data,
  onChange,
  lists,
  activeList,
  buttonTestId,
  containerStyle,
}: {
  data: CoinMarket;
  lists: CoinMarket[];
  activeList: Pick<CoinMarket, "id">;
  onChange: (value: CoinMarket) => void;
  buttonTestId?: string;
  containerStyle?: string;
}) {
  return (
    <Listbox
      value={data}
      onChange={(value: CoinMarket) => {
        onChange(value);
      }}
    >
      <div className={containerStyle}>
        <Listbox.Button
          className="focus:outline-none group cursor-pointer"
          data-cy={buttonTestId}
        >
          <ArrowCircleDownIcon
            className="h-6 w-6 text-cyan-400 absolute right-5 top-1"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            data-cy="list"
            className="absolute overflow-auto h-[260px] w-full mt-6 bg-cyan-400"
          >
            {lists.map(
              (list, idx) =>
                list.id !== activeList.id && (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none p-4 border-b text-sm border-cyan-100 border-opacity-40 
                      ${active ? "bg-cyan-00 text-cyan-900" : "text-cyan-700"}`
                    }
                    value={list}
                    id={list.id}
                    data-cy={`${list.id}-list`}
                  >
                    {({ selected }) => (
                      <div className="flex items-center gap-x-4">
                        {/* <Image
                          src={list.image}
                          alt={`${list.id} logo`}
                          width={29}
                          height={29}
                        /> */}
                        <div
                          className="absolute bg-no-repeat bg-contain h-full w-full"
                          style={{
                            backgroundImage: `url(${list.image || ""})`,
                            backgroundPosition: "right 10px top 20px",
                            opacity: 0.6,
                          }}
                        />

                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                          data-cy={`${list.id}-list-name`}
                          data-testid="coin-name"
                        >
                          {list.name}
                        </span>
                      </div>
                    )}
                  </Listbox.Option>
                )
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

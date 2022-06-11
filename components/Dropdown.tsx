import * as React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ArrowCircleDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import type { CoinMarket } from "@/types/index";

export function Dropdown({
  data,
  onChange,
  lists,
  activeList,
  buttonTestId,
}: {
  data: CoinMarket;
  lists: CoinMarket[];
  activeList: CoinMarket;
  onChange: (value: CoinMarket) => void;
  buttonTestId?: string;
}) {
  return (
    <Listbox
      value={data}
      onChange={(value: CoinMarket) => {
        onChange(value);
      }}
    >
      <div className="relative rounded-lg">
        <Listbox.Button
          className="relative py-8 text-left focus:outline-none  md:max-w-[220px] px-4 group cursor-pointer min-w-[140px]"
          data-cy={buttonTestId}
        >
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2 md:gap-x-4">
              <Image
                src={data.image}
                alt={`${data.id} logo`}
                width={29}
                height={29}
              />
              <span
                data-cy="dropdown-name"
                className="block truncate text-base md:text-2xl font-bold uppercase text-gray-400 group-hover:text-gray-800"
              >
                {data.symbol}
              </span>
            </div>

            <span className="flex items-center text-gray-400 group-hover:text-gray-800">
              <ArrowCircleDownIcon className="h-6 w-6 " aria-hidden="true" />
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            data-cy="list"
            className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
          >
            {lists.map(
              (list, listIdx) =>
                list.id !== activeList.id && (
                  <Listbox.Option
                    key={listIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={list}
                    id={list.id}
                    data-cy={`${list.id}-list`}
                  >
                    {({ selected }) => (
                      <div className="flex items-center gap-x-4">
                        <Image
                          src={list.image}
                          alt={`${list.id} logo`}
                          width={29}
                          height={29}
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

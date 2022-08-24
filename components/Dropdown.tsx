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
  testID,
  containerStyle,
}: {
  data: CoinMarket;
  lists: CoinMarket[];
  activeList: Pick<CoinMarket, "id">;
  onChange: (value: CoinMarket) => void;
  testID?: string;
  containerStyle?: string;
}) {
  const filteredList = lists.filter(({ id }) => id !== activeList.id);

  return (
    <Listbox
      value={data}
      onChange={(value: CoinMarket) => {
        onChange(value);
      }}
    >
      {({ open }) => (
        <div className={containerStyle}>
          <Listbox.Button
            className="focus:outline-none group cursor-pointer absolute right-5 top-1 z-30"
            data-testid={testID}
          >
            <ArrowCircleDownIcon
              className={`h-8 w-8 text-cyan-900 hover:text-opacity-100 ${
                open ? "rotate-180 text-opacity-100" : "text-opacity-60"
              }`}
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
              data-testid={`${testID}-options`}
              className="relative overflow-y-auto overflow-x-hidden h-[260px] w-full mt-16 bg-cyan-800 z-50 rounded-2xl"
            >
              {filteredList.map(
                (list, idx) =>
                  list.id !== activeList.id && (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        `cursor-default select-none p-4 text-sm
                      ${active ? "bg-cyan-900 text-cyan-200" : "text-cyan-200"}
                      ${
                        idx !== filteredList.length - 1
                          ? "border-b border-cyan-100 border-opacity-40 "
                          : ""
                      }
                      `
                      }
                      value={list}
                      id={list.id}
                      data-testid={`${testID}-option-${list.name}`}
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
                              selected
                                ? "font-medium"
                                : "font-bold tracking-wide"
                            }`}
                            data-testid={`${testID}-options-list-name`}
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
      )}
    </Listbox>
  );
}

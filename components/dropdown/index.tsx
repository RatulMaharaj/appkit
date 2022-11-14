import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropdownProps {
  label: string;
  options: Array<{ id: number; name: string }>;
  initialValue: string;
  onChange: (e: { id: number; name: string }) => { id: number; name: string };
}

export default function Dropdown(props: DropdownProps) {
  const [selected, setSelected] = useState(props.options[0]);

  // get index of initialValue prop
  useEffect(() => {
    props.options.forEach((option, index) => {
      if (option.name.toLowerCase() === props.initialValue.toLowerCase()) {
        setSelected(props.options[index]);
      }
    });
  }, []);

  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        props.onChange(e);
        setSelected(e);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block uppercase text-[10px] font-bold text-primary">
            {props.label}
          </Listbox.Label>
          <div className="relative my-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-tertiary bg-priamry py-2 pl-3 pr-10 text-left hover:border-secondary focus:outline-none focus:border-purple-500 sm:text-sm">
              <span className="block truncate text-primary">
                {selected.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {props.options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-primary bg-secondary" : "text-primary",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-primary" : "text-purple-500",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

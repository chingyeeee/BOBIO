import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import praydata from "../../data/praydata.json";
import { BsCaretDownFill, BsCheck } from "react-icons/bs";
import UnknownGod from "../../images/pray/gods/god_unknown.png";

export const Pray = () => {
  const [option, setOption] = useState("祈願種類");

  function getImageUrl(path) {
    return new URL(`../../images/pray/gods/${path}`, import.meta.url).href;
  }

  return (
    <div className="container mx-auto h-[calc(100vh_-_173px)] md:h-[calc(100vh_-_156px)]">
      <div className=" h-full flex flex-col items-center justify-center gap-2">
        <div className="text-center">
          <p className="text-lg text-p3">請選擇</p>
          <h3 className="text-h2 text-p3">祈願種類</h3>
        </div>
        <div className="md:hidden">
          <Listbox value={option} onChange={setOption}>
            <div className="relative mt-1 min-w-[116px]">
              <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-2 pl-3 border border-p3 pr-10 text-center shadow-lv1 focus:outline-none focus-visible:border-p3 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate text-p3">{option}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <BsCaretDownFill
                    className="h-5 w-5 text-p3"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lv1 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {praydata.map((cate) => (
                    <Listbox.Option
                      key={cate.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-p2 text-p1" : "text-p3"
                        }`
                      }
                      value={cate.category}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {cate.category}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-p1">
                              <BsCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="mt-5 bg-s2 rounded-full p-10 box-border">
          <img
            className={option === "祈願種類" ? "blcok" : "hidden"}
            src={UnknownGod}
            alt={"請選擇祈願種類"}
          />
          {praydata.map((data, i) => {
            return (
              <img
                className={option === data.category ? "blcok" : "hidden"}
                key={data.id}
                src={getImageUrl(data.image)}
                alt={data.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

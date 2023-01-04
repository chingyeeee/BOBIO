import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import praydata from "../../data/praydata.json";
import { BsCaretDownFill, BsCheck } from "react-icons/bs";
import { Button } from "../common/Button";
import { FaHeartbeat, FaGraduationCap } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiHealing } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdWork } from "react-icons/md";

// Pray Step 1
const ButtonPrayCategory = ({ category, icon, id, setOption, nextPhrase }) => {
  return (
    <div
      onMouseEnter={() => setOption(category)}
      onMouseLeave={() => setOption("祈願種類")}
      onClick={nextPhrase}
      className={`cursor-pointer bg-s1 text-n1 rounded-full flex flex-col items-center justify-center w-24 h-24 p-4 shadow-lv1 absolute inset-0 m-auto hover:bg-p1 hover:animate-ringing ${
        id === "health" && "translate-x-296"
      } ${id === "love" && "-translate-x-296"} ${
        id === "safety" && "-translate-x-48 -translate-y-52"
      } ${id === "study" && "translate-x-48 -translate-y-52"}
      ${id === "wealth" && "-translate-x-48 translate-y-60"}
      ${id === "work" && "translate-x-48 translate-y-60"}`}
    >
      {icon === "GiHealing" && <GiHealing size={"2rem"} />}
      {icon === "FaHeartbeat" && <FaHeartbeat size={"2rem"} />}
      {icon === "FaGraduationCap" && <FaGraduationCap size={"2rem"} />}
      {icon === "RiMoneyDollarCircleFill" && (
        <RiMoneyDollarCircleFill size={"2rem"} />
      )}
      {icon === "AiFillSafetyCertificate" && (
        <AiFillSafetyCertificate size={"2rem"} />
      )}
      {icon === "MdWork" && <MdWork size={"2rem"} />}
      <p className="text-lg">{category}</p>
    </div>
  );
};

const ChooseCategory = (props) => {
  const { godImage, setGodImage, nextPhrase, getImageUrl } = props;
  const [option, setOption] = useState("祈願種類");
  const [godName, setGodName] = useState("未知");

  function getGod() {
    if (option !== "祈願種類") {
      praydata.filter((data) => {
        if (data.category === option) {
          setGodImage(data.image);
          setGodName(data.god);
        }
      });
    } else {
      setGodImage("god_unknown.png");
      setGodName("未知");
    }
  }

  useEffect(() => {
    getGod();
  }, [option]);

  return (
    <div className=" h-full flex flex-col items-center justify-center gap-2 relative md:before:block md:before:absolute md:before:border-2 md:before:border-s1 md:before:w-600 md:before:rounded-full md:before:h-600 md:before:inset-0 md:before:m-auto md:before:translate-y-4">
      <div className="text-center md:translate-y-16">
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
        <img src={getImageUrl(godImage)} alt="" />
      </div>
      <div className="text-center -mt-8 mb-10 md:mb-0 md:-translate-y-6">
        <p className="text-lg text-p3">掌管神明</p>
        <h3 className="text-h2 text-p3">{godName}</h3>
      </div>
      <Button
        className="md:hidden"
        text={"開始祈願"}
        handleClick={nextPhrase}
      />
      <div className="hidden md:block">
        {praydata.map((data) => {
          return (
            <ButtonPrayCategory
              key={data.id}
              id={data.id}
              category={data.category}
              icon={data.icon}
              setOption={setOption}
              nextPhrase={nextPhrase}
            />
          );
        })}
      </div>
    </div>
  );
};

// Pray Step 2
const PrayMethod = (props) => {
  const { godImage, nextPhrase, getImageUrl, prevPhrase } = props;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full text-center gap-8 lg:text-left lg:flex-row-reverse">
      <div>
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          <h3 className="text-h2 text-p3 lg:max-w-[4.25rem]">祈願方法</h3>
          <p className="text-lg text-s1 max-w-[85%] lg:max-w-[70%]">
            請在心中默念您的名字 ，欲祈求之事項。 完成後請點選下一步。
          </p>
        </div>
        <div className="hidden lg:block"></div>
      </div>
      <div className="drop-shadow-lg">
        <img src={getImageUrl(godImage)} />
      </div>
    </div>
  );
};

export const Pray = () => {
  const [godImage, setGodImage] = useState(null);
  const [prayPhrase, setPrayPhrase] = useState(0);

  function getImageUrl(path) {
    return new URL(`../../images/pray/gods/${path}`, import.meta.url).href;
  }

  function prevPhrase() {
    setPrayPhrase(prayPhrase - 1);
  }

  function nextPhrase() {
    setPrayPhrase(prayPhrase + 1);
  }

  return (
    <div className="container mx-auto h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] lg:md:min-h-screen">
      {prayPhrase === 0 && (
        <ChooseCategory
          godImage={godImage}
          setGodImage={setGodImage}
          nextPhrase={nextPhrase}
          getImageUrl={getImageUrl}
        />
      )}
      {prayPhrase === 1 && (
        <PrayMethod
          godImage={godImage}
          prevPhrase={prevPhrase}
          nextPhrase={nextPhrase}
          getImageUrl={getImageUrl}
        />
      )}
    </div>
  );
};

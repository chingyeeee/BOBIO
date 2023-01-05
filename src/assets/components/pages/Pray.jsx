import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import praydata from "../../data/praydata.json";
import {
  BsCaretDownFill,
  BsCheck,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";
import { Button } from "../common/Button";
import { FaHeartbeat, FaGraduationCap } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiHealing } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import PrayGIF from "../../images/pray/bobio-animation.gif";

// steps
const Steps = ({ text, active, className = "" }) => {
  return (
    <div
      className={`text-n1 rounded-full flex flex-col items-center justify-center text-center w-24 h-24 p-4 shadow-ring relative z-10 ${
        active ? "bg-p1 shadow-active lg:before:bg-p1" : "bg-s1 lg:before:bg-s1"
      } ${className}`}
    >
      <p className="lg:max-w-[2rem]">{text}</p>
    </div>
  );
};

// Pray Phrase Controller
const PrayPhraseController = ({ nextPhrase, prevPhrase, prayPhrase }) => {
  return (
    <div className="w-full flex justify-between p-3 lg:p-0">
      <div
        className="flex items-center cursor-pointer text-p3 hover:text-p1 gap-2"
        onClick={prevPhrase}
      >
        <BsArrowLeft size={"1.5rem"} />
        <p className="text-lg">上一步</p>
      </div>
      {prayPhrase !== 2 && (
        <div
          className="flex items-center cursor-pointer text-p3 hover:text-p1 gap-2"
          onClick={nextPhrase}
        >
          <p className="text-lg">下一步</p>
          <BsArrowRight size={"1.5rem"} />
        </div>
      )}
    </div>
  );
};

// Pray Category Button
const ButtonPrayCategory = ({ category, icon, id, setOption, nextPhrase }) => {
  return (
    <div
      onMouseEnter={() => setOption(category)}
      onMouseLeave={() => setOption("祈願種類")}
      onClick={nextPhrase}
      className={`cursor-pointer bg-s1 text-n1 rounded-full flex flex-col items-center justify-center w-24 h-24 p-4 shadow-ring absolute inset-0 m-auto hover:bg-p1 hover:animate-ringing ${
        id === "health" && "translate-x-290"
      } ${id === "love" && "-translate-x-290"} ${
        id === "safety" && "-translate-x-52 -translate-y-56"
      } ${id === "study" && "translate-x-52 -translate-y-56"}
      ${id === "wealth" && "-translate-x-48 translate-y-56"}
      ${id === "work" && "translate-x-48 translate-y-56"}`}
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

// Pray attributes
const Attributes = ({ set, setFoodOption, nextPhrase }) => {
  const [setName, setValue] = set;

  function handleOption() {
    setFoodOption(setName);
    nextPhrase();
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="flex items-center justify-center w-20 h-20 bg-p2 shadow-food rounded-full relative z-20 text-p3 text-lg lg:text-xl lg:w-28 lg:h-28">
        {setName}
      </h3>
      <span className="h-20 md:h-24 w-1 bg-p1 rounded-full shadow-line relative z-10" />
      <div className="flex flex-col w-full items-center p-5 rounded-xl shadow-lv1 bg-s2 gap-4 -translate-y-6">
        <span className="w-3.5 h-3.5 bg-p2 shadow-inner-circle rounded-full"></span>
        <ul>
          {setValue.map((item, i) => {
            return (
              <li key={i} className="text-s1">
                {item}
              </li>
            );
          })}
        </ul>
        <Button text={"選擇"} handleClick={handleOption} />
      </div>
    </div>
  );
};

// Select Pray God
const ChooseCategory = (props) => {
  const {
    godImage,
    setGodImage,
    nextPhrase,
    getImageUrl,
    setCardImage,
    setFoodSet,
  } = props;
  const [option, setOption] = useState("祈願種類");
  const [godName, setGodName] = useState("未知");

  function getGod() {
    if (option !== "祈願種類") {
      praydata.filter((data) => {
        if (data.category === option) {
          setGodImage(data.image);
          setGodName(data.god);
          setFoodSet(Object.entries(data.foodSets));
          setCardImage(data.cardSets);
        }
      });
    } else {
      setGodImage("god_unknown.svg");
      setGodName("未知");
    }
  }

  useEffect(() => {
    getGod();
  }, [option]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 md:gap-8 relative py-6 md:before:block md:before:absolute md:before:border-2 md:before:border-s1 md:before:w-600 md:before:rounded-full md:before:h-600 md:before:m-auto ">
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
      <div className="md:mt-5 bg-s2 rounded-full p-4 box-border">
        <img src={getImageUrl("gods", godImage)} alt={godImage} />
      </div>
      <div className="text-center -mt-6 mb-10 md:mb-0 md:-translate-y-6">
        <p className="text-lg text-p3">掌管神明</p>
        <h3 className="text-h2 text-p3">{godName}</h3>
      </div>
      <Button
        className="md:hidden -translate-y-6"
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
    <div className="container mx-auto flex flex-col items-center justify-center h-full text-center gap-8 lg:text-left lg:gap-16  py-6">
      <div className="w-full flex flex-col gap-8 lg:flex-row-reverse justify-between">
        <div className="flex flex-col justify-center gap-24">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <h3 className="text-h2 text-p3 lg:max-w-[4.25rem]">祈願方法</h3>
            <p className="text-lg text-s1 max-w-[85%] lg:max-w-[70%]">
              請在心中默念您的名字 ，欲祈求之事項。 完成後請點選下一步。
            </p>
          </div>
          <div className="hidden lg:flex gap-32">
            <Steps
              className={
                "lg:before:w-[150%] lg:before:h-0.5 lg:before:inset-y-0 lg:before:left-full lg:before:m-auto lg:before:block lg:before:absolute"
              }
              text={"選擇供品"}
            />
            <Steps
              className={
                "lg:before:w-[150%] lg:before:h-0.5 lg:before:inset-y-0 lg:before:left-full lg:before:m-auto lg:before:block lg:before:absolute"
              }
              text={"默念拜拜"}
            />
            <Steps text={"完成祈願"} />
          </div>
        </div>
        <img
          className="drop-shadow-lg w-4/5 mx-auto md:w-2/3 lg:w-2/5"
          src={getImageUrl("gods", godImage)}
        />
      </div>
      <PrayPhraseController nextPhrase={nextPhrase} prevPhrase={prevPhrase} />
    </div>
  );
};

//Pray Step 3
const PraySets = (props) => {
  const { nextPhrase, prevPhrase, prayPhrase, foodset, setFoodOption } = props;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full text-center gap-8 lg:text-left lg:gap-16 ">
      <div className="w-full flex flex-col gap-16 lg:gap-28 lg:flex-row-reverse justify-center items-center">
        <div className="flex flex-col gap-24 w-full lg:w-2/5 xl:w-auto">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <h3 className="text-h2 text-p3 lg:max-w-[4.25rem]">選擇供品</h3>
            <p className="text-lg text-s1 max-w-[85%] lg:max-w-[70%]">
              請選擇欲提供之供品。
            </p>
          </div>
          <div className="hidden lg:flex w-full gap-16 xl:gap-32">
            <Steps
              active
              text={"選擇供品"}
              className={
                "lg:before:w-[150%] lg:before:h-0.5 lg:before:inset-y-0 lg:before:left-full lg:before:m-auto lg:before:block lg:before:absolute"
              }
            />
            <Steps
              className={
                "lg:before:w-[150%] lg:before:h-0.5 lg:before:inset-y-0 lg:before:left-full lg:before:m-auto lg:before:block lg:before:absolute"
              }
              text={"默念拜拜"}
            />
            <Steps text={"完成祈願"} />
          </div>
        </div>
        <div className="flex gap-4 md:gap-8 xl:gap-16">
          {foodset.map((set, i) => {
            return (
              <Attributes
                key={i}
                set={set}
                setFoodOption={setFoodOption}
                nextPhrase={nextPhrase}
              />
            );
          })}
        </div>
      </div>
      <PrayPhraseController
        nextPhrase={nextPhrase}
        prevPhrase={prevPhrase}
        prayPhrase={prayPhrase}
      />
    </div>
  );
};

// Pray Step 4
const PrayStart = (props) => {
  const { nextPhrase, prevPhrase } = props;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full text-center gap-16 lg:text-left py-6">
      <div className="w-full flex flex-col gap-16 lg:flex-row-reverse justify-center md:gap-12">
        <div className="flex flex-col justify-center gap-24 w-full lg:w-[45%] xl:w-auto">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <h3 className="text-h2 text-p3 lg:max-w-[4.25rem]">默念拜拜</h3>
            <p className="text-lg text-s1 max-w-[85%] lg:max-w-[70%]">
              請雙手合十，進行叩拜。
              <br />
              完成後請點選下一步。
            </p>
          </div>
          <div className="hidden lg:flex w-full gap-16 xl:gap-32">
            <Steps
              active
              className={
                "lg:before:w-[150%] lg:before:h-0.5 lg:before:inset-y-0 lg:before:left-full lg:before:m-auto lg:before:block lg:before:absolute"
              }
              text={"選擇供品"}
            />
            <Steps
              active
              className={
                "lg:before:w-[150%] lg:before:h-0.5 lg:before:inset-y-0 lg:before:left-full lg:before:m-auto lg:before:block lg:before:absolute"
              }
              text={"默念拜拜"}
            />
            <Steps text={"完成祈願"} />
          </div>
        </div>
        <img className="drop-shadow-lg w-4/5 mx-auto md:w-2/5" src={PrayGIF} />
      </div>
      <PrayPhraseController nextPhrase={nextPhrase} prevPhrase={prevPhrase} />
    </div>
  );
};

// Pray Step 5
const PrayCard = (props) => {
  const { nextPhrase, prevPhrase, cardImage, foodOption, getImageUrl } = props;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full text-center gap-16 lg:text-left py-6">
      <div className="w-full flex flex-col gap-16 lg:flex-row-reverse justify-center md:gap-12">
        <div className="flex flex-col justify-center gap-24 w-full lg:w-[45%] xl:w-auto">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <h3 className="text-h2 text-p3 lg:max-w-[4.25rem]">完成祈願</h3>
            <p className="text-lg text-s1 max-w-[85%] lg:max-w-[70%]">
              本次祈願步驟已完成。
              <br />
              另贈與雞湯小卡一張，庇佑您心想事成。
            </p>
          </div>
          <div className="hidden lg:flex w-full gap-16 xl:gap-32">
            <Steps
              active
              className={
                "lg:before:w-[150%] lg:before:h-0.5 lg:before:inset-y-0 lg:before:left-full lg:before:m-auto lg:before:block lg:before:absolute"
              }
              text={"選擇供品"}
            />
            <Steps
              active
              className={
                "lg:before:w-[150%] lg:before:h-0.5 lg:before:inset-y-0 lg:before:left-full lg:before:m-auto lg:before:block lg:before:absolute"
              }
              text={"默念拜拜"}
            />
            <Steps active text={"完成祈願"} />
          </div>
        </div>
        <img
          className="drop-shadow-lg w-4/5 mx-auto md:w-2/3 lg:w-2/5"
          src={getImageUrl("cards", cardImage[foodOption])}
        />
      </div>
      <div className="w-full flex justify-center lg:justify-end p-3 lg:p-0">
        <Button text={"返回首頁"} href={"/"} />
      </div>
    </div>
  );
};

export const Pray = () => {
  const [godImage, setGodImage] = useState(null);
  const [prayPhrase, setPrayPhrase] = useState(0);
  const [foodset, setFoodSet] = useState({});
  const [cardImage, setCardImage] = useState({});
  const [foodOption, setFoodOption] = useState("");

  function getImageUrl(folder, path) {
    return new URL(`../../images/pray/${folder}/${path}`, import.meta.url).href;
  }

  function prevPhrase() {
    setPrayPhrase(prayPhrase - 1);
  }

  function nextPhrase() {
    if (godImage === "god_unknown.svg") return;
    setPrayPhrase(prayPhrase + 1);
  }

  return (
    <div className="container pt-16 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] lg:min-h-screen flex items-center justify-center">
      {prayPhrase === 0 && (
        <ChooseCategory
          godImage={godImage}
          setGodImage={setGodImage}
          nextPhrase={nextPhrase}
          getImageUrl={getImageUrl}
          setFoodSet={setFoodSet}
          setCardImage={setCardImage}
        />
      )}
      {prayPhrase === 1 && (
        <PrayMethod
          godImage={godImage}
          prevPhrase={prevPhrase}
          nextPhrase={nextPhrase}
          getImageUrl={getImageUrl}
          prayPhrase={prayPhrase}
        />
      )}
      {prayPhrase === 2 && (
        <PraySets
          prevPhrase={prevPhrase}
          nextPhrase={nextPhrase}
          prayPhrase={prayPhrase}
          foodset={foodset}
          setFoodOption={setFoodOption}
        />
      )}
      {prayPhrase === 3 && (
        <PrayStart prevPhrase={prevPhrase} nextPhrase={nextPhrase} />
      )}
      {prayPhrase === 4 && (
        <PrayCard
          prevPhrase={prevPhrase}
          nextPhrase={nextPhrase}
          foodOption={foodOption}
          cardImage={cardImage}
          getImageUrl={getImageUrl}
        />
      )}
    </div>
  );
};

import { Fragment, useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import categoryData from "../../data/goddata.json";
import BackgroundData from "../../data/amuletZodiacData.json";
import { BsCaretDownFill, BsCheck } from "react-icons/bs";
import Amulet01 from "../../images/amulets/amulet01.jpg";
import { Button } from "../common/Button";

const Amulets = () => {
  const [category, setCategory] = useState("健康");
  const [godImage, setGodImage] = useState("");
  const [zodiac, setZodiac] = useState("鼠");
  const [zodiacImage, setZodiacImage] = useState("");
  const [about, setAbout] = useState("");
  const [customMsg, setCustomMsg] = useState("");
  const msgRef = useRef();

  function getMsg() {
    setCustomMsg(msgRef.current.value);
  }

  function getGod() {
    categoryData.filter((data) => {
      if (data.category === category) {
        setGodImage(data.image);
        setAbout(data.about);
      }
    });
  }

  function getBackground() {
    BackgroundData.filter((data) => {
      if (data.name === zodiac) {
        setZodiacImage(data.background);
      }
    });
  }

  useEffect(() => {
    getGod();
    getBackground();
  }, [category, zodiac]);

  return (
    <div className="container pt-16 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] lg:min-h-screen flex items-center justify-center pb-12 md:pb-0">
      <div className="flex flex-col md:flex-row px-3 gap-8">
        {/* product image */}
        <div className="flex flex-col md:max-w-[50%] lg:max-w-[40%] xl:max-w-[35%] gap-4 md:px-12">
          {/* big photo */}
          <img className="rounded-xl" src={Amulet01} alt="amulet" />
          {/* small photos */}
          <div className="flex gap-2">
            <img className="w-1/4 rounded-xl" src={Amulet01} alt="" />
            <img className="w-1/4 rounded-xl" src={Amulet01} alt="" />
          </div>
        </div>
        {/* product detail */}
        <div className="flex flex-col gap-8">
          {/* title */}
          <div className="flex flex-col gap-2">
            <h3 className="text-h3 text-p3">專屬於您的平安符</h3>
            <p className="text-lg text-s1">NT$399</p>
          </div>
          {/* body */}
          <div className="flex flex-col gap-6">
            {/* 種類x6 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg text-p3">種類</p>
                <RadioGroup value={category} onChange={setCategory}>
                  <RadioGroup.Label className="sr-only">種類</RadioGroup.Label>
                  <div className="flex flex-wrap gap-2">
                    {categoryData.map((god) => (
                      <RadioGroup.Option
                        key={god.id}
                        value={god.category}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-p1"
                              : ""
                          }
                  ${checked ? "bg-p1 bg-opacity-95 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                      checked ? "text-white" : "text-p3"
                                    }`}
                                  >
                                    {god.category}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              {/* 簡介 */}
              <div className="rounded-xl bg-n1 p-6 text-p3 text-lg">
                {about}
              </div>
            </div>
            {/* 生肖 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg text-p3">生肖</p>
                <RadioGroup value={zodiac} onChange={setZodiac}>
                  <RadioGroup.Label className="sr-only">生肖</RadioGroup.Label>
                  <div className="flex flex-wrap gap-2">
                    {BackgroundData.map((zodiac) => (
                      <RadioGroup.Option
                        key={zodiac.id}
                        value={zodiac.name}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-p1"
                              : ""
                          }
                  ${checked ? "bg-p1 bg-opacity-95 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                      checked ? "text-white" : "text-p3"
                                    }`}
                                  >
                                    {zodiac.name}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-lg text-p3">客製化文字</label>
                <input
                  className="px-3 py-1.5 text-base text-s1 bg-n1 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-n1 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
                  placeholder="請輸入文字（限制4字）"
                  ref={msgRef}
                  value={customMsg}
                  onChange={getMsg}
                  type="text"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="flex justify-center md:justify-start gap-8">
            <Button text={"加入購物車"} />
            <Button text={"立即購買"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amulets;

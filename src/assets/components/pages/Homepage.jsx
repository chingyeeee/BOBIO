import { FullBanner } from "../banner/FullBanner";
import PrayImage from "../../images/homepage/intro_pray.png";
import PrayMobileImage from "../../images/homepage/intro_pray_mobile.png";
import DrawLotsImage from "../../images/homepage/intro_draw_lots.png";
import DrawLotsMobileImage from "../../images/homepage/intro_draw_lots_mobile.png";
import { Button } from "../common/Button";
import { BsArrowRight } from "react-icons/bs";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Pray = () => {
  return (
    <div className="flex flex-col md:flex-row items-center 2xl:container 2xl:mx-auto pt-10 md:pt-0">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex items-center md:items-start pt-10 md:pt-0 relative flex-col gap-8 px-14 md:px-0">
          <h3 className="text-h2 text-p3">祈願</h3>
          <p className="text-lg text-s1 text-center md:text-left">
            祈福，是人類與生俱來的一種本能與渴求。
            <br />
            隨著科技日新月異，線上服務蔚然成風，
            <br />
            您將可以在線上向神明祈願留下內容。
          </p>
          <Button
            className="absolute -bottom-1/3 md:static"
            text={"立即祈願"}
            icon={<BsArrowRight />}
          />
        </div>
      </div>
      <div className="hidden md:block md:w-6/12 xl:w-auto">
        <img src={PrayImage} alt="立即祈願" />
      </div>

      <img className="md:hidden w-full" src={PrayMobileImage} alt="立即祈願" />
    </div>
  );
};

const DrawLots = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center 2xl:container 2xl:mx-auto pt-10 md:pt-0">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-8 items-center md:items-start pt-10 md:pt-0 relative px-12 md:px-0">
          <h3 className="text-h2 text-p3">線上求籤</h3>
          <p className="text-lg text-s1 text-center md:text-left">
            人生遇到了難關或感到迷惘嗎？
            <br />
            不妨求籤請神明為您指點迷津，
            <br />
            心誠則靈，即便是線上服務也一樣靈驗！
          </p>
          <Button
            className="absolute -bottom-2/4 md:static"
            text={"前往求籤"}
            icon={<BsArrowRight />}
          />
        </div>
      </div>
      <div className="hidden md:block md:w-6/12 xl:w-auto">
        <img src={DrawLotsImage} alt="前往求籤" />
      </div>
      <img
        className="md:hidden w-full"
        src={DrawLotsMobileImage}
        alt="前往求籤"
      />
    </div>
  );
};

const JoinUs = () => {
  const loopRef = useRef(null);

  useEffect(() => {
    gsap.to(".loop", {
      xPercent: "-50",
      ease: "none",
      duration: 10,
      repeat: -1,
    });
  });

  return (
    <div className="bg-joinusmobile lg:bg-joinus bg-cover bg-no-repeat py-12 md:py-20">
      <div className="lg:hidden bg-joinusloop p-4 overflow-x-hidden bg-cover bg-no-repeat flex">
        <ul className="lg:hidden inline-block whitespace-nowrap loop">
          <li className="inline-block text-n1 pr-6 shadow-lv1">
            信眾已達 <span className="text-p1">20,210</span> 人
          </li>
          <li className="inline-block text-n1 pr-6 shadow-lv1">
            結緣已達 <span className="text-p1">10,120</span> 人
          </li>
          <li className="inline-block text-n1 pr-6 shadow-lv1">
            平安符願結願已達 <span className="text-p1">9,210</span> 人
          </li>
          <li className="inline-block text-n1 pr-6 shadow-lv1">
            信眾已達 <span className="text-p1">20,210</span> 人
          </li>
          <li className="inline-block text-n1 pr-6 shadow-lv1">
            結緣已達 <span className="text-p1">10,120</span> 人
          </li>
          <li className="inline-block text-n1 pr-6 shadow-lv1">
            平安符願結願已達 <span className="text-p1">9,210</span> 人
          </li>
        </ul>
      </div>
      <div className="hidden lg:flex container mx-auto text-center">
        <div className="flex flex-col gap-6 rounded-xl items-center bg-member w-full mx-10 px-10 py-16 shadow-lv1">
          <p className="text-n1 text-h3">累積信眾人數</p>
          <p className="text-n1 text-xl">
            已達 <span className="text-p1 text-h2 font-black">20,210</span> 人
          </p>
        </div>
        <div className="flex flex-col gap-6 rounded-xl items-center bg-donate w-full mx-10 px-10 py-16 shadow-lv1">
          <p className="text-n1 text-h3">累積結緣人數</p>
          <p className="text-n1 text-xl">
            已達 <span className="text-p1 text-h2 font-black">12,020</span> 人
          </p>
        </div>
        <div className="flex flex-col gap-6 rounded-xl items-center bg-purchase w-full mx-10 px-10 py-16 shadow-lv1">
          <p className="text-n1 text-h3">平安符願結緣人數</p>
          <p className="text-n1 text-xl">
            已達 <span className="text-p1 text-h2 font-black">9,210</span> 人
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8 text-center items-center px-14 pb-8 pt-12">
        <div className="flex flex-col gap-4">
          <h3 className="text-h2 text-p3">成為BOBIO信眾</h3>
          <p className="text-xl text-p3">提供您安心又放心，用BOBIO就有保庇</p>
        </div>
        <p className="text-lg text-s1">
          在當今盛極一時的線上服務風潮下，BOBIO自許提供信眾最完善的線上廟宇服務，
          <br />
          服務種類包羅萬象，同時囊括感情、學業、健康、平安、財富、事業六大面向，涵蓋您全方位的煩惱，
          <br />
          <span className="hidden md:inline">
            無論是想祈求家人朋友安康順心，或是生活上遇到了難題需要解惑，您絕對都可以在BOBIO找到適合您的服務。
            <br />
            點選下方加入成為BOBIO的會員，即刻體驗完整的服務！
          </span>
        </p>
        <Button text={"加入會員"} icon={<BsArrowRight />} />
      </div>
    </div>
  );
};

export const Homepage = () => {
  return (
    <>
      <FullBanner slogan={"用BOBIO就有庇佑"} />
      <JoinUs />
      <Pray />
      <DrawLots />
    </>
  );
};

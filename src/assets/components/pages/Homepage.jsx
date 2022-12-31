import { FullBanner } from "../banner/FullBanner";
import PrayImage from "../../images/homepage/intro_pray.svg";
import PrayMobileImage from "../../images/homepage/intro_pray_mobile.svg";
import DrawLotsImage from "../../images/homepage/intro_draw_lots.svg";
import DrawLotsMobileImage from "../../images/homepage/intro_draw_lots_mobile.svg";
import { Button } from "../common/Button";
import { BsArrowRight } from "react-icons/bs";

const Pray = () => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex items-center md:items-start pt-10 md:pt-0 relative flex-col gap-8">
          <h3 className="text-h2 text-p3">祈願</h3>
          <p className="text-lg text-s1 text-center md:text-left">
            祈福，是人類與生俱來的一種本能與渴求。
            <br />
            隨著科技日新月異，線上服務蔚然成風，
            <br />
            您將可以在線上向神明祈願留下內容。
          </p>
          <Button
            className="absolute -bottom-2/4 md:static"
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
    <div className="flex flex-col md:flex-row-reverse items-center">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-8 items-center md:items-start pt-10 md:pt-0 relative">
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

export const Homepage = () => {
  return (
    <>
      <FullBanner slogan={"用BOBIO就有庇佑"} />
      <Pray />
      <DrawLots />
    </>
  );
};

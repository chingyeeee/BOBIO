import { FullBanner } from "../banner/FullBanner";
import PrayImage from "../../images/homepage/intro_pray.svg";
import DrawLotsImage from "../../images/homepage/intro_draw_lots.svg";
import { Button } from "../common/Button";

const Introduction = ({
  direction = "row",
  img,
  alt,
  title,
  content,
  btnText,
}) => {
  return (
    <div className={`flex ${direction} items-center`}>
      <div className="flex flex-col gap-8 flex-1 justify-center">
        <h3>祈願</h3>
        <p>
          祈福，是人類與生俱來的一種本能與渴求。
          <br />
          隨著科技日新月異，線上服務蔚然成風，
          <br />
          您將可以在線上向神明祈願留下內容。
        </p>
        <Button text={"立即祈願"} />
      </div>
      <img src={PrayImage} alt="立即祈願" />
    </div>
  );
};

export const Homepage = () => {
  return (
    <>
      <FullBanner slogan={"用BOBIO就有庇佑"} />
      <Introduction />
    </>
  );
};

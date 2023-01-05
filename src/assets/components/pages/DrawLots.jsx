import { useState } from "react";
import LotsContainer from "../../images/drawLots/lots_container.svg";
import { Button } from "../common/Button";

// start drawlots
const DrawIntroduction = () => {
  return (
    <div className="flex flex-col items-center lg:items-start lg:justify-center gap-8 lg:gap-24 px-3 lg:px-0">
      <div className="flex flex-col items-center text-center lg:text-left lg:items-start gap-4 lg:gap-8">
        <h3 className="text-h2 text-p3">人生中遇到了什麼煩惱?</h3>
        <p className="text-lg text-s1">靜下心，獲得指引。</p>
      </div>
      <Button text={"開始求籤"} />
    </div>
  );
};

export const DrawLots = () => {
  const [drawPhrase, setdrawPhrase] = useState(0);

  return (
    <div className="container pt-16 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] lg:min-h-screen flex items-center justify-center">
      {drawPhrase === 0 && <DrawIntroduction />}
    </div>
  );
};

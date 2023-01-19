import { useRef, useState } from "react";
import LotsContainer from "../../images/drawLots/lots_container.svg";
import LotsOnly from "../../images/drawLots/lots_container_lots.svg";
import Lots from "../../images/drawLots/lots_container_drawlots.svg";
import ContainerSurface from "../../images/drawLots/lots_container_surface.svg";
import { Button } from "../common/Button";
import { getImageUrl } from "../utils/getImageUrl";

//drawlots step 1 ------ get user name
const DrawUserName = ({ nextPhrase, userRef, setUserName }) => {
  function saveUserName() {
    if (userRef.current.value.length === 0) return;
    setUserName(userRef.current.value);
    nextPhrase();
  }

  return (
    <div className="flex flex-col px-3 gap-8 mb-64 lg:mb-0 items-center lg:items-start lg:justify-center lg:gap-8 lg:px-0 lg:w-1/2 pr-4">
      <div className="flex flex-col items-center text-center lg:text-left lg:items-start gap-4">
        <h3 className="text-h2 text-p3">生活憂愁，讓你我共享</h3>
        <p className="text-lg text-s1">
          靜下心，獲得指引。
          <br />
          請在心中默念您的姓名、年齡、住址。
        </p>
      </div>
      <div className="flex flex-col items-center lg:flex-row gap-4">
        <input
          type="text"
          className="px-3 py-1.5 text-base font-normal text-s1 bg-white bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-white focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
          placeholder="請輸入您的姓名"
          ref={userRef}
        />
        <Button
          className="flex-1"
          text={"開始求籤"}
          handleClick={saveUserName}
        />
      </div>
    </div>
  );
};

//drawlots step 2 ------ get pome
const DrawThrowStart = ({ userName, nextPhrase, setPomesNumber }) => {
  const [currentResult, setCurrentResult] = useState(0);

  //點擊擲筊
  function generateThrowResult() {
    //random render 1 - 3
    const result = Math.floor(Math.random() * 3) + 1;
    // const result = 1;

    //把result存到currentResult裡
    setCurrentResult(result);

    //render 對應的 image
    showThrowResult(result);

    if (currentResult === 1) {
      const pomeNo = Math.floor(Math.random() * 52 + 1);

      setPomesNumber(pomeNo);

      nextPhrase();
    }
  }

  //reset所有result
  function regenerateThrowResult() {
    //把result set成0
    setCurrentResult(0);
  }

  //根據擲筊結果顯示圖片
  function showThrowResult(result = 0) {
    if (result === 1) {
      return "result_success.svg";
    } else if (result === 2) {
      return "result_fail_01.svg";
    } else if (result === 3) {
      return "result_fail_02.svg";
    } else {
      return "trial.svg";
    }
  }

  //根據擲筊結果顯示文字
  function showThrowResultText(result = 0) {
    if (result === 1) {
      return "聖筊";
    } else if (result === 2) {
      return "笑筊";
    } else if (result === 3) {
      return "陰筊";
    } else {
      return "";
    }
  }

  return (
    <div className="flex flex-col px-3 gap-8 mb-64 lg:mb-0 items-center lg:items-start lg:justify-center lg:gap-8 lg:px-0 lg:w-1/2 pr-4 relative z-10">
      <div className="flex flex-col items-center text-center lg:text-left lg:items-start gap-4 ">
        <h3 className="text-h2 text-p3">
          {currentResult === 0
            ? `${userName}，請您帶著誠心，請示神明是否賜籤`
            : currentResult === 1
            ? `恭喜${userName}，可以前往求籤`
            : `哎呀！神明好像沒聽清楚您的問題`}
        </h3>
        <p className="text-lg text-s1">
          {currentResult === 0
            ? "擲筊請示神明是否應允賜籤，若獲得聖筊即可抽籤。"
            : currentResult === 1
            ? "請繼續在心中默念想問之事"
            : `${userName}，請重新整理問題，請示神明是否賜籤。`}
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <img
              className={currentResult === 0 ? "animate-scale-all" : ""}
              src={getImageUrl("drawLots", showThrowResult(currentResult))}
              alt="drawlotstrail"
            />
            <p className="text-s1 text-caption">
              {showThrowResultText(currentResult)}
            </p>
          </div>
        </div>
        {currentResult === 0 || currentResult === 1 ? (
          <Button
            className="flex-1"
            text={currentResult === 1 ? "開始抽籤" : "開始擲筊"}
            handleClick={generateThrowResult}
          />
        ) : (
          <Button
            className="flex-1"
            text={"重新擲筊"}
            handleClick={regenerateThrowResult}
          />
        )}
      </div>
    </div>
  );
};

//drawlots step 3 ------ get pome
const DrawGetPome = ({
  userName,
  nextPhrase,
  pomesNumber,
  setPomesNumber,
  setTrails,
  trails,
}) => {
  const [currentResult, setCurrentResult] = useState(0);

  //點擊擲筊
  function generateThrowResult() {
    //random render 1 - 3
    // const result = Math.floor(Math.random() * 3) + 1;
    const result = 1;

    //把result存到currentResult裡
    setCurrentResult(result);

    //render 對應的 image
    showThrowResult(result);

    //把當前result存到array裡
    setTrails([...trails, result]);

    if (trails.length === 3 && trails.slice().pop() === 1) nextPhrase();
  }

  //reset所有result
  function regenerateThrowResult() {
    //把array清空
    setTrails([]);

    //把result set成0
    setCurrentResult(0);

    const pomeNo = Math.floor(Math.random() * 60 + 1);

    setPomesNumber(pomeNo);
  }

  //根據擲筊結果顯示圖片
  function showThrowResult(result = 0) {
    if (result === 1) {
      return "result_success.svg";
    } else if (result === 2) {
      return "result_fail_01.svg";
    } else if (result === 3) {
      return "result_fail_02.svg";
    } else {
      return "trial.svg";
    }
  }

  //根據擲筊結果顯示文字
  function showThrowResultText(result = 0) {
    if (result === 1) {
      return "聖筊";
    } else if (result === 2) {
      return "笑筊";
    } else if (result === 3) {
      return "陰筊";
    } else {
      return "";
    }
  }

  return (
    <div className="flex flex-col px-3 gap-8 mb-64 lg:mb-0 items-center lg:items-start lg:justify-center lg:gap-8 lg:px-0 lg:w-1/2 pr-4 relative z-10">
      <div className="flex flex-col items-center text-center lg:text-left lg:items-start gap-4 ">
        <h3 className="text-h2 text-p3">
          {trails.length === 0 || currentResult === 1
            ? trails.length === 3 && trails.slice().pop() === 1
              ? `${userName}，您可以查看第${pomesNumber}號籤詩`
              : `${userName}，您抽到第${pomesNumber}號籤`
            : `哎呀，這不是您的籤，請您重新抽籤`}
        </h3>
        <p className="text-lg text-s1">
          {trails.length === 0 || currentResult === 1
            ? "請誠心詢問擲出三個聖筊，向神明確定籤意。"
            : `${userName}，請在心中默念想問之事。`}
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start">
        <div className="flex gap-4">
          {trails.map((trail, i) => {
            return (
              <div key={i} className="flex flex-col items-center">
                <img
                  src={getImageUrl("drawLots", showThrowResult(trail))}
                  alt="drawlotstrail"
                />
                <p className="text-s1 text-caption">
                  {showThrowResultText(trail)}
                </p>
              </div>
            );
          })}
          {(trails.length === 0 ||
            (currentResult === 1 && trails.length < 3)) && (
            <img
              className="animate-scale-all relative z-20"
              src={getImageUrl("drawLots", showThrowResult())}
              alt="drawlotstrail"
            />
          )}
        </div>
        {trails.length === 0 || currentResult === 1 ? (
          <Button
            className="flex-1"
            text={
              trails.length === 3 && trails.slice().pop() === 1
                ? "查看籤詩"
                : "開始擲筊"
            }
            handleClick={generateThrowResult}
          />
        ) : (
          <Button
            className="flex-1"
            text={"重新擲筊"}
            handleClick={regenerateThrowResult}
          />
        )}
      </div>
    </div>
  );
};

//drawlots step 4 ------ show pome image
const ShowPome = ({ pomesNumber }) => {
  const imageName = `pome_${pomesNumber}.jpg`;

  return (
    <div className="flex flex-col px-3 gap-8 lg:mb-0 items-center lg:items-start lg:justify-center lg:gap-8 lg:px-0 lg:w-1/2 pr-4 relative z-10">
      <div className="flex flex-col items-center text-center lg:text-left lg:items-start gap-8 ">
        <h3 className="text-h2 text-p3">您的第{pomesNumber}號籤詩</h3>
        <img
          className="lg:max-w-[80%]"
          src={getImageUrl("drawLots/pomes", imageName)}
          alt="drawlotstrail"
        />
      </div>
      <div className="flex gap-6 items-center ">
        <a
          className="bg-p1 px-5 w-max py-2 text-normal md:text-lg text-p3 hover:text-n1 flex items-center gap-3 rounded-btn shadow-lv1 flex-1"
          href={getImageUrl("drawLots/pomes", imageName)}
          download={`第${pomesNumber}號籤詩`}
        >
          儲存籤詩
        </a>
        <Button className="flex-1" text={"返回首頁"} href={"/"} />
      </div>
    </div>
  );
};

const DrawLots = () => {
  const [drawPhrase, setdrawPhrase] = useState(0);
  const userRef = useRef();
  const [userName, setUserName] = useState(null);
  const [pomesNumber, setPomesNumber] = useState(0);
  const [trails, setTrails] = useState([]);

  function nextPhrase() {
    setdrawPhrase(drawPhrase + 1);
  }

  return (
    <div className="container pt-24 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] flex items-center justify-center relative">
      <div className="lg:flex lg:flex-row-reverse lg:items-center lg:gap-24">
        {drawPhrase === 0 && (
          <DrawUserName
            nextPhrase={nextPhrase}
            userRef={userRef}
            setUserName={setUserName}
          />
        )}
        {drawPhrase === 1 && (
          <DrawThrowStart
            nextPhrase={nextPhrase}
            userName={userName}
            setPomesNumber={setPomesNumber}
          />
        )}
        {drawPhrase === 2 && (
          <DrawGetPome
            nextPhrase={nextPhrase}
            userName={userName}
            pomesNumber={pomesNumber}
            setPomesNumber={setPomesNumber}
            trails={trails}
            setTrails={setTrails}
          />
        )}
        {drawPhrase === 3 && <ShowPome pomesNumber={pomesNumber} />}

        {drawPhrase === 2 || drawPhrase === 3 ? (
          <div
            className={`drop-shadow-md absolute inset-x-0 mx-auto -bottom-24 z-0 lg:static lg:scale-125 ${
              drawPhrase === 3 && "hidden lg:block"
            }`}
          >
            <img className="mx-auto" src={Lots} alt="lotscontainer" />
            <img
              className="inset-x-0 mx-auto absolute bottom-0 z-10"
              src={ContainerSurface}
              alt="lotscontainer"
            />
            <img
              className={`left-0 right-0 mx-auto absolute top-0 z-0  ${
                trails.length === 0 && drawPhrase === 2 && "animate-get-pome"
              }`}
              src={LotsOnly}
              alt="lotscontainer"
            />
            <span
              className={`absolute top-[45%]  ${
                pomesNumber > 9
                  ? "left-[57%] lg:left-[59.5%]"
                  : "left-[58.5%] lg:left-[61%]"
              } z-10 rotate-[8deg] text-p3 ${
                trails.length === 0 &&
                drawPhrase === 2 &&
                "animate-fadein-number"
              }`}
            >
              {pomesNumber}
            </span>
          </div>
        ) : (
          <img
            className={`drop-shadow-md absolute inset-x-0 mx-auto -bottom-24 z-0 lg:static lg:scale-125 lg:translate-y-12 ${
              drawPhrase === 1 &&
              "lg:animate-shake-lots-web animate-shake-lots-mobile"
            } ${drawPhrase === 3 && "hidden"}`}
            src={LotsContainer}
            alt="lotscontainer"
          />
        )}
      </div>
    </div>
  );
};

export default DrawLots;

import { useRef, useState } from "react";
import LotsContainer from "../../images/drawLots/lots_container.svg";
import { Button } from "../common/Button";
import Trail from "../../images/drawLots/trial.svg";
import Success from "../../images/drawLots/result_success.svg";
import FailOne from "../../images/drawLots/result_fail_01.svg";
import FailTwo from "../../images/drawLots/result_fail_02.svg";

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

//drawlots step 2 ------ start throw
const DrawThrowStart = ({ userName, nextPhrase }) => {
  const [result, setResult] = useState(0);

  //點擊擲筊
  function generateThrowResult() {
    setResult(Math.floor(Math.random() * 3) + 1);
  }

  //根據擲筊結果顯示圖片
  function showThrowResult() {
    if (result === 1) {
      return Success;
    } else if (result === 2) {
      return FailOne;
    } else if (result === 3) {
      return FailTwo;
    } else {
      return Trail;
    }
  }

  console.log(showThrowResult());

  return (
    <div className="flex flex-col px-3 gap-8 mb-64 lg:mb-0 items-center lg:items-start lg:justify-center lg:gap-8 lg:px-0 lg:w-1/2 pr-4 relative z-10">
      <div className="flex flex-col items-center text-center lg:text-left lg:items-start gap-4 ">
        <h3 className="text-h2 text-p3">{userName}，請在心中默念想問之事</h3>
        <p className="text-lg text-s1">
          擲筊請示神明是否應允賜籤，若獲得聖筊即可去抽籤。
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:gap-8 items-center">
        <div className="flex gap-4">
          <img
            className={`${result === 0 && "animate-scale-all"} `}
            src={showThrowResult}
            alt="drawLotsTrail"
          />
          {result === 1 && (
            <img
              className="animate-scale-all"
              src={Trail}
              alt="drawLotsTrail"
            />
          )}
        </div>
        <Button
          className="flex-1"
          text={"開始擲筊"}
          handleClick={generateThrowResult}
        />
      </div>
    </div>
  );
};

const DrawLots = () => {
  const [drawPhrase, setdrawPhrase] = useState(0);
  const userRef = useRef();
  const [userName, setUserName] = useState(null);

  function nextPhrase() {
    setdrawPhrase(drawPhrase + 1);
  }

  return (
    <div className="container pt-16 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] flex items-center justify-center relative">
      <div className="lg:flex lg:flex-row-reverse lg:items-center lg:gap-24">
        {drawPhrase === 0 && (
          <DrawUserName
            nextPhrase={nextPhrase}
            userRef={userRef}
            setUserName={setUserName}
          />
        )}
        {drawPhrase === 1 && (
          <DrawThrowStart nextPhrase={nextPhrase} userName={userName} />
        )}
        {drawPhrase === 2 && (
          <DrawThrowTrail nextPhrase={nextPhrase} userName={userName} />
        )}
        <img
          className="drop-shadow-md absolute inset-x-0 mx-auto -bottom-24 z-0 lg:static lg:scale-125 lg:translate-y-12"
          src={LotsContainer}
          alt="lotscontainer"
        />
      </div>
    </div>
  );
};

export default DrawLots;

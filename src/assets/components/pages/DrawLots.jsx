import { useRef, useState } from "react";
import LotsContainer from "../../images/drawLots/lots_container.svg";
import { Button } from "../common/Button";

//drawlots step 1 ------ get user name
const DrawUserName = ({ nextPhrase, userRef, setUserName }) => {
  function saveUserName() {
    if (userRef.current.value.length === 0) return;
    setUserName(userRef.current.value);
    nextPhrase();
  }

  return (
    <div className="lg:flex lg:flex-row-reverse lg:items-center lg:gap-12">
      <div className="flex flex-col px-3 gap-8 mb-64 lg:mb-0 items-center lg:items-start lg:justify-center lg:gap-8 lg:px-0">
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
            className="px-3 py-1.5 text-base font-normal text-s1 bg-white bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-white focus:border-p1 focus:outline-none"
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
      <img
        className="absolute inset-x-0 mx-auto -bottom-24 z-0 lg:static"
        src={LotsContainer}
        alt="lotscontainer"
      />
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
      {drawPhrase === 0 && (
        <DrawUserName
          nextPhrase={nextPhrase}
          userRef={userRef}
          setUserName={setUserName}
        />
      )}
    </div>
  );
};

export default DrawLots;

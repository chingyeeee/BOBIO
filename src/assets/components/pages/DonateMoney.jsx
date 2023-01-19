import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LanternLeft from "../../images/donateMoney/lanternL.gif";
import LanternRight from "../../images/donateMoney/lanternR.gif";
import MoneyBox from "../../images/donateMoney/moneybox.gif";
import MoneyBoxAnimation from "../../images/donateMoney/movemoneybox.gif";
import { Button } from "../common/Button";
import {
  NumericFormat,
  PatternFormat,
  NumberFormatBase,
} from "react-number-format";

function CardExpiry(props) {
  const format = (val) => {
    if (val === "") return "";
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && month[0] > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      // set the lower and upper boundary
      if (Number(month) === 0) {
        month = `01`;
      } else if (Number(month) > 12) {
        month = "12";
      }
    }

    return `${month}/${year}`;
  };

  return <NumberFormatBase {...props} format={format} />;
}

const GetDonateAmount = ({
  moneyRef,
  closeModal,
  setMoney,
  setEnterCreditCard,
}) => {
  //save money
  function saveMoney() {
    if (Number(moneyRef.current.value) <= 0) return;
    setMoney(moneyRef.current.value);
    setEnterCreditCard(true);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Dialog.Title as="h3" className="text-lg text-p3">
        請輸入您欲結緣金額
      </Dialog.Title>
      <div className="flex items-center">
        <label
          className="block text-caption text-s1 flex-1 md:flex-auto"
          htmlFor="money"
        >
          結緣金額：
        </label>
        <NumericFormat
          className="px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
          allowLeadingZeros
          thousandSeparator=","
          prefix="$"
          getInputRef={moneyRef}
          placeholder="$1,000"
        />
      </div>
      <div className="flex gap-4">
        <Button text={"取消"} handleClick={closeModal} />
        <Button text={"付款"} handleClick={saveMoney} />
      </div>
    </div>
  );
};

const StartPayment = ({
  money,
  setEnterCreditCard,
  setShowThankyou,
  setShowModal,
  setShowReceiptModal,
  setDonateDate,
}) => {
  const userNameRef = useRef();
  const cardRef = useRef();
  const cardDateRef = useRef();
  const cardCVCRef = useRef();
  const [userNameError, setUserNameError] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [cardDateError, setCardDateError] = useState(false);
  const [cardCVCError, setCardCVCError] = useState(false);
  const [donateRecord, setDonateRecord] = useState({});

  function reEnterDonateAmount() {
    setEnterCreditCard(false);
  }

  function validation(e) {
    if (e.target.id === "username") {
      userNameRef.current.value === ""
        ? setUserNameError(true)
        : setUserNameError(false);
    }

    if (e.target.id === "card") {
      cardRef.current.value === "" ? setCardError(true) : setCardError(false);
    }

    if (e.target.id === "cardDate") {
      cardDateRef.current.value === ""
        ? setCardDateError(true)
        : setCardDateError(false);
    }

    if (e.target.id === "cardCVC") {
      cardCVCRef.current.value === ""
        ? setCardCVCError(true)
        : setCardCVCError(false);
    }
  }

  function handleDonate() {
    if (
      userNameRef.current.value !== "" &&
      cardRef.current.value !== "" &&
      cardDateRef.current.value !== "" &&
      cardCVCRef.current.value !== ""
    ) {
      setDonateRecord({
        money: money,
        username: userNameRef.current.value,
        donateDate: Date.parse(new Date()),
      });
      setShowThankyou(true);
      setShowModal(false);
      setTimeout(() => setShowReceiptModal(true), 3000);
      setDonateDate(Date.parse(new Date()));
    } else {
      userNameRef.current.value === "" && setUserNameError(true);
      cardRef.current.value === "" && setCardError(true);
      cardDateRef.current.value === "" && setCardDateError(true);
      cardCVCRef.current.value === "" && setCardCVCError(true);
    }
  }

  return (
    <>
      <form className="w-full max-w-lg flex flex-col gap-4">
        <Dialog.Title as="h3" className="text-lg text-p3">
          信用卡付款
        </Dialog.Title>

        <div className="flex items-center text-left">
          <label
            className="min-w-[30%] block text-caption text-s1 flex-1 md:flex-auto"
            htmlFor="money"
          >
            結緣金額
          </label>
          <input
            className="w-full px-3 py-1.5 text-base text-s1 lg:py-2 lg:px-4 focus:outline-0"
            type={"text"}
            value={money}
            readOnly
          />
        </div>
        <div>
          <div className="flex items-center text-left">
            <label className="min-w-[30%] block text-caption text-s1">
              持卡人姓名
            </label>
            <input
              label="持卡人姓名"
              className="w-full px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
              id="username"
              type="text"
              ref={userNameRef}
              onBlur={(e) => validation(e)}
            />
          </div>
          {userNameError && (
            <p className="text-caption text-red-400">請輸入持卡人姓名</p>
          )}
        </div>
        <div>
          <div className="flex items-center text-left">
            <label className="min-w-[30%] block text-caption text-s1">
              信用卡號
            </label>
            <PatternFormat
              className="w-full px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
              format="#### #### #### ####"
              getInputRef={cardRef}
              id="card"
              onBlur={(e) => validation(e)}
            />
          </div>
          {cardError && (
            <p className="text-caption text-red-400">請輸入信用卡號</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="md:w-[65%]">
            <div className="flex items-center text-left">
              <label className="min-w-[30%] md:min-w-[48%] block text-caption text-s1">
                有效日期
              </label>
              <CardExpiry
                className="w-[30%] md:w-full px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
                placeholder="MM/YY"
                getInputRef={cardDateRef}
                id="cardDate"
                onBlur={(e) => validation(e)}
              />
            </div>
            {cardDateError && (
              <p className="text-caption text-red-400">請輸入有效日期</p>
            )}
          </div>
          <div className="md:w-[35%]">
            <div className="flex items-center text-left">
              <label className="min-w-[30%] md:min-w-[50%] block text-caption text-s1">
                安全碼
              </label>
              <PatternFormat
                className="w-[20%] md:w-full px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
                format="###"
                placeholder="CVC"
                getInputRef={cardCVCRef}
                id="cardCVC"
                onBlur={(e) => validation(e)}
              />
            </div>
            {cardCVCError && (
              <p className="text-caption text-red-400">請輸入安全碼</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center mt-4">
          <Button text={"返回"} handleClick={reEnterDonateAmount} />
          <Button text={"結緣"} handleClick={handleDonate} />
          {/* <input
            className="bg-p1 px-5 w-max py-2 text-normal md:text-lg text-p3 hover:text-n1 flex items-center gap-3 rounded-btn shadow-lv1"
            type="submit"
            value={"結緣"}
          /> */}
        </div>
      </form>
    </>
  );
};

const DonateModal = ({
  showModal,
  setShowModal,
  setShowThankyou,
  setShowReceiptModal,
  setDonateDate,
  setMoney,
  money,
}) => {
  const [enterCreditCard, setEnterCreditCard] = useState(false);
  const moneyRef = useRef();

  //close modal
  function closeModal() {
    setShowModal(false);
  }

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* modal background transition */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform -translate-y-8 overflow-hidden rounded-xl bg-n1 p-6 shadow-lv1 transition-all">
                {enterCreditCard ? (
                  <StartPayment
                    money={money}
                    setShowModal={setShowModal}
                    setShowThankyou={setShowThankyou}
                    setEnterCreditCard={setEnterCreditCard}
                    setShowReceiptModal={setShowReceiptModal}
                    setDonateDate={setDonateDate}
                  />
                ) : (
                  <GetDonateAmount
                    setMoney={setMoney}
                    closeModal={closeModal}
                    moneyRef={moneyRef}
                    setEnterCreditCard={setEnterCreditCard}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const ReceiptModal = ({
  showReceiptModal,
  setShowReceiptModal,
  donateDate,
  money,
}) => {
  //close modal
  function closeModal() {
    setShowReceiptModal(false);
  }

  return (
    <Transition appear show={showReceiptModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* modal background transition */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[20rem] transform -translate-y-8 overflow-hidden rounded-xl bg-n1 p-6 shadow-lv1 transition-all">
                <div className="flex flex-col items-center gap-8">
                  <Dialog.Title as="h3" className="text-lg text-p3">
                    捐獻完成!
                  </Dialog.Title>
                  <div className="max-w-4/5 grid grid-cols-2 items-center flex-wrap gap-4">
                    <p className="w-full text-caption text-s1 text-start">
                      捐獻編號
                    </p>
                    <p className="w-full text-caption text-s1 text-end">
                      {donateDate}
                    </p>
                    <p className="w-full text-caption text-s1 text-start">
                      捐獻明細
                    </p>
                    <p className="w-full text-caption text-s1 text-end">
                      香油錢
                    </p>
                    <p className="w-full text-caption text-s1 text-start">
                      結緣金額
                    </p>
                    <p className="w-full text-caption text-s1 text-end">
                      {money}
                    </p>
                    <p className="w-full text-caption text-s1 text-start">
                      付款方式
                    </p>
                    <p className="w-full text-caption text-s1 text-end">
                      信用卡
                    </p>
                  </div>
                  <Button text={"返回首頁"} href={"/"} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const DonateMoney = () => {
  const [showModal, setShowModal] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [donateDate, setDonateDate] = useState(null);
  const [money, setMoney] = useState(null);

  function handleModalDisplay() {
    setShowModal(!showModal);
  }

  return (
    <div className="container pt-24 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:h-[calc(100vh_-_156px)] flex items-center justify-center relative">
      <div className="flex justify-between container items-center">
        <img
          className="hidden lg:block lg:w-[15%]"
          src={LanternLeft}
          alt="廣種福田"
        />
        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 flex flex-col items-center gap-4 md:translate-y-12 lg:translate-y-20 xl:translate-y-32">
            <h3 className="text-h2 text-p3">功德箱</h3>
            {showThankyou ? (
              <p className="text-lg text-s1">
                感謝您的樂捐， 盼您擁有美好的每一天！
              </p>
            ) : (
              <p className="text-lg text-s1">點擊下方按鈕結緣，完成樂捐！</p>
            )}
          </div>
          <img src={showThankyou ? MoneyBoxAnimation : MoneyBox} alt="功德箱" />
          {showThankyou ? (
            ""
          ) : (
            <Button
              className="absolute -bottom-[20%] md:bottom-[45%]"
              text={"開始結緣"}
              handleClick={handleModalDisplay}
            />
          )}
        </div>
        <img
          className="hidden lg:block lg:w-[15%]"
          src={LanternRight}
          alt="隨緣樂助"
        />
      </div>
      {/* 結緣彈窗 */}
      {showModal && (
        <DonateModal
          setShowModal={setShowModal}
          showModal={showModal}
          setShowThankyou={setShowThankyou}
          setShowReceiptModal={setShowReceiptModal}
          setDonateDate={setDonateDate}
          money={money}
          setMoney={setMoney}
        />
      )}
      {showReceiptModal && (
        <ReceiptModal
          showReceiptModal={showReceiptModal}
          setShowReceiptModal={setShowReceiptModal}
          donateDate={donateDate}
          money={money}
        />
      )}
    </div>
  );
};

export default DonateMoney;

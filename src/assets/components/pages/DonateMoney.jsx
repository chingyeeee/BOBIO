import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LanternLeft from "../../images/donateMoney/lanternL.gif";
import LanternRight from "../../images/donateMoney/lanternR.gif";
import MoneyBox from "../../images/donateMoney/moneybox.gif";
import MoneyBoxAnimation from "../../images/donateMoney/movemoneybox.gif";
import { Button } from "../common/Button";

const GetDonateAmount = ({
  moneyRef,
  closeModal,
  setMoney,
  setEnterCreditCard,
}) => {
  //save money
  function saveMoney() {
    if (Number(moneyRef.current.value) <= 0) return;
    setMoney(Number(moneyRef.current.value));
    setEnterCreditCard(true);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Dialog.Title as="h3" className="text-lg text-p3">
        請輸入您欲結緣金額
      </Dialog.Title>
      <div className="flex items-center">
        <div className="md:w-1/3">
          <label
            className="block text-caption text-s1 flex-1 md:flex-auto"
            htmlFor="money"
          >
            結緣金額：
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
            id="money"
            type="number"
            placeholder="1000"
            ref={moneyRef}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button text={"取消"} handleClick={closeModal} />
        <Button text={"結緣"} handleClick={saveMoney} />
      </div>
    </div>
  );
};

const StartPayment = ({
  money,
  setEnterCreditCard,
  setShowThankyou,
  setShowModal,
}) => {
  function reEnterDonateAmount() {
    setEnterCreditCard(false);
  }

  function handleDonate() {
    // setShowThankyou(true)
    // setShowModal(false)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Dialog.Title as="h3" className="text-lg text-p3">
        信用卡付款
      </Dialog.Title>
      <div className="flex items-center">
        <div className="md:w-1/3">
          <label
            className="block text-caption text-s1 flex-1 md:flex-auto"
            htmlFor="money"
          >
            結緣金額：
          </label>
        </div>
        <div className="md:w-2/3">
          {/* <input
            className="px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
            id="money"
            type="number"
            placeholder="1000"
            ref={moneyRef}
          /> */}
          <p>NT${money}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button text={"返回"} handleClick={reEnterDonateAmount} />
        <Button text={"結緣"} handleClick={handleDonate} />
      </div>
    </div>
  );
};

const DonateModal = ({ showModal, setShowModal, setShowThankyou }) => {
  const [money, setMoney] = useState(null);
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

const DonateMoney = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);

  function handleModalDisplay() {
    setShowModal(!showModal);
  }

  return (
    <div className="container pt-16 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:h-[calc(100vh_-_156px)] flex items-center justify-center relative">
      <div className="flex justify-between container items-center">
        <img
          className="hidden lg:block lg:w-[15%]"
          src={LanternLeft}
          alt="廣種福田"
        />
        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 flex flex-col items-center gap-4 md:translate-y-12 lg:translate-y-20 xl:translate-y-32">
            <h3 className="text-h2 text-p3">功德箱</h3>
            <p className="text-lg text-s1">點擊下方按鈕結緣，完成樂捐！</p>
          </div>
          <img src={showThankyou ? MoneyBoxAnimation : MoneyBox} alt="功德箱" />
          <Button
            className="absolute -bottom-[20%] md:bottom-[45%]"
            text={"開始結緣"}
            handleClick={handleModalDisplay}
          />
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
        />
      )}
    </div>
  );
};

export default DonateMoney;

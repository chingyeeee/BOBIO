import { Button } from "../common/Button";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { BsPlus, BsDash } from "react-icons/bs";
import { PatternFormat, NumberFormatBase } from "react-number-format";

const BuyProcess = ({ step, text, active }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-2 ${
        active ? "" : "opacity-30"
      }`}
    >
      <span className="text-n1 bg-p3 rounded-full w-8 h-8 flex items-center justify-center">
        {step}
      </span>
      <p className="text-caption md:text-lg text-p3">{text}</p>
    </div>
  );
};

const Item = ({ item, itemList, idx, setTotalPay }) => {
  const [amount, setAmount] = useState(itemList[idx].amount);

  function handleItemAmount(e) {
    if (e.target.id === "minus") {
      if (amount === 1) return;
      setAmount(amount - 1);
      itemList[idx].amount = amount - 1;
    }

    if (e.target.id === "plus") {
      setAmount(amount + 1);
      itemList[idx].amount = amount + 1;
    }

    //根據item amount的新數量重新計算總金額
    let total = 0;
    itemList.map((item) => {
      total += item.amount * item.price;
    });

    setTotalPay(total);
  }

  return (
    <div key={item.id} className="flex bg-n1 px-3 md:px-6 py-3 items-center">
      <p className="hidden md:block text-p3 text-normal w-[20%]">宅配配送</p>
      <div className="w-[95%] flex gap-2 md:items-center md:w-[50%]">
        <div className="relative rounded-xl overflow-hidden w-2/5 md:w-1/5">
          <img src={getImageUrl("amulets", item.zodiacImage)} alt="amulet" />
          <img
            className="absolute inset-0 m-auto w-1/2 translate-y-1"
            src={getImageUrl("pray/gods", item.godImage)}
            alt="god"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-2 grow">
            <p className="text-caption text-p3 md:text-normal">客製化平安符</p>
            <div className="flex gap-2 text-xs md:text-caption text-s1 items-center ">
              {item.category} | {item.zodiac}
            </div>
          </div>
          <div className="flex justify-between md:hidden">
            <p className="text-p3 text-normal">NT$399</p>
            <div className="flex gap-2 items-center">
              <BsDash
                id="minus"
                className="cursor-pointer text-p1"
                size={"1.5rem"}
                onClick={(e) => handleItemAmount(e)}
              />

              <p className="text-p3 text-normal">{amount}</p>

              <BsPlus
                id="plus"
                className="cursor-pointer text-p1"
                size={"1.5rem"}
                onClick={(e) => handleItemAmount(e)}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="hidden md:block text-p3 text-normal w-[20%]">NT$399</p>
      <div className="hidden md:flex gap-2 items-center w-[10%]">
        <BsDash
          id="minus"
          className="cursor-pointer text-p1"
          size={"1.5rem"}
          onClick={(e) => handleItemAmount(e)}
        />
        <p className="text-p3 text-normal">{amount}</p>
        <BsPlus
          id="plus"
          className="cursor-pointer text-p1"
          size={"1.5rem"}
          onClick={(e) => handleItemAmount(e)}
        />
      </div>
      <p className="hidden md:block flex-1 text-p3 text-normal">
        已付款(信用卡)
      </p>
    </div>
  );
};

//確認商品內容
const CheckShoppingItem = ({
  sessionItems,
  shippment,
  totalPay,
  itemList,
  setTotalPay,
  nextStep,
}) => {
  function updateSessionItems() {
    sessionStorage.setItem("items", JSON.stringify(itemList));
    nextStep();
  }

  return (
    <>
      <div className="flex flex-col rounded-xl overflow-hidden">
        <div className="flex bg-p1 px-6 py-3 items-center">
          <p className="hidden md:block w-[20%] text-p3 text-normal">
            配送方式
          </p>
          <p className="w-[50%] text-p3 text-normal">商品資料</p>
          <p className="hidden md:block w-[20%] text-p3 text-normal">
            單件價格
          </p>
          <p className="hidden md:block w-[15%] text-p3 text-normal">數量</p>
        </div>
        {sessionItems.map((item, idx) => (
          <Item
            item={item}
            key={item.id}
            idx={idx}
            itemList={itemList}
            setTotalPay={setTotalPay}
          />
        ))}
      </div>
      <div className="flex flex-col w-[50%] ml-auto gap-2">
        <div className="flex justify-between">
          <p className="text-p3 text-normal md:text-lg">小計：</p>
          <p className="text-p3 text-normal md:text-lg">NT ${totalPay}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-p3 text-normal md:text-lg">運費：</p>
          <p className="text-p3 text-normal md:text-lg">NT ${shippment}</p>
        </div>
        {shippment === 0 && (
          <sub className="text-end my-3 text-red-400">
            * 已符合滿千免運活動資格
          </sub>
        )}
        <div className="flex justify-between border-t-2 border-p3 pt-2">
          <p className="text-p3 text-normal md:text-lg">合計：</p>
          <p className="text-p3 text-normal md:text-lg">
            NT ${totalPay + shippment}
          </p>
        </div>
      </div>
      <Button
        className="ml-auto"
        text={"下一步"}
        handleClick={updateSessionItems}
      />
    </>
  );
};

//填寫收件資料
const FillInDeliveryInfo = ({ nextStep, prevStep }) => {
  const receiverNameRef = useRef();
  const receiverPhoneRef = useRef();
  const receiverAddressRef = useRef();
  const receiverEmailRef = useRef();
  const [receiverNameError, setReceiverNameError] = useState(false);
  const [receiverPhoneError, setReceiverPhoneError] = useState(false);
  const [receiverAddressError, setReceiverAddressError] = useState(false);
  const [receiverEmailError, setReceiverEmailError] = useState(false);
  //訂單紀錄
  const [deliveryRecord, setDeliveryRecord] = useState({});

  function validation(e) {
    if (e.target.id === "receiverName") {
      receiverNameRef.current.value === ""
        ? setReceiverNameError(true)
        : setReceiverNameError(false);
    }

    if (e.target.id === "receiverPhone") {
      receiverPhoneRef.current.value === ""
        ? setReceiverPhoneError(true)
        : setReceiverPhoneError(false);
    }

    if (e.target.id === "receiverAddress") {
      receiverAddressRef.current.value === ""
        ? setReceiverAddressError(true)
        : setReceiverAddressError(false);
    }

    if (e.target.id === "receiverEmail") {
      receiverEmailRef.current.value === ""
        ? setReceiverEmailError(true)
        : setReceiverEmailError(false);
    }
  }

  function handleNextStep() {
    if (
      receiverNameRef.current.value !== "" &&
      receiverPhoneRef.current.value !== "" &&
      receiverAddressRef.current.value !== "" &&
      receiverEmailRef.current.value !== ""
    ) {
      const record = {
        receiverName: receiverNameRef.current.value,
        receiverPhone: receiverPhoneRef.current.value,
        receiverAddress: receiverAddressRef.current.value,
        receiverEmail: receiverEmailRef.current.value,
        recordTime: Date.parse(new Date()),
      };
      setDeliveryRecord(record);
      sessionStorage.setItem("DeliveryRecord", JSON.stringify(record));
      nextStep();
    } else {
      receiverNameRef.current.value === "" && setReceiverNameError(true);
      receiverPhoneRef.current.value === "" && setReceiverPhoneError(true);
      receiverAddressRef.current.value === "" && setReceiverAddressError(true);
      receiverEmailRef.current.value === "" && setReceiverEmailError(true);
    }
  }

  return (
    <div className="rounded-xl overflow-hidden bg-n1">
      <h3 className="bg-p1 text-p3 text-p3 text-normal px-6 py-3">
        收件人資料
      </h3>
      <div className="flex flex-col items-center gap-4 px-6 py-8">
        {/* checkbox */}
        {/* input */}
        <div className="w-full">
          <div className="flex items-center text-left">
            <label className="min-w-[30%] block text-caption text-s1">
              收件人姓名
            </label>
            <input
              label="收件人姓名"
              className="w-full px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
              id="receiverName"
              type="text"
              ref={receiverNameRef}
              onBlur={(e) => validation(e)}
            />
          </div>
          {receiverNameError && (
            <p className="w-[70%] ml-auto pt-2 text-caption text-red-400">
              請輸入收件人姓名
            </p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center text-left">
            <label className="min-w-[30%] block text-caption text-s1">
              收件人電話
            </label>
            <input
              label="收件人電話"
              className="w-full px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
              id="receiverPhone"
              type="number"
              ref={receiverPhoneRef}
              onBlur={(e) => validation(e)}
            />
          </div>
          {receiverPhoneError && (
            <p className="w-[70%] ml-auto pt-2 text-caption text-red-400">
              請輸入收件人電話
            </p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center text-left">
            <label className="min-w-[30%] block text-caption text-s1">
              電子信箱
            </label>
            <input
              label="電子信箱"
              className="w-full px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
              id="receiverEmail"
              type="email"
              ref={receiverEmailRef}
              onBlur={(e) => validation(e)}
            />
          </div>
          {receiverEmailError && (
            <p className="w-[70%] ml-auto pt-2 text-caption text-red-400">
              請輸入電子信箱
            </p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center text-left">
            <label className="min-w-[30%] block text-caption text-s1">
              收件地址
            </label>
            <input
              label="收件地址"
              className="w-full px-3 py-1.5 text-base text-s1 bg-p2 bg-clip-padding border border-solid border-s1 rounded-xl transition ease-in-out m-0 focus:text-p3 focus:bg-p2 focus:border-p1 focus:outline-none lg:py-2 lg:px-4"
              id="receiverAddress"
              type="text"
              ref={receiverAddressRef}
              onBlur={(e) => validation(e)}
            />
          </div>
          {receiverAddressError && (
            <p className="w-[70%] ml-auto pt-2 text-caption text-red-400">
              請輸入收件地址
            </p>
          )}
        </div>
        <div className="flex items-center gap-6">
          <Button className="mt-6" text={"上一步"} handleClick={prevStep} />
          <Button
            className="mt-6"
            text={"下一步"}
            handleClick={handleNextStep}
          />
        </div>
      </div>
    </div>
  );
};

//線上付款
const PaymentDetail = ({
  totalPay,
  nextStep,
  setStep,
  orderRecord,
  setOrderRecord,
}) => {
  const userNameRef = useRef();
  const cardRef = useRef();
  const cardDateRef = useRef();
  const cardCVCRef = useRef();
  const [userNameError, setUserNameError] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [cardDateError, setCardDateError] = useState(false);
  const [cardCVCError, setCardCVCError] = useState(false);

  function getOrderNo() {
    const orderRecord = JSON.parse(sessionStorage.getItem("DeliveryRecord"));
    setOrderRecord(orderRecord);
  }

  useEffect(() => {
    getOrderNo();
  }, []);

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

  function handlePay() {
    if (
      userNameRef.current.value !== "" &&
      cardRef.current.value !== "" &&
      cardDateRef.current.value !== "" &&
      cardCVCRef.current.value !== ""
    ) {
      nextStep();
    } else {
      userNameRef.current.value === "" && setUserNameError(true);
      cardRef.current.value === "" && setCardError(true);
      cardDateRef.current.value === "" && setCardDateError(true);
      cardCVCRef.current.value === "" && setCardCVCError(true);
    }
  }

  function backToShoppingCart() {
    setStep(1);
  }

  return (
    <div className="rounded-xl overflow-hidden bg-n1">
      <h3 className="bg-p1 text-p3 text-p3 text-normal px-6 py-3">付款方式</h3>

      <div className="flex flex-col items-center gap-4 px-6 py-8">
        {/* radio button */}
        <div className="w-full flex items-center text-left">
          <label
            className="min-w-[30%] block text-caption text-s1"
            htmlFor="orderNum"
          >
            訂單編號
          </label>
          <input
            className="w-full text-base text-s1 focus:outline-0"
            type={"text"}
            defaultValue={orderRecord.recordTime}
            readOnly
          />
        </div>
        <div className="w-full flex items-center text-left">
          <label
            className="min-w-[30%] block text-caption text-s1"
            htmlFor="orderNum"
          >
            訂單金額
          </label>
          <input
            className="w-full text-base text-s1 focus:outline-0"
            type={"text"}
            value={`$${totalPay}`}
            readOnly
          />
        </div>
        <div className="w-full">
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
            <p className="w-[70%] ml-auto pt-2 text-caption text-red-400">
              請輸入持卡人姓名
            </p>
          )}
        </div>
        <div className="w-full">
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
            <p className="w-[70%] ml-auto pt-2 text-caption text-red-400">
              請輸入信用卡號
            </p>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              <p className="w-[70%] ml-auto pt-2 text-caption text-red-400">
                請輸入有效日期
              </p>
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
              <p className="w-[70%] ml-auto pt-2 text-caption text-red-400">
                請輸入安全碼
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="mt-6"
            text={"取消"}
            handleClick={backToShoppingCart}
          />
          <Button className="mt-6" text={"付款"} handleClick={handlePay} />
        </div>
      </div>
    </div>
  );
};

//訂單確認後的Item
const ItemRecord = ({ item }) => {
  return (
    <div key={item.id} className="flex bg-n1 px-3 md:px-6 py-3 items-center">
      <p className="hidden md:block w-[15%] text-p3 text-normal">訂單編號</p>
      <p className="hidden md:block text-p3 text-normal w-[15%]">宅配配送</p>
      <div className="w-[95%] flex gap-2 md:items-center md:w-[30%]">
        <div className="relative rounded-xl overflow-hidden w-2/5 md:w-2/5">
          <img src={getImageUrl("amulets", item.zodiacImage)} alt="amulet" />
          <img
            className="absolute inset-0 m-auto w-1/2 translate-y-1"
            src={getImageUrl("pray/gods", item.godImage)}
            alt="god"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-2 grow">
            <p className="text-caption text-p3 md:text-normal">客製化平安符</p>
            <div className="flex gap-2 text-xs md:text-caption text-s1 items-center ">
              {item.category} | {item.zodiac}
            </div>
          </div>
          <div className="flex justify-between md:hidden">
            <p className="text-p3 text-normal">NT$399</p>
            <div className="flex gap-2 items-center">
              <p className="text-p3 text-normal">{item.amount}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="hidden md:block text-p3 text-normal w-[15%]">NT$399</p>
      <div className="hidden md:flex gap-2 items-center w-[8%]">
        <p className="text-p3 text-normal">{item.amount}</p>
      </div>
      <p className="hidden md:block flex-1 text-p3 text-normal">
        已付款(信用卡)
      </p>
    </div>
  );
};

//完成訂單
const CompleteShopping = ({ sessionItems }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden">
      <div className="flex bg-p1 px-6 py-3 items-center">
        <p className="hidden md:block w-[20%] text-p3 text-normal">配送方式</p>
        <p className="w-[50%] text-p3 text-normal">商品資料</p>
        <p className="hidden md:block w-[20%] text-p3 text-normal">單件價格</p>
        <p className="hidden md:block w-[15%] text-p3 text-normal">數量</p>
      </div>
      {sessionItems.map((item) => (
        <ItemRecord item={item} key={item.id} />
      ))}
    </div>
  );
};

const ShoppingCart = () => {
  //session storage 裡面的items
  const [sessionItems, setSessionItems] = useState([]);
  //獨立items的id跟amount
  const [itemList, setItemList] = useState([]);
  //總金額
  const [totalPay, setTotalPay] = useState(0);
  //預設運費
  const [shippment, setShippment] = useState(60);
  //購物車步驟
  const [step, setStep] = useState(1);
  //訂單紀錄
  const [orderRecord, setOrderRecord] = useState({});

  function nextStep() {
    setStep(step + 1);
  }

  function prevStep() {
    setStep(step - 1);
  }

  function getSessionItems() {
    const shoppingCartItems = JSON.parse(sessionStorage.getItem("items"));
    let total = 0;

    if (shoppingCartItems) {
      //1.把session裡的購物車清單儲存到sessionItems
      setSessionItems(shoppingCartItems);

      //2.儲存獨立items
      setItemList(shoppingCartItems);

      //3.計算totalPayment
      shoppingCartItems.map((item) => {
        total += item.amount * item.price;
      });

      setTotalPay(total);
    }
  }

  function handlePrice() {
    if (totalPay >= 1000) {
      setShippment(0);
    } else {
      setShippment(60);
    }
  }

  useEffect(() => {
    getSessionItems();
  }, []);

  useEffect(() => {
    handlePrice();
  }, [totalPay]);

  return (
    <div className="container pt-24 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] flex items-center justify-center pb-12 lg:pt-24 lg:pb-12">
      <div className="w-full px-3 flex flex-col gap-12 md:gap-14 lg:gap-16">
        <div className="w-full flex justify-between md:justify-around lg:justify-center lg:gap-20">
          <BuyProcess step={1} text={"查看購物車"} active={step === 1} />
          <BuyProcess step={2} text={"填寫收件資料"} active={step === 2} />
          <BuyProcess step={3} text={"線上付款"} active={step === 3} />
          <BuyProcess step={4} text={"訂單確認"} active={step === 4} />
        </div>
        {step === 1 && (
          <CheckShoppingItem
            sessionItems={sessionItems}
            shippment={shippment}
            totalPay={totalPay}
            nextStep={nextStep}
            itemList={itemList}
            setTotalPay={setTotalPay}
          />
        )}
        {step === 2 && (
          <FillInDeliveryInfo nextStep={nextStep} prevStep={prevStep} />
        )}
        {step === 3 && (
          <PaymentDetail
            totalPay={totalPay}
            nextStep={nextStep}
            setStep={setStep}
            orderRecord={orderRecord}
            setOrderRecord={setOrderRecord}
          />
        )}
        {step === 4 && <CompleteShopping sessionItems={sessionItems} />}
      </div>
    </div>
  );
};

export default ShoppingCart;

import { Button } from "../common/Button";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";

const BuyProcess = ({ step, text, active }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-2 ${
        active ? "" : "opacity-30"
      }`}
    >
      <span className="text-n1 bg-p3 rounded-full px-3 py-1 flex items-center justify-center">
        {step}
      </span>
      <p className="text-caption md:text-lg text-p3">{text}</p>
    </div>
  );
};

const Item = ({ item, itemAmount, idx }) => {
  return (
    <div key={item.id} className="flex bg-n1 px-3 md:px-6 py-3 items-center">
      <p className="hidden md:block w-[20%] text-p3 text-normal">宅配配送</p>
      <div className="w-[95%] md:w-[50%] flex gap-2 md:items-center">
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
              <span
                id="minus"
                className="cursor-pointer bg-p3 text-n1 px-1.5 rounded"
                onClick={() => console.log(item.id)}
              >
                −
              </span>
              <p className="text-p3 text-normal">{itemAmount[idx].amount}</p>
              <span
                id="plus"
                className="cursor-pointer bg-p3 text-n1 px-1.5 rounded"
              >
                +
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="hidden md:block w-[20%] text-p3 text-normal">NT$399</p>
      <div className="hidden md:flex w-[15%] gap-2 items-center ">
        <span
          id="minus"
          className="cursor-pointer bg-p3 text-n1 px-1.5 rounded"
        >
          −
        </span>
        <p className="text-p3 text-normal">{itemAmount[idx].amount}</p>

        <span id="plus" className="cursor-pointer bg-p3 text-n1 px-1.5 rounded">
          +
        </span>
      </div>
    </div>
  );
};

const CheckShoppingItem = ({
  items,
  shippment,
  itemAmount,
  setItemAmout,
  totalPay,
}) => {
  function handleItemAmount(e) {
    e.preventDefault();

    //傳入item id 修改itemAmount裡面的內容
    // 1. onClick傳入e.target.id & item.id
    // 2. 用itemAmount.filter(item=>item.id === item.id)找到對應的item內容
    // 3. 改寫amount再傳回itemAmount
    // 4. setItemAmount([...itemAmount,])

    // e.target.id === "minus" && amount > 1 && setAmount(amount - 1);
    // e.target.id === "plus" && setAmount(amount + 1);
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
        {items.map((item, idx) => (
          <Item
            item={item}
            key={idx}
            idx={idx}
            itemAmount={itemAmount}
            setItemAmout={setItemAmout}
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
      <Button className="ml-auto" text={"下一步"} />
    </>
  );
};

const FillInDeliveryInfo = () => {
  const receiverNameRef = useRef();
  const receiverPhoneRef = useRef();
  const receiverAddressRef = useRef();
  const receiverEmailRef = useRef();

  return (
    <div className="rounded-xl overflow-hidden bg-n1">
      <h3 className="bg-p1 text-lg text-p3">收件人資料</h3>
      <div className="flex flex-col items-center gap-4">
        {/* checkbox */}
        {/* input */}
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
            // onBlur={(e) => validation(e)}
          />
        </div>
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
            // onBlur={(e) => validation(e)}
          />
        </div>
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
            // onBlur={(e) => validation(e)}
          />
        </div>
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
            // onBlur={(e) => validation(e)}
          />
        </div>
        <Button text={"下一步"} />
      </div>
    </div>
  );
};

const PaymentDetail = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-n1">
      <h3 className="bg-p1 text-lg text-p3">付款方式</h3>
      <div className="flex flex-col gap-4">
        {/* radio button */}
        <div className="flex flex-col gap-4"></div>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [itemAmount, setItemAmout] = useState([]);
  const [totalPay, setTotalPay] = useState(0);
  const [shippment, setShippment] = useState(60);
  const [step, setStep] = useState(1);

  console.log(itemAmount);

  function getSessionItems() {
    const items = JSON.parse(sessionStorage.getItem("items"));

    if (items) {
      //1.把session裡的購物車清單儲存到items
      setItems(items);

      //2.把items裡的商品id跟對應的數量抓出來，方便即時更新畫面的商品數量
      setItemAmout(
        items.map((item) => {
          return {
            id: item.id,
            amount: item.amount,
            price: item.price,
          };
        })
      );

      //3.計算totalPayment
      let total = 0;
      items.map((item) => {
        total += item.amount * item.price;
      });
      setTotalPay(total);
    }
  }

  function handlePrice() {
    if (totalPay >= 1000) setShippment(0);
  }

  useEffect(() => {
    getSessionItems();
  }, []);

  useEffect(() => {
    handlePrice();
  }, [totalPay]);

  return (
    <div className="container pt-24 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] flex items-center justify-center pb-12 lg:pb-0">
      <div className="w-full px-3 flex flex-col gap-12 md:gap-14 lg:gap-16">
        <div className="w-full flex justify-between md:justify-around lg:justify-center lg:gap-20">
          <BuyProcess step={step} text={"查看購物車"} active={step === 1} />
          <BuyProcess step={step} text={"填寫收件資料"} active={step === 2} />
          <BuyProcess step={step} text={"線上付款"} active={step === 3} />
          <BuyProcess step={step} text={"訂單確認"} active={step === 4} />
        </div>
        {step === 1 && (
          <CheckShoppingItem
            items={items}
            shippment={shippment}
            totalPay={totalPay}
            itemAmount={itemAmount}
            setItemAmout={setItemAmout}
          />
        )}
        {step === 2 && <FillInDeliveryInfo />}
        {step === 3 && <PaymentDetail />}
      </div>
    </div>
  );
};

export default ShoppingCart;

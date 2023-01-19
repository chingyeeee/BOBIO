import { Button } from "../common/Button";
import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";

const BuyProcess = ({ satge, text, active }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-2 ${
        active ? "" : "opacity-30"
      }`}
    >
      <span className="text-n1 bg-p3 rounded-full px-3 py-1 flex items-center justify-center">
        {satge}
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

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [itemAmount, setItemAmout] = useState([]);

  console.log(itemAmount);

  function getSessionItems() {
    const items = JSON.parse(sessionStorage.getItem("items"));

    if (items) {
      //1.把session裡的購物車清單儲存到items
      setItems(items);

      //2.把items裡的商品id跟對應的數量抓出來，方便即時更新畫面的商品數量
      setItemAmout(
        items.map((item) => {
          return { id: item.id, amount: item.amount };
        })
      );
    }
  }

  function handleItemAmount(e) {
    e.preventDefault();
    // e.target.id === "minus" && amount > 1 && setAmount(amount - 1);
    // e.target.id === "plus" && setAmount(amount + 1);
  }

  useEffect(() => {
    getSessionItems();
  }, []);

  return (
    <div className="container pt-24 lg:py-0 mx-auto min-h-[calc(100vh_-_173px)] md:min-h-[calc(100vh_-_156px)] flex items-center justify-center pb-12 lg:pb-0">
      <div className="w-full px-3 flex flex-col gap-12 md:gap-14 lg:gap-16">
        <div className="w-full flex justify-between md:justify-around lg:justify-center lg:gap-20">
          <BuyProcess satge={1} text={"查看購物車"} active />
          <BuyProcess satge={2} text={"填寫收件資料"} />
          <BuyProcess satge={3} text={"線上付款"} />
          <BuyProcess satge={4} text={"訂單確認"} />
        </div>
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
            <Item item={item} key={idx} idx={idx} itemAmount={itemAmount} />
          ))}
        </div>
        <div className="flex flex-col w-[50%] ml-auto gap-2">
          <div className="flex justify-between">
            <p className="text-p3 text-normal md:text-lg">小計：</p>
            <p className="text-p3 text-normal md:text-lg">
              NT ${items.length * 399}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-p3 text-normal md:text-lg">運費：</p>
            <p className="text-p3 text-normal md:text-lg">NT $60</p>
          </div>
          <div className="flex justify-between border-t-2 border-p3 pt-2">
            <p className="text-p3 text-normal md:text-lg">合計：</p>
            <p className="text-p3 text-normal md:text-lg">
              NT ${items.length * 399 + 60}
            </p>
          </div>
        </div>
        <Button className="ml-auto" text={"下一步"} />
      </div>
    </div>
  );
};

export default ShoppingCart;

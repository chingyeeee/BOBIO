import { CgMouse } from "react-icons/cg";
import { BsChevronDoubleDown } from "react-icons/bs";

export const FullBanner = ({ slogan }) => {
  return (
    <div className="relative flex items-center justify-center bg-fullbanner h-[calc(100vh_-_15vh)] bg-center bg-cover">
      <p className="absolute text-n1 text-h1 md:text-5xl xl:text-6xl font-rocknroll">
        {slogan}
      </p>
      <div className="absolute bottom-12 flex flex-col items-center ">
        <CgMouse color="#ffffff" strokeWidth={"0.5"} size={"2.5rem"} />
        <BsChevronDoubleDown
          className="animate-scroll-down"
          color="#ffffff"
          strokeWidth={"0.5"}
          size={"1.5rem"}
        />
      </div>
    </div>
  );
};

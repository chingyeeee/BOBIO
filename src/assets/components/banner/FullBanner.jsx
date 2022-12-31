export const FullBanner = ({ slogan }) => {
  return (
    <div className="relative flex items-center justify-center bg-fullbanner h-[calc(100vh_-_15vh)] bg-center bg-cover">
      <p className="absolute text-n1 text-h1 md:text-6xl xl:text-8xl font-rocknroll">
        {slogan}
      </p>
    </div>
  );
};

import { Link } from "react-router-dom";

export const Button = ({ text, icon }) => {
  return (
    <Link className="bg-p1 px-3 py-2 text-p3 hover:text-n1 flex gap-3">
      {text}
      {icon}
    </Link>
  );
};

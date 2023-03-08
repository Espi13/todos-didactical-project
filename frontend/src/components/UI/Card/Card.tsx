import { FC, ReactNode } from "react";

import classes from "./Card.module.css";

interface ICardProps {
  className: string;
  children: ReactNode;
}

const Card: FC<ICardProps> = ({ className, children }) => {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
};

export default Card;

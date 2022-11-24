import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={`${classes.card}`}>{props.children}</div>
  );
};

export default Modal;

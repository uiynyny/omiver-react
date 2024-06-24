import React from "react";
import "./message.css"

const Message = ({ message }: { message: string }) => {
  return <div className="display-linebreak">{message}</div>;
};

export default Message;



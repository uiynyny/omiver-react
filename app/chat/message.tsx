import React from "react";
import "./message.css"

const Message = ({ message }: { message: { type: string, value: string } }) => {
  if (message.type == 'Omiver')
    return <div className="display-linebreak">
      <h3 color="#1ea">Omiver: </h3>
      {message.value}
    </div>;
  return <div style={{ textAlign: 'right' }}>
    <p color="#eee">Me: </p>
    {message.value}
  </div>
};

export default Message;



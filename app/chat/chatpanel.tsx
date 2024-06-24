"use client";
import React from "react";
import axios from "axios";
import Message from "./message";

import "./chatpanel.css";

const ChatPanel = () => {
  const [text, setText] = React.useState<string>("");
  const [messagelist, setMessagelist] = React.useState<string[]>([]);

  async function sendInput() {
    setMessagelist((prev) => prev.concat(text));
    const res = await axios.post("/chat", { question: text });
    let r = res.data.data[0];
    addResponse(r);
  }
  function addResponse(res: string) {
    console.log("adding response", res);
    setMessagelist((prev) => prev.concat(res));
  }
  return (
    <div className="chat">
      <div className="center">
        {messagelist.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="bottom">
        <div className="icons"></div>
        <input
          type="text"
          placeholder="Type a message"
          onChange={(e) => setText(e.target.value)}
        />
        <button className="sendButton" onClick={sendInput}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;

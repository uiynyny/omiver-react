"use client";
import React from "react";
import axios from "axios";
import Message from "./message";

import "./chatpanel.css";

type profile = {
  name: string
  age: number
  height: number
  weight: number
  sex: string
  race: string
  goal: string
}
const ChatPanel = () => {
  const [text, setText] = React.useState<string>("");
  const [profile, setProfile] = React.useState<profile>({ sex: "Male", race: "White", goal: "Maintaining Weight" });
  const [err, setErr] = React.useState<string>("");
  const [messagelist, setMessagelist] = React.useState<{ type: string, value: string }[]>([]);

  function composeIntro(profile: profile) {
    return `I am ${profile?.name}, ${profile?.sex}, height ${profile?.height}m, weight ${profile.weight}kg, race ${profile?.race}, My goals is ${profile?.goal}.`
  }

  function validateProfile() {
    console.log(profile)
    if (!profile?.name) {
      return "invalid name"
    }
    if (!profile?.age) {
      return "invalid age"
    }
    if (!profile?.goal) {

      return "invalid goal"
    }
    if (!profile?.height) {
      return "invalid height"
    }
    if (!profile?.race) {
      return "invalid race"
    }
    if (!profile?.sex) {
      return "invalid sex"
    }
    if (!profile?.weight) {
      return "invalid weight"
    }
    return null
  }

  async function sendInput() {
    let err = validateProfile()
    if (err) {
      setErr(err)
      return
    }
    setErr("")
    let intro = composeIntro(profile)
    setMessagelist((prev) => prev.concat({ type: "user", value: intro + text }));
    const res = await axios.post("/chat", { question: intro });
    setText('')
    addResponse(res.data.data[0]);
  }
  function addResponse(res: string) {
    setMessagelist((prev) => prev.concat({ type: "Omiver", value: res }));
  }
  return (
    <div className="chat">
      <div className="center">
        {messagelist.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="bottom flex p-5">
        <div className="flex flex-col">
          {err ? <span style={{ color: "#f00" }}>{err}</span> : <></>}
          <div className="columns-2">
            <div>
              <div className="col-25"><p className="text-xl">name </p></div>
              <input
                className="col-75"
                type="text"
                id="name"
                name="Name"
                onChange={e => setProfile(prev => { return { ...prev, name: e.target.value } })}
              />
            </div>
            <div className="col-25"><p className="text-xl">age </p></div>
            <input
              className="col-75"
              type="number"
              min={0}
              id="age"
              name="Age"
              onChange={e => setProfile({ ...profile, age: parseInt(e.target.value) })}
            />
            <div className="col-25"><p className="text-xl">height (m) </p></div>
            <input
              className="col-75"
              type="text"
              pattern="^\d*(\.\d{0,2})?$"
              id="height"
              name="Height"
              onChange={e => setProfile({ ...profile, height: parseFloat(e.target.value) })}
            />
            <div className="col-25"><p className="text-xl">weight (kg)</p></div>
            <input
              className="col-75"
              type="number"
              id="weight"
              name="Weight"
              onChange={e => setProfile({ ...profile, weight: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex flex-row">
            <div className="col-25"><p className="text-xl">Sex</p></div>
            <select
              style={{ color: "black" }}
              id="sex"
              name="Sex"
              defaultValue={"Male"}
              onChange={e => setProfile({ ...profile, sex: e.target.value })}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <div className="col-25"><p className="text-xl">Race</p></div>
            <select
              style={{ color: "black" }}
              id="race"
              name="race"
              defaultValue={"White"}
              onChange={e => setProfile({ ...profile, race: e.target.value })}
            >
              <option>White</option>
              <option>African American</option>
              <option>Asian</option>
              <option>Hispanic/Latino</option>
              <option>Native American</option>
              <option>Other</option>
            </select>
            <p>Exercise Goal</p>
            <select
              style={{ color: "#000" }}
              id="goal"
              name="Goal"
              defaultValue={"Maintaining Weight"}
              onChange={e => setProfile({ ...profile, goal: e.target.value })}
            >
              <option>Bulking</option>
              <option>Cutting</option>
              <option>Maintaining Weight</option>
            </select>
          </div>
          {/* <input
            className="w-full h-40"
            type="text"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          /> */}
          <button className="sendButton m-5" onClick={sendInput}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;

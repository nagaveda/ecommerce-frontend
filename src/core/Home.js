import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";

export default function Home() {
  return (
    <Base title="Homepage" description="Welcome to the Store!">
      <div className="row text-center">
        <div className="col-4 ">
          {/* <button className="btn-success">Test</button> */}
          <Card/>
        </div>
        <div className="col-4 ">
          {/* <button className="btn-success">Test</button> */}
          <Card/>
        </div>
        <div className="col-4 ">
          {/* <button className="btn-success">Test</button> */}
          <Card/>
        </div>
      </div>
    </Base>
  );
}

import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
export default function Home() {
  return (
    <Base title="Homepage" description="Welcome to the Store!">
      <div className="row">
        <div className="col-4 ">
          <button className="btn-success">Test</button>
        </div>
        <div className="col-4 ">
          <button className="btn-success">Test</button>
        </div>
        <div className="col-4 ">
          <button className="btn-success">Test</button>
        </div>
      </div>
    </Base>
  );
}

import React from "react";
import { width, display, height } from "@material-ui/system";
import { grey } from "@material-ui/core/colors";

const Progressbar = ({ score, max, min }) => {
  return (
    <div
      className="container"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        border: "2px black solid",

        height: "fit-content"
      }}
    >
      <div
        className="min"
        style={{
          height: "30px",

          width: ` ${min}%`,
          background: "black"
        }}
      ></div>

      <div
        className="score"
        style={{
          height: "30px",
          width: `${score}%`,

          background: "rgb(87, 84, 84)"
        }}
      ></div>

      <div
        className="max"
        style={{
          height: "30px",
          width: ` ${max}%`,
          background: "gray"
        }}
      ></div>
    </div>
  );
};

export default Progressbar;

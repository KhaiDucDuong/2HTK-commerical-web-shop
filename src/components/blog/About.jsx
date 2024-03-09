import React, { lazy } from "react";
const Line = lazy(() => import("../others/Line"));

const About = (props) => {
  return (
    <div
      className={`p-4 mb-3 bg-light rounded ${
        props.className ? props.className : ""
      }`}
    >
      <h4 className="fst-italic">{props.title}</h4>
      <Line className="mb-2" />
      <p className="mb-0">
        Tien gie dep trai
      </p>
    </div>
  );
};
export default About;

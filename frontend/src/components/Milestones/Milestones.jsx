import React from "react";
import { Label } from "semantic-ui-react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./Milestones.css";
import Legend from "./Legend";

const Milestones = ({ hours }) => {
  hours = (hours / 50) * 100;
  console.log(hours);
  return (
    <div
      style={{
        margin: "5%",
        padding: "20px",
        background: "white",
      }}
    >
      <div>
        <ProgressBar
          percent={hours}
          filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              ></div>
            )}
          </Step>
          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                20 hr
              </div>
            )}
          </Step>
          <Step>{({}) => <div />}</Step>
          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                50&nbsp;hr
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
      <Legend />
    </div>
  );
};

Milestones.defaultProps = {
  hours: 0,
};

export default Milestones;

import React from "react";
// import { Label } from "semantic-ui-react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./Milestones.css";
import Legend from "./Legend";

function Milestones({ hours }) {
  const newHours = (hours / 50) * 100;
  console.log(newHours);
  return (
    <div
      style={{
        margin: "5%",
        padding: "20px",
        backgroundColor: " rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(60px)",
        borderRadius: "10px",
      }}
    >
      <div className="bar">
        <ProgressBar
          percent={newHours}
          filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              />
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
}

Milestones.defaultProps = {
  hours: 0,
};

export default Milestones;

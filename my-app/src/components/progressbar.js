import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Logo from "./../img/clover.png";
import { Progress } from 'reactstrap';
 
export default class StepProgressBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {tabs:props.progress};
  }

  render() {
    return (
          <Progress animated color="success" value={this.props.level} />
          /*<Step transition="scale">
            {({ accomplished, index }) => (
              <div
                className={`transitionStep ${accomplished ? "accomplished" : null}`}
              >
                🌑
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished, index }) => (
              <div
                className={`transitionStep ${accomplished ? "accomplished" : null}`}
              >
                🌒
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished, index }) => (
              <div
                className={`transitionStep ${accomplished ? "accomplished" : null}`}
              >
                🌓
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished, index }) => (
              <div
                className={`transitionStep ${accomplished ? "accomplished" : null}`}
              >
                🌔
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished, index }) => (
              <div
                className={`transitionStep ${accomplished ? "accomplished" : null}`}
              >
                🌕
              </div>
            )}
          </Step>
        </ProgressBar>*/
    );
  }
}

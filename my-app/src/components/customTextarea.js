import React from 'react';
import "./../css/customTextarea.css";
import SendButton from './../components/sendButton';

const DEFAULT_HEIGHT = 70;

export default class Textarea extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    height: DEFAULT_HEIGHT,
    value: this.props.value,
  };

  this.setValue = this.setValue.bind(this);
  this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
}
componentDidMount() {
  this.mounted = true;
  this.setFilledTextareaHeight();
}

// Update when messages change
componentDidUpdate(prevProps, prevState) {
  if (prevProps.value !== this.props.value) {
    this.setState({value : this.props.value});
  }
}

componentWillReceiveProps(nextProps){
    if(this.props.update != nextProps.update){
        this.setState({ value: " " });
        this.refs.bar.value = " ";
    }
}

setFilledTextareaHeight() {
  if (this.mounted) {
    const element = this.ghost;
    this.setState({
      height: element.clientHeight,
    });
  }
}

setValue(event) {
  const { value } = event.target;
  this.setState({ value });
  this.props.parentCallback(value);
}

getExpandableField() {
  const isOneLine = this.state.height <= DEFAULT_HEIGHT;
  const { height, value } = this.state;
  return (
      <div className='text-area'>
        <textarea
            className="textarea"
            name="textarea"
            id="textarea"
            ref="bar"
            autoFocus={true}
            maxlength={256}
            value={this.state.value}
            style={{
              height,
              resize: isOneLine ? "none" : null
            }}
            onChange={this.setValue}
            onKeyUp={this.setFilledTextareaHeight}
        />
      </div>
    );
}

getGhostField() {
  return (
      <div
        className="textarea textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {this.state.value}
      </div>
    );
}

render() {
  return (
    <div className="chat-wrapper">
      <div className="containerTextarea">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
    </div>
    );
  }
}

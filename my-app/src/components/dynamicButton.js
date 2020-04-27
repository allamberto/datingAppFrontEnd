import React from "react";
import { Button } from "react-bootstrap";
import Textbox from './textbox';
import ImageUpload from './image';

function Funfact(props) {
    return (
      <div>
	<Textbox placeholder="Enter a caption" header="Fun Fact Caption" className="form-control"/>
        <ImageUpload callback={props.callback}/>
      </div>
    );
}

class DynamicButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputs: ['input-0'] };
        this.appendInput = this.appendInput.bind(this);
    }

    render() {
        return(
            <div>
            <div id="dynamicInput">
                {this.state.inputs.map(input => <Funfact callback={this.props.callback}/>)}
            </div>
            <div className="plus-container">
               <button className="plus" onClick={ () => this.appendInput() } />
            </div>
            </div>
        );
    }

    appendInput() {
        var newInput = `input-${this.state.inputs.length}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    }
}

export default DynamicButton;



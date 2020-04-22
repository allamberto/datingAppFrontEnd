import React from "react";
import { Button } from "react-bootstrap";

function Textbox(props) {
    return (
    <div align="form-group">
        <input type="text" className="form-control" placeholder={props.placeholder}/>
    </div>);
}

class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputs: ['input-0'] };
        this.appendInput = this.appendInput.bind(this);
    }

    render() {
        return(
            <div>
            <div id="dynamicInput">
                {this.state.inputs.map(input => <Textbox placeholder={this.props.placeholder} />)}
            </div>
            <div className="plus-container">
               <Button variant="success" className="plus" onClick={ () => this.appendInput() }>
                   +
               </Button>
            </div>
            </div>
        );
    }

    appendInput() {
        var newInput = `input-${this.state.inputs.length}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    }
}

export default MultipleChoice;



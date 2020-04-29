import React from "react";
import { Button } from "react-bootstrap";
import X from './../img/x.png';
import './../css/dynamicButton.css';

function Funfact(props) {
    return (
      <div>
	<p className="section-subclass">Fun Fact Caption</p>
	<input placeholder="Enter Fun Fact" className="form-control prompt-control" onChange={event => props.callback(event.target.value, props.num)}/>
        <input type="file" className="file-input" onChange={event => props.fileCallback(event.target.value, props.num)}/>
      </div>
    );
}

class LoadOld extends React.Component {
    render() {
	var rows = [];
	
	for(var i of this.props.items) {
         var id = i.id;
	     rows.push(
		<div className="delete-funfact">
		  <p className="section-subclass delete-funfact-text">{i.caption}</p>
		  <img src={X} className="delete-funfact-image" onClick={this.props.deleteCallback.bind(this, id)}/>
		</div>
	     );
	}
	return rows;	
    }
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
		        <LoadOld items={this.props.oldFunfacts} deleteCallback={this.props.deleteCallback}/>
                {this.state.inputs.map(input => <Funfact fileCallback={this.props.fileCallback} callback={this.props.callback} num={this.state.inputs.length}/>)}
            </div>
            <div className="plus-container-dynamic">
               <button className="plus-dynamic" onClick={ () => this.appendInput() }/>
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



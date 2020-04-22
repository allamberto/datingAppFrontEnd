import React from 'react';
import TJ from "./../img/TJ.png";
import "./../css/prompt.css";
import {Form} from 'react-bootstrap';

class Prompt extends React.Component {

    render() {
         return (
            <Form>
            <div className="prompt-container">  
              <Form.Group controlId="prompt.Textarea">
                <Form.Label>{this.props.question}</Form.Label>
                <Form.Control as="textarea" rows="2" placeholder={this.props.placeholder}/>
              </Form.Group>           
              <button type="submit" className="promptButton">
                <p className="buttonMessage">Send Message</p>
                <img src={TJ} className="tjImage" />
              </button>
            </div>
            </Form>
          );
    }
}

export default Prompt;

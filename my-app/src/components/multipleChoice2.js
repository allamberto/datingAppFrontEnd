import React from 'react';
import { render } from 'react-dom';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';
import "./../css/multipleChoice.css";

const optionStyle = {"option":
		      {
			"width": "100%",
			"marginLeft" : "40px",
			"textAlign" : "left"
		      }
		    };

class MC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: this.props.selected
    };

		this.check = this.check.bind(this);
		this.onSelect = this.onSelect.bind(this);

  }

  check() {
    this.props.callback(this.state.selectedOptions);
  }

	onSelect(selectedOptions) {
		this.setState({ selectedOptions });
		this.props.callback(this.state.selectedOptions);
	}



  render() {
    return (
     <div className="multiple-choice-container" onClick={this.check}>
        <Test style={{"width": "90%", "text-align": "right"}} onOptionSelect={selectedOptions => this.onSelect( selectedOptions )}>
          <QuestionGroup defaultValue={this.state.selectedOptions.temperament} questionNumber={"temperament"}>
            <h2 className="question-text">Question 1 of 14: Which best describes you?</h2>
            <Option value="introverted" style={optionStyle}><p className="text-test">Introverted</p></Option>
						<Option value="ambiverted" style={optionStyle}><p className="text-test">Ambiverted</p></Option>
            <Option value="extroverted" style={optionStyle}><p className="text-test">Extroverted</p></Option>
          </QuestionGroup>

	  <hr className="question-line" />

	  <QuestionGroup defaultValue={this.state.selectedOptions.giveAffection} questionNumber={"giveAffection"}>
            <h2 className="question-text">Question 2 of 14: How do you show affection?</h2>

  	    <Option value="gifts" style={optionStyle}><p className="text-test">By giving gifts</p></Option>
            <Option value="words" style={optionStyle}><p className="text-test">By verbally communicating it</p></Option>
            <Option value="actions" style={optionStyle}><p className="text-test">By thoughtful actions</p></Option>
            <Option value="quality time" style={optionStyle}><p className="text-test">By spending time with a loved one</p></Option>
            <Option value="touch" style={optionStyle}><p className="text-test">By physical touch</p></Option>
          </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.trait} questionNumber={"trait"}>
            <h2 className="question-text">Question 3 of 14: How would your friends describe you?</h2>

            <Option value="compassionate" style={optionStyle}><p className="text-test">CSC social justice advocate</p></Option>
            <Option value="wild" style={optionStyle}><p className="text-test">The life of the dorm party</p></Option>
            <Option value="funny" style={optionStyle}><p className="text-test">MVP of the Humor Artists</p></Option>
            <Option value="bookworm" style={optionStyle}><p className="text-test">There is a cubicle in Hes with your name on it</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.idealDate} questionNumber={"idealDate"}>
            <h2 className="question-text">Question 4 of 14: What is your ideal first date?</h2>

            <Option value="lakes" style={optionStyle}><p className="text-test">Walking around the lakes</p></Option>
            <Option value="glee" style={optionStyle}><p className="text-test">Glee Club concert</p></Option>
            <Option value="coffee" style={optionStyle}><p className="text-test">Grabbing coffee at the Haggerty Cafe</p></Option>
            <Option value="newfs" style={optionStyle}><p className="text-test">Meeting up at Newfs</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.fridayNight} questionNumber={"fridayNight"}>
            <h2 className="question-text">Question 5 of 14: What is the best way to spend a Friday night?</h2>

            <Option value="olfs" style={optionStyle}><p className="text-test">Olfs Olfs Olfs</p></Option>
            <Option value="chat" style={optionStyle}><p className="text-test">Chatting with friends all night (in a 24 hr space)</p></Option>
            <Option value="concert" style={optionStyle}><p className="text-test">Concert at Legends</p></Option>
            <Option value="book" style={optionStyle}><p className="text-test">Reading a great book</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.diningHall} questionNumber={"diningHall"}>
            <h2 className="question-text">Question 6 of 14: What is the best dining hall?</h2>

            <Option value="NDH" style={optionStyle}><p className="text-test">North Dining Hall</p></Option>
            <Option value="SDH" style={optionStyle}><p className="text-test">South Dining Hall</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.studySpot} questionNumber={"studySpot"}>
            <h2 className="question-text">Question 7 of 14: What is your favorite study spot on campus?</h2>

            <Option value="hes" style={optionStyle}><p className="text-test">Club Hes</p></Option>
            <Option value="dorm" style={optionStyle}><p className="text-test">My dorm's study room</p></Option>
            <Option value="duncan" style={optionStyle}><p className="text-test">Duncan Student Center</p></Option>
            <Option value="prof" style={optionStyle}><p className="text-test">My professor's office hours</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.mass} questionNumber={"mass"}>
            <h2 className="question-text">Question 8 of 14: How often do you attend mass?</h2>

            <Option value="day" style={optionStyle}><p className="text-test">Every day</p></Option>
            <Option value="week" style={optionStyle}><p className="text-test">Once a week</p></Option>
            <Option value="occasionally" style={optionStyle}><p className="text-test">Occasionally</p></Option>
            <Option value="never" style={optionStyle}><p className="text-test">Never</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.club} questionNumber={"club"}>
            <h2 className="question-text">Question 9 of 14: Your favorite club falls into what category?</h2>

            <Option value="athletic" style={optionStyle}><p className="text-test">Athletic</p></Option>
            <Option value="artistic" style={optionStyle}><p className="text-test">Creative</p></Option>
            <Option value="political" style={optionStyle}><p className="text-test">Political</p></Option>
            <Option value="social" style={optionStyle}><p className="text-test">Social</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.gameDay} questionNumber={"gameDay"}>
            <h2 className="question-text">Question 10 of 14: What is your favorite thing to do on a game day?</h2>

            <Option value="kegs" style={optionStyle}><p className="text-test">Kegs & eggs</p></Option>
            <Option value="tailgate" style={optionStyle}><p className="text-test">Work at my club's concession stand</p></Option>
            <Option value="cheer" style={optionStyle}><p className="text-test">Get to the stadium early for the best spot</p></Option>
            <Option value="library" style={optionStyle}><p className="text-test">Watch the action from Hes</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.hour} questionNumber={"hour"}>
            <h2 className="question-text">Question 11 of 14: What is the best part of the school day?</h2>

            <Option value="7" style={optionStyle}><p className="text-test">7 am, running around the lakes</p></Option>
            <Option value="2" style={optionStyle}><p className="text-test">2 pm, discussing the reading in class</p></Option>
            <Option value="6" style={optionStyle}><p className="text-test">6 pm, eating dinner with my friends</p></Option>
            <Option value="1" style={optionStyle}><p className="text-test">1 am, hanging out in my dorm</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	<QuestionGroup defaultValue={this.state.selectedOptions.idealTemperament} questionNumber={"idealTemperament"}>
            <h2 className="question-text">Question 12 of 14: How would you describe your ideal partner?</h2>

	    <Option value="introverted" style={optionStyle}><p className="text-test">Introverted</p></Option>
			<Option value="ambiverted" style={optionStyle}><p className="text-test">Ambiverted</p></Option>
			<Option value="extroverted" style={optionStyle}><p className="text-test">Extroverted</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.receiveAffection} questionNumber={"receiveAffection"}>
            <h2 className="question-text">Question 13 of 14: How do you like to receive affection?</h2>

            <Option value="gifts" style={optionStyle}><p className="text-test">By receiving gifts</p></Option>
            <Option value="words" style={optionStyle}><p className="text-test">By hearing how I am loved</p></Option>
            <Option value="actions" style={optionStyle}><p className="text-test">By thoughtful actions</p></Option>
            <Option value="quality time" style={optionStyle}><p className="text-test">By spending time with my loved one</p></Option>
            <Option value="touch" style={optionStyle}><p className="text-test">By physical touch</p></Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup defaultValue={this.state.selectedOptions.idealTrait} questionNumber={"idealTrait"}>
            <h2 className="question-text">Question 14 of 14: What is the most attractive personality trait?</h2>

            <Option value="compassionate" style={optionStyle}><p className="text-test">Compassionate</p></Option>
            <Option value="wild" style={optionStyle}><p className="text-test">Wild</p></Option>
            <Option value="funny" style={optionStyle}><p className="text-test">Hilarious</p></Option>
            <Option value="bookworm" style={optionStyle}><p className="text-test">Intelligent</p></Option>
         </QuestionGroup>

	</Test>
     </div>
    );
  }
}

export default MC;

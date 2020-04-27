import React from 'react';
import { render } from 'react-dom';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';
import "./../css/multipleChoice.css";

const optionStyle = {"option": 
		      {
			"width": "700px", 
			"margin-left" : "40px",
			"text-align" : "left",
			"font-size" : "2px"
		      }
		    };

class MC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: {}
    };

    this.check = this.check.bind(this);
  }

  check() {
	this.props.callback(this.state.selectedOptions);
  } 

  render() {
    return (
     <div className="multiple-choice-container" onClick={this.check}>
        <Test onOptionSelect={selectedOptions => this.setState({ selectedOptions })}>
          <QuestionGroup questionNumber={"temperament"}>
            <h2 className="question-text">Question 1 of 14: Which best describes you?</h2>
            <Option value="introverted" style={optionStyle}>Introverted</Option>
            <Option value="extroverted" style={optionStyle}>Extroverted</Option>
            <Option value="ambiverted" style={optionStyle}>Ambiverted</Option>
          </QuestionGroup>

	  <hr className="question-line" />

	  <QuestionGroup questionNumber={"giveAffection"}>
            <h2 className="question-text">Question 2 of 14: How do you show affection?</h2>
	
  	    <Option value="gifts" style={optionStyle}>By giving gifts</Option>
            <Option value="words" style={optionStyle}>By verbally communicating it</Option>
            <Option value="actions" style={optionStyle}>By acting on it</Option>
            <Option value="quality time" style={optionStyle}>By spending time with a loved one</Option>
            <Option value="touch" style={optionStyle}>By touching my loved one</Option>
          </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"trait"}>
            <h2 className="question-text">Question 3 of 14: How would your friends describe you?</h2>
         
            <Option value="compassionate" style={optionStyle}>CSC social justice advocate</Option>
            <Option value="wild" style={optionStyle}>The life of the dorm party</Option>
            <Option value="funny" style={optionStyle}>The Humor Artists MVP</Option>
            <Option value="bookworm" style={optionStyle}>There is a cubicle in Hes with your name on it</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"idealDate"}>
            <h2 className="question-text">Question 4 of 14: What is your ideal first date?</h2>
         
            <Option value="lakes" style={optionStyle}>Walking around the lakes (not holding hands of course)</Option>
            <Option value="glee" style={optionStyle}>Glee Club Concert</Option>
            <Option value="coffee" style={optionStyle}>Grabbing coffee at the Haggerty Cafe</Option>
            <Option value="newfs" style={optionStyle}>Meeting up at Newfs</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"fridayNight"}>
            <h2 className="question-text">Question 5 of 14: What is the best way to spend a Friday night?</h2>
         
            <Option value="olfs" style={optionStyle}>Olfs Olfs Olfs</Option>
            <Option value="chat" style={optionStyle}>Chatting with friends all night (In a 24 hours space)</Option>
            <Option value="concert" style={optionStyle}>Legends Concert</Option>
            <Option value="book" style={optionStyle}>Reading a great book</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"diningHall"}>
            <h2 className="question-text">Question 6 of 14: What is the best dining hall?</h2>
         
            <Option value="NDH" style={optionStyle}>North Dining Hall</Option>
            <Option value="SDH" style={optionStyle}>South Dining Hall</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"studySpot"}>
            <h2 className="question-text">Question 7 of 14: What is your favorite study spot on campus?</h2>

            <Option value="hes" style={optionStyle}>Club Hes</Option>
            <Option value="dorm" style={optionStyle}>My dorm's study room</Option>
            <Option value="duncan" style={optionStyle}>Duncan Student Center</Option>
            <Option value="prof" style={optionStyle}>At my professor's office hours</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"mass"}>
            <h2 className="question-text">Question 8 of 14: How often do you attend mass?</h2>

            <Option value="day" style={optionStyle}>Every day</Option>
            <Option value="week" style={optionStyle}>Once a week</Option>
            <Option value="occasionally" style={optionStyle}>Occasionally</Option>
            <Option value="never" style={optionStyle}>Never</Option>
         </QuestionGroup>

	 <hr className="question-line" />
 
	 <QuestionGroup questionNumber={"club"}>
            <h2 className="question-text">Question 9 of 14: Your favorite club falls into what category?</h2>

            <Option value="athletic" style={optionStyle}>Athletic</Option>
            <Option value="artistic" style={optionStyle}>Artistic</Option>
            <Option value="political" style={optionStyle}>Political</Option>
            <Option value="social" style={optionStyle}>Social</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"gameDay"}>
            <h2 className="question-text">Question 10 of 14: What is your favorite thing to do on a game day?</h2>

            <Option value="kegs" style={optionStyle}>Kegs & eggs</Option>
            <Option value="tailgate" style={optionStyle}>Working at my club's concession stand</Option>
            <Option value="cheer" style={optionStyle}>In the stadium early for the best spot</Option>
            <Option value="library" style={optionStyle}>Watching the action from Hes</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"hour"}>
            <h2 className="question-text">Question 11 of 14: What is the best part of the school day?</h2>

            <Option value="7" style={optionStyle}>7am running Around The Lakes</Option>
            <Option value="2" style={optionStyle}>2pm discussing the reading in class</Option>
            <Option value="6" style={optionStyle}>6pm eating dinner with my friends</Option>
            <Option value="1" style={optionStyle}>1am hanging out in your dorm</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	<QuestionGroup questionNumber={"idealTemperament"}>
            <h2 className="question-text">Question 12 of 14: How would you describe your ideal partner?</h2>
	    
	    <Option value="introverted" style={optionStyle}>Introverted</Option>
            <Option value="extroverted" style={optionStyle}>Extroverted</Option>
            <Option value="ambiverted" style={optionStyle}>Ambiverted</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"receiveAffection"}>
            <h2 className="question-text">Question 13 of 14: How do you receive affection?</h2>

            <Option value="gifts" style={optionStyle}>By receiving gifts</Option>
            <Option value="words" style={optionStyle}>By hearing how I am loved</Option>
            <Option value="actions" style={optionStyle}>By being shown with actions that I am loved</Option>
            <Option value="quality time" style={optionStyle}>By spending time with my loved one</Option>
            <Option value="touch" style={optionStyle}>By being touched by my loved one</Option>
         </QuestionGroup>

	 <hr className="question-line" />

	 <QuestionGroup questionNumber={"idealTrait"}>
            <h2 className="question-text">Question 14 of 14: What is the most attractive personality trait?</h2>

            <Option value="compassionate" style={optionStyle}>Compassion</Option>
            <Option value="wild" style={optionStyle}>Spontaneous</Option>
            <Option value="funny" style={optionStyle}>Hilarious</Option>
            <Option value="bookworm" style={optionStyle}>Intelligent</Option>
         </QuestionGroup>

	</Test>
     </div>
    );
  }
}

export default MC;

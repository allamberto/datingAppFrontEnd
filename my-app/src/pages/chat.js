import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SideBar from './../components/sidebar';
import CustomModal from './../components/modal';
import Textbox from './../components/textbox';
import Textarea from './../components/customTextarea';
import MessageList from './../components/messageList';
import MessageSideOption from './../components/messageSideOption';
import './../css/chat.css';
import './../css/modal.css';
import Arrow from './../img/upArrow.png';
import Lep from './../img/lep.png';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.loadMessages = this.loadMessages.bind(this);
        this.generateMessage = this.generateMessage.bind(this);
        this.callbackText = this.callbackText.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.loadMessageSideView = this.loadMessageSideView.bind(this);
        this.loadMatch = this.loadMatch.bind(this);
        this.loadSideBar = this.loadSideBar.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getLunches = this.getLunches.bind(this);
        this.modalUpdateText = this.modalUpdateText.bind(this);

        this.state = {
            netid: sessionStorage.getItem("netid"),
            target: "",
            targetName: "",
            messages: [],
            peopleMessaged: [],
            value: " ",
            user: 'alamber2',
            sender: 'sjohns37',
            id: 0,
            update: 0,
            compatibility: [],
            lunches: [],
            courses: [],
            generatedMessages: [],
            attendsMass: false,
            show: false
        }
        this.loadSideBar();
    }

    componentDidMount() {
        if(sessionStorage.getItem("netid") == null){
            this.props.history.push("/login");
        }
    }

    // Load all a user's conversations
    loadSideBar() {
      console.log(this.state.netid);
      fetch('http://3.211.82.27:8800/conversations/' + this.state.netid)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            // Choose most recent conversation for title and loaded messages
            if (data.length > 0) {
              this.setState({target     : (data[0].sender === this.state.netid ? data[0].receiver : data[0].sender),
                             id         : data[0].id});
              this.loadMessages(this.state.id, this.state.target);

              this.setState({peopleMessaged : data,
                             targetName     : data[0].firstName + " " + data[0].lastName});
            }

      });
    }

    // Load all messages from conversation based on id
    loadMessages(id, target, name) {
      console.log(id);
      this.setState({...this.state, messages : [], target: target, targetName: name});
      fetch('http://3.211.82.27:8800/messages?id=' + id)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log(data);
            this.loadMatch();
            this.setState({id : id,
                           messages : data });
            this.scrollToBottom();
      });
    }

    // Load all things in common with a user
    loadMatch() {
      fetch('http://3.211.82.27:8800/compatibility?viewer=' + this.state.netid + '&viewee=' + this.state.target)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
              this.setState({lunches            : this.getLunches(data.lunches),
                             courses            : this.getCourses(data.courses),
                             compatibility      : data.compatibility,
                             generatedMessages  : data.messages,
                             attendsMass        : data.mass});
            }
            console.log(this.state.lunches);
            console.log(this.state.courses);
            console.log(this.state.compatibility);
            console.log(this.state.messages);
            console.log("is this null??");

            console.log(this.state.attendsMass);

      });
    }

    getLunches(lunches) {
      var lunchOptions = [];
      if (this.state.lunches != undefined) {
        for(var l of lunches) {
            lunchOptions.push({
                label: l,
                value: l
            });
        }
      }
      return lunchOptions
    }

    getCourses(courses) {
      var courseOptions = [];
      if (this.state.courses != undefined) {
        for(var c of courses) {
            courseOptions.push({
                label: c,
                value: c
            });
        }
      }
      return courseOptions
    }

    // Generate random message
    generateMessage() {
      var msg = ""
      if (this.state.generatedMessages != undefined && this.state.generatedMessages.length > 0){
        var ind = Math.floor(Math.random() * this.state.generatedMessages.length);
        msg = this.state.generatedMessages[ind];
      }
      this.setState({value: msg});
    }

    // Updates value to be sent in message
    callbackText = (childData) => {
      this.setState({value: childData});
    }

    // Send new message
    addMessage(sender, receiver) {
      const requestOptions = {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
        		"sender"   : this.state.netid,
        		"receiver" : this.state.target,
        		"content"  : this.state.value
          })
      };
      fetch('http://3.211.82.27:8800/messages', requestOptions)
      .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
                alert("Could not send message");
            }
            else {
              this.setState((prev) => ({update: prev.update+1}))
              this.loadSideBar();
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    loadMessageSideView() {
        var messagedPeopleList = [];

        for(var person of this.state.peopleMessaged) {
          var name = person['firstName'] + " " + person["lastName"];
          var target = person.sender === this.state.netid ? person.receiver : person.sender;
          var active = target === this.state.target? true : false;
          if (person['content'] != undefined && person['content'].length > 0) {
            messagedPeopleList.push(<MessageSideOption callback={this.loadMessages} id={person['id']} target={target} name={name} message={person['content']} image={person['image']} active={active}/> );
          }
        }

        return messagedPeopleList;
    }

    openModal() {
      this.setState({show: true});
    }

    closeModal() {
      if (this.state.show) {
        this.setState({show: false});
      }
    }

    modalUpdateText(msg) {
      if (msg !== this.state.value) {
        this.setState({value: msg});
      }
      this.closeModal();
    }

    render() {
      return(
        <div id="Page" className="chatContainer">
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"Page"} />
            <div id="page-wrap" className="chat-page">
                <Container className="chat-page" fluid="true">
                  <Row className="fillHeightChat">
                    <Col md={3} className="messageNavContainer">
                        <div className="messageNav">
                            {this.loadMessageSideView()}
                        </div>
                        <fade />
                    </Col>
                    <Col md={9} className="vChat">
                        <Row md={2} className="chatRoomTitle">
                            <h2 className="chatRoomTitleFont">{this.state.targetName}</h2>
                        </Row>
                        <Row md={8} className="chatRoom">
                            <Col md={{ span: 10, offset: 1 }}>
                                <MessageList messages={this.state.messages} user={this.state.netid}/>
                               <div style={{ float:"left", clear: "both" }}ref={(el) => { this.messagesEnd = el; }}> </div>
                            </Col>
                        </Row>
                        <Row md={2} className="sendtext-container">
                          <Col md={1} className='date-button-col'>
                            <button onClick={this.openModal} className='plandate-button'>
                                <img src={Arrow} className='sendtext-img'></img>
                            </button>
                          </Col>
                          <Col md={1}>
                            <button onClick={this.generateMessage} className='generatemessage-button'>
                                <img src={Arrow} className='sendtext-img'></img>
                            </button>
                          </Col>
                            <Col md={9} >
                                <Textarea parentCallback={this.callbackText} value={this.state.value} update={this.state.update}/>
                            </Col>
                            <Col md={1} className='send-button-col'>
                                <button onClick={this.addMessage} className='sendtext-button'>
                                    <img src={Arrow} className='sendtext-img'></img>
                                </button>
                            </Col>
                        </Row>
                    </Col>
                  </Row>
                </Container>
            </div>
            <CustomModal show={this.state.show} target={this.state.target} lunches={this.state.lunches} courses={this.state.courses} attendsMass={this.state.attendsMass} handleSubmit={this.modalUpdateText} handleClose={this.closeModal}/>
        </div>
    );}
}

export default Chat;

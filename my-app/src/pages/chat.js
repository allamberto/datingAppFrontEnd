import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SideBar from './../components/sidebar';
import Textbox from './../components/textbox';
import Textarea from './../components/customTextarea';
import MessageList from './../components/messageList';
import MessageSideOption from './../components/messageSideOption';
import './../css/chat.css';
import Arrow from './../img/upArrow.png';
import Lep from './../img/lep.png';

class Chat extends React.Component {
    constructor(props) {
        super(props);
            
        this.loadMessages = this.loadMessages.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.callbackText = this.callbackText.bind(this);
        this.callbackList = this.callbackList.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.loadMessageSideView = this.loadMessageSideView.bind(this);
        this.loadSideBar = this.loadSideBar.bind(this);

        this.state = {
            messages: [],
            peopleMessaged: [],
            value: '',
            user: 'alamber2',
            sender: 'sjohns37',
            update: 0
        }        
        this.loadSideBar();
        this.loadMessages();
    }

    componentDidMount() {
        if(sessionStorage.getItem("netid") == null){
            this.props.history.push("/login");
        }
    }

    loadSideBar() {
      const { peopleMessaged } = this.state;
      peopleMessaged.push({person: "Sophie",
                    sender: "sjohns37",
                    user: "alamber2",
                    lastMessage:"What is up homie? How are you today this is a test.",
                    personImage: "./../img/lep.png"},
                    {person: "Sophie",
                    sender: "sjohns27",
                    user: "alamber2",
                    lastMessage:"What is up homie? How are you today this is a test.",
                    personImage: "./../img/lep.png"},
                    {person: "Sophie",
                    sender: "sjohns27",
                    user: "alamber2",
                    lastMessage:"What is up homie? How are you today this is a test.",
                    personImage: "./../img/lep.png"},
                    {person: "Sophie",
                    sender: "sjohns27",
                    user: "alamber2",
                    lastMessage:"What is up homie? How are you today this is a test.",
                    personImage: "./../img/lep.png"},
                    {person: "Sophie",
                    sender: "sjohns27",
                    user: "alamber2",
                    lastMessage:"What is up homie? How are you today this is a test.",
                    personImage: "./../img/lep.png"},
                    {person: "Sophie",
                    sender: "sjohns27",
                    user: "alamber2",
                    lastMessage:"What is up homie? How are you today this is a test.",
                    personImage: "./../img/lep.png"});
      this.setState({ peopleMessaged: peopleMessaged });
    }

    loadMessages() {
      var messages = [];
      messages.push({sender: "alamber2",
                    receiver:"sjohns27",
                    content: "Hello"},

                    {sender: "sjohns27",
                    receiver:"alamber2",
                    content: "I want to make some longer content to test to see how the messages will be have and I dont want anything to break you know what I mean? I want to make some longer content to test to see how the messages will be have and I dont want anything to break you know what I mean? I want to make some longer content to test to see how the messages will be have and I dont want anything to break you know what I mean?"},

                    {sender: "alamber2",
                    receiver:"sjohns27",
                    content: "Hello"},

                     {sender: "alamber2",
                    receiver:"sjohns27",
                    content: "Hello"},

                         {sender: "alamber2",
                    receiver:"sjohns27",
                    content: "Hello"});
      this.setState({ messages });   
    }

    renderMessages() {
        var messageList = [];
        for(var message of this.state.messages) {
            var content = message['content'];

            if(message['sender'] == this.state.user) {
                messageList.push(this.myMessage(content));
            } else {
                messageList.push(this.theirMessage(content));
            }
        }

        messageList.push(<div style={{ float:"left", clear: "both" }}ref={(el) => { this.messagesEnd = el; }}> </div>);

        return(messageList);
    }

    callbackText = (childData) => {
      this.setState({value: childData});
    }

    callbackList = (childData) => {
      this.setState({sender: childData});

      this.loadMessages();
    }

    addMessage() {
        const { messages } = this.state;
        messages.push({sender: this.state.receiver,
                       receiver: this.state.user,
                        content: this.state.value});
        this.setState({ messages });

        this.scrollToBottom();
        this.setState((prev) => ({update: prev.update+1}))
        this.saveMessage();
    }

    saveMessage() {
    }

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    loadMessageSideView() {
        var messagedPeopleList = [];
        for(var person of this.state.peopleMessaged) {
            messagedPeopleList.push(<MessageSideOption callback={this.callbackList} sender={person['sender']} user={person['user']} p={person['person']} message={person['lastMessage']} image={person['personImage']}/> );
        }

        return messagedPeopleList;
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
                            <h2 className="messagesTitle">Messages</h2>
                            <hr className="messageLine" />
                            {this.loadMessageSideView()}
                        </div>
                    </Col>
                    <Col md={9} className="vChat">
                        <Row md={2} className="chatRoomTitle">
                            <h2 className="chatRoomTitleFont">{this.state.sender}</h2>
                        </Row>
                        <Row md={8} className="chatRoom-container">
                            <div className="chatRoom">
                                 <MessageList messages={this.state.messages} user={this.state.user} sender={this.state.sender}/>
                                 <div style={{ float:"left", clear: "both" }}ref={(el) => { this.messagesEnd = el; }}> </div>
                            </div>
                        </Row>
                        <Row md={2} className="sendtext-container">
                            <Col md={9}>
                                <Textarea parentCallback = {this.callbackText} update={this.state.update}/>
                            </Col>
                            <Col md={3}>
                                <button onClick={this.addMessage} className='sendtext-button'>
                                    <img src={Arrow} className='sendtext-img'></img>
                                </button>
                            </Col>
                        </Row>
                    </Col>
                  </Row>
                </Container>
            </div>
        </div>
    );}
}

export default Chat;

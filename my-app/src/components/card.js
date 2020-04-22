import '/var/www/html/datingApp/src/css/Card.css';
import React from 'react'
import ReactDOM from 'react-dom'

const cardContainer = document.getElementById('root');

// React component for the front side of the card
class CardFront extends React.Component {
  render() {
    return(
      <div className='card-side side-front'>
        <div className='container-fluid'>
          <div className='row'>
              <img src='img/logo.png' />
           </div>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render() {
    return(
      <div className='card-side side-back'>
        <div className='container-fluid'>
          <h1>Let's get in touch!</h1>
          
        </div>
      </div>
    )
  }
}

// React component for the card (main component)
class Card extends React.Component {
  render() {
    return(
      <div className='card-container'>
        <div className='card-body'>
          <CardBack />

          <CardFront />
        </div>
      </div>
    )
  }
}

// Render Card component
//ReactDOM.render(<Card />, cardContainer);



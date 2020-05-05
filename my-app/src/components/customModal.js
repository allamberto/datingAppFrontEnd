import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Add from './../img/add.png';
import './../css/customModal.css';

  function MyVerticallyCenteredModal(props) {
   return (
     <Modal
       {...props}
       size="md"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter" className="custom-modal-title">
             {props.content.header}     
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
        {props.content.content}
       </Modal.Body>
       <Modal.Footer>
         <button className="custom-modal-button" onClick={() => {props.callback(); props.onHide();}}>{props.content.exit}</button>
       </Modal.Footer>
     </Modal>
   );
 }

 
  function ModalControl(props) {
   const [modalShow, setModalShow] = React.useState(false);

    return (
     <>
       <button className={props.buttonClass} onClick={() => setModalShow(true)}>
         {props.message}
       </button>

        <MyVerticallyCenteredModal
         content={props.content}
         show={modalShow}
         callback={props.onHide}
	 onHide={() => {setModalShow(false);}}
       />
     </>
   );
 }

  export default ModalControl;

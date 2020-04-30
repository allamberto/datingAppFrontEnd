import React from 'react';
 import { Button, Modal } from 'react-bootstrap';
 import Add from './../img/add.png';

  function MyVerticallyCenteredModal(props) {
   return (
     <Modal
       {...props}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
             {props.content.header}     
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
        {props.content.content}
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={props.onHide}>{props.content.exit}</Button>
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
         onHide={() => setModalShow(false)}
       />
     </>
   );
 }

  export default ModalControl;

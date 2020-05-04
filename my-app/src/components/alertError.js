import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './../css/alertError.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Alert extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
	open: true,
        setOpen: true
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({setOpen: true});
  }

  handleClose = () => {
    this.setState({setOpen: false});
    this.props.closeCallback();
  }

  render() {
  if(this.props.toAlert) {
       return (
	    <div>
	     <Dialog
		open={this.state.open}
		TransitionComponent={Transition}
		keepMounted
		onClose={this.handleClose}
		aria-labelledby="alert-dialog-slide-title"
		aria-describedby="alert-dialog-slide-description"
	      >
		<DialogTitle id="alert-dialog-slide-title">{"An Error Has Occured"}</DialogTitle>
		<DialogContent>
		  <DialogContentText id="alert-dialog-slide-description">
		      {this.props.message}
		  </DialogContentText>
		</DialogContent>
		<DialogActions>
		  <button className="alertButton" onClick={this.handleClose}>
		    Close
		  </button>
		</DialogActions>
	      </Dialog>
	    </div>
	  );
      }
   else {
     return(<div />);
   }
  }
}

export default Alert;

import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {api,request} from '../../actions/request';

import * as actions from '../../actions/configuracion.js';

import { connect } from 'react-redux';

import swal from 'sweetalert2'
function getModalStyle() {
  const top = 50;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
   input: {
    width: '90%',
  },
  Button: {
    float: 'right',
  },
});


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
       name:"Nuevo Token",
    configuracion:{
      id:1,
      access_token:"",
    }
      
    };

    this.handleSubmit    = this.handleSubmit.bind(this);
    this.guardar    = this.guardar.bind(this);

   
  }
   handleSubmit(event)
  {
   
    const target  = event.target;
    const value   = target.type === 'checkbox' ? target.checked : target.value;
    const name    = target.name;
    

    let {configuracion} = this.state;
    configuracion[name] = value;

    this.setState({configuracion: configuracion});
  }
   guardar(evt)
  {
    console.log("guardar");
    let self =this;
    let configuracion= this.state.configuracion;
    request.post(`api/configuracion/1`, configuracion)
    .then(function(response)
    {
      if(response.status === 200)
      {
        
        self.props.toggle();
       swal("Token", "Guardado Con Exito", "success");
        
      }
      else
      {
        
      }
    })
  }

 
   

    

  render() {
    const { classes } = this.props;

 
    return(
       <div>
        
        
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.toggle}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Token Access
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="access_token"  
              name="access_token"            
              className={classes.input}
              value={this.state.configuracion.access_token}
             placeholder={this.state.name}
             onChange={this.handleSubmit}
              margin="normal"
            />

            <Button variant="contained" className={classes.Button} onClick={this.guardar} color="primary">
        Guardar
      </Button>
            </form>
          
            <AppWithStyles />
          </div>
        </Modal>
      </div>
      
    )
  }

}

const AppWithStyles = withStyles(styles)(App);

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  classes: PropTypes.object.isRequired,
})

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  actions,
)(AppWithStyles)
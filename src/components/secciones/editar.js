import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {api,request} from '../../actions/request';

import * as actions from '../../actions/secciones.js';
import IconEdit from '@material-ui/icons/Create';

import { connect } from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';



import swal from 'sweetalert2'
function getModalStyle() {
  const top = 50;
  const left = 50 ;

  return {
    top: `50%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width:"80%"
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
    width: '30%',
    margin:'10px 5px 15px 20px'
  },
  Button: {
    float: 'right',
    margin:'50px 5px 15px 20px'
  },
  titulo: {
    
    margin:'10px 5px 15px 30px'
  },
});


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modal:false,
       action: 'save',
       seccion:{
        id:null,
        has:"",
        lat:0,
        lng:0
       }
      
    };

    this.handleSubmit    = this.handleSubmit.bind(this);
    this.guardar    = this.guardar.bind(this);
    this.toggle    = this.toggle.bind(this);

   
  }
  toggle(evt)
    {
        this.setState({
            modal       : !this.state.modal,          
            
        });


    }
  

   componentDidMount(){

        let prospectoid = this.props.id;
        //console.log(this.props.prospectoid)
        let self = this;

        if(prospectoid > 0 && prospectoid !== self.state.seccion.id)
        {
            request.get(`api/secciones/${prospectoid}`)
            .then(function(response)
            {
                if(response.status === 200)
                {
                   
                    self.setState({
                        seccion: response.data,
                        action: 'update'
                    });             

             }
            });


        }
        else if(prospectoid === null && self.state.seccion.id)
        {
            self.asNothing();
        }
    }
     asNothing()
    {
        this.setState({
           action: 'save',
           seccion:{
            id:null,
            has:"",
            lat:0,
            lng:0
           }
        });
    }

   handleSubmit(event)
  {
   
    const target  = event.target;
    const value   = target.type === 'checkbox' ? target.checked : target.value;
    const name    = target.name;
    

    let {seccion} = this.state;
    seccion[name] = value;

    this.setState({seccion: seccion});
  }
   guardar(evt)
  {
    console.log("guardar");
    let self =this;
    let seccion= this.state.seccion;
    this.props[self.state.action](seccion, () => {

      // swal({
      //   title: 'Seccion',
      //   text: "Se ha guardado con éxito",
      //   type: 'success',
      //   // showCancelButton: true,
      //   // confirmButtonColor: '#3085d6',
      //   // cancelButtonColor: '#d33',
      //   confirmButtonText: 'Continuar!'
      // }).then((result) => {
      //   if (result.value) {
      //     // swal(
      //     //  'Deleted!',
      //     //  'Your file has been deleted.',
      //     //  'success'
      //     //  )
      //               self.asNothing();
      //             self.props.toggle();
                    
      //   }
      // })

    });



  }

 
   

    

  render() {
    const { classes } = this.props;
console.log(actions);
 
    return(
       <div>
        
        
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.toggle}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" className={classes.titulo} id="modal-title">
              {this.props.title}
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
             <FormControl className={classes.input}>
          <InputLabel htmlFor="name-simple">Tag Seccion</InputLabel>
          <Input id="name-simple" name="has" value={this.state.seccion.has} onChange={this.handleSubmit} />
        </FormControl>
         <FormControl className={classes.input}>
          <InputLabel htmlFor="name-simple">Latitud</InputLabel>
          <Input id="name-simple" name="lat" type="number" value={this.state.seccion.lat} onChange={this.handleSubmit} />
        </FormControl>
         <FormControl className={classes.input}>
          <InputLabel htmlFor="name-simple">Longitud</InputLabel>
          <Input id="name-simple" name="lng"  type="number" value={this.state.seccion.lng} onChange={this.handleSubmit} />
        </FormControl>


            <Button variant="contained" className={classes.Button} onClick={this.guardar} color="primary">
        Guardar
      </Button>
            </form>
          
           
          </div>
        </Modal>
      </div>
      
    )
  }

}

let AppWithStyles = withStyles(styles)(App);

const mapStateToProps = (state, ownProps) => ({
  secciones: state.secciones,
  classes: PropTypes.object.isRequired,
})

//const mapDispatchToProps = null;

export default connect(
 mapStateToProps,
  actions,
)(AppWithStyles)
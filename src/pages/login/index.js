import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import swal from 'sweetalert2';

import * as actions from '../../actions/auth.js';

import bgImage from './bg2.jpg';

class Login extends Component {

	constructor(props) {
		super(props)

		this.state ={
			text : '',
			logedfb : '',
			username : '',
			password: '',
			access_token : '',
		}
		
		this.loginfb = this.loginfb.bind(this);
		this.onSubmitHander = this.onSubmitHander.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount()
    {
   //  	let self = this;
   //  		if(window.FB !==  undefined){
	  //       window.FB.getLoginStatus(function(response) {
			//     console.log(response)
			//     if(response.status === "connected"){
			//     	window.FB.api('/me?fields=id,name,email', function(response) {
			//     		console.log(response)
			// 		       self.setState({
			// 			    	correo : response.email,
			// 			    	name : response.name,
			// 			    	access_token : response.accessToken
			// 			    })
			// 		     });
			// 	    self.setState({
			// 	    	text : 'Continue with Facebook',
			// 	    	loginfb : true,
			// 	    })
			// 	}else{
			//     	self.setState({
			// 		    	text : 'Login With Facebook',
			// 		    	loginfb : false,
			// 		    })
			//     	console.log('not loged')
			//     }
			// });
	  //   }
    }

    loginfb(){
   //  	let {loginfb, correo , name , access_token} = this.state;
   //  	let _self = this;

   //  	if(!loginfb){
			// window.FB.login(function(response) {
			// 	console.log(response)
			//    	if (response.authResponse) {
			//    		let token = response.authResponse.accessToken;
			//    		let email; 
			//      	console.log('Welcome!  Fetching your information.... ');
			//      	window.FB.api('/me?fields=id,name,email', function(response) {
			// 	     	console.log(response)
			// 	     	email = response.email;
			// 	       console.log('Good to see you, ' + response.name + '.' + response.email);
			// 	       _self.props.signin();
			//      });
			//    	} else {
			//      console.log('User cancelled login or did not fully authorize.');
			//    }
			//  });
   //  	}else{
    		// console.log()
    		// this.props.signin();
    	// }
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	onSubmitHander(evt)  {

		evt.preventDefault();


		let {username, password} = this.state;

		if(username == "" || password == "") {
			swal("Error!", "Please type all the inputs!", "error");
			return;
		}

		this.props.signin({username: username, password: password});

	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: "/app" } };

		if(this.props.authenticated)
			return <Redirect to={from} />;

		return(
			<div style={styles.container}>
				<div style={styles.flexRow}>
					<div style={{...styles.flexRowItem,...styles.bgLeft}}>
						<form onSubmit={this.onSubmitHander} style={{'minWidth': '50%'}} >
							<input
								style={styles.input}
								type="email"
								placeholder="input your email"
								name="username"
								value={this.state.username}
								onChange={this.handleInputChange}
							/>
							<input
								style={styles.input}
								type="password"
								placeholder="input your password"
								name="password"
								value={this.state.password}
								onChange={this.handleInputChange}
							/>
							<button style={styles.submit} type="submit">Signin</button>
							{this.props.error && <div>
								<p style={styles.error}>{this.props.error_message}</p>
							</div>}
						</form>
					</div>
					<div style={styles.flexRowItem}></div>
				</div>
			</div>
		)
	}

}

const styles = {

	container: {
		width: '100%',
		height: '100vh',
		backgroundImage: "url(" + bgImage + ")",
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
	},

	bgLeft: {
		backgroundColor: 'rgba(255,255,255,.5)',
	},

	flexRow: {
		display: 'flex',
		height: '100%',
		width: '100%',

	},

	flexRowItem: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'boxShadow': '#000000a6 8px 0px 15px -2px'
	},

	input: {
	 display: 'block',
	 color: '#2e2e2e',
	 fontSize: '18px',
	 marginBottom: '20px',
	 width: '100%',
	 padding: '12px 24px',
	 border: 'none',
	 borderRadius: '3px',
	 boxSizing:'border-box'
	},

	submit: {
		padding: '6px 12px',
		display: 'block',
		width: '100%',
		padding: '12px 24px',
		color:'white',
		border:'0px',
		fontSize:'15px',
		backgroundColor:'#42A9C7',
		cursor:'pointer'

	},

	error: {
		background: '#ff0000ba',
		color: 'white',
		textAlign: 'center',
		padding: '6px',
	}

};

const mapStateToProps = (state, ownProps) => ({
	authenticated: state.auth.authenticated,
	error: state.auth.error,
	error_message: state.auth.error_message,
})

export default connect(
	mapStateToProps,
	actions,
)(Login)


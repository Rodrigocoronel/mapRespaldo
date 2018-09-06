// https://material-ui.com/demos/lists/

// https://material.io/tools/icons/?style=baseline

import React, {Component} from "react";

import { Redirect } from "react-router-dom";

import { connect } from 'react-redux'

import axios from 'axios';
import PropTypes from 'prop-types';

import {
	Grid,
	Paper,
	AppBar, Toolbar, Typography,
	IconButton, Icon, Button,
	FormControl, InputLabel, Select, MenuItem,
	FormHelperText, Input,
	Tabs, Tab,
	Menu, List , ListItem ,Avatar,ListItemText, TextField
} from '@material-ui/core/';

/* Iconos */
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TierraIcon from '@material-ui/icons/PinDrop';
import GoogleIcon from '@material-ui/icons/Equalizer';
import FacebookIcon from '@material-ui/icons/Share';
import Token from '@material-ui/icons/CardMembership';
import Cicle from '@material-ui/icons/Brightness1'



/* Images */
import Sad from './images/sad.png';
import Wow from './images/wow.png';
import Angry from './images/angry.png';
import Like from './images/like.png';
import Haha from './images/haha.png';
import Love from './images/love.png';
import Nimblin from './images/nimblin.jpeg';

import { withStyles } from '@material-ui/core/styles';

import './index.css';

/* Mapa */
import Maps from '../../components/googleMaps';

import * as actions from '../../actions/secciones.js';
import {api,request} from '../../actions/request';
/* Modales */
import Modal from "../../components/token/modal";
import ModalSeccion from "../../components/secciones/modal";

/* gracias */
import GraficaGeneral from './graficaGeneral';
import GraficaPersepcion from './graficaPersepcion';
import GraficaPreocupaciones from './graficaPreocupaciones';

const styles = theme => ({
	root: {
		flexGrow: 1,
		paddingTop: 64,
	},
	flex: {
		flex: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary,
	},
	button: {
		margin: theme.spacing.unit,
	},
	
});

const styling = {
	pri : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background : 'rgb(197,121,128)'
	},
	pan : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background : 'rgb(112,121,255)'
	},
	morena : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background : 'rgb(197,163,128)'
	},
	panMorena : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background : 'rgb(239,248,128)'
	},
	priMorena : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background: 'rgb(112,121,128)'
	},
	priPan : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background: 'rgb(197,121,255)'
	},
	otro : {
		padding: '8px',
		display: 'inline-block',
		borderRadius: '50%',
		margin : '0px 5px',
		background: '#005500'
	}

}


const D3 = [
	{has: '#ensenada54', lat: 31.8664105,lng:-116.6111767},
	{has: '#ensenada93',lat: 31.855366, lng: -116.584063},	
	{has: '#ensenada114',lat: 31.832876, lng: -116.597712},	
];

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			periodo : 0,
			periodo_diputados : [],
			periodo_senadores : [],
			distrito : 0,
			search_seccion : '',
			send_seccion : '',
			filtrado : 1,
			promedio_diputados : '',
			promedio_senadores : '',
			tabActive : 0,
			page: '',
			post: '',
			tab: 0,
			anchorEl: null,
			paginas : [],
			publicaciones : [],
			reacciones : [{
				sad: 0,
				like: 0,
				love: 0,
				haha: 0,
				angry: 0,
				wow: 0
			}],
			color: '',
			lat : '',
			long : '',
			zoom : '',
			kmz : 'distritos.kmz',
			circulos:[],
			modal_token:false,
			modal_secciones:false,

		};

		this._handleChangeSelect = this._handleChangeSelect.bind(this);
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggle_seccion = this.toggle_seccion.bind(this);
		this._searchSeccion = this._searchSeccion.bind(this);
		this.myRef = React.createRef();

	}

	componentDidMount() {
		let self=this;

		 request.get('api/configuracion')
        .then(function(response)
        {
            if(response.status === 200)
            {
               //self.paginas(response.data.access_token);
            }
        });

    	request.get('api/periodoDiputados')
    	.then(function(response){
    		if(response.status === 200){
    			self.setState({periodo_diputados : response.data});
    		}
    	});

    	request.get('api/periodoSenadores')
    	.then(function(response){
    		if(response.status === 200){
    			self.setState({periodo_senadores : response.data});
    			
    			self.props.promedio_senadores(response.data[0].created_at);
    		}
    	});


    }

    toggle(evt)
    {
        this.setState({
            modal_token       : !this.state.modal_token,
        });
    }

     toggle_seccion(evt)
    {
        this.setState({
            modal_secciones       : !this.state.modal_secciones, 
        });
    }

	_handleChangeSelect(e) {

		if(e.target.name == 'filtrado'){
			this.props.reset_data();
			this.setState({send_seccion : ''});
		}


		this.setState({send_seccion : '', search_seccion : ''})

		this.setState({ [e.target.name]: e.target.value });

		if(e.target.name == 'periodo'){
			this.props.reset_data();
		}

		if(e.target.name == 'periodo' && this.state.filtrado === 2) {
			this.props.promedio_senadores(this.state.periodo_senadores[e.target.value].created_at);
			
		}
		else if(e.target.name == 'periodo' && this.state.filtrado === 1){
			this._actualizarDiputados(this.state.distrito,this.state.periodo_diputados[e.target.value].created_at);
		}

		if(e.target.name == 'distrito' && this.state.filtrado === 1) {
			if(e.target.value > 0)
				this._actualizarDiputados(e.target.value,this.state.periodo_diputados[this.state.periodo].created_at);
			else 
				this.props.borrar_promedio_diputado();
		}

				
	}

	_actualizarDiputados(distrito , periodo){
		this.props.promedio_diputados(distrito , periodo);
	}

	_handleChangeTab(e, v) {
		this.setState({ 'tabActive': v });
	}

	_searchSeccion(evt){
		evt.preventDefault();
		let {search_seccion} = this.state;
		this.setState({send_seccion : search_seccion});
		
	}

	_handleInputChange = name => event => {
	    this.setState({
	      [name]: event.target.value,
	    });
	 };

	_handleAccountMenu(event) {
		this.setState({ anchorEl: event.currentTarget });
	};

	_handleCloseAccountMenu(event) {
		this.setState({ anchorEl: null });
	};

	_handleAccountMenuItem(evt, index) {
		
		// if(index === 0) {
		// 	makesomething
		// }
		// else if (index === 1) {
		// 	makesomething
		// }
		if(index === 2){
			this.props.sigout();
		}

		// close
		this.setState({ anchorEl: null });

	}

	render() {
		
		const { classes } = this.props;
		let {tabActive , promedio_diputados , promedio_senadores , distrito} = this.state;
		let {lat , long , zoom , kmz , reacciones,circulos} = this.state;
		let {periodo_diputados, periodo_senadores, filtrado , periodo} = this.state;
		const { tab, auth, anchorEl , paginas , publicaciones} = this.state;
		const open = Boolean(anchorEl);
		
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		let numDistrito = 1;
		let data = this.props.secciones.data;
		let periodoElegido;
		if(data !== null)
			if(distrito > 0)
				numDistrito = distrito
			else
				numDistrito = ''
		else
			numDistrito = '' 

		if(filtrado == 1 && periodo_diputados !== '' )
			periodoElegido = periodo_diputados[periodo];
		else 
			periodoElegido = periodo_senadores[periodo];

		if(!this.props.auth.authenticated)
			return <Redirect to={from} />;

		return(

			<Grid container className={classes.root} spacing={8} >
				<AppBar >
					<Toolbar >
						<Typography variant="title" color='inherit' className={classes.flex}>
							We Natives
						</Typography>
						<IconButton color="inherit" onClick={() => {

							window.location.href = 'http://encuestasbc.org/verify/#/app';

						}} className={classes.button} aria-label="Delete">
							<DashboardIcon />
						</IconButton>
						<IconButton color="inherit" onClick={this.toggle} className={classes.button} aria-label="Delete">
							<Token  />						
						</IconButton>	
						<IconButton color="inherit" onClick={this.toggle_seccion} className={classes.button} aria-label="Delete">
							<SettingsIcon  />
						</IconButton>
						<IconButton
							color="inherit"
							className={classes.button}
							aria-owns={open ? 'menu-appbar' : null}
							aria-haspopup="true"
							onClick={this._handleAccountMenu.bind(this)}
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{vertical: 'top',horizontal: 'right',}}
							transformOrigin={{vertical: 'top', horizontal: 'right',}}
							open={open}
							onClose={this._handleCloseAccountMenu.bind(this)}
						>
							{
								["Profile", "Account","Log Out"].map((option, index) => (
									<MenuItem
										key={index}
										onClick={event => this._handleAccountMenuItem(event, index)}
									>
										{option}
									</MenuItem>
								))
							}
						</Menu>
					</Toolbar>
				</AppBar>

				<Grid item xs={5}>
					<Paper style={{height: '50%'}}>
						<AppBar position="static">
				          <Tabs value={tabActive} style={{background : '#202F38'}}onChange={this._handleChangeTab}>
				            <Tab label="General" />
				            <Tab label="Percepción" />
				            <Tab label="Preocupaciones" />
				          </Tabs>
				        </AppBar>
				        {tabActive === 0 && 
				        <table width="100%">
				        	<tbody>
				        		<tr aling="center">
				        			<th>{'Distrito'}</th>
				        			<th>{'municipio'}</th>
				        			<th>{'seccion'}</th>
				        			<th>{'Habitantes Seccion'}</th>
				        			
				        		</tr>
			        			<tr aling="center">
				        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.distrito : ''}</td>
				        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.municipio : ''}</td>
				        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.seccion : ''}</td>
				        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.habitantes_seccion : ''}</td>
			        			</tr>
			        		</tbody>
			        	</table>}
				        {tabActive === 1 && 
							<div>
				        	{ this.state.filtrado === 1 &&
				        		<div>
						        	<div align="center"><strong> Partidos </strong></div>
						        	<br/>
						        	<table width="100%">
						        		<tbody>
							        		<tr aling="center">
							        			<th>{'Pan'}</th>
							        			<th>{'Pri'}</th>
							        			<th>{'Morena'}</th>
							        			<th>{'Otros'}</th>
							        		</tr>
						        			<tr aling="center">
							        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.p_pan : ''}</td>
							        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.p_pri : ''}</td>
							        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.p_morena : ''}</td>
							        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.p_otros : ''}</td>
						        			</tr>
						        		</tbody>
							        </table>
									<div align="center"><strong> Candidatos </strong></div>
						        	<table width="100%">
						        		<tbody>
							        		<tr aling="center">
							        			<th>{'Pan'}</th>
							        			<th>{'Pri'}</th>
							        			<th>{'Morena'}</th>
							        			<th>{'Otros'}</th>
							        		</tr>
						        			<tr aling="center">
							        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.c_pan : ''}</td>
							        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.c_pri : ''}</td>
							        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.c_morena : ''}</td>
							        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.c_otros : ''}</td>
						        			</tr>
						        		</tbody>
						        	</table>
				        		</div>
					        }
					        {this.state.filtrado === 2 && 
					        	<div>
						        	<table width="100%">
						        		<thead>
						        			<tr>
						        				<th id="titulo" colSpan='4'>Partidos</th>
						        			</tr>
						        		</thead>
						        		<tbody>
							        		<tr aling="center">
							        			<th id="senadores">{'Pan'}</th>
							        			<th id="senadores">{'Pri'}</th>
							        			<th id="senadores">{'Morena'}</th>
							        			<th id="senadores">{'Otros'}</th>
							        		</tr>
						        			<tr aling="center">
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.p_pan : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.p_pri : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.p_morena : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.p_otros : ''}</td>
						        			</tr>
						        		</tbody>
						        	</table>
						        	<table width="100%">
						        		<thead>
						        			<tr>
						        				<th id="titulo" colspan='4'>Candidato 1</th>
						        			</tr>
						        		</thead>
						        		<tbody>
						        			<tr aling="center">
							        			<th id="senadores" >{'Gina Cruz'}</th>
							        			<th id="senadores" >{'Alejandro Arregui'}</th>
							        			<th id="senadores" >{'Jaime Bonilla'}</th>
							        			<th id="senadores" >{'Otros'}</th>
							        		</tr>
						        			<tr aling="center">
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.s1_pan : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.s1_pri : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.s1_morena : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.s1_otros : ''}</td>
						        			</tr>
						        		</tbody>
						        	</table>
						        	<table width="100%">
						        		<thead>
						        			<tr>
						        				<th id="titulo" colspan='4'>Candidato 2</th>
						        			</tr>
						        		</thead>
						        		<tbody>
						        			<tr>
							        			<th id="senadores">{'Jorge Ramos'}</th>
							        			<th id="senadores">{'Juanita Perez'}</th>
							        			<th id="senadores">{'Alejandra Leon'}</th>
							        			<th id="senadores">{'Otros'}</th>
							        		</tr>
						        			<tr >
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.s2_pan : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.s2_pri : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.s2_morena : ''}</td>
							        			<td id="senadores" align="center">{this.props.secciones !== null ? this.props.secciones.data.s2_otros : ''}</td>
						        			</tr>
						        		</tbody>
						        	</table>
						        </div>
					        }
				        	</div>
				        	}
				        {tabActive === 2 && 
				        	<div>
					        	<table width="100%">
					        		<tbody>
						        		<tr aling="center">
						        			<th>{'Seguridad'}</th>
						        			<th>{'Servicios Publicos'}</th>
						        			<th>{'Empleo'}</th>
						        			<th>{'Infraestructura urbana'}</th>
						        		</tr>
					        			<tr aling="center">
						        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.seguridad : ''}</td>
						        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.servicios_publicos : ''}</td>
						        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.empleo : ''}</td>
						        			<td align="center">{this.props.secciones !== null ? this.props.secciones.data.infrastructura_urbana : ''}</td>
					        			</tr>
					        			<tr style={{paddingTop: '100px'}}>
						        			<th>{'Agua'}</th>
						        			<th>{'Gasolina'}</th>
						        			<th>{'Basura'}</th>
						        			<th>{'Varios'}</th>
						        		</tr>
					        			<tr >
						        			<td align="center" >{this.props.secciones !== null ? this.props.secciones.data.agua : ''}</td>
						        			<td align="center" >{this.props.secciones !== null ? this.props.secciones.data.gasolina : ''}</td>
						        			<td align="center" >{this.props.secciones !== null ? this.props.secciones.data.basura : ''}</td>
						        			<td align="center" >{this.props.secciones !== null ? this.props.secciones.data.varios : ''}</td>
					        			</tr>
					        		</tbody>
					        	</table>
				        	</div>
				        }
					</Paper>
					<Paper style={{height : '50%'}}>
							<div>
							{	tabActive === 0 && 
								<div>
								{
									this.state.filtrado == 1 ?
									<div align="center">
										<GraficaGeneral data={[this.props.secciones.promedio_diputados]} name={numDistrito}/>
									</div>

									: 
									<div align="center">
										<GraficaGeneral data={[this.props.secciones.promedio_senadores]} name={'Senadores'}/>
									</div>
								}
								</div>
							}	
							</div>
							<div>
							{	tabActive === 1 &&
								<div align="center">
									<GraficaPersepcion 
									filtrado={this.state.filtrado}
									data={this.props.secciones ? this.props.secciones.data.pie_partidos : []} 
									candidatos={this.props.secciones ? this.props.secciones.data.pie_candidatos : [] }
									candidatos2={this.props.secciones ? this.props.secciones.data.pie_candidatos2 : [] }
									 />
								</div>
							}
							</div>
							<div>
							{	tabActive === 2 &&
								<div align="center">
									<GraficaPreocupaciones data={[this.props.secciones.data]} />
								</div>
							}
							</div>
					</Paper>
				</Grid>
				<Grid item xs={7}>
					<Grid item xs={12}>
						<Paper style={{paddingTop : '3px'}}>
							<div style={{paddingLeft : '20px', paddingTop : '10px', display : 'inline-block'}}>
								<FormControl className={classes.formControl} style={{paddingRight : '20px'}}>
									<InputLabel htmlFor="name-readonly">Filtrado</InputLabel>
						          <Select
						            value={this.state.filtrado}
						            onChange={this._handleChangeSelect}
						            displayEmpty
						            name="filtrado"
						            className={classes.selectEmpty}
						          	>
						            <MenuItem value={1}>Diputados Fed.</MenuItem>
						            <MenuItem value={2}>Senadores</MenuItem>
						            <MenuItem value={3}>Diputados Loc.</MenuItem>
						            <MenuItem value={4}>Gobernador</MenuItem>
						            <MenuItem value={5}>Alcaldias</MenuItem>
						            <MenuItem value={6}>Precandidatos</MenuItem>
						          </Select>
						        </FormControl>
						    </div>
						    <div style={{paddingLeft : '20px', paddingTop : '10px', display : 'inline-block'}}>
						    	<FormControl className={classes.formControl} style={{paddingRight : '20px'}}>
									<InputLabel htmlFor="name-readonly">Distrito</InputLabel>
						          <Select
						            value={this.state.distrito}
						            onChange={this._handleChangeSelect}
						            displayEmpty
						            name="distrito"
						            className={classes.selectEmpty}
						          	>
						            <MenuItem value={0}>Todos</MenuItem>
						            <MenuItem value={1}>Distrito 1</MenuItem>
						            <MenuItem value={2}>Distrito 2</MenuItem>
						            <MenuItem value={3}>Distrito 3</MenuItem>
						            <MenuItem value={4}>Distrito 4</MenuItem>
						            <MenuItem value={5}>Distrito 5</MenuItem>
						            <MenuItem value={6}>Distrito 6</MenuItem>
						            <MenuItem value={7}>Distrito 7</MenuItem>
						            <MenuItem value={8}>Distrito 8</MenuItem>
						          </Select>
						        </FormControl>
						    </div>
						    <div style={{paddingLeft : '20px', display : 'inline-block'}}>
						        <form onSubmit={this._searchSeccion}>
							        <TextField
							          id="search"
							          label="Buscar sección"
							          name='search_seccion'
							          value={this.state.search_seccion}
							          onChange={this._handleInputChange('search_seccion')}
							          className={classes.textField}
							          margin="normal"
							        />
						        </form>
						    </div>
						    <div style={{paddingLeft : '20px', paddingTop : '10px', display : 'inline-block'}}>
						    	<FormControl className={classes.formControl} style={{paddingRight : '20px'}}>
									<InputLabel htmlFor="name-readonly">Muestra</InputLabel>
						          <Select
						            value={this.state.periodo}
						            onChange={this._handleChangeSelect}
						            displayEmpty
						            name="periodo"
						            className={classes.selectEmpty}
						          	>
						          	{filtrado === 1 ?
						            	periodo_diputados.map((key , index) => (
											<MenuItem value={index} token={key.token} key={index}>{key.created_at}</MenuItem>
										))
										:
										periodo_senadores.map((key , index) => (
											<MenuItem value={index} token={key.token} key={index}>{key.created_at}</MenuItem>
										))
									}
						          </Select>
						        </FormControl>
						    </div>
					        <div style={{paddingLeft : '20px', paddingTop : '10px'}}>
						        <div style={{display : 'inline-block'}}><div style={styling.pri}></div>Pri</div>
								<div style={{display : 'inline-block' , paddingLeft : '25px'}}><div style={styling.pan}></div>Pan</div>
								<div style={{display : 'inline-block' , paddingLeft : '25px' }}><div style={styling.morena}></div>Morena</div>
								<div style={{display : 'inline-block' , paddingLeft : '25px' }}><div style={styling.panMorena}></div>Pan/Morena</div>
								<div style={{display : 'inline-block' , paddingLeft : '25px' }}><div style={styling.priMorena}></div>Pri/Morena</div>
								<div style={{display : 'inline-block' , paddingLeft : '25px' }}><div style={styling.priPan}></div>Pri/Pan</div>
								<div style={{display : 'inline-block' , paddingLeft : '25px' }}><div style={styling.otro}></div>Otro</div>
					    	</div>
						</Paper>
					</Grid>
					<br/>
					<Grid item xs={12}>
						<Paper >
							<Maps 
								ref={this.myRef} 
								seccion={this.state.send_seccion} 
								filtrado={this.state.filtrado}
								distrito={this.state.distrito}
								periodo={periodoElegido}
							/>
						</Paper>
					</Grid>
				</Grid>
				 {
					this.state.modal_token&& 
						<Modal 
							open={this.state.modal_token} 
							toggle={this.toggle}
						/>
				}
				<ModalSeccion 
					open={this.state.modal_secciones} 
					toggle={this.toggle_seccion} 
				/>

				{/*<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Tabs
							value={this.state.tab}
							indicatorColor="primary"
							textColor="primary"
							onChange={this._handleChangeTab}
						>
							<Tab label="Facebook" icon={<FacebookIcon />} />
							<Tab label="Google Analytics" icon={<GoogleIcon />} />
							<Tab label="Land" icon={<TierraIcon />} />
						</Tabs>
						{tab === 0 && <Typography>Item Two</Typography>}
						{tab === 1 && <Typography>Item Two</Typography>}
						{tab === 2 && <Typography>Item Three</Typography>}
					</Paper>
				</Grid>*/}

			</Grid>
		)
	}

}

const AppWithStyles = withStyles(styles)(App);

const mapStateToProps = (state, ownProps) => ({
	auth: state.auth,
	secciones : state.secciones
})

const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	actions,
)(AppWithStyles)
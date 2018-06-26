import React , {Component} from 'react';

//import * as actions from '../../actions/secciones.js'

import {
    AreaChart, Area,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer, Bar, BarChart, TriangleBar
} from 'recharts';

import {
	Grid,
	Paper,
	AppBar, Toolbar, Typography,
	IconButton, Icon,
	FormControl, InputLabel, Select, MenuItem,
	FormHelperText, Input,
	Tabs, Tab,
	Menu, List , ListItem ,Avatar,ListItemText
} from '@material-ui/core/';

import Button from '@material-ui/core/Button';

const data = [
	{value : 33.3, name : 'pan'},
	{value : 17.8, name : 'pri'}, 
	{value : 35.6, name : 'morena'},
	{value : 10, name : 'otros' },
];


export default class GraficaGeneral extends Component{

	constructor(props){
		super(props);
		this.state = {
			tabActive : 0
		}

		this._handleChangeTab = this._handleChangeTab.bind(this);
	}

	_handleChangeTab(e, v) {
		this.setState({ 'tabActive': v });
	}

	render(){
		let {tabActive} = this.state;
		return(
			<div>
			{ this.props.filtrado == 1 &&
				<div>
		            <div className="small mb-4 card-subtitle"></div>
		            <div style={{width: '100%', height: '280px' , paddingTop : '40px', paddingLeft: '10px'}}>
		            	<div style={{display : 'inline-block', textAlign : 'center'}}>
		            		<strong>Partidos</strong>
		                    <PieChart width={260} height={250}>
	  							<Pie data={this.props.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="blue" label>
	  								<Cell fill="rgb(112,121,255)" />
							      	<Cell fill="rgb(197,121,128)" />
							      	<Cell fill="rgb(197,163,128)" />
							      	<Cell fill="#005500" />
							    </Pie>
	  							<Tooltip />
	  						</PieChart>
	  					</div>
	  					<div style={{display : 'inline-block', textAlign : 'center', paddingLeft : '40px'}}>
	  						<strong>Candidatos</strong>
		                	<PieChart width={260} height={250}>
	  							<Pie data={this.props.candidatos} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="blue" label>
	  								<Cell fill="rgb(112,121,255)" />
							      	<Cell fill="rgb(197,121,128)" />
							      	<Cell fill="rgb(197,163,128)" />
							      	<Cell fill="#005500" />
							    </Pie>
	  							<Tooltip />
	  						</PieChart>
	  					</div>
		            </div>
	            </div>
	        }
	        {
	        	this.props.filtrado == 2 &&
	        	<div>
	        		<Grid item xs={12}>
						<Paper style={{height: '50%'}}>
							<AppBar position="static">
					          <Tabs value={tabActive} style={{background : '#202F38'}}onChange={this._handleChangeTab}>
					            <Tab label="Partido" />
					            <Tab label="Candidato 1" />
					            <Tab label="Candidato 2" />
					          </Tabs>
					        </AppBar>
					        {tabActive === 0 && 
					        	<div style={{width: '100%', height: '280px' , paddingTop : '40px', paddingLeft: '10px'}}>
					            	<div style={{display : 'inline-block', textAlign : 'center'}}>
					                    <PieChart width={280} height={250}>
				  							<Pie data={this.props.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="blue" label>
				  								<Cell fill="rgb(112,121,255)" />
										      	<Cell fill="rgb(197,121,128)" />
										      	<Cell fill="rgb(197,163,128)" />
										      	<Cell fill="#005500" />
										    </Pie>
				  							<Tooltip />
				  						</PieChart>
			  						</div>
		  						</div>
					        }
					        {
					        	tabActive === 1 &&
					        	<div style={{width: '100%', height: '280px' , paddingTop : '40px', paddingLeft: '10px'}}>
						        	<div style={{display : 'inline-block', textAlign : 'center'}}>
				                	<PieChart width={280} height={250}>
			  							<Pie data={this.props.candidatos} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="blue" label>
			  								<Cell fill="rgb(112,121,255)" />
									      	<Cell fill="rgb(197,121,128)" />
									      	<Cell fill="rgb(197,163,128)" />
									      	<Cell fill="#005500" />
									    </Pie>
			  							<Tooltip />
			  						</PieChart>
			  						</div>
					        	</div>
					        }
					        {
					        	tabActive === 2 &&
					        	<div style={{width: '100%', height: '280px' , paddingTop : '40px', paddingLeft: '10px'}}>
					        		<div style={{display : 'inline-block', textAlign : 'center'}}>
					                	<PieChart width={280} height={250}>
				  							<Pie data={this.props.candidatos2} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="blue" label>
				  								<Cell fill="rgb(112,121,255)" />
										      	<Cell fill="rgb(197,121,128)" />
										      	<Cell fill="rgb(197,163,128)" />
										      	<Cell fill="#005500" />
										    </Pie>
				  							<Tooltip />
				  						</PieChart>
		  							</div>
		  						</div>
					        }
		            	</Paper>
	        		</Grid>
           	 	</div>
        	}
        	</div>
		)
	}

}
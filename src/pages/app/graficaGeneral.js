import React , {Component} from 'react';

//import * as actions from '../../actions/secciones.js'

import {
    AreaChart, Area,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer, Bar, BarChart, TriangleBar
} from 'recharts';

const datas = [
	{pan : 33.3 , pri : 17.8 , morena : 35.6  , otros : 10 , label : 'Partidos'},
];


export default class GraficaGeneral extends Component{

	constructor(props){
		super(props);
		this.state = {

		}
	}
	

	render(){
		let data = this.props.data;
		console.log(data)
		return(
			<div>
			{
	        //     <div className="small mb-4 card-subtitle"></div>
	        //     <div align="center" style={{width: '100%', height: '280px' , paddingTop : '40px'}}>
	        //     	<div align="center" style={{paddingBottom : '20px'}}>
	        //     		<label>Promedio General Distrito {this.props.name}</label>
	        //         </div>
	        //             <BarChart width={550} height={250} data={data}>
	        //               <CartesianGrid strokeDasharray="3 3" />
	        //               <XAxis dataKey="label" />
	        //               <YAxis />                                  
							  // <Tooltip/>
	        //               <Legend title={'General'}/>                            
	        //               <Bar dataKey="pan" fill='blue' />
	        //               <Bar dataKey='pri' fill='red' />
	        //               <Bar dataKey='morena' fill='brown' />
	        //               <Bar dataKey='otros' fill='gray' />
	        //              </BarChart>
	        //     </div>
	        }
            </div>
		)
	}

}
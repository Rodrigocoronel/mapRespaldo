
import {api,request} from './request';
export const get = () => {
	return (dispatch) => {

		request.get('api/secciones')
		.then(function(response)
		{
			if(response.status === 200)
			{
				dispatch({
					type: 'LIST',
					payload: response.data
				});
			}
		});
	}
}

export const update = (departamento, callback) => {
	return (dispatch) => {

        console.log(departamento);
		dispatch({ type: 'SAVE' });

		request.post(`api/secciones/${departamento.id}`, departamento)
		.then(function(response)
		{
			if(response.status === 200)
			{
				dispatch({
					type: 'UPDATE_SUCCESS',
					payload: response.data
				});

				if(typeof callback === 'function') callback();
			}
			else
			{
				dispatch({ type: 'SAVE_FAILURE' });
			}
		})
		.catch(function(error) {
			dispatch({ type: 'SAVE_FAILURE' });
		});

	}
}

export const save = (item, callback) => {
	return (dispatch) => {

		dispatch({ type: 'SAVE' });

		request.post('api/secciones', item).then(function(response) {

			if(response.status === 200) {

                console.log( response.data);
				dispatch({
					type: 'SAVE_SUCCESS',
					payload: response.data
				});

				if(typeof callback === 'function') callback(response.data);

			}
			else{
				dispatch({ type: 'SAVE_FAILURE' });
			}

		})
		.catch(function(error) {
			dispatch({ type: 'SAVE_FAILURE' });
		});

	}
}

export const getInfo = (seccion , filtrado , periodo) => {
	return (dispatch) => {
		let ruta = '';
		if(filtrado === 1)
			ruta = 'porcentajes/seccion/';
		else 
			ruta = 'porcentajesSen/seccion/';

			request.get('api/'+ruta+seccion+'/'+periodo)
			.then(function(response)
			{
				console.log(response)
				if(response.status === 200)
				{
					if(response.data.length > 0) {
						dispatch({
							type: 'INFO_OK',

							payload: response.data[0]
						});
					}else {
						dispatch({ type : 'INFO_FAIL' });
					}
				}
			});
	}
}

export const reset_data = () => {
	return (dispatch) => {
		dispatch({type : 'INFO_FAIL'});
	}
}


export const sigout = () =>
{
    return (dispatch) => {
        console.log('logout')
        dispatch(
                {
                    type: 'AUTH_SIGNOUT_SUCCESS',
                });
        // window.FB.logout(function(response){
        //     dispatch(
        //         {
        //             type: 'AUTH_SIGNOUT_SUCCESS',
        //         });
        // });
        
       
    }
};

export const promedio_senadores = (periodo) => {
	return (dispatch) =>{
		request.get('api/promedio_senadores/'+periodo)
		.then(function(response) {

			if(response.status === 200) {
					dispatch({
						type: 'PROMEDIO_SENADOR_FETCHED',

						payload: response.data
					});
				}else {
					dispatch({ type : 'PROMEDIO_SENADOR_FAIL' });
				}
			
		});
	}
}

export const promedio_diputados = (distrito,periodo ) => {
	return (dispatch) =>{
		request.get('api/promedio_diputados/'+distrito+'/'+periodo)
		.then(function(response) {

			if(response.status === 200) {
					dispatch({
						type: 'PROMEDIO_DIPUTADO_FETCHED',

						payload: response.data
					});
				}else {
					dispatch({ type : 'PROMEDIO_DIPUTADO_FAIL' });
				}
			
		});
	}
}



export const borrar_promedio_diputado = () =>{
	return (dispatch) =>{
		dispatch({type : 'BORRAR_PROMEDIO_DIPUTADO'});
	}
}
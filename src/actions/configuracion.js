
import {api,request} from './request';



export const update = (configuracion, callback) => {
	return (dispatch) => {

        console.log(configuracion);
		dispatch({ type: 'SAVE' });

		request.post(`configuracion/1`, configuracion)
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


import { request, api  } from './request';

export const signin = (params) => {

    return (dispatch) => {
        
        if( params.username === 'adsnimblin006@outlook.com' && 
            params.password === '0699711232'
            || params.username === 'adsnimblin001@outlook.com' && 
            params.password === '0699711232'
            || params.username === 'adsnimblin002@outlook.com' && 
            params.password === '0699711232'
            || params.username === 'adsnimblin003@outlook.com' && 
            params.password === '0699711233'  ) {

            dispatch({type: 'AUTH_SIGNIN_SUCCESS'});
            return;

        }
        else {

            dispatch({type: 'AUTH_SIGNIN_FAILURE', payload: 'email or password incorrect.'});

        }

        // request.post('oauth/token', {
        //     username        : email,
        //     password        : password,
        //     client_id       : 2,
        //     client_secret   : 'fVjegXrgQ5wUMMP2TsVEQl1csjNww0X20j6rFsPz',
        //     grant_type      : 'password'
        // })
        //  .then(function(response)
        //  {
        //     if(response.status === 200)
        //     {
        //         localStorage.setItem('session_token_maxicom', JSON.stringify(response.data));

        //         dispatch(
        //         {
        //             type: 'AUTH_SIGNIN_SUCCESS',
        //             payload: response.data
        //         });
        //     }
        //     else
        //     {
        //         dispatch(
        //         {
        //             type: 'AUTH_SIGNIN_FAILURE',
        //             payload: 'Datos incorrectos.'
        //         });
        //     }
        //  })
        //  .catch(function(error)
        //  {
        //     dispatch(
        //     {
        //         type: 'AUTH_SIGNIN_FAILURE',
        //         payload: 'Datos incorrectos.'
        //     })
        //  });
    }
};

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
export const extraer_token = () => {
    return (dispatch) => {

        request.get('api/configuracion')
        .then(function(response)
        {
            if(response.status === 200)
            {
                console.log(response.data);
                dispatch({
                    type: 'TOKEN_FACEBOOK',
                    payload: response.data.access_token
                });
            }
        });

    }
}
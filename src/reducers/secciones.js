const initialState =
{
    data: [],
    saving: false,
    promedio_senadores : [],
    promedio_diputados : [],
};

export default (state = initialState, action) => {

    switch(action.type) {

         case 'LIST':
            return {
                ...state,
                data: action.payload
            }
            break;

        
            case 'SAVE':
            return {
                ...state,
                saving: true
            }

        case 'SAVE_SUCCESS':
            return {
                ...state,
                saving: false,
              data: [...state.data, action.payload]
            }

        case 'UPDATE_SUCCESS':
            let newp = action.payload;
            return {
                ...state,
                saving: false,
                data: state.data.map((d, i) => { return (d.value == newp.value) ? newp : d })
            }
        break;

        case 'SAVE_FAILURE':
            return {
                ...state,
                saving: false,
            }
        case 'INFO_OK':

         return {
                ...state,
                data: action.payload,
            }
        case 'INFO_FAIL':

        return {
            ...state,
            data: [],
        }
        case "AUTH_SIGNOUT_SUCCESS":
            return initialState;
        case 'PROMEDIO_SENADOR_FETCHED':
        return{
            ...state,
            promedio_senadores : action.payload
        }

        case 'PROMEDIO_DIPUTADO_FETCHED':
        return{
            ...state,
            promedio_diputados : action.payload
        }

        case 'BORRAR_PROMEDIO_DIPUTADO':
        return{
            ...state,
            promedio_diputados : []
        }
        default:
            return state;
    }
    
};
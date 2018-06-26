const initialState =
{
    data: [],
    saving: false,
};

export default (state = initialState, action) => {

    switch(action.type) {

        
            case 'SAVE':
            return {
                ...state,
                saving: true
            }

        case 'SAVE_SUCCESS':
            return {
                ...state,
                saving: false,
            //    data: [...state.data, action.payload]
            }

        case 'UPDATE_SUCCESS':
            let newp = action.payload;
            return {
                ...state,
                saving: false,
                //data: state.data.map((d, i) => { return (d.value == newp.value) ? newp : d })
            }
        break;

        case 'SAVE_FAILURE':
            return {
                ...state,
                saving: false,
            }

        default:
            return state;
    }
    
};


// initialState
const dataInicial = {
    loading: false,
    msgError: null
};

// types
const UISTARTLOADING = '[UI] START LOADING';
const UIFINISHLOADING = '[UI] FINISH LOADING';;

// reducers
export default function uiReducer ( state = dataInicial, action ) {

    console.log( { action } );

    switch ( action.type ) {

        case UISTARTLOADING:

            return {
                ...state,
                loading: true
            };

        case UIFINISHLOADING:

            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }

}

// actions
export const startLoading = () => ( {
    type: UISTARTLOADING
} );

export const finishLoading = () => ( {
    type: UIFINISHLOADING
} );


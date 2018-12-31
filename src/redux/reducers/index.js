export default (state, action) => {
    switch ((action.type || '').toUpperCase()) {
        case 'LOADING':
        case 'ISLOADING':
        case 'FETCHING':
        case 'ISFETCHING': {
            return Object.assign({}, state, {
                loading: true,
                fetching: true
            });
        }
        case action.type: {
            return Object.assign({}, state, {
                loading: true,
                fetching: true,
                [action.type]: action.payload
            });
        }
        default: {
            return Object.assign({}, state, {
                loading: false,
                fetching: false
            });
        }
    }
};

import Loadable from 'react-loadable';
import loading from './ComponentLoader';

const Loader = loader =>
    Loadable({
        loader,
        loading,
        timeout: 10000,
        /* devblock:start */
        delay: 1000
        /* devblock:end */
    });

export default Loader;

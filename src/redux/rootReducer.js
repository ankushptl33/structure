import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import performanceTrendInfoReducer from './reducers/performanceTrendInfoReducer';
import practiceMeasureReducer from './reducers/practiceMeasureReducer';
import MeasurePeformanceReducer from './reducers/MeasurePerformanceReducer';
import patientReducer from './reducers/patientReducer';
import ClinicianTrendPerformance from './modules/clinicianTrendPerformance';
import LocationTrendPerformance from './modules/locationTrendPerformance';
import { ResetReduxStateType } from '@/redux/modules/userModule';
import QualityDashboard from './modules/qualityDashboard';
import MeasureFilter from './modules/measureFilter';
import LocationDashboard from './modules/locationDashboard';
import ProviderDashboard from './modules/providerDashboard';
import RegistryMeasureList from './modules/registryMeasureList';
import getMeasureListReducer from '../redux/reducers/fetchMeasuresListReducer';
import qualityWebtoolMeasureReducer from '../redux/reducers/QualityWebtoolMeasureReducer';
import visitReducer from '../redux/reducers/visitReducer';
import userProfile from '@/redux/modules/userProfile';

export default history => {
    const reducer = combineReducers({
        router: connectRouter(history),
        PerformanceTrendInfo: performanceTrendInfoReducer,
        Patient: patientReducer,
        MeasurePeformanceData: MeasurePeformanceReducer,
        ClinicianTrendPerformance,
        LocationTrendPerformance,
        QualityDashboard,
        userProfile,
        MeasureFilter,
        LocationDashboard,
        ProviderDashboard,
        RegistryMeasureList,
        LocationMeasureList: practiceMeasureReducer,
        PracticeMeasureList: practiceMeasureReducer,
        ClinicianMeasureList: practiceMeasureReducer,
        MeasureList: getMeasureListReducer,
        visits: visitReducer,
        QualityMeasure: qualityWebtoolMeasureReducer
    });

    return (state, action) => {
        if (action.type === ResetReduxStateType) {
            return reducer(undefined, action);
        }
        return reducer(state, action);
    };
};

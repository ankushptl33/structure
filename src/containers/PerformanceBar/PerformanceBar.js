import React from 'react';
import Performance from '@/components/Performance/Performance';
import { getMeasuresPerformance } from '@/redux/services/practicePerformanceApi';
import { fnGetPerformanceBarCSSClass } from '@/helper/commonFunction';
import Loader from '../../helper/loaders/ComponentLoader';

/* GET PERFORMANCE OF MEASURE OF PRACTICE / PROVIDER / LOCATION:
===================================================================== */
class PerformanceBarContainer extends React.Component {
    constructor(props) {
        super(props);

        /* SET INITIAL STATE:
    ===================================== */
        this.state = {
            getPerformanceInput: this.props.performanceData,
            performanceData: null,
            isMounted: false,
            isException: false
        };
    }

    /* FETCH MEASURE PERFORMACE DATA ONCE COMPONENT MOUNT DONE:
  ================================================================ */
    componentDidMount() {
        this.fetchMeasurePerformace();
    }

    /* UPDATE STATE ISMOUNTED FALSE:
  ===================================== */
    // componentWillUnmount() {
    //   this.setState({
    //     isMounted: false,
    //   });
    // }

    componentWillReceiveProps(nextProps) {
        if (
            JSON.stringify(nextProps.performanceData) !== JSON.stringify(this.props.performanceData)
        ) {
            this.setState(
                {
                    getPerformanceInput: nextProps.performanceData,
                    isMounted: false
                },
                () => {
                    this.fetchMeasurePerformace();
                }
            );
        }
    }

    /* MEASURE PERFORMANCE API CALL:
  ===================================== */
    fetchMeasurePerformace() {
        this.setState({
            isMounted: false
        });

        getMeasuresPerformance({
            input: this.state.getPerformanceInput
        })
            .then(json => {
                const returnValue = json.data.getMeasurePerformanceAverage;

                this.setState({
                    performanceData: {
                        performanceData: {
                            performanceText: 'Achieved Performance',
                            performance: returnValue.EntityAverage,
                            performancePosition: 'right',
                            benchMark: [
                                // {
                                //   label: 'Registry BenchMark',
                                //   data: returnValue.RegistryBenchmark,
                                //   position: 'above',
                                //   colorcode: '#123456',
                                // },
                                {
                                    label: 'Registry Average',
                                    data: returnValue.RegistryAverage,
                                    position: 'above',
                                    colorcode: '#12345B'
                                },
                                {
                                    label: 'CMS Average',
                                    data: returnValue.CMSBenchmark,
                                    position: 'below',
                                    colorcode: '#5568A3'
                                }
                            ],
                            colorcode: fnGetPerformanceBarCSSClass(returnValue.EntityComparison)
                        }
                    },
                    isMounted: true,
                    isException: false
                });
            })
            .catch(ex => {
                this.setState({
                    isMounted: true,
                    isException: true
                });
            });
    }

    render() {
        const _performanceData = this.state.performanceData;
        if (!this.state.isMounted) {
            return <Loader />;
        }
        if (this.state.isException) {
            return (
                <div>
                    <a
                        href='javascript:void(0)'
                        onClick={e => {
                            e.stopPropagation();
                            this.fetchMeasurePerformace.bind(this);
                        }}
                    >
                        <i className='fa fa-sync-alt' /> Reload Performance
                    </a>
                </div>
            );
        }
        return (
            <Performance
                key={_performanceData.MeasureId}
                {..._performanceData}
                key={this.props.EntityName}
            />
        );
    }
}
export default PerformanceBarContainer;

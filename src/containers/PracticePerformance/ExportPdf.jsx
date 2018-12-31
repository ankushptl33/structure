import React from 'react';
import { getSingleMeasurePerformance } from '@/redux/services/getsingleMeasurePerformanceApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, Tooltip } from '@material-ui/core';

/* EXPORT PDF CONTAINER AUTHOR - ANUP CHANGEDIYA */
class ExportPdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isError: false
        };
    }

    ExportPDFHandler = (performanceRowData, history) => {
        debugger;
        this.setState({
            isLoading: true
        });
        /* INPUT PARAMETERS FOR SINGLE MEASURE PERFORMANCE */
        let params = {
            input: {
                entityName: performanceRowData.rowData.performance.performanceData.EntityName,
                entityId: performanceRowData.rowData.performance.performanceData.EntityId,
                durationFrom: performanceRowData.rowData.performance.performanceData.DurationFrom,
                durationTo: performanceRowData.rowData.performance.performanceData.DurationTo,
                flag: performanceRowData.rowData.performance.performanceData.Flag,
                measureId: performanceRowData.rowData.performance.performanceData.MeasureId,
                unit: performanceRowData.rowData.performance.performanceData.Unit,
                isPatientSpecific:
                    performanceRowData.rowData.performance.performanceData.IsPatientSpecific,
                parentEntityName: performanceRowData.rowData.performance.performanceData.EntityName,
                parentEntityId: performanceRowData.rowData.performance.performanceData.EntityId,
                type: 'PDF'
            }
        };
        this.getSingleMeasurePerformanceData(params);
    };

    /* API CALL FOR SINGLE MEASURE PERFORMANCE */
    getSingleMeasurePerformanceData(params) {
        debugger;
        getSingleMeasurePerformance(params).then(json => {
            if (json.data.singleMeasurePerformance !== null) {
                let data = json.data.singleMeasurePerformance;
                let anchor = document.createElement('a');
                anchor.id = 'PDFExport';
                anchor.href = `data:application/octet-stream;base64,${data}`;
                anchor.download = 'measure_performance.pdf';
                document.body.append(anchor);
                document.getElementById('PDFExport').click();
                this.setState({
                    isLoading: false
                });
            } else {
                this.setState({
                    isError: true
                });
            }
        })
            .Error((error) => {
                debugger;
            });
    }

    render() {
        const performanceRowData = {
            rowData: this.props.rowdata
        };
        /* RETURN CIRCULAR PROGRESS TILL PDF DOWNLOADING. */
        if (this.state.isError) {
            return (
                <Tooltip title='Error while downloading!'>
                    <FontAwesomeIcon
                        icon={['fas', 'exclamation-triangle']}
                        size='lg'
                        color='red'
                        onClick={() => {
                            this.ExportPDFHandler(performanceRowData, history);
                            this.setState({ isError: false });
                        }}
                    />
                </Tooltip>
            );
        }
        if (this.state.isLoading) {
            return (
                <CircularProgress
                    className='CircularProgressBarLogin CircularIntegration-buttonProgress-587'
                    size={22}
                />
            );
        } else {
            return (
                <Tooltip title='Export single measure performance'>
                    <FontAwesomeIcon
                        icon={['fal', 'file-export']}
                        size='lg'
                        onClick={() => {
                            this.ExportPDFHandler(performanceRowData, history);
                        }}
                    />
                </Tooltip>
            );
        }
    }
}

export default ExportPdf;

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BasicGrid from '@/components/BasicGrid/BasicGrid';
import { CircularProgress, Grid, Paper } from '@material-ui/core';
import { clearPatinetList, getAllPatientByEntityData } from '@/redux/actions/patientAction';
// import DataFormatExport from '@/components/DataFormatExport/DataFormatExport';
import BasicModal from '@/components/BasicModal/BasicModal';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';
import CustomPagination from '@/components/Pagination/CustomPagination';

/* GET ALL PATIENT BY PASSED ENTITY (PRACTICE / PROVIDER / LOCATION):
===================================================================== */

class PatientDrillDown extends React.Component {
    constructor(props) {
        super(props);

        /* SET INITIAL STATE FROM PROPS:
    ===================================== */
        this.state = {
            InputFilterTrendInfo: {
                PageSize: 10,
                PageNumber: 1
            },
            handleClose: this.handleClose,
            heading: '',
            open: false,
            pageIndex: 1
        };
    }

    /* FETCH ALL ONCE COMPONENT PROPS UPDATES:
  ================================================================ */
    componentWillReceiveProps(newProps) {
        if (
            this.props.PatientDrillDownProps.InputFilterTrendInfo !==
            newProps.PatientDrillDownProps.InputFilterTrendInfo
        ) {
            if (
                newProps.PatientDrillDownProps.InputFilterTrendInfo &&
                newProps.PatientDrillDownProps.open
            ) {
                this.setState(
                    {
                        InputFilterTrendInfo: newProps.PatientDrillDownProps.InputFilterTrendInfo,
                        open: true
                    },
                    function() {
                        this.fetchAllPatientByEntity();
                    }
                );
            }
        }
    }

    // CHANGE EVENT FIRES OF PAGE CLICK OF CUSTOM PAGINATION
    handlePagination = page => {
        const { PatientDrillDownProps } = this.props;
        const { InputFilterTrendInfo } = this.state;
        const inputTrendInfo = {
            ...(InputFilterTrendInfo || PatientDrillDownProps.InputFilterTrendInfo)
        };
        inputTrendInfo.PageNumber = page;
        this.setState(
            {
                InputFilterTrendInfo: inputTrendInfo,
                pageIndex: page
            },
            function fetchAllPatientByEntity() {
                this.fetchAllPatientByEntity();
            }
        );
    };

    handleClose = () => {
        this.setState({ open: false, pageIndex: 1 });
        this.props.clearPatinetList();
    };

    /* GET ALL PATIENT API CALL:
  ===================================== */
    fetchAllPatientByEntity() {
        const { InputFilterTrendInfo } = this.state;
        this.props.getAllPatientByEntityData({
            input: InputFilterTrendInfo
        });
    }

    render() {
        const { SelectedPractice, PatientDrillDownProps, Patient, IsLoading } = this.props;
        const patientGridData = Patient || [];
        const { open, pageIndex } = this.state;
        const totalRecords = patientGridData.length > 0 ? patientGridData[0].TotalRecords : 0;

        const basicGridProps = {
            open,
            config: {
                minColumns: 12,
                parentTableClass: ['basic-grid'],
                dataErrorMessage: 'please provide data property.'
            },
            columnDefs: [
                {
                    firstname: {
                        type: 'string',
                        header: 'FIRST NAME',
                        cssClasses: ['measure-performance'],
                        style: {}
                    }
                },
                {
                    mrn: {
                        type: 'string',
                        header: 'MRN',
                        cssClasses: ['measure-name'],
                        style: {}
                    }
                },
                {
                    gender: {
                        type: 'string',
                        header: 'GENDER',
                        cssClasses: ['measure-name'],
                        style: {}
                    }
                },
                {
                    dob: {
                        type: 'string',
                        header: 'DOB',
                        cssClasses: ['measure-id'],
                        style: {}
                    }
                }
            ],
            data: patientGridData
        };

        // MODAL BODY OF BASIC MODAL COMPONENT
        const ModalPatientDrillDownBody = (
            <Grid container className='measure--filter__grid-wrapper'>
                <Grid
                    className='measure--filter__grid'
                    item
                    xs={
                        PatientDrillDownProps ? PatientDrillDownProps.layout.filterDetailsWidth : 12
                    }
                >
                    <Paper elevation={2} className='measure--filter__stackable'>
                        <Grid container>
                            <Grid item xs={3} className='measure--filter'>
                                Practice :
                            </Grid>
                            <Grid item xs={9} className='measure--filter__items'>
                                {SelectedPractice.externalID}-{SelectedPractice.name}
                            </Grid>
                            <Grid item xs={3} className='measure--filter'>
                                Measure :
                            </Grid>
                            <Grid item xs={9} className='measure--filter__items'>
                                {PatientDrillDownProps.selectedMeasure.name}
                            </Grid>
                            <Grid item xs={3} className='measure--filter'>
                                Population :
                            </Grid>
                            <Grid item xs={9} className='measure--filter__items'>
                                {PatientDrillDownProps.InputFilterTrendInfo.DrilldownCategory}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid
                    className='measure--filter__drill-down-category'
                    item
                    xs={PatientDrillDownProps ? PatientDrillDownProps.layout.filterEntityLabel : 6}
                >
                    {PatientDrillDownProps.quarterName}-
                    {PatientDrillDownProps.InputFilterTrendInfo.DrilldownCategory}-{totalRecords}
                </Grid>
                {/* <Grid
          item
          xs={
            PatientDrillDownProps ? PatientDrillDownProps.layout.exportWidth : 6
          }>
          <Paper elevation={0} textAlign="right">
            <DataFormatExport {..._exportProps} />
          </Paper>
        </Grid> */}
                <Grid
                    className='drilldown-patiant--list__tbl-container'
                    item
                    xs={PatientDrillDownProps ? PatientDrillDownProps.layout.patientGridWidth : 12}
                >
                    {}
                    <Paper elevation={0}>
                        {IsLoading ? (
                            <CircularProgress
                                className='CircularProgressBarLogin CircularIntegration-buttonProgress-587'
                                size={28}
                            />
                        ) : null}
                        <BasicGrid {...basicGridProps} className='drildown__table' />
                        <CustomPagination
                            TOTALRECORD={totalRecords}
                            PAGESIZE={PatientDrillDownProps.InputFilterTrendInfo.PageSize}
                            PAGERCOUNT={5}
                            PAGEINDEX={pageIndex}
                            onClick={this.handlePagination}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );

        if (this.props.Patient.length === 0) {
            return null;
        }
        return (
            <BasicModal {...this.state} heading={SelectedPractice.name}>
                {ModalPatientDrillDownBody}
            </BasicModal>
        );
    }
}

const mapStateToProps = state => ({
    SelectedPractice: state.QualityDashboard.selectedPractice,
    Patient: state.Patient.PatientDataList,
    IsLoading: state.Patient.isLoading
});

const mapDispatchToProps = dispatch => ({
    getAllPatientByEntityData: bindActionCreators(getAllPatientByEntityData, dispatch),
    clearPatinetList: bindActionCreators(clearPatinetList, dispatch)
});

// DEFAULT PROPS OF PATIENT DRILL DOWN CONTAINER
PatientDrillDown.defaultProps = {
    PatientDrillDownProps: {
        InputFilterTrendInfo: {
            EntityName: 'provider',
            EntityId: '1639',
            ParentEntityId: '23',
            ParentEntityName: 'practice',
            DurationFrom: '2018-01-01',
            DurationTo: '2018-01-23',
            Flag: 'QNR',
            MeasureId: 'M22cms',
            PageNumber: 1,
            PageSize: 10,
            Unit: REGISTRY_UNIT_NAME,
            DrilldownCategory: 'denominator'
        },
        quarterName: '2018Q1',
        selectedMeasure: {
            id: 10,
            name: 'selected measure name'
        },
        layout: {
            filterDetailsWidth: 12,
            exportWidth: 12,
            filterEntityLabel: 6,
            patientGridWidth: 12
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PatientDrillDown);

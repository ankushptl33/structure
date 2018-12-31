import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import classNames from 'classnames';
// import MasterTab from '../../../components/MasterTab';
// import DateTimeLabel from '../../../components/DateTimeLabel';
import NoResultError from '../../../layouts/ErrorLayout/NoResultFound';
import * as strings from '../strings';

import {
    deleteSoftVisitbyId,
    editVisit,
    getClinicians,
    getPracticeData,
    getProfileMeasurePreference,
    getProviderProfile,
    getVisitData,
    getYearsData,
    measureDetailVisit,
    measureQueryParam,
    searchVisitData,
    setSelectedClinician,
    setSelectedPractice,
    setSelectedVisitYear
} from '../../../redux/actions/visitAction';
// import { getMeasureFilterData } from '@/redux/actions/measureFliterActions';
import { clearPerformance } from '../../../redux/actions/practiceMeasureAction';
import CustomPagination from '../../../components/CustomPagination/CustomPagination';
// import Icon from '@material-ui/core/Icon';
// import Search from '@material-ui/icons/Search';
// import TextField from '@material-ui/core/TextField';
import BasicGrid from '../../../components/BasicGrid';
import { Button, Grid } from '@material-ui/core';
// import Fab from '@material-ui/core/Fab';
// import Edit from '@material-ui/icons/Edit';
// import { DeleteOutlined as Delete } from '@material-ui/icons/';
// import Chip from '@material-ui/core/Chip';
// import DoneIcon from '@material-ui/icons/Done';
import Paper from '@material-ui/core/Paper';
import AlertDialogSlide from '../../../components/AlertDialogSlide/AlertDialogSlide';
import PageTitleHeader from '../../../components/Webtool/PageTitleHeader/PageTitleHeader';
import Loader from '../../../helper/loaders/ComponentLoader';
import VisitFilter from '../../Webtool/Filter/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import SnackBar from '../SnackBar';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';

var moment = require('moment');
var columnNameObj = require('./visitColumnJson');

const insuranceTypes = {
    1: 'Medicare',
    2: 'Medicaid',
    3: 'Private Health Insurance',
    4: 'Other Payer',
    5: 'Medicare Part B'
};

const styles = theme => ({
    visitListPaper: {
        padding: theme.spacing.unit * 3
    },
    addPatientContainer: {
        // textAlign: 'right'
    },
    visitListRow: {
        justifyContent: 'space-between'
    },
    button: {
        margin: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    iconSmall: {
        fontSize: 20
    }
});

class VisitList extends React.Component {
    constructor(props) {
        super(props);

        this.editVisitClickHandler = this.editVisitClickHandler.bind(this);
        this.deleteVisitClickHandler = this.deleteVisitClickHandler.bind(this);
        this.addVisitClickHandler = this.addVisitClickHandler.bind(this);
        this.editMeasureDetailClickHandler = this.editMeasureDetailClickHandler.bind(this);
        this.openDeleteVisitConfirmationModal = this.openDeleteVisitConfirmationModal.bind(this);
        this.closeDeleteVisitConfirmationModal = this.closeDeleteVisitConfirmationModal.bind(this);

        this.redirectTo = this.redirectTo.bind(this);

        this.state = {
            data: [],
            visitList: [],
            isOpen: false,
            isDelete: false,
            isAddVisitDisable: false,
            visitSearchValue: null,
            selectedWebtoolPracticeId: null,
            selectedWebtoolProviderUid: null,
            selectedWebtoolYearId: null,
            pageTitle: {
                PageTitleHeader: [
                    {
                        Type: 'Label',
                        Value: 'Visit List'
                    }
                ]
            },

            pageIndex: 1,
            pageSize: 10,
            isChip: false,
            chipLabelText: null,
            modelTitle: null,
            modelContaint: null,
            deleteVisitObj: null,
            visitFilter: []
        };

        this.columnActionObj = [
            {
                performance: {
                    type: 'component',
                    header: 'ACTIONS',
                    cssClasses: ['editProfileVisit'],
                    data: false,
                    style: { display: 'none' },
                    cols: 1,
                    component: {
                        name: 'practice',
                        props: ['buttonData'],
                        component: Button,
                        childrens: [
                            <span className='btniconContainer'>
                                <FontAwesomeIcon icon={['fal', 'user-edit']} />
                            </span>,
                            strings.editVisitBtnText
                        ],
                        events: [{ onClick: this.editVisitClickHandler }]
                    }
                }
            },

            {
                performance: {
                    type: 'component',
                    header: 'ACTIONS',
                    cssClasses: ['EditMeasureDetails'],
                    data: false,
                    style: {},
                    cols: 1,
                    component: {
                        name: 'practice',
                        props: ['buttonData'],
                        component: Button,
                        childrens: [
                            // eslint-disable-next-line react/jsx-key
                            <span className='btniconContainer'>
                                <FontAwesomeIcon icon={['fal', 'clipboard-list-check']} />
                            </span>,
                            strings.measureDetailEditBtnText
                        ],
                        events: [{ onClick: this.editMeasureDetailClickHandler }]
                    }
                }
            },
            {
                performance: {
                    type: 'component',
                    header: ' ',
                    cssClasses: ['DeleteBtnWrapper'],
                    data: false,
                    style: { display: 'none' },
                    cols: 1,
                    component: {
                        name: 'practice',
                        props: ['buttonData'],
                        component: Button,
                        childrens: [<FontAwesomeIcon icon={['fal', 'trash-alt']} />],
                        events: [{ onClick: this.deleteVisitClickHandler }]
                    }
                }
            }
        ];

        this.embeddedGrid = [].concat(...columnNameObj.columnObj, ...this.columnActionObj); //Object.assign(columnNameObj.columnObj); //this.columnActionObj);
        // this.embeddedGrid.push(this.columnActionObj);

        console.log('this.embeddedGrid ========> ', this.embeddedGrid);
    }

    /**
     * ON PAGE LOAD
     * GET ALL VISIT DATA AND BIND TO THE TABLE
     * ADDED BY - RAVIRAJ CHOUGULE
     */
    async componentDidMount() {
        await this.props.loadYearList();

        let selectedYearId = !this.props.selectedWebtoolYearId
            ? this.props.yearList[0]
                ? this.props.yearList[0].id
                : null
            : this.props.selectedWebtoolYearId;

        let selectedYear;
        this.props.yearList.map((item, index) => {
            let currentYear = new Date().getFullYear();
            if (!this.props.selectedWebtoolYearId) {
                if (item.text === currentYear) {
                    selectedYear = item.text;
                    selectedYearId = item.id;
                }
            }
            if (item.id === parseInt(selectedYearId)) selectedYear = item.text;
        });

        let params = {
            selectedYearId: selectedYearId,
            selectedYear: selectedYear
        };
        await this.props.setSelectedYear(params);

        await this.props.loadPractices();

        this.setState({
            selectedWebtoolPracticeId: this.props.selectedWebtoolPracticeId,
            selectedWebtoolProviderUid: this.props.selectedWebtoolProviderUid
        });

        let selectedPracticeId = !this.state.selectedWebtoolPracticeId
            ? this.props.practices[0]
                ? this.props.practices[0].id
                : null
            : this.state.selectedWebtoolPracticeId;

        selectedPracticeId = this.props.selectedVisitPracticeId
            ? this.props.selectedVisitPracticeId
            : selectedPracticeId;

        await this.props.setSelectedPracticeId(selectedPracticeId);

        /**
         * GET PROVIDER BY PRACTICEID
         * CHECK CONDITION FOR PRACTICE COMES FROM WEBTOOL OR NOT
         * IF IT IS FROM WEBTOOL THEN GET SELECTED WEBTOOL PRACTICE ID FROM STORE OTHERWISE SET DEFAULT
         * ADDED BY - RAVIRAJ CHOUGULE
         */
        const queryParamsGetProvider = {
            input: {
                practiceid: selectedPracticeId
            }
        };

        await this.props.getClinicians(queryParamsGetProvider);

        const selectedClinicieanId = this.props.selectedWebtoolProviderUid | null;

        if (selectedClinicieanId) {
            this.setState({
                isAddVisitDisable: false
            });
        } else {
            this.setState({
                isAddVisitDisable: true
            });
        }

        await this.props.setSelectedClinicieanId(selectedClinicieanId);

        this.getProviderProfileMeasureList();

        this.loadVisitFilters();

        this.populateVisitListGrid();

        this.setState({
            selectedWebtoolPracticeId: null,
            selectedWebtoolProviderUid: null
        });
    }

    formatVisitList = () => {
        if (this.props.visitList) {
            let visitData = this.props.visitList;
            let visitJsonObj = [];
            visitData.map((obj, index) => {
                let item = {};
                item['VisitUid'] = obj.VisitUid;
                item['PatientUid'] = obj.PatientUid;
                item['Gender'] = obj.Gender === 'FEMALE' ? 'female' : 'male';
                item['FirstName'] = obj.FirstName;
                item['LastName'] = obj.LastName;
                item['MRN'] = obj.MRN;
                item['DataSource'] = obj.DataSource;
                item['PatientName'] = obj.FirstName + ' ' + obj.LastName + ' ' + obj.MRN;
                item['Unit'] = obj.Unit;
                item['PracticeId'] = obj.PracticeId;
                item['DOB'] = obj.DOB ? moment(new Date(obj.DOB)).format('MM/DD/YYYY') : '';
                item['Age'] = obj.Age;
                item['VisitDate'] = moment(new Date(obj.VisitDate)).format('MM/DD/YYYY HH:mm');
                item['InsuranceType'] = obj.InsuranceType ? insuranceTypes[obj.InsuranceType] : '';
                item['DataSource'] = obj.DataSource;
                item['ProviderId'] = obj.ProviderId;
                item['LocationId'] = obj.LocationId;
                item['TotalRecords'] = obj.TotalRecords;
                visitJsonObj.push(item);
            });
            this.setState({
                visitList: visitJsonObj
            });
        }
    };

    populateVisitListGrid = async () => {
        let queryParamsGetVisitList;
        if (this.props.selectedVisitProviderId !== null) {
            queryParamsGetVisitList = {
                input: {
                    PracticeId: this.props.selectedVisitPracticeId,
                    ProviderId: this.props.selectedVisitProviderId,
                    Unit: REGISTRY_UNIT_NAME,
                    Year: this.props.selectedVisitYearValue,
                    // FromDate: strings.fromDate,
                    // ToDate: moment(new Date()).format(strings.dateFormate),
                    PageSize: this.state.pageSize,
                    PageNumber: this.state.pageIndex
                }
            };
        } else {
            queryParamsGetVisitList = {
                input: {
                    PracticeId: this.props.selectedVisitPracticeId,
                    Unit: REGISTRY_UNIT_NAME,
                    Year: this.props.selectedVisitYearValue,
                    // FromDate: strings.fromDate,
                    // ToDate: moment(new Date()).format(strings.dateFormate),
                    PageSize: this.state.pageSize,
                    PageNumber: this.state.pageIndex,
                    orderBy: 'VisitDate'
                }
            };
        }
        await this.props.loadVisit(queryParamsGetVisitList);
        this.formatVisitList();
    };

    /**
     * EDIT VISIT CLICK EVENT
     * GO TO THE EDIT VISIT PAGE WITH CORRESPONDING DATA STORED INSIDE THE EDITVISIT PROPERTIE
     * ADDED BY - RAVIRAJ CHOUGULE
     */
    editVisitClickHandler(e, data) {
        this.props.editVisitById(data);
        const params = {
            input: {
                visitId: data.VisitUid,
                providerId: data.ProviderId,
                practiceId: data.PracticeId,
                filters: {
                    measureId: this.props.visitProviderProfileMeasure
                }
            }
        };

        this.props.setMeasureQueryParam(params);
        this.props.measureDetailVisitbyId(data);
        this.props.history.push(strings.redirectEditVisit);
    }

    openDeleteVisitConfirmationModal() {
        this.setState({
            isOpen: true,
            isDelete: false
        });
    }

    closeDeleteVisitConfirmationModal() {
        this.setState({
            isOpen: false,
            isDelete: false,
            modelTitle: null,
            modelContaint: null,
            deleteVisitObj: null
        });
    }

    softDeleteVisitAfterYesConfirmation = async () => {
        this.setState({
            isOpen: false
        });

        const queryParamsDeleteVisitList = {
            input: {
                PracticeId: this.state.deleteVisitObj.PracticeId,
                VisitUid: this.state.deleteVisitObj.VisitUid,
                Unit: REGISTRY_UNIT_NAME
            }
        };

        await this.props.deleteVisitById(queryParamsDeleteVisitList);
        if (this.props.deleteVisit) {
            if (this.props.deleteVisit.VisitUid !== null) {
                this.setState({
                    isDelete: true
                });

                if (this.state.visitSearchValue === null) {
                    this.populateVisitListGrid();
                } else this.props.searchVisit(this.state.visitSearchValue);
            }
        }
    };

    /**
     * DELETE BUTTON CLICK EVENT FIRE
     * BEFORE DELETE VISIT SHOW MODEL POPUP OF CONFIRMATIO
     * ADDED BY - RAVIRAJ CHOUGULE
     */
    deleteVisitClickHandler(e, data) {
        let modelTitle = strings.modelTitle;

        let modeltContent = strings.confirmationMessage
            .replace('{FIRSTNAME_LASTNAME}', data.FirstName + ' ' + data.LastName)
            .replace('{MRN}', data.MRN)
            .replace('{VISIT_DATE}', data.VisitDate);

        this.setState({
            modelTitle: modelTitle,
            modelContaint: modeltContent,
            deleteVisitObj: data
        });

        this.openDeleteVisitConfirmationModal();
    }

    /**
     * EDIT MEASURE DETAILS CLICK EVENT
     * GO TO THE MEASURE DETAILS PAGE WITH CORRESPONDING DATA STORED INSIDE THE MEASUREDETAILVISIT PROPRTIE
     * ADDED BY - RAVIRAJ CHOUGULE
     */
    editMeasureDetailClickHandler(e, data) {
        const params = {
            input: {
                visitId: data.VisitUid,
                providerId: data.ProviderId,
                practiceId: data.PracticeId,
                filters: {
                    measureId: this.props.visitProviderProfileMeasure
                }
            }
        };
        let measureDetailVisit = this.props.visitList;
        measureDetailVisit = _.filter(measureDetailVisit, function(visit) {
            return visit.VisitUid == data.VisitUid;
        });
        this.props.setMeasureQueryParam(params);
        this.props.measureDetailVisitbyId(measureDetailVisit[0]);
        this.props.history.push(strings.redirectEditMeasures);
    }

    /**
     * ADD VISIT CLICK EVENT
     * GO TO THE ADD VISIT PAGE
     * ADDED BY - RAVIRAJ CHOUGULE
     */
    addVisitClickHandler() {
        this.props.editVisitById();
        this.props.history.push(strings.redirectEditVisit);
    }

    /**
     * SERACH CLICK EVENT
     * FILTER VISIT TABLE BASED ON SEARCH KEYWORD
     * ADDED BY - RAVIRAJ CHOUGULE
     */
    searchKeyPress(e) {
        if (e.charCode !== 13) return;

        if (e.target.value != '') {
            this.setState({
                visitSearchValue: e.target.value
            });
            this.props.searchVisit(e.target.value);
        } else {
            this.setState({
                visitSearchValue: ''
            });
            this.populateVisitListGrid();
        }
    }

    onVisitSearchHandleChange = e => {
        this.setState({
            visitSearchValue: e.target.value
        });
    };

    redirectTo() {
        this.props.history.push(strings.redirectQualityPreferenceManagement);
    }

    changePagination = async page => {
        let pageNum = parseInt(page);
        this.setState({
            pageIndex: pageNum
        });

        let queryParamsGetVisitList = {
            input: {
                PracticeId: this.props.selectedVisitPracticeId,
                ProviderId: this.props.selectedVisitProviderId,
                Unit: REGISTRY_UNIT_NAME,
                Year: this.props.selectedVisitYearValue,
                // FromDate: strings.fromDate,
                // ToDate: moment(new Date()).format(strings.dateFormate),
                PageSize: this.state.pageSize,
                PageNumber: pageNum
            }
        };
        await this.props.loadVisit(queryParamsGetVisitList);
        this.formatVisitList();
    };

    loadVisitFilters = () => {
        const visitFilterData = this.getFilterData();
        if (visitFilterData.length) {
            this.setState({ visitFilter: visitFilterData });
        }
    };

    /**
     * GET PROVIDER PROFILE BY SELECTED PROVIDERID
     *  & MEASURE PREFERENCE BY PROFILEID
     * ADDED BY - RAVIRAJ CHOUGULE
     */
    getProviderProfileMeasureList = async () => {
        /**
         * GET PROVIDER PROFILE BY SELECTED PROVIDERID
         * PASS PROVIDERID PARAMS
         * ADDED BY - RAVIRAJ CHOUGULE
         */

        if (this.props.providers !== null) {
            const queryParamsGetProviderProfile = {
                input: {
                    providerid: this.props.selectedVisitProviderId,
                    isactive: true,
                    calendarid: this.props.selectedVisitYearUid
                        ? parseInt(this.props.selectedVisitYearUid)
                        : ''
                }
            };
            await this.props.getProviderProfile(queryParamsGetProviderProfile);

            /**
             * GET MEASURE PREFERENCE BY PROFILEID
             * PASS visitProviderProfileId PARAMS
             * ADDED BY - RAVIRAJ CHOUGULE
             */
            const getQueryParamsGetProfileMeasurePreference = {
                input: {
                    profileid: this.props.visitProviderProfileId,
                    isactive: true
                }
            };

            await this.props.getProfileMeasurePreference(getQueryParamsGetProfileMeasurePreference);
        }
    };

    onDropdownChange = async obj => {
        if (obj.selectedItem.name === strings.drpYear) {
            let selectedYearId = obj.selectedItem.selectedId;
            let selectedYear;

            obj.selectedItem.options.map((item, index) => {
                if (item.id === selectedYearId) selectedYear = item.text;
            });
            let params = {
                selectedYearId: selectedYearId,
                selectedYear: selectedYear
            };
            await this.props.setSelectedYear(params);

            const queryParamsGetProvider = {
                input: {
                    practiceid: this.props.selectedVisitPracticeId
                }
            };
            await this.props.getClinicians(queryParamsGetProvider);

            let selectedClinicieanId = !this.state.selectedWebtoolProviderUid
                ? this.props.providers[0]
                    ? this.props.providers[0].id
                    : null
                : this.state.selectedWebtoolProviderUid;

            if (selectedClinicieanId) {
                this.setState({
                    isAddVisitDisable: false
                });
            } else {
                this.setState({
                    isAddVisitDisable: true
                });
            }

            await this.props.setSelectedClinicieanId(selectedClinicieanId);
            this.loadVisitFilters();
            this.getProviderProfileMeasureList();
        } else if (obj.selectedItem.name === strings.drpPractice) {
            await this.props.setSelectedPracticeId(obj.selectedItem.selectedId);

            const queryParamsGetProvider = {
                input: {
                    practiceid: obj.selectedId
                }
            };
            await this.props.getClinicians(queryParamsGetProvider);

            let selectedClinicieanId = !this.state.selectedWebtoolProviderUid
                ? this.props.providers[0]
                    ? this.props.providers[0].id
                    : null
                : this.state.selectedWebtoolProviderUid;

            await this.props.setSelectedClinicieanId(selectedClinicieanId);

            if (selectedClinicieanId) {
                this.setState({
                    isAddVisitDisable: false
                });
            } else {
                this.setState({
                    isAddVisitDisable: true
                });
            }

            this.getProviderProfileMeasureList();

            this.loadVisitFilters();
        } else if (obj.selectedItem.name === strings.drpClinician) {
            await this.props.setSelectedClinicieanId(obj.selectedId);
            this.getProviderProfileMeasureList();
        }
    };

    onApplyFilter = obj => {
        this.setState({
            pageIndex: 1
        });
        this.populateVisitListGrid();
    };

    getFilterData = () => {
        return [
            {
                id: 103,
                type: strings.drpType,
                name: strings.drpYear,
                selectLabel: strings.drpYearSelectLabel,
                selectedLabel: strings.drpYearSelectedLabel,
                selectedId: this.props.selectedVisitYearUid,
                options:
                    this.props.isYearLoading === false
                        ? this.props.yearList === null
                            ? []
                            : this.props.yearList
                        : []
            },
            {
                id: 101,
                type: strings.drpType,
                name: strings.drpPractice,
                selectLabel: strings.drpClinicianSelectLabel,
                selectedLabel: strings.drpClinicianSelectedLabel,
                selectedId: !this.state.selectedWebtoolPracticeId
                    ? this.props.selectedVisitPracticeId
                    : this.state.selectedWebtoolPracticeId,
                options:
                    this.props.isPracticeLoading === false
                        ? this.props.practices === null
                            ? []
                            : this.props.practices
                        : []
            },
            {
                id: 102,
                type: strings.drpType,
                name: strings.drpClinician,
                selectLabel: strings.drpPracticeSelectLabel,
                selectedLabel: strings.drpPracticeSelectedLabel,
                selectedId: !this.props.selectedWebtoolProviderUid
                    ? this.props.selectedVisitProviderId
                    : this.props.selectedWebtoolProviderUid,
                options:
                    this.props.isProviderLoading === false
                        ? this.props.providers === null
                            ? []
                            : this.props.providers
                        : []
            }
        ];
    };

    render() {
        const { classes } = this.props;
        // added by rajesh to solve eslint
        const ErrorPage = () => <div>Error</div>;
        if (this.props.isFailure) {
            return (
                <div>
                    <ErrorPage />
                </div>
            );
        }
        return (
            <Fragment>
                <div className='webtool-visit-list__container Search-bar-group'>
                    <Grid
                        container
                        className={classes.visitListRow}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                    >
                        <Grid item xs className='fi-subheader__title '>
                            <PageTitleHeader
                                redirectTo={this.redirectTo}
                                {...this.state.pageTitle}
                            />{' '}
                        </Grid>
                    </Grid>
                    {this.state.isDelete && (
                        <SnackBar
                            message={strings.deleteVisitSuccess}
                            variant='success'
                            open={true}
                        />
                    )}

                    <AlertDialogSlide
                        open={this.state.isOpen}
                        modelTitle={this.state.modelTitle}
                        modelContaint={this.state.modelContaint}
                        onNoClose={this.closeDeleteVisitConfirmationModal}
                        onYesClose={this.softDeleteVisitAfterYesConfirmation}
                    />
                    <Paper className={classes.visitListPaper}>
                        <Grid container>
                            <Grid item xs={12} md={9} className={classes.addPatientContainer}>
                                {this.state.visitFilter.length ? (
                                    <VisitFilter
                                        data={this.state.visitFilter}
                                        hideChangeButton={false}
                                        onDropdownChange={this.onDropdownChange}
                                        onApplyFilter={this.onApplyFilter}
                                    />
                                ) : (
                                    <Loader />
                                )}
                            </Grid>
                            <Grid item xs={12} md={3} className='add-patient__btn-container'>
                                <Button
                                    className='add-patient'
                                    variant='outlined'
                                    color='primary'
                                    disabled={this.state.isAddVisitDisable}
                                    onClick={this.addVisitClickHandler}
                                >
                                <FontAwesomeIcon icon={['fal','user-plus']} className={classNames(classes.leftIcon, classes.iconSmall)}/>{' '}
                                    {strings.addVisitBtnText}
                                </Button>
                            </Grid>
                        </Grid>
                        {/*
                        {!this.props.isLoading ? (
                            <Grid container spacing={24}>
                                {this.state.visitList.length ? (
                                    <Grid item xs className="Search-bar">
                                        <Search />
                                        <TextField
                                            style={{width: '30%'}}
                                            value={this.state.visitSearchValue}
                                            onChange={
                                                this.onVisitSearchHandleChange
                                            }
                                            onKeyPress={e =>
                                                this.searchKeyPress(e)
                                            }
                                        />
                                    </Grid>
                                ) : (
                                    <div />
                                )}
                            </Grid>
                        ) : (
                            <div />
                        )} */}
                        {this.state.visitFilter.length ? (
                            <Grid container spacing={24} className={classes.visitListRow}>
                                {this.props.isLoading ? (
                                    <Loader />
                                ) : this.state.visitList.length ? (
                                    <Grid item className='visit-list-grid'>
                                        <BasicGrid
                                            columnDefs={this.embeddedGrid}
                                            config={config}
                                            data={this.state.visitList}
                                        />
                                        <CustomPagination
                                            TOTALRECORD={this.props.totalVisitRecord}
                                            PAGESIZE={this.state.pageSize}
                                            PAGERCOUNT={3}
                                            PAGEINDEX={this.state.pageIndex}
                                            onClick={this.changePagination.bind(this)}
                                        />
                                    </Grid>
                                ) : (
                                    <NoResultError />
                                )}
                            </Grid>
                        ) : (
                            <div />
                        )}
                    </Paper>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { visits } = state;
    return {
        ...visits,
        selectedWebtoolYearId: state.QualityMeasure.selectedYearUid,
        selectedWebtoolPracticeId: state.QualityMeasure.selectedWebtoolPracticeId,
        selectedWebtoolProviderUid: state.QualityMeasure.selectedProviderUid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadYearList: async params => dispatch(getYearsData()),
        setSelectedYear: async params => {
            return dispatch(setSelectedVisitYear(params));
        },
        loadPractices: async params => dispatch(getPracticeData()),
        setSelectedPracticeId: async params => dispatch(setSelectedPractice(params)),
        getClinicians: async params => dispatch(getClinicians(params)),
        setSelectedClinicieanId: async params => dispatch(setSelectedClinician(params)),
        getProviderProfile: params => dispatch(getProviderProfile(params)),
        getProfileMeasurePreference: params => dispatch(getProfileMeasurePreference(params)),
        loadVisit: async params => dispatch(getVisitData(params)),

        editVisitById: params => {
            dispatch(clearPerformance());
            dispatch(editVisit(params));
        },
        deleteVisitById: async params => {
            return dispatch(deleteSoftVisitbyId(params));
        },
        measureDetailVisitbyId: params => {
            dispatch(measureDetailVisit(params));
        },
        setMeasureQueryParam: params => {
            dispatch(clearPerformance());
            dispatch(measureQueryParam(params));
        },
        searchVisit: params => {
            dispatch(clearPerformance());
            dispatch(searchVisitData(params));
        }
    };
};

const config = {
    minColumns: 12,
    parentTableClass: ['basic-grid patient-grid'],
    dataErrorMessage: 'please provide data property.',
    schemaErrorMessge: 'please provide columnDefs property.'
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withStyles(styles)(VisitList)));

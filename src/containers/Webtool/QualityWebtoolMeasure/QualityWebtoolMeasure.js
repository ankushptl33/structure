import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    changeProviderId,
    changeyearId,
    clearStateOnProviderChange,
    createProfile,
    getClinicians,
    getMeasures,
    getPracticeData,
    getProfileMeasurePreference,
    getProviderProfile,
    getYearsData,
    measureDataGet,
    onResetSelectedMeasure,
    setProfileMeasurePreference,
    updateMeasureSelection,
    updatePracticeId,
    updateShowAllMasure
} from '../../../redux/actions/QualityWebtoolMeasureAction';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';
import { Button, FormControl, Grid, InputLabel, Paper, Select, Typography } from '@material-ui/core';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import BasicTable from './BasicTable';
import Loader from '../../../helper/loaders/ComponentLoader';
import Search from './search';
import WebtoolDropdown from './WebtoolDropdown';
// import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as AllStrings from '../strings';
import SnackBar from '../SnackBar';
import { TinyButton as ScrollUpButton } from 'react-scroll-up-button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    button: {
        margin: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    webtoolPaper: {
        padding: theme.spacing.unit * 3
    },
    formControl: {
        margin: theme.spacing.unit * 2,
        marginLeft: 0,
        marginTop: 0,
        fontSize: '15px',
        display: 'flex',
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: theme.spacing.unit * 2
        }
    }
});

class QualityWebtoolMeasure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            showNotification: false
        };
    }

    componentDidMount() {
        if (this.props.practices === null || this.props.practices === undefined) {
            this.props.loadYearList();
            this.props.loadPractices();
        }
        if (this.props.selectedWebtoolPracticeId) {
            this.getProviderList(this.props.selectedWebtoolPracticeId);
        }
    }

    getProviderList = practiceId => {
        const queryParams = {
            input: {
                practiceid: practiceId,
                orderBy: "firstname"
            }
        };
        this.props.getClinicians(queryParams);
    };

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        const isPracticeSelected =
            nextProps.practices &&
            nextProps.selectedWebtoolPracticeId === nextProps.practices[0].id;
        const isProviderListEmpty = this.props.providers.length;
        if (
            isPracticeSelected &&
            !isProviderListEmpty &&
            nextProps.selectedWebtoolPracticeId !== this.props.selectedWebtoolPracticeId
        ) {
            this.getProviderList(nextProps.selectedWebtoolPracticeId);
        }
    }
    onMeasureChange = selectedMeasures => {
        this.props.updateMeasureList(selectedMeasures);
    };

    onPracticeChangeEvent = event => {
        const practiceId = event.target.value;
        // const { selectedWebtoolPracticeId } = this.props;
        this.props.updateShowAllMasure(true);
        this.props.onPracticeChange(practiceId);
        this.getProviderList(practiceId);
        // this.props.loadYearList();
        this.props.onProviderChange('');
        this.setState({ searchKey: '' });
    };

    onProviderChangeHandler = async event => {
        this.props.clearStateOnProviderChange();
        this.setState({ searchKey: '' });
        this.props.onProviderChange(event.target.value);
        // TODO:
        const measureInput = {
            input: {
                systemIn: AllStrings.systemIn,
                unit: REGISTRY_UNIT_NAME,
                inactive: false
            }
        };

        this.props.getMeasures(measureInput);
        const selectedprovider = event.target.value ? parseInt(event.target.value) : '';
        if (this.props.selectedYearUid) {
            const queryParams = {
                input: {
                    providerid: selectedprovider,
                    isactive: true,
                    calendarid: this.props.selectedYearUid
                        ? parseInt(this.props.selectedYearUid)
                        : ''
                }
            };
            await this.props.getProviderProfile(queryParams);
            if (this.props.profileId === undefined || this.props.profileId === '') {
                const queryParams = {
                    input: {
                        calendarid: this.props.selectedYearUid
                            ? parseInt(this.props.selectedYearUid)
                            : '',
                        practiceid: this.props.selectedWebtoolPracticeId,
                        providerid: selectedprovider
                    }
                };

                await this.props.createProfile(queryParams); // WIP
            }

            if (this.props.createProfileId) {
                await this.props.getProviderProfile(queryParams);
            }

            if (this.props.profileId) {
                const getQueryParams = {
                    input: {
                        profileid: this.props.profileId,
                        isactive: true
                    }
                };
                await this.props.getProfileMeasurePreference(getQueryParams);
            }
        }
    };

    onYearChangeHandler = event => {
        this.props.onYearChange(event.target.value);
        this.setState({ searchKey: '' });
    };

    onShowAllMeasureClick = () => {
        this.props.updateShowAllMasure(this.props.isShowAllMeasure || false);
        this.setState({ showNotification: false });
        // this.props.refreshRenderForResetClick(this.props.providerProfileMeasure);
    };
    onResetSelectedMeasureClick = () => {
        this.props.onResetSelectedMeasure(this.props.providerProfileMeasure);
        // this.props.updateShowAllMasure(this.props.isShowAllMeasure || false);
    };
    onCancelSelectedMeasureClick = () => {
        this.props.onResetSelectedMeasure(this.props.providerProfileMeasure);
        this.props.updateShowAllMasure(this.props.isShowAllMeasure || false);
    };
    onSaveSelectedMeasures = async event => {
        if (this.props.selectedProfileMeasures.length) {
            this.props.updateShowAllMasure(this.props.isShowAllMeasure || false);
            if (this.props.profileId !== undefined || this.props.profileId !== '') {
                const queryParams = {
                    input: {
                        profileid: this.props.profileId,
                        measureidList: this.props.selectedProfileMeasures
                    }
                };
                await this.props.setProfileMeasurePreference(queryParams);
                this.setState({ showNotification: true });
            }
        }
    };

    handleButtonClick = () => {
        this.props.history.push('/visits');
    };

    gridFilterHandler(e) {
        this.setState({
            searchKey: e.target.value.trim()
        });
    }

    render() {
        const {
            classes,
            providerProfileMeasure,
            measurelist,
            isShowAllMeasure,
            selectedYearUid
        } = this.props;

        const measureGridColumn = [
            {
                id: AllStrings.measureGridMeasureId,
                numeric: false,
                disablePadding: true,
                label: AllStrings.measureGridMeasureId
            },
            {
                id: AllStrings.measureGridMeasureTitleId,
                numeric: true,
                disablePadding: false,
                label: AllStrings.measureGridMeasureTitleLbl
            },
            {
                id: AllStrings.measureGridMeasureTagId,
                numeric: true,
                disablePadding: false,
                label: AllStrings.measureGridMeasureTagLbl
            }
        ];
        function createData(measureid, ID, MEASURETITLE, HIGH, OUTCOME) {
            return { id: measureid, ID, MEASURETITLE, HIGH, OUTCOME };
        }

        let measureList =
            measurelist !== undefined
                ? measurelist.map(value =>
                      createData(
                          value.id,
                          value.displayname,
                          value.measuredescription ? value.measuredescription : value.rational,
                          value.ishighpriority,
                          value.isoutcome
                      )
                  )
                : [];
        if (!isShowAllMeasure) {
            measureList = measureList.filter(function(item) {
                return providerProfileMeasure.includes(parseInt(item.id));
                // return providerProfileMeasure.toString()==item.id.toString(); //WIP
            });
        }

        measureList = measureList.filter(value => {
            let measureTitle = value.MEASURETITLE != null ? value.MEASURETITLE.toLowerCase() : '';
            return (
                value.ID.toString()
                    .toLowerCase()
                    .indexOf(this.state.searchKey.toLowerCase()) > -1 ||
                measureTitle.indexOf(this.state.searchKey.toLowerCase()) > -1
            );
        });

        let isProviderPracticeyearSelected;
        let isProviderHaveMeasures = false;
        if (
            !selectedYearUid ||
            !this.props.selectedProviderUid ||
            !this.props.selectedWebtoolPracticeId
        ) {
            isProviderPracticeyearSelected = true;
        }
        if (!providerProfileMeasure.length) {
            isProviderHaveMeasures = true;
        }

        let buttonJSX = (
            <Button
                variant='outlined'
                color='primary'
                onClick={this.onSaveSelectedMeasures}
                className={classes.button + 'btn-visit_list'}
            >
                {AllStrings.lblSave}
            </Button>
        );
        return (
            <div className='webtool-page__wrapper'>
                <Grid container className='page-title__container'>
                    <Typography variant='h2' className='fi-subheader__title'>
                        Quality Preference Management
                    </Typography>
                </Grid>
                {this.state.showNotification ? (
                    <SnackBar
                        message={AllStrings.measureSaveSuccess}
                        variant='success'
                        open={true}
                    />
                ) : null}
                <ScrollUpButton ContainerClassName='scroller-class' />
                <Paper className={classes.webtoolPaper}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} md={12} lg={8} className={classes.dropDownRow}>
                            <Grid container>
                                <Grid item xs={12} md={3} lg={2} xl={2}>
                                    {this.props.isYearLoading ? (
                                        <CircularProgress size={30} thickness={5} />
                                    ) : (
                                        <WebtoolDropdown
                                            className={this.props.classes.formControl}
                                            onchange={this.onYearChangeHandler}
                                            title={AllStrings.selectYear}
                                            value={selectedYearUid}
                                            data={this.props.yearList}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <WebtoolDropdown
                                        className={this.props.classes.formControl}
                                        onchange={this.onPracticeChangeEvent}
                                        title={AllStrings.selectPractice}
                                        value={this.props.selectedWebtoolPracticeId}
                                        data={this.props.practices}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    {this.props.isProviderLoading ? (
                                        <CircularProgress size={30} thickness={5} />
                                    ) : (
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor='age-native-simple'>
                                                {AllStrings.selectProvider}
                                            </InputLabel>
                                            <Select
                                                native
                                                value={
                                                    this.props.selectedProviderUid != undefined
                                                        ? this.props.selectedProviderUid
                                                        : ''
                                                }
                                                onChange={this.onProviderChangeHandler}
                                            >
                                                <option value='' />
                                                {this.props.providers
                                                    ? this.props.providers.map(value => (
                                                          <option key={value.id} value={value.id}>
                                                              {`${value.firstname} ${
                                                                  value.lastname
                                                              }( NPI- ${value.npi})`}
                                                          </option>
                                                      ))
                                                    : []}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs>
                            {this.props.isMeasureLoading ? (
                                <CircularProgress size={30} thickness={5} />
                            ) : (
                                <Search onChange={this.gridFilterHandler.bind(this)} />
                            )}
                        </Grid>
                        <Grid item className={classes.webtoolRightBtn}>
                            {!isShowAllMeasure ? (
                                <div>
                                    <Tooltip title={AllStrings.selectdeselectTooltip}>
                                        <Button
                                            variant='outlined'
                                            disabled={isProviderPracticeyearSelected}
                                            onClick={this.onShowAllMeasureClick}
                                            color='primary'
                                            aria-label='Edit'
                                            className='btn-visit_list'
                                        >
                                            <FontAwesomeIcon icon={['fal','pen']} className={"edit-icon " + classes.leftIcon} />
                                            {AllStrings.selectDeselectMeasures}
                                        </Button>
                                    </Tooltip>
                                </div>
                            ) : (
                                <Button
                                    variant='outlined'
                                    onClick={this.onCancelSelectedMeasureClick}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs className='quality-preference-mgmt__table_wrapper'>
                            {this.props.isMeasureLoading ? (
                                <div>
                                    <Loader />
                                </div>
                            ) : ( 
                                <BasicTable
                                    columnDef={measureGridColumn}
                                    selectedMeasure={
                                        this.props.selectedProfileMeasures
                                            ? this.props.selectedProfileMeasures
                                            : []
                                        // : []
                                        // !isShowAllMeasure
                                        //     ? this.props.selectedProfileMeasures ? this.props.selectedProfileMeasures : []
                                        //     : []
                                    }
                                    isShowAllRecordsSelected={isShowAllMeasure}
                                    onSelectTableCell={this.onMeasureChange}
                                    data={measureList != null ? measureList : []}
                                />
                            )  }
                        </Grid>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs className='btn-visit_list_wrapper'>
                            {!isShowAllMeasure ? (
                                <Button
                                    className={classes.button}
                                    variant='outlined'
                                    color='primary'
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
                                    className='btn-visit_list'
                                    disabled={
                                        isProviderPracticeyearSelected || isProviderHaveMeasures
                                    }
                                    onClick={this.handleButtonClick}
                                >
                                    {AllStrings.lblGoToVisit}
                                </Button>
                            ) : (
                                <div>
                                    <Button
                                        className={classes.button}
                                        variant='outlined'
                                        onClick={this.onResetSelectedMeasureClick}
                                    >
                                        Reset
                                    </Button>

                                    {this.props.selectedProfileMeasures.length ? (
                                        buttonJSX
                                    ) : (
                                        <Tooltip title={AllStrings.noMeasureError}>
                                            {buttonJSX}
                                        </Tooltip>
                                    )}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { QualityMeasure } = state;
    return { ...QualityMeasure };
};

const mapDispatchToProps = dispatch => {
    return {
        loadYearList: bindActionCreators(getYearsData, dispatch),
        loadPractices: bindActionCreators(getPracticeData, dispatch),
        // getMeasures: bindActionCreators(getMeasures, dispatch), //WIP

        getMeasures: params => {
            dispatch(getMeasures(params));
        },

        getClinicians: params => {
            dispatch(getClinicians(params));
        },
        onPracticeChange: params => {
            dispatch(updatePracticeId(params));
        },
        onProviderChange: params => {
            dispatch(changeProviderId(params));
        },
        onYearChange: params => {
            dispatch(changeyearId(params));
        },
        getMeasureList: params => {
            dispatch(measureDataGet(params));
        },
        updateMeasureList: params => {
            dispatch(updateMeasureSelection(params));
        },
        updateShowAllMasure: params => {
            dispatch(updateShowAllMasure(params));
        },
        getProviderProfile: params => dispatch(getProviderProfile(params)),
        // saveSelectedMeasures: params => {
        //     dispatch(saveSelectedMeasures(params));
        // },
        createProfile: params => dispatch(createProfile(params)),

        setProfileMeasurePreference: params => dispatch(setProfileMeasurePreference(params)),

        getProfileMeasurePreference: params => dispatch(getProfileMeasurePreference(params)),
        clearStateOnProviderChange: bindActionCreators(clearStateOnProviderChange, dispatch),

        onResetSelectedMeasure: bindActionCreators(onResetSelectedMeasure, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withStyles(styles)(QualityWebtoolMeasure)));

export const GET_PRACTICE = `query ($input:GetPracticesInput){
  getPractices (input:$input){
    id
    externalid
    name
    inactive
  }
}`;

export const GET_MEASURE_SET = `query($input:GetMeasureSetsInput){
  getMeasureSets(input:$input){
    id
    name
    inactive
    ispqrs
    isformips
    listorder
  }
}`;

export const GET_CALENDAR = `query($input:GetCalendarsInput){
  getCalendars(input:$input){
    id
    year
    flag
    duration
    startdate
    enddate
  }
}`;

export const GET_MEASURES = `
query($input:GetMeasuresInput){
  getMeasures(input:$input){
    id
    measuredescription
    domaindescription
    measureno
    displayname
    measuredescription
    isinverse
    IsFavorite
    rational
	}
}
`;

export const GET_MEASURE_PERFORMANCE = `
query($input:FilterMeasureInfoInput){
  getMeasurePerformanceAverage(input:$input){
    EntityAverage
    CMSBenchmark
    RegistryAverage
    RegistryBenchmark
    EntityComparison
  }
}
`;

export const GET_LOCATIONS = `
query($input:GetLocationsInput) {
getLocations(input:$input) {
  id
  name
  city
  address
  }
}  
`;

export const GET_PROVIDERS = `
query($input: getProvidersByPracticeIdInput!){
getProvidersByPracticeId(input:$input){
  firstname
  lastname
  id
  istest
  tin
    country
    npi
  }
}`;

export const GET_PERFORMANCE_TREND_INFO = `
query($input:FilterTrendInfoInput){
  getPerformanceTrendInfo(input:$input){
    DurationName
    EntityName
    EntityId
    ParentEntityId
    ParentEntityName
    MeasureId
    Numerator
    Denominator
    Exception
    Exclusion
    NotMet
    RegistryAverage
    MeasureAverage
    DurationFrom
    DurationTo
    ListOrder
  }
      }
`;

export const GET_ALL_MEASURE_OUTPUT = `
query($input:FilterMeasureInfoInput){
  getMeasureOutputByEntity(input:$input){    
    EntityName
    EntityId
    ParentEntityId
    ParentEntityName
    MeasureId
    Numerator
    Denominator
    Exception
    Exclusion
  }
  }`;

export const GET_PRACTICE_REFRESH_DATE = `
query($input: GetPracticeRefreshStatusInput!){
  getPracticeRefreshStatus(input:$input)
  {
    id
    startdate
    enddate
    lastrefreshtime
    practiceid
    jobid
    status
    practice
    {
      id
      name
    }
  }
}`;

export const GET_PRACTICE_PROVIDER_COUNT = `
query ($input: GetProviderCountInput!) {
  getProviderCount(input:$input)
  {
    count
  }  
}
`;

export const GET_PRACTICE_LOCATION_COUNT = `
query ($input: GetLocationCountInput!)
{
  getLocationCount (input:$input){
    count
  }
}
`;

export const SET_USER_FAVORITE_MEASURE = `
mutation($input:FavoriteInput!){
  setFavorite(input:$input)
}`;

export const GET_PATIENTS_BY_ENTITY = `
query($input:InputFilterTrendInfo){
  getAllPatientByEntity(input:$input){
    patient_id
    firstname
    dob
    mrn
    gender
    TotalRecords}
    }
`;

export const VALIDATE_REGISTRY_TOKEN = `
query($input:validateRegistryDashboardToken){
  validateRegistryDashboardToken(input:$input){
    data{
      token
      duration
    }
    statusCode
    description
  }
}
`;
export const GET_MEASURES_FOR_WEBTOOL = `
query($input:SectionListInput) {
  sectionList(input: $input) {
    formInstanceId
    data
    dataSchema
    uiSchema
    formMetaInformation
    sectionMetaInformation
  }
}`;

export const GET_MEASURE_BY_ID_FOR_WEBTOOL = `
query($input: sectionInput) {
  getSection(input: $input) {
      id,
      name,
      dataSchema,
      uiSchema,    
      data
  }
}`;

export const GET_WEBTOOL_MEASURES = `
  query($input: GetMeasuresInput) {
    getMeasures(input: $input) {
        id
        displayname
        measuredescription
        measureno
        rational
        cmsno
        year,
        iscrosscutting,
        isinverse,
        ishighpriority,
        isoutcome,
        isregistry,
        ismips,     
        inactive
        }
      }`;

export const GET_PROVIDER_PROFILE = `
      query($input:GetProfilesInput){
        getProfiles(input:$input){
          id
          calendarid
          practiceid
          providerid
          locationid
          tin
          tinvalidfrom
        }
      }`;

export const CREATE_PROVIDER_PROFILE = `
      mutation($input:CreateProfileInput!){
        createProfile(input:$input){
          id
        }
      }`;

export const CREATE_PREFERENCE_MEASURE = `
      mutation ($input: setMeasuresListPreferenceForProfileInput!) {
        setMeasuresListPreferenceForProfile(input: $input) {
          id
        }
      }`;

export const CREATE_ADD_VISIT = `
      mutation($input:createVisitInput!){
        createVisit(input:$input){
          VisitUid,
          PatientUid
        }
      }`;

export const UPDATE_VISIT = `
      mutation($input:updateVisitInput!){
        updateVisit(input:$input){
          VisitUid,
          PatientUid
        }
      }`;

export const GET_EDIT_VISIT = `query($input:getVisitsInput){
  getVisits(input:$input){
    FirstName,
    LastName,
    MRN,
    Gender,
    DOB,
    InsuranceType,
    VisitDate 
  }
}`;

export const GET_PREFERENCE_MEASURE = `
      query($input:GetProfileMeasurePreferencesInput){
        getProfileMeasurePreferences(input:$input){
          id
          profileid
          measureid
          isactive
          measureno
        }
      }`;

export const GET_VISIT = `query ($input:getVisitsInput){
        getVisits (input:$input){
          VisitUid
          PatientUid
          FirstName
          LastName
          MRN
          Gender
          Unit
          PracticeId
          DOB
          VisitDate
          Age
          InsuranceType
          DataSource
          PracticeId
          ProviderId
          LocationId
          IsActive
          TotalRecords
        }
      }`;

export const GET_PATIENT_VISIT = `query ($input:getVisitsInput){
        getVisits (input:$input){
          VisitUid
          FirstName
          LastName
          MRN
        }
      }`;

export const SINGLE_MEASURE_PERFORMANCE = `query ($input: SingleMeasurePerformanceInput) {
  singleMeasurePerformance(input: $input)
}
`;

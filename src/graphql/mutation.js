export const SAVE_WEBTOOL_FORM = `mutation($input: FormInstanceUpdateInput){
  saveOrSubmit(input:$input){
    isSubmitted,
    data
  }
}`;

export const DELETE_SOFT_VISIT = ` mutation($input: deleteVisitInput){
  deleteVisit(input: $input){
    VisitUid
    PatientUid
  }
}`;

/// input:{formInstanceId: "5c0a60b26b3162292248bef2", data: {QPP_138: "b"}, isSubmitted: true}

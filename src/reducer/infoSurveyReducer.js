let initialState = {
    projectId: "",
    sampleGroupId: "",
    nameSurvey: "",
    description: "",
    shareTo: "",
    wantName: false,
    haveGroup: false,
    names: [],
    listNameExperiments: [],
    listNameControls: [],
    frequency: {},
    doOnce: false,
    openAndCloseTimes: {},
    qprocess: [],
    data: {},
    builtIns: [],
    showSurvey: false,
    surveyManagement: false,
    step: 1
}

const infoSurveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_STEP0':
            state = {
                projectId: action.data.projectId,
                sampleGroupId: action.data.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                listNameExperiments: state.listNameExperiments,
                listNameControls: state.listNameControls,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                step: 1
            }
            return state;

        case 'ADD_STEP1':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: action.data.surveyName,
                description: action.data.description,
                shareTo: action.data.shareTo,
                wantName: action.data.wantName,
                haveGroup: action.data.haveGroup,
                names: state.names,
                listNameExperiments: state.listNameExperiments,
                listNameControls: state.listNameControls,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                step: 2
            }
            return state;

        case 'ADD_STEP2':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                listNameExperiments: state.listNameExperiments,
                listNameControls: state.listNameControls,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: action.formSurvey.data,
                builtIns: action.formSurvey.builtIns,
                step: 3
            }
            return state;

        case 'ADD_STEP3':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                listNameExperiments: state.listNameExperiments,
                listNameControls: state.listNameControls,
                frequency: action.data.frequency,
                doOnce: action.data.doOnce,
                openAndCloseTimes: action.data.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                dateToDo: action.data.dateToDo,
                step: 4
            }
            return state;

        case 'SHOW_SURVEY':
            state = {
                showSurvey: true
            }
            return state;

        case 'SURVEY_MANAGEMENT':
            state = {
                surveyManagement: true
            }
            return state;

        /*case 'SURVEY_CHECK_ENCRYPT':
            state = {
                checkEncrypt: true,
                encryptAnswer: action.data
            }
            return state;*/

        case 'BACKTOSTEP1':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                listNameExperiments: state.listNameExperiments,
                listNameControls: state.listNameControls,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                step: 1
            }
            return state;

        case 'BACKTOSTEP2':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                listNameExperiments: state.listNameExperiments,
                listNameControls: state.listNameControls,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                step: 2
            }
            return state;

        default:
            return state;
    }
}
export default infoSurveyReducer;
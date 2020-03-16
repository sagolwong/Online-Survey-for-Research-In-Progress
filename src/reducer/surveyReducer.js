let initialState = {
    projectId: "",
    sampleGroupId: "",
    nameSurvey: "",
    description: "",
    shareTo: "",
    wantName: false,
    haveGroup: false,
    names: [],
    frequency: {},
    doOnce: false,
    openAndCloseTimes: {},
    qprocess: [],
    data: {},
    builtIns: [],
    status: "",
    nameSampleGroup: "",
    showSurvey: false,
    surveyManagement: false,
    comeFrom: "",
    step: 1
}

const surveyReducer = (state = initialState, action) => {
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

        case 'ADD_STEP4':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                dateToDo: state.dateToDo,
                status: action.data.status,
                step: 5
            }
            return state;

        case 'ADD_DRAFT_STEP1':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: action.data.surveyName,
                description: action.data.description,
                shareTo: action.data.shareTo,
                wantName: action.data.wantName,
                haveGroup: action.data.haveGroup,
                names: state.names,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                dateToDo: state.dateToDo,
                status: action.data.status,
                step: 5
            }
            return state;

        case 'ADD_DRAFT_STEP2':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: action.formSurvey.data,
                builtIns: action.formSurvey.builtIns,
                dateToDo: state.dateToDo,
                status: action.formSurvey.status,
                step: 5
            }
            return state;

        case 'ADD_DRAFT_STEP3':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                frequency: action.data.frequency,
                doOnce: action.data.doOnce,
                openAndCloseTimes: action.data.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                dateToDo: action.data.dateToDo,
                status: action.data.status,
                step: 5
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
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                step: 2
            }
            return state;

        case 'BACKTOSTEP3':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                dateToDo: state.dateToDo,
                comeFrom: "4-3",
                step: 3
            }
            return state;

        case 'EDIT_STEP0':
            state = {
                projectId: action.data.projectId,
                sampleGroupId: action.data.sampleGroupId,
                nameSampleGroup: action.data.nameSampleGroup,
                nameSurvey: action.data.nameSurvey,
                description: action.data.description,
                shareTo: action.data.shareTo,
                wantName: action.data.wantName,
                haveGroup: action.data.haveGroup,
                names: state.names,
                frequency: action.data.frequency,
                doOnce: action.data.doOnce,
                openAndCloseTimes: action.data.openAndCloseTimes,
                qprocess: state.qprocess,
                data: action.data.data,
                builtIns: action.data.builtIns,
                dateToDo: [],
                status: action.data.status,
                step: "e1"
            }
            return state;

        case 'EDIT_STEP1':
            state = {
                projectId: action.data.projectId,
                sampleGroupId: action.data.sampleGroupId,
                nameSampleGroup: action.data.nameSampleGroup,
                nameSurvey: action.data.nameSurvey,
                description: action.data.description,
                shareTo: action.data.shareTo,
                wantName: action.data.wantName,
                haveGroup: action.data.haveGroup,
                names: state.names,
                frequency: action.data.frequency,
                doOnce: action.data.doOnce,
                openAndCloseTimes: action.data.openAndCloseTimes,
                qprocess: state.qprocess,
                data: action.data.data,
                builtIns: action.data.builtIns,
                dateToDo: action.data.dateToDo,
                status: action.data.status,
                step: "e2"
            }
            return state;

        case 'EDIT_STEP2':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSampleGroup: state.nameSampleGroup,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                dateToDo: state.dateToDo,
                status: action.data.status,
                step: "e3"
            }
            return state;

        case 'EDIT_DRAFT_STEP1':
            state = {
                projectId: action.data.projectId,
                sampleGroupId: action.data.sampleGroupId,
                nameSampleGroup: action.data.nameSampleGroup,
                nameSurvey: action.data.nameSurvey,
                description: action.data.description,
                shareTo: action.data.shareTo,
                wantName: action.data.wantName,
                haveGroup: action.data.haveGroup,
                names: state.names,
                frequency: action.data.frequency,
                doOnce: action.data.doOnce,
                openAndCloseTimes: action.data.openAndCloseTimes,
                qprocess: state.qprocess,
                data: action.data.data,
                builtIns: action.data.builtIns,
                dateToDo: action.data.dateToDo,
                status: action.data.status,
                step: "e3"
            }
            return state;

        case 'BACKTOEDITSTEP1':
            state = {
                projectId: state.projectId,
                sampleGroupId: state.sampleGroupId,
                nameSampleGroup: state.nameSampleGroup,
                nameSurvey: state.nameSurvey,
                description: state.description,
                shareTo: state.shareTo,
                wantName: state.wantName,
                haveGroup: state.haveGroup,
                names: state.names,
                frequency: state.frequency,
                doOnce: state.doOnce,
                openAndCloseTimes: state.openAndCloseTimes,
                qprocess: state.qprocess,
                data: state.data,
                builtIns: state.builtIns,
                dateToDo: state.dateToDo,
                status: state.status,
                step: "e1"
            }
            return state;

        default:
            return state;
    }
}
export default surveyReducer;
import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Card, Col, Row } from 'reactstrap'
import axios from 'axios';
import { connect } from 'react-redux';
import * as SurveyJSCreator from "survey-creator";
import * as SurveyKo from "survey-knockout";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "icheck/skins/square/blue.css";

import * as widgets from "surveyjs-widgets";

SurveyJSCreator.StylesManager.applyTheme("default");

widgets.icheck(SurveyKo, $);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

class EditSurvey extends Component {
    constructor(props) {
        super(props);

        this.onChangeProject = this.onChangeProject.bind(this);
        this.onChangeSampleGroup = this.onChangeSampleGroup.bind(this);
        this.onChangeSurveyName = this.onChangeSurveyName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeShareTo = this.onChangeShareTo.bind(this);
        this.onChangeWantName = this.onChangeWantName.bind(this);
        this.onChangeHaveGroup = this.onChangeHaveGroup.bind(this);
        this.onChangeBuiltInWidgetGender = this.onChangeBuiltInWidgetGender.bind(this);
        this.onChangeBuiltInWidgetAges = this.onChangeBuiltInWidgetAges.bind(this);
        this.onChangeBuiltInWidgetStatus = this.onChangeBuiltInWidgetStatus.bind(this);
        this.onChangeBuiltInWidgetEducation = this.onChangeBuiltInWidgetEducation.bind(this);
        this.onChangeBuiltInWidgetJob = this.onChangeBuiltInWidgetJob.bind(this);
        this.onChangeBuiltInWidgetIncome = this.onChangeBuiltInWidgetIncome.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeUnitTime = this.onChangeUnitTime.bind(this);
        this.onChangeSetFreq = this.onChangeSetFreq.bind(this);
        this.onChangeDoOnce = this.onChangeDoOnce.bind(this);
        this.onChangeDoMany = this.onChangeDoMany.bind(this);
        this.onChangeSchedule = this.onChangeSchedule.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeStartMonth = this.onChangeStartMonth.bind(this);
        this.onChangeStartYear = this.onChangeStartYear.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeEndMonth = this.onChangeEndMonth.bind(this);
        this.onChangeEndYear = this.onChangeEndYear.bind(this);
        this.onChangeNameSampleGroup = this.onChangeNameSampleGroup.bind(this);
        this.sendData = this.sendData.bind(this);

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 543;


        this.state = {
            projects: [],
            projectId: "",
            sampleGroups: [],
            sampleGroupId: "",
            nameSampleGroup: "",
            checkNewSampleGroup: false,
            nameSurvey: "",
            description: "",
            shareTo: "",
            wantName: false,
            haveGroup: false,
            builtInWidgetGender: false,
            builtInWidgetAges: false,
            builtInWidgetStatus: false,
            builtInWidgetEducation: false,
            builtInWidgetJob: false,
            builtInWidgetIncome: false,
            frequency: {
                amount: 0,
                unitsOfTime: ""
            },
            dateToDo: [],
            setFreq: false,
            checkHaveGroup: false,
            doOnce: false,
            doMany: false,
            schedule: false,
            startDate: date,
            startMonth: month,
            startYear: year,
            endDate: date,
            endMonth: month,
            endYear: year + 1,
            sDate: date,
            sMonth: month,
            sYear: year,
            eDate: date,
            eMonth: month,
            eYear: year + 1
        };
    }
    surveyCreator;
    componentDidMount() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        this.setState({
            projectId: this.props.test.projectId,
            sampleGroupId: this.props.test.sampleGroupId,
            nameSurvey: this.props.test.nameSurvey,
            description: this.props.test.description,
            shareTo: this.props.test.shareTo,
            wantName: this.props.test.wantName,
            haveGroup: this.props.test.haveGroup,
            schedule: true,
            startDate: this.props.test.openAndCloseTimes.start.day,
            startMonth: this.props.test.openAndCloseTimes.start.month,
            startYear: this.props.test.openAndCloseTimes.start.year,
            endDate: this.props.test.openAndCloseTimes.end.day,
            endMonth: this.props.test.openAndCloseTimes.end.month,
            endYear: this.props.test.openAndCloseTimes.end.year,
        })

        this.props.test.builtIns.map(widget => {
            if (widget.builtInWidget === "gender") this.setState({ builtInWidgetGender: true })
            else if (widget.builtInWidget === "ages") this.setState({ builtInWidgetAges: true })
            else if (widget.builtInWidget === "status") this.setState({ builtInWidgetStatus: true })
            else if (widget.builtInWidget === "education") this.setState({ builtInWidgetEducation: true })
            else if (widget.builtInWidget === "job") this.setState({ builtInWidgetJob: true })
            else if (widget.builtInWidget === "income") this.setState({ builtInWidgetIncome: true })
        })

        if (this.props.test.doOnce) {
            this.setState({
                doOnce: true,
                setFreq: false
            })
        } else {
            if (this.props.test.frequency.amount !== 0) {
                this.setState({
                    doOnce: false,
                    setFreq: true,
                    frequency: {
                        amount: this.props.test.frequency.amount,
                        unitsOfTime: this.props.test.frequency.unitsOfTime
                    }
                })
            } else {
                this.setState({
                    doOnce: false,
                    setFreq: false,
                    doMany: true
                })
            }
        }


        if (this.props.test.status === "prototype") {
            axios.get(`http://localhost:5000/projects/find/` + userId)
                .then(response => {
                    this.setState({
                        projects: response.data
                    })
                    console.log(this.state.projects);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        if(this.props.test.nameSampleGroup !== ""){
            this.setState({
                nameSampleGroup: this.props.test.nameSampleGroup,
                checkNewSampleGroup: true
            })
        }

        let options = { showEmbededSurveyTab: false };
        this.surveyCreator = new SurveyJSCreator.SurveyCreator(
            "surveyCreatorContainer",
            options
        );
        this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
        console.log(JSON.parse(JSON.stringify(this.surveyCreator.text)));
        if (this.props.test.data[0] !== undefined) {
            window.localStorage.setItem("LocalStorageSurvey", this.props.test.data);
            this.surveyCreator.text = window.localStorage.getItem("LocalStorageSurvey") || "";
        }
        console.log(window.localStorage.getItem("LocalStorageSurvey") || "");
        window.localStorage.removeItem("LocalStorageSurvey");


    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.projectId !== this.state.projectId) {
            axios.get(`http://localhost:5000/sampleGroups/` + this.state.projectId)
                .then(response => {
                    this.setState({
                        sampleGroups: response.data
                    })
                    console.log(this.state.sampleGroups);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if (prevState.checkHaveGroup !== this.state.checkHaveGroup) {
            this.setState({
                setFreq: false,
                frequency: {
                    amount: 0,
                    unitsOfTime: ""
                }
            })
        }
    }

    onChangeNameSampleGroup(e) {
        this.setState({
            nameSampleGroup: e.target.value
        })
    }
    onChangeProject(e) {
        this.setState({
            projectId: e.target.value
        })
    }
    onChangeSampleGroup(e) {
        this.setState({
            sampleGroupId: e.target.value
        })
    }
    onChangeSurveyName(e) {
        this.setState({
            nameSurvey: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeShareTo(e) {
        this.setState({
            shareTo: e.target.value
        })
    }
    onChangeWantName(e) {
        this.setState({
            wantName: !this.state.wantName
        })
    }
    onChangeHaveGroup(e) {
        this.setState({
            haveGroup: !this.state.haveGroup,
            checkHaveGroup: !this.state.checkHaveGroup
        })
    }
    onChangeBuiltInWidgetGender(e) {
        this.setState({
            builtInWidgetGender: !this.state.builtInWidgetGender
        })
    }
    onChangeBuiltInWidgetAges(e) {
        this.setState({
            builtInWidgetAges: !this.state.builtInWidgetAges
        })
    }
    onChangeBuiltInWidgetStatus(e) {
        this.setState({
            builtInWidgetStatus: !this.state.builtInWidgetStatus
        })
    }
    onChangeBuiltInWidgetEducation(e) {
        this.setState({
            builtInWidgetEducation: !this.state.builtInWidgetEducation
        })
    }
    onChangeBuiltInWidgetJob(e) {
        this.setState({
            builtInWidgetJob: !this.state.builtInWidgetJob
        })
    }
    onChangeBuiltInWidgetIncome(e) {
        this.setState({
            builtInWidgetIncome: !this.state.builtInWidgetIncome
        })
    }
    onChangeAmount(e) {
        this.setState({
            frequency: {
                amount: e.target.value,
                unitsOfTime: this.state.frequency.unitsOfTime
            }
        })
    }
    onChangeUnitTime(e) {
        this.setState({
            frequency: {
                amount: this.state.frequency.amount,
                unitsOfTime: e.target.value
            }
        })
    }
    onChangeSetFreq() {
        this.setState({
            setFreq: !this.state.setFreq,
            schedule: !this.state.schedule,
            doOnce: false,
            doMany: false
        })
    }
    onChangeDoOnce() {
        if (this.state.setFreq) {
            this.setState({
                doOnce: true,
                setFreq: false,
                schedule: false,
                doMany: false,
                frequency: {
                    amount: 0,
                    unitsOfTime: ""
                }
            })
        } else {
            this.setState({
                doOnce: true,
                setFreq: false,
                doMany: false,
                frequency: {
                    amount: 0,
                    unitsOfTime: ""
                }
            })
        }

    }
    onChangeDoMany() {
        if (this.state.setFreq) {
            this.setState({
                doOnce: false,
                setFreq: false,
                schedule: false,
                doMany: true,
                frequency: {
                    amount: 0,
                    unitsOfTime: ""
                }
            })
        } else {
            this.setState({
                doOnce: false,
                setFreq: false,
                doMany: true,
                frequency: {
                    amount: 0,
                    unitsOfTime: ""
                }
            })
        }

    }
    onChangeSchedule() {
        if (this.state.schedule) {
            this.setState({
                schedule: !this.state.schedule,
                startDate: this.state.sDate,
                startMonth: this.state.sMonth,
                startYear: this.state.sYear,
                endDate: this.state.eDate,
                endMonth: this.state.eMonth,
                endYear: this.state.eYear

            })
        }
        if (!this.state.schedule) {
            this.setState({
                schedule: !this.state.schedule
            })
        }

    }
    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value
        })
    }
    onChangeStartMonth(e) {
        this.setState({
            startMonth: e.target.value
        })
    }
    onChangeStartYear(e) {
        this.setState({
            startYear: e.target.value
        })
    }
    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        })
    }
    onChangeEndMonth(e) {
        this.setState({
            endMonth: e.target.value
        })
    }
    onChangeEndYear(e) {
        this.setState({
            endYear: e.target.value
        })
    }
    optionProject() {
        return (
            this.state.projects.map(project => {
                return (
                    <option value={project._id}>{project.nameProject}</option>
                )
            })
        )
    }
    optionSampleGroup() {
        return (
            this.state.sampleGroups.map(sampleGroup => {
                return (
                    <option value={sampleGroup._id}>{sampleGroup.nameSampleGroup}</option>
                )
            })
        )
    }
    newSampleGroup() {
        this.setState({ checkNewSampleGroup: true })
    }
    oldSampleGroup(){
        this.setState({ 
            checkNewSampleGroup: false,
            nameSampleGroup: ""
         })
    }
    saveDraft() {
        const start = {
            day: Number(this.state.startDate),
            month: Number(this.state.startMonth),
            year: Number(this.state.startYear)
        }
        const end = {
            day: Number(this.state.endDate),
            month: Number(this.state.endMonth),
            year: Number(this.state.endYear)
        }
        console.log(start);
        console.log(end);
        const openAndCloseTimes = {
            start,
            end
        }

        let builtIns = [];
        var data = {};

        if (this.state.builtInWidgetGender) {
            builtIns = builtIns.concat({ builtInWidget: "gender" })
        }
        if (this.state.builtInWidgetAges) {
            builtIns = builtIns.concat({ builtInWidget: "ages" })
        }
        if (this.state.builtInWidgetStatus) {
            builtIns = builtIns.concat({ builtInWidget: "status" })
        }
        if (this.state.builtInWidgetEducation) {
            builtIns = builtIns.concat({ builtInWidget: "education" })
        }
        if (this.state.builtInWidgetJob) {
            builtIns = builtIns.concat({ builtInWidget: "job" })
        }
        if (this.state.builtInWidgetIncome) {
            builtIns = builtIns.concat({ builtInWidget: "income" })
        }
        console.log(builtIns)

        if (builtIns[0] !== undefined) {
            data = {
                projectId: this.state.projectId,
                sampleGroupId: this.state.sampleGroupId,
                nameSampleGroup: this.state.nameSampleGroup,
                nameSurvey: this.state.nameSurvey,
                description: this.state.description,
                shareTo: this.state.shareTo,
                wantName: this.state.wantName,
                haveGroup: this.state.haveGroup,
                data: JSON.parse(JSON.stringify(this.surveyCreator.text)),
                builtIns: builtIns,
                frequency: this.state.frequency,
                doOnce: this.state.doOnce,
                openAndCloseTimes: openAndCloseTimes,
                status: "draft"
            }
        } else {
            data = {
                projectId: this.state.projectId,
                sampleGroupId: this.state.sampleGroupId,
                nameSampleGroup: this.state.nameSampleGroup,
                nameSurvey: this.state.nameSurvey,
                description: this.state.description,
                shareTo: this.state.shareTo,
                wantName: this.state.wantName,
                haveGroup: this.state.haveGroup,
                data: JSON.parse(JSON.stringify(this.surveyCreator.text)),
                frequency: this.state.frequency,
                doOnce: this.state.doOnce,
                openAndCloseTimes: openAndCloseTimes,
                status: "draft"

            }
        }

        this.props.dispatch({
            type: 'EDIT_DRAFT_STEP1',
            data
        });

    }
    onSubmit() {
        const start = {
            day: Number(this.state.startDate),
            month: Number(this.state.startMonth),
            year: Number(this.state.startYear)
        }
        const end = {
            day: Number(this.state.endDate),
            month: Number(this.state.endMonth),
            year: Number(this.state.endYear)
        }
        console.log(start);
        console.log(end);

        if (this.state.setFreq && Number(this.state.frequency.amount) !== 0 && this.state.frequency.unitsOfTime !== "") {
            //set date for frequency
            let f = 0;
            if (this.state.frequency.unitsOfTime === "day") f = this.state.frequency.amount;
            else if (this.state.frequency.unitsOfTime === "week") f = this.state.frequency.amount * 7;
            else if (this.state.frequency.unitsOfTime === "month") f = this.state.frequency.amount * 30;
            else if (this.state.frequency.unitsOfTime === "year") f = this.state.frequency.amount * 365;
            console.log(f);

            let nF = 0;
            if (start.month !== end.month && start.year === end.year) {
                for (let i = start.month; i <= end.month; i++) {
                    console.log("i=" + i);
                    if (i === end.month) {
                        nF = nF + end.day;
                        console.log("1.1=" + nF);
                    }
                    else if ((i === start.month) && (i === 1 || i === 3 || i === 5 || i === 7 || i === 8 || i === 10 || i === 12)) {
                        nF = 31 - (start.day - 1);
                        console.log("1.2=" + nF);
                    }
                    else if (i === 1 || i === 3 || i === 5 || i === 7 || i === 8 || i === 10 || i === 12) {
                        nF += 31;
                        console.log("1.3")
                    }
                    else if (i === start.month && (i === 4 || i === 6 || i === 9 || i === 11)) {
                        nF = 30 - (start.day - 1);
                        console.log("1.4")
                    }
                    else if (i === 4 || i === 6 || i === 9 || i === 11) {
                        nF += 30;
                        console.log("1.5")
                    }
                    else if (i === start.month && i === 2) {
                        if ((start.year - 543) % 4 === 0 || ((start.year - 543) % 4 === 0 && (start.year - 543) % 100 === 0 && (start.year - 543) % 400 === 0)) {
                            nF = 29 - (start.day - 1);
                            console.log("1.6=" + nF)
                        }
                        else {
                            nF = 28 - (start.day - 1);
                            console.log("1.7")
                        }
                    } else if (i === 2) {
                        if ((start.year - 543) % 4 === 0 || ((start.year - 543) % 4 === 0 && (start.year - 543) % 100 === 0 && (start.year - 543) % 400 === 0)) {
                            nF += 29;
                            console.log("1.8")
                        }
                        else {
                            nF += 28;
                            console.log("1.9")
                        }
                    }
                }
                console.log("1=" + nF);
                nF /= f;
            } else if (start.month === end.month && start.year === end.year) {
                nF = end.day - (start.day - 1);
                console.log("2=" + nF);
                nF /= f;
            } else if (start.year !== end.year) {
                for (let j = start.year; j <= end.year; j++) {
                    console.log("j=" + j);
                    if (j !== end.year) {
                        for (let k = start.month; k <= 12; k++) {
                            console.log("k=" + k);
                            if (k === start.month && j === start.year && (k === 1 || k === 3 || k === 5 || k === 7 || k === 8 || k === 10 || k === 12)) {
                                nF = 31 - (start.day - 1);
                                console.log("3.1=" + nF);
                            }
                            else if (k === 1 || k === 3 || k === 5 || k === 7 || k === 8 || k === 10 || k === 12) {
                                nF += 31;
                                console.log("3.2=" + nF);
                            }
                            else if (k === start.month && j === start.year && (k === 4 || k === 6 || k === 9 || k === 11)) {
                                nF = 30 - (start.day - 1);
                                console.log("3.3=" + nF);
                            }
                            else if (k === 4 || k === 6 || k === 9 || k === 11) {
                                nF += 30;
                                console.log("3.4=" + nF);
                            }
                            else if (k === start.month && k === 2) {
                                if ((j - 543) % 4 === 0 || ((j - 543) % 4 === 0 && (j - 543) % 100 === 0 && (j - 543) % 400 === 0)) {
                                    nF = 29 - (start.day - 1);
                                    console.log("3.5=" + nF);
                                }
                                else {
                                    nF = 28 - (start.day - 1);
                                    console.log("3.6=" + nF);
                                }
                            } else if (k === 2) {
                                if ((j - 543) % 4 === 0 || ((j - 543) % 4 === 0 && (j - 543) % 100 === 0 && (j - 543) % 400 === 0)) {
                                    nF += 29;
                                    console.log("3.7=" + nF);
                                }
                                else {
                                    nF += 28;
                                    console.log("3.8=" + nF);
                                }
                            }
                        }
                    } else if (j === end.year) {
                        for (let l = 1; l <= end.month; l++) {
                            console.log("l=" + l);
                            if (l === end.month) {
                                nF += end.day;
                                console.log("3.11=" + nF);
                            } else if (l === 1 || l === 3 || l === 5 || l === 7 || l === 8 || l === 10 || l === 12) {
                                nF += 31;
                                console.log("3.12=" + nF);
                            } else if (l === 4 || l === 6 || l === 9 || l === 11) {
                                nF += 30;
                                console.log("3.13=" + nF);
                            } else if (l === 2) {
                                if ((j - 543) % 4 === 0 || ((j - 543) % 4 === 0 && (j - 543) % 100 === 0 && (j - 543) % 400 === 0)) {
                                    nF += 29;
                                    console.log("3.14=" + nF);
                                }
                                else {
                                    nF += 28;
                                    console.log("3.15=" + nF);
                                }
                            }
                        }
                    }
                }
                console.log("3=" + nF);
                nF /= f;
            }
            nF++;
            console.log("nF/f=" + nF);

            let nDay = start.day;
            let nMonth = start.month;
            let nYear = start.year;
            let m = 2;
            let numF = 0;
            const date = {
                day: nDay,
                month: nMonth,
                year: nYear
            }
            var dateToDo = [];
            dateToDo = dateToDo.concat(date);
            while (m <= nF) {
                if (nDay <= 31) {
                    nDay++;
                    numF++;

                    if (nDay > 31 && (nMonth === 1 || nMonth === 3 || nMonth === 5 || nMonth === 7 || nMonth === 8 || nMonth === 10 || nMonth === 12)) {
                        nDay -= 31;
                        if (nMonth === 12) {
                            nYear++;
                            nMonth = 1;
                        } else nMonth++;
                    } else if (nDay > 30 && (nMonth === 4 || nMonth === 6 || nMonth === 9 || nMonth === 11)) {
                        nDay -= 30;
                        nMonth++;
                    } else if (nDay > 28 && (nMonth === 2 && ((nYear - 543) % 4 !== 0 || ((nYear - 543) % 4 !== 0 || (nYear - 543) % 100 === 0)))) {
                        nDay -= 28;
                        nMonth++;
                    } else if (nDay > 29 && (nMonth === 2 && ((nYear - 543) % 4 === 0 || ((nYear - 543) % 4 === 0 && (nYear - 543) % 100 === 0 && (nYear - 543) % 400 === 0)))) {
                        nDay -= 29;
                        nMonth++;
                    }
                    if (numF == f) {
                        const date = {
                            day: nDay,
                            month: nMonth,
                            year: nYear
                        }
                        dateToDo = dateToDo.concat(date);
                        console.log(date);
                        console.log(dateToDo);
                        numF = 0;
                        m++;
                    }
                }
                this.setState({
                    dateToDo: dateToDo
                })
                console.log("m=" + m);
                console.log("numF=" + numF);
                console.log("day=" + nDay);
            }
        } else {
            const openAndCloseTimes = {
                start,
                end
            }

            let builtIns = [];
            var data = {};

            if (this.state.builtInWidgetGender) {
                builtIns = builtIns.concat({ builtInWidget: "gender" })
            }
            if (this.state.builtInWidgetAges) {
                builtIns = builtIns.concat({ builtInWidget: "ages" })
            }
            if (this.state.builtInWidgetStatus) {
                builtIns = builtIns.concat({ builtInWidget: "status" })
            }
            if (this.state.builtInWidgetEducation) {
                builtIns = builtIns.concat({ builtInWidget: "education" })
            }
            if (this.state.builtInWidgetJob) {
                builtIns = builtIns.concat({ builtInWidget: "job" })
            }
            if (this.state.builtInWidgetIncome) {
                builtIns = builtIns.concat({ builtInWidget: "income" })
            }
            console.log(builtIns)

            if (builtIns[0] !== undefined) {
                data = {
                    projectId: this.state.projectId,
                    sampleGroupId: this.state.sampleGroupId,
                    nameSampleGroup: this.state.nameSampleGroup,
                    nameSurvey: this.state.nameSurvey,
                    description: this.state.description,
                    shareTo: this.state.shareTo,
                    wantName: this.state.wantName,
                    haveGroup: this.state.haveGroup,
                    data: JSON.parse(JSON.stringify(this.surveyCreator.text)),
                    builtIns: builtIns,
                    frequency: this.state.frequency,
                    doOnce: this.state.doOnce,
                    openAndCloseTimes: openAndCloseTimes,
                    status: this.props.test.status
                }
            } else {
                data = {
                    projectId: this.state.projectId,
                    sampleGroupId: this.state.sampleGroupId,
                    nameSampleGroup: this.state.nameSampleGroup,
                    nameSurvey: this.state.nameSurvey,
                    description: this.state.description,
                    shareTo: this.state.shareTo,
                    wantName: this.state.wantName,
                    haveGroup: this.state.haveGroup,
                    data: JSON.parse(JSON.stringify(this.surveyCreator.text)),
                    frequency: this.state.frequency,
                    doOnce: this.state.doOnce,
                    openAndCloseTimes: openAndCloseTimes,
                    status: this.props.test.status

                }
            }
            this.props.dispatch({
                type: 'EDIT_STEP1',
                data
            });
            console.log(data);

        }

    }
    sendData() {
        console.log(this.state.dateToDo);

        const start = {
            day: Number(this.state.startDate),
            month: Number(this.state.startMonth),
            year: Number(this.state.startYear)
        }
        const end = {
            day: Number(this.state.endDate),
            month: Number(this.state.endMonth),
            year: Number(this.state.endYear)
        }
        console.log(start);
        console.log(end);
        const openAndCloseTimes = {
            start,
            end
        }
        let builtIns = [];
        var data = {};

        if (this.state.builtInWidgetGender) {
            builtIns = builtIns.concat({ builtInWidget: "gender" })
        }
        if (this.state.builtInWidgetAges) {
            builtIns = builtIns.concat({ builtInWidget: "ages" })
        }
        if (this.state.builtInWidgetStatus) {
            builtIns = builtIns.concat({ builtInWidget: "status" })
        }
        if (this.state.builtInWidgetEducation) {
            builtIns = builtIns.concat({ builtInWidget: "education" })
        }
        if (this.state.builtInWidgetJob) {
            builtIns = builtIns.concat({ builtInWidget: "job" })
        }
        if (this.state.builtInWidgetIncome) {
            builtIns = builtIns.concat({ builtInWidget: "income" })
        }
        console.log(builtIns)

        if (builtIns[0] !== undefined) {
            data = {
                projectId: this.state.projectId,
                sampleGroupId: this.state.sampleGroupId,
                nameSampleGroup: this.state.nameSampleGroup,
                nameSurvey: this.state.nameSurvey,
                description: this.state.description,
                shareTo: this.state.shareTo,
                wantName: this.state.wantName,
                haveGroup: this.state.haveGroup,
                data: JSON.parse(JSON.stringify(this.surveyCreator.text)),
                builtIns: builtIns,
                frequency: this.state.frequency,
                doOnce: this.state.doOnce,
                openAndCloseTimes: openAndCloseTimes,
                status: this.props.test.status,
                dateToDo: this.state.dateToDo
            }
        } else {
            data = {
                projectId: this.state.projectId,
                sampleGroupId: this.state.sampleGroupId,
                nameSampleGroup: this.state.nameSampleGroup,
                nameSurvey: this.state.nameSurvey,
                description: this.state.description,
                shareTo: this.state.shareTo,
                wantName: this.state.wantName,
                haveGroup: this.state.haveGroup,
                data: JSON.parse(JSON.stringify(this.surveyCreator.text)),
                frequency: this.state.frequency,
                doOnce: this.state.doOnce,
                openAndCloseTimes: openAndCloseTimes,
                status: this.props.test.status,
                dateToDo: this.state.dateToDo

            }
        }

        this.props.dispatch({
            type: 'EDIT_STEP1',
            data
        });
        console.log(data);
    }

    render() {
        return (
            <div className="sec">
                <h1>{this.props.test.status === "prototype" ? "แบบสอบถามต้นแบบ" : "แก้ไขแบบสอบถาม"}</h1>
                {this.props.test.status === "prototype" ?
                    <div>
                        <h3>ส่วนที่ 1 : ตำแหน่งที่ต้องการบันทึก</h3>
                        <FormGroup>
                            <Label>คุณต้องการบันทึกลงโปรเจคใด?</Label>
                            <Input type="select" value={this.state.projectId} onChange={this.onChangeProject}>
                                <option value="no">โปรเจคที่เลือก ?</option>
                                {this.optionProject()}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            {this.state.projectId !== "" ?
                                <div>
                                    {this.state.checkNewSampleGroup ?
                                        <div>
                                            <Label>ชื่อกลุ่มตัวอย่างใหม่?(<Button color="link" onClick={this.oldSampleGroup.bind(this)}>เลือกจากที่มีในโปรเจค</Button>)</Label>
                                            <Input type="text" value={this.state.nameSampleGroup} placeholder="ชื่อกลุ่มตัวอย่าง" onChange={this.onChangeNameSampleGroup} />
                                        </div>
                                        : <div>
                                            <Label>คุณต้องการบันทึกลงกลุ่มตัวอย่างใด? (<Button color="link" onClick={this.newSampleGroup.bind(this)}>สร้างกลุ่มตัวอย่างใหม่</Button>)</Label>
                                            <Input type="select" value={this.state.sampleGroupId} onChange={this.onChangeSampleGroup}>
                                                <option value="no">กลุ่มตัวอย่างที่เลือก ?</option>
                                                {this.optionSampleGroup()}
                                            </Input>
                                        </div>}

                                </div>
                                : ""}
                        </FormGroup>
                    </div>
                    : ""}
                <br></br>
                <h3>ส่วนที่ {this.props.test.status === "prototype" ? "2" : "1"} : ข้อมูลทั่วไป</h3>
                <FormGroup>
                    <Label>ชื่อแบบสอบถาม</Label>
                    <Input required type="text" value={this.state.nameSurvey} placeholder="ชื่อแบบสอบถาม" onChange={this.onChangeSurveyName} />
                </FormGroup>
                <FormGroup>
                    <Label>คำอธิบาย</Label>
                    <Input type="textarea" value={this.state.description} placeholder="คำอธิบาย" onChange={this.onChangeDescription} />
                </FormGroup>
                <FormGroup>
                    <Label>ผู้มีสิทธิทำแบบสอบถาม</Label>
                    <Input type="select" value={this.state.shareTo} onChange={this.onChangeShareTo}>
                        <option >ต้องการแสดงผลแบบใด?</option>
                        <option value="close">กลุ่มปิด</option>
                        <option value="open">กลุ่มเปิด</option>
                        <option value="public">กลุ่มสาธารณะ</option>
                    </Input>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" onChange={this.onChangeWantName} checked={this.state.wantName} />{''}
                            ต้องการทราบชื่อผู้ทำแบบสอบถาม
                        </Label>
                </FormGroup>
                {this.state.shareTo !== "public" && this.state.shareTo !== "" ?
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeHaveGroup} checked={this.state.haveGroup} />{''}
                                ต้องการให้มีสมาชิกสำหรับทำแบบสอบถาม
                        </Label>
                    </FormGroup> : ""}
                <br></br>
                <h3>ส่วนที่ {this.props.test.status === "prototype" ? "3" : "2"} : แบบสอบถาม</h3>
                <h4>คำถามพื้นฐานสำเร็จรูป</h4>
                <p>โปรดเลือกคำถามเกี่ยวกับข้อมูลส่วนตัวจากที่นี่</p>
                <FormGroup check>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetGender} checked={this.state.builtInWidgetGender} />{''}
                            คำถามเรื่องเพศ
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetAges} checked={this.state.builtInWidgetAges} />{''}
                            คำถามเรื่องอายุ
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetStatus} checked={this.state.builtInWidgetStatus} />{''}
                            คำถามเรื่องสถานภาพ
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetEducation} checked={this.state.builtInWidgetEducation} />{''}
                            คำถามเรื่องระดับการศึกษา
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetJob} checked={this.state.builtInWidgetJob} />{''}
                            คำถามเรื่องอาชีพ
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetIncome} checked={this.state.builtInWidgetIncome} />{''}
                            คำถามเรื่องรายได้เฉลี่ยต่อเดือน
                        </Label>
                    </div>
                </FormGroup>
                <br></br>
                <div id="surveyCreatorContainer" />
                <br></br>
                <h3>ส่วนที่ {this.props.test.status === "prototype" ? "4" : "3"} : ความถี่/ระยะเวลา</h3>
                <div><p>ความถี่ในการทำแบบสอบถาม</p></div>
                <FormGroup row>
                    <Col>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" onChange={this.onChangeDoOnce} checked={this.state.doOnce} />{''}
                                    1 ครั้ง
                                </Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" onChange={this.onChangeDoMany} checked={this.state.doMany} />{''}
                                    มากกว่า 1 ครั้ง
                                </Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        {this.state.haveGroup === true ?
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" onChange={this.onChangeSetFreq} checked={this.state.setFreq} />{''}
                                        กำหนดเอง
                                </Label>
                            </FormGroup> : <FormGroup check disabled>
                                <Label check>
                                    <Input type="radio" name="radio1" onChange={this.onChangeSetFreq} disabled />{''}
                                        กำหนดเอง
                                </Label>
                            </FormGroup>}

                    </Col>
                </FormGroup>
                {this.state.setFreq === true ?
                    <FormGroup row>
                        <Col><Label>ทำแบบสอบถามทุกๆ</Label></Col>
                        <Col sm={5}><Input type="text" placeholder="จำนวนครั้งต่อหน่วยเวลา" value={this.state.frequency.amount} onChange={this.onChangeAmount} /></Col>
                        <Col sm={3}>
                            <Input type="select" value={this.state.frequency.unitsOfTime} onChange={this.onChangeUnitTime}>
                                <option >หน่วยเวลา?</option>
                                <option value="day">วัน</option>
                                <option value="week">สัปดาห์</option>
                                <option value="month">เดือน</option>
                                <option value="year">ปี</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    : ""}

                {this.state.setFreq === true ?
                    <FormGroup check disabled>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeSchedule} checked disabled />{''}
                                กำหนดระยะเวลาเปิดปิดอัตโนมัติ
                        </Label>
                    </FormGroup> :
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeSchedule} checked={this.state.schedule} />{''}
                                กำหนดระยะเวลาเปิดปิดอัตโนมัติ
                        </Label>
                    </FormGroup>}

                {this.state.schedule === true ?
                    <div>
                        <FormGroup row>
                            <Col><Label for="descript">เริ่มต้น:</Label></Col>
                            <Col sm={3}>
                                <Input type="text" placeholder="วันที่" value={this.state.startDate} onChange={this.onChangeStartDate} />
                            </Col>
                            <Col sm={3}>
                                <Input type="select" value={this.state.startMonth} onChange={this.onChangeStartMonth}>
                                    <option >เดือน?</option>
                                    <option value="1">มกราคม</option>
                                    <option value="2">กุมภาพันธ์</option>
                                    <option value="3">มีนาคม</option>
                                    <option value="4">เมษายน</option>
                                    <option value="5">พฤษภาคม</option>
                                    <option value="6">มิถุนายน</option>
                                    <option value="7">กรกฎาคม</option>
                                    <option value="8">สิงหาคม</option>
                                    <option value="9">กันยายน</option>
                                    <option value="10">ตุลาคม</option>
                                    <option value="11">พฤศจิกายน</option>
                                    <option value="12">ธันวาคม</option>
                                </Input>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" placeholder="พ.ศ." value={this.state.startYear} onChange={this.onChangeStartYear} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col><Label for="descript">สิ้นสุด:</Label></Col>
                            <Col sm={3}>
                                <Input type="text" placeholder="วันที่" value={this.state.endDate} onChange={this.onChangeEndDate} />
                            </Col>
                            <Col sm={3}>
                                <Input type="select" value={this.state.endMonth} onChange={this.onChangeEndMonth}>
                                    <option >เดือน?</option>
                                    <option value="1">มกราคม</option>
                                    <option value="2">กุมภาพันธ์</option>
                                    <option value="3">มีนาคม</option>
                                    <option value="4">เมษายน</option>
                                    <option value="5">พฤษภาคม</option>
                                    <option value="6">มิถุนายน</option>
                                    <option value="7">กรกฎาคม</option>
                                    <option value="8">สิงหาคม</option>
                                    <option value="9">กันยายน</option>
                                    <option value="10">ตุลาคม</option>
                                    <option value="11">พฤศจิกายน</option>
                                    <option value="12">ธันวาคม</option>
                                </Input>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" placeholder="พ.ศ." value={this.state.endYear} onChange={this.onChangeEndYear} />
                            </Col>
                        </FormGroup>
                    </div> : ""}
                {this.state.projectId !== "" ?
                    <Button color="primary" onClick={this.saveDraft.bind(this)}>บันทึกแบบร่าง</Button>
                    : <Button color="primary" onClick={this.saveDraft.bind(this)} disabled>บันทึกแบบร่าง</Button>}&nbsp;
                {this.state.projectId !== "" ?
                    <Button color="info" onClick={this.onSubmit.bind(this)}>ต่อไป</Button>
                    : <Button color="info" onClick={this.onSubmit.bind(this)} disabled>ต่อไป</Button>}

                {this.state.dateToDo[0] !== undefined ? this.sendData() : ""}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        test: state
    }
}
export default connect(mapStateToProps)(EditSurvey);

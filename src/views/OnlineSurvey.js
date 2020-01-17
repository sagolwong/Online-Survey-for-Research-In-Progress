import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "bootstrap/dist/css/bootstrap.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import * as widgets from "surveyjs-widgets";

import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
require("icheck");

Survey.StylesManager.applyTheme("default");

widgets.icheck(Survey, $);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

class OnlineSurvey extends Component {
    constructor(props) {
        super(props);

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 543;

        this.state = {
            profile: {},
            survey: {},
            answer: [],
            listSurvey: [],
            title: "",
            pages: [],
            cdate: date,
            cmonth: month,
            cyear: year,
            sdate: 0,
            smonth: 0,
            syear: 0,
            edate: 0,
            emonth: 0,
            eyear: 0,
        };
        this.onComplete = this.onComplete.bind(this);
    }

    async componentDidMount() {
        const surveyId = this.props.match.params.surveyId;
        console.log(surveyId);
        console.log("cdate:" + this.state.cdate);
        console.log("cmonth:" + this.state.cmonth);
        console.log("cyear:" + this.state.cyear);
        if (surveyId) {
            this.props.dispatch({
                type: 'SHOW_SURVEY'
            });
        }
        await axios.get(`http://localhost:5000/surveys/find/` + surveyId)
            .then(response => {
                this.setState({
                    survey: response.data,
                    title: response.data.data.title,
                    pages: response.data.data.pages,
                    sdate: response.data.openAndCloseTimes.start.day,
                    smonth: response.data.openAndCloseTimes.start.month,
                    syear: response.data.openAndCloseTimes.start.year,
                    edate: response.data.openAndCloseTimes.end.day,
                    emonth: response.data.openAndCloseTimes.end.month,
                    eyear: response.data.openAndCloseTimes.end.year,
                })
                console.log(this.state.survey);
                console.log(this.state.title);
                console.log(this.state.pages);
                console.log(this.state.survey.data);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/5dc9a42c824eb44fe43c8f94')
            .then(response => {
                this.setState({
                    profile: response.data
                })
                console.log(this.state.profile);
                console.log(this.state.profile.recentOtherSurveys.length);
            })
            .catch((error) => {
                console.log(error);
            })

    }
    /*json = {
        title: "วิจัยเทส",
        builtIns: [
            {
                builtInWidget: "gender"
            },
            {
                builtInWidget: "ages"
            }
        ],
        pages: [
            {
                name: "page1",
                elements: [
                    {
                        type: "matrix",
                        name: "q1",
                        title: "แบบประเมิณความวิตก",
                        columns: [
                            {
                                value: "1",
                                text: "ไม่มีเลย"
                            },
                            {
                                value: "2",
                                text: "มีบางครั้ง"
                            },
                            {
                                value: "3",
                                text: "มีค่อนข้างบ่อย"
                            },
                            {
                                value: "4",
                                text: "มีมากที่สุด"
                            }
                        ],
                        rows: [
                            "เมื่อนึกถึงความป่วยครั้งนี้ท่านรู้สึกสงบ",
                            "เมื่อนึกถึงความป่วยครั้งนี้ท่านรู้สึกมั่นคง"
                        ]
                    }
                ]
            }
        ]
    };*/
    /*createJson(){
        const data = {
            title: this.state.title,
            pages: this.state.pages
        }
        return data
    }*/

    showSurvey() {
        console.log("sdate:" + this.state.sdate);
        console.log("smonth:" + this.state.smonth);
        console.log("syear:" + this.state.syear);
        console.log("edate:" + this.state.edate);
        console.log("emonth:" + this.state.emonth);
        console.log("eyear:" + this.state.eyear);
        if ((this.state.cyear <= this.state.syear && (this.state.cmonth < this.state.smonth || (this.state.cdate < this.state.sdate && this.state.cdate >= this.state.sdate))) || (this.state.cmonth === this.state.smonth && this.state.cdate < this.state.sdate)) {
            return (
                <div>
                    ยังไม่ถึงกำหนดเปิด
                </div>
            )
        } else if (this.state.cyear > this.state.eyear || (this.state.cyear === this.state.eyear && (this.state.cmonth > this.state.emonth || (this.state.cmonth === this.state.emonth && this.state.cdate > this.state.edate)))) {
            return (
                <div>
                    เลยกำหนดการเปิดแล้ว
                </div>
            )
        } else {
            //อาจจะติดตรงที่ มันไม่มี "" หรือป่าว?
            const title1 = "เทสๆ";
            const title2 = JSON.stringify(this.state.title);
            const title3 = this.state.title;
            console.log(title1);
            console.log(this.state.title);
            console.log(title2);
            console.log(title3);
            var surveyJSON = {
                title: title1,
                pages: [
                    {
                        name: "page1",
                        elements: [
                            {
                                type: "matrix",
                                name: "q1",
                                title: "แบบประเมิณความวิตก",
                                columns: [
                                    {
                                        value: "1",
                                        text: "ไม่มีเลย"
                                    },
                                    {
                                        value: "2",
                                        text: "มีบางครั้ง"
                                    },
                                    {
                                        value: "3",
                                        text: "มีค่อนข้างบ่อย"
                                    },
                                    {
                                        value: "4",
                                        text: "มีมากที่สุด"
                                    }
                                ],
                                rows: [
                                    "เมื่อนึกถึงความป่วยครั้งนี้ท่านรู้สึกสงบ",
                                    "เมื่อนึกถึงความป่วยครั้งนี้ท่านรู้สึกมั่นคง"
                                ]
                            }
                        ]
                    }
                ]
            };
            console.log(surveyJSON);
            console.log(this.state.survey.data);
            Survey.Survey.cssType = "default";
            var model = new Survey.Model(this.state.survey.data);
            console.log(model);
            return (
                <div className="App">
                    <div className="surveyjs">
                        <h1>SurveyJS library in action:</h1>
                        <Survey.Survey
                            model={model}
                            onComplete={this.onComplete}
                            onValueChanged={this.onValueChanged} />
                    </div>
                </div>
            )
        }
    }

    onValueChanged(result) {
        console.log("value changed!");
    }

    async onComplete(result) {
        //console.log("Complete! " + result);
        const surveyId = this.props.match.params.surveyId;
        const userId = "5dca538c955945213c0d52ff";
        var resultAsString = result.data;
        await axios.get(`http://localhost:5000/answers/find/` + surveyId)
            .then(response => {
                this.setState({
                    answer: response.data
                })
                console.log(this.state.answer[0]);

            })
            .catch((error) => {
                console.log(error);
            })

        await axios.get(`http://localhost:5000/listSurvey/find/` + userId)
            .then(response => {
                this.setState({
                    listSurvey: response.data
                })
                console.log(this.state.listSurvey[0]);

            })
            .catch((error) => {
                console.log(error);
            })

        if (await this.state.answer[0] !== undefined) {
            const editAnswer = {
                //amountUser: รอเช็กกับ userId ว่ามีอยู่แล้วไหม?
                amountAnswer: this.state.answer[0].amountAnswer + 1,
                answerUsers: this.state.answer[0].answerUsers.concat(resultAsString)
            }
            console.log(editAnswer);
            axios.post(`http://localhost:5000/answers/edit/${this.state.answer[0]._id}`, editAnswer)
                .then(res => console.log(res.data));
        } else {
            const createAnswer = {
                surveyId: surveyId,
                answerUsers: [resultAsString]
            }
            console.log(createAnswer);
            axios.post('http://localhost:5000/answers/create', createAnswer)
                .then(res => console.log(res.data));
        }

        if (await this.state.listSurvey[0] !== undefined) {
            var check1 = false;
            this.state.listSurvey[0].listSurvey.map(res => {
                if (res !== surveyId) check1 = true;
            })
            if (check1) {
                const editListSurvey = {
                    listSurvey: this.state.listSurvey[0].listSurvey.concat(surveyId)
                }
                console.log(editListSurvey);
                axios.post(`http://localhost:5000/listSurvey/edit/${this.state.listSurvey[0]._id}`, editListSurvey)
                    .then(res => console.log(res.data));
            }

        } else {
            const createListSurvey = {
                userId: userId,
                listSurvey: [surveyId]
            }
            console.log(createListSurvey);
            axios.post('http://localhost:5000/listSurvey/create', createListSurvey)
                .then(res => console.log(res.data));
        }

        if (await this.state.profile.recentOtherSurveys[0] !== undefined) {
            var check2 = false;
            this.state.profile.recentOtherSurveys.map(res => {
                if (res !== surveyId) check2 = true;
            })
            if (check2) {
                if (await this.state.profile.recentOtherSurveys.length < 10) {
                    const editRecentProject = await {
                        recentOtherSurveys: this.state.profile.recentOtherSurveys.concat(surveyId),
                        recentProjects: this.state.profile.recentProjects
                    }
                    await axios.post('http://localhost:5000/users/edit/5dc9a42c824eb44fe43c8f94', editRecentProject)
                        .then(res => console.log(res.data));
                } else {
                    this.state.profile.recentOtherSurveys[0] = await this.state.profile.recentOtherSurveys[1];
                    this.state.profile.recentOtherSurveys[1] = await this.state.profile.recentOtherSurveys[2];
                    this.state.profile.recentOtherSurveys[2] = await this.state.profile.recentOtherSurveys[3];
                    this.state.profile.recentOtherSurveys[3] = await this.state.profile.recentOtherSurveys[4];
                    this.state.profile.recentOtherSurveys[4] = await this.state.profile.recentOtherSurveys[5];
                    this.state.profile.recentOtherSurveys[5] = await this.state.profile.recentOtherSurveys[6];
                    this.state.profile.recentOtherSurveys[6] = await this.state.profile.recentOtherSurveys[7];
                    this.state.profile.recentOtherSurveys[7] = await this.state.profile.recentOtherSurveys[8];
                    this.state.profile.recentOtherSurveys[8] = await this.state.profile.recentOtherSurveys[9];
                    this.state.profile.recentOtherSurveys[9] = await surveyId;
                    const editRecentProject = await {
                        recentOtherSurveys: this.state.profile.recentOtherSurveys,
                        recentProjects: this.state.profile.recentProjects
                    }
                    await axios.post('http://localhost:5000/users/edit/5dc9a42c824eb44fe43c8f94', editRecentProject)
                        .then(res => console.log(res.data));
                }
            }
        }else {
            const editRecentProject = await {
                recentOtherSurveys: this.state.profile.recentOtherSurveys.concat(surveyId),
                recentProjects: this.state.profile.recentProjects
            }
            await axios.post('http://localhost:5000/users/edit/5dc9a42c824eb44fe43c8f94', editRecentProject)
                .then(res => console.log(res.data));
        }


    }

    render() {
        //อาจจะติดตรงที่ มันไม่มี "" หรือป่าว?
        /* const title1 = "เทสๆ";
         const title2 = this.state.title;
         console.log(title1);
         console.log(title2);
         var surveyJSON = {
             title: title1,
             pages: [
                 {
                     name: "page1",
                     elements: [
                         {
                             type: "matrix",
                             name: "q1",
                             title: "แบบประเมิณความวิตก",
                             columns: [
                                 {
                                     value: "1",
                                     text: "ไม่มีเลย"
                                 },
                                 {
                                     value: "2",
                                     text: "มีบางครั้ง"
                                 },
                                 {
                                     value: "3",
                                     text: "มีค่อนข้างบ่อย"
                                 },
                                 {
                                     value: "4",
                                     text: "มีมากที่สุด"
                                 }
                             ],
                             rows: [
                                 "เมื่อนึกถึงความป่วยครั้งนี้ท่านรู้สึกสงบ",
                                 "เมื่อนึกถึงความป่วยครั้งนี้ท่านรู้สึกมั่นคง"
                             ]
                         }
                     ]
                 }
             ]
         };
         console.log(surveyJSON);
         Survey.Survey.cssType = "default";
         var model = new Survey.Model(surveyJSON);
         console.log(model);*/
        return (
            <div>
                {this.showSurvey()}
            </div>
        )
    }
}
export default connect()(OnlineSurvey);
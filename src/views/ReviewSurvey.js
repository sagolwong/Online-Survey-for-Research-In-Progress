import React, { Component } from 'react'
import axios from 'axios';
import { Label, Input, Col, Row, Card, Button } from 'reactstrap'
import { connect } from 'react-redux';
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

class ReviewSurvey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkP: false,
            project: {},
            sampleGroup: {},
            nameSampleGroup: "",
        };
        this.shareTo = this.shareTo.bind(this);
        this.wantName = this.wantName.bind(this);
        this.haveGroup = this.haveGroup.bind(this);
        this.frequency = this.frequency.bind(this);
        this.showBuiltIn = this.showBuiltIn.bind(this);
        this.showSurvey = this.showSurvey.bind(this);
    }

    componentDidMount() {
        if (this.props.type === "prototype") {
            axios.get(`http://localhost:5000/projects/` + this.props.test.projectId)
                .then(response => {
                    this.setState({
                        project: response.data
                    })
                    console.log(this.state.projects);
                })
                .catch((error) => {
                    console.log(error);
                })
            if (this.props.test.sampleGroupId !== "" ) {
                axios.get(`http://localhost:5000/sampleGroups/find/` + this.props.test.sampleGroupId)
                    .then(response => {
                        this.setState({
                            sampleGroup: response.data,
                            nameSampleGroup: response.data.nameSampleGroup
                        })
                        console.log(this.state.sampleGroups);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }else if(this.props.test.nameSampleGroup !== ""){
                this.setState({ nameSampleGroup: this.props.test.nameSampleGroup })
            }
        }
    }
    shareTo() {
        if (this.props.test.shareTo === "open") return "กลุ่มเปิด";
        else if (this.props.test.shareTo === "close") return "กลุ่มปิด";
        else if (this.props.test.shareTo === "public") return "กลุ่มสาธารณะ";
    }

    wantName() {
        if (this.props.test.wantName) return "ใช่";
        else return "ไม่ใช่";
    }

    haveGroup() {
        if (this.props.test.haveGroup) return "ใช่";
        else return "ไม่ใช่";
    }

    frequency() {
        if (this.props.test.frequency.amount !== 0) {
            var unitsOfTime = ""
            if (this.props.test.frequency.unitsOfTime === "day") unitsOfTime = "วัน";
            else if (this.props.test.frequency.unitsOfTime === "week") unitsOfTime = "สัปดาห์";
            else if (this.props.test.frequency.unitsOfTime === "month") unitsOfTime = "เดือน";
            else if (this.props.test.frequency.unitsOfTime === "year") unitsOfTime = "ปี";
            return "ทุก ๆ " + this.props.test.frequency.amount + " " + unitsOfTime;
        }
        if (this.props.test.doOnce) return "ทำได้ครั้งเดียว";
        else return "ทำได้หลายครั้ง";

    }

    dateToDo() {
        return (
            this.props.test.dateToDo.map((date, index) => {
                return (
                    <Row>
                        <Col><Label>ครั้งที่ {index + 1} :</Label></Col>
                        <Col><Input type="text" rows={5} value={date.day + "/" + date.month + "/" + date.year} disabled /></Col>
                    </Row>
                )
            })
        )

    }

    showBuiltIn() {
        return (
            this.props.test.builtIns.map((builtIn, index) => {
                var nameQ = "";
                if (builtIn.builtInWidget === "gender") nameQ = "คำถามเรื่องเพศ";
                else if (builtIn.builtInWidget === "ages") nameQ = "คำถามเรื่องอายุ";
                else if (builtIn.builtInWidget === "status") nameQ = "คำถามเรื่องสถานภาพ";
                else if (builtIn.builtInWidget === "education") nameQ = "คำถามเรื่องการศึกษา";
                else if (builtIn.builtInWidget === "job") nameQ = "คำถามเรื่องอาชีพ";
                else if (builtIn.builtInWidget === "income") nameQ = "คำถามเรื่องรายได้เฉลี่ยต่อเดือน";

                return (
                    <Row>
                        <Col><Label>ข้อที่  {index + 1} :</Label></Col>
                        <Col><Input type="text" rows={5} value={nameQ} disabled /></Col>
                    </Row>
                )
            })
        )

    }

    showSurvey() {
        var form = JSON.parse(this.props.test.data);
        Survey.Survey.cssType = "default";
        var model = new Survey.Model(form);
        return (
            <div className="App">
                <div className="surveyjs">
                    <Card style={{
                        height: "auto",
                        width: "600px"
                    }}>
                        <div style={{
                            marginLeft: "1rem",
                            marginRight: "1rem",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}>
                            <h1>ตัวอย่างแบบสอบถาม:</h1>
                            <Survey.Survey model={model} />
                        </div>
                    </Card>

                </div>
            </div>
        )
    }
    backToStep3() {
        this.props.dispatch({
            type: 'BACKTOSTEP3'
        });
    }
    backToEditStep1() {
        this.props.dispatch({
            type: 'BACKTOEDITSTEP1'
        });
    }

    saveDraft() {
        var data = {
            status: "draft"
        }
        if (this.props.type !== undefined) {
            this.props.dispatch({
                type: 'EDIT_STEP2',
                data
            });
        } else {
            this.props.dispatch({
                type: 'ADD_STEP4',
                data
            });
        }
    }

    savePrototype() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        const data = {
            userId: userId,
            nameSurvey: this.props.test.nameSurvey,
            description: this.props.test.description,
            shareTo: this.props.test.shareTo,
            wantName: this.props.test.wantName,
            haveGroup: this.props.test.haveGroup,
            frequency: this.props.test.frequency,
            doOnce: this.props.test.doOnce,
            openAndCloseTimes: this.props.test.openAndCloseTimes,
            builtIns: this.props.test.builtIns,
            data: this.props.test.data
        }
        console.log(data);
        axios.post(`http://localhost:5000/prototypes/create`, data)
            .then(res => {
                console.log(res.data)
                this.setState({ checkP: true })
            })
    }

    publish() {
        var data = {
            status: "publish"
        }
        if (this.props.type !== undefined) {
            this.props.dispatch({
                type: 'EDIT_STEP2',
                data
            });
        } else {
            this.props.dispatch({
                type: 'ADD_STEP4',
                data
            });
        }

    }

    render() {
        return (
            <div className="sec">
                <h1>กรุณายืนยันรายละเอียดแบบสอบถาม</h1>
                <br></br>
                {this.props.type === "prototype" ?
                    <div>
                        <h3>ส่วนที่ 1 : ตำแหน่งที่ต้องการบันทึก</h3>
                        <Row>
                            <Col>ต้องการบันทึกลงโปรเจค :</Col>
                            <Col><Input type="text" rows={5} value={this.state.project.nameProject} disabled /></Col>
                        </Row>
                        <Row>
                            <Col>ต้องการบันทึกลงกลุ่มตัวอย่าง :</Col>
                            <Col><Input type="text" rows={5} value={this.state.nameSampleGroup} disabled /></Col>
                        </Row>
                    </div>
                    : ""}
                <h3>ส่วนที่ {this.props.type === "prototype" ? "2" : "1"} : ข้อมูลทั่วไป</h3>
                <Row>
                    <Col>ชื่อแบบสอบถาม :</Col>
                    <Col><Input type="text" rows={5} value={this.props.test.nameSurvey} disabled /></Col>
                </Row>
                <Row>
                    <Col>คำอธิบาย :</Col>
                    <Col><Input type="text" rows={5} value={this.props.test.description} disabled /></Col>
                </Row>
                <Row>
                    <Col>ผู้มีสิทธิทำแบบสอบถาม :</Col>
                    <Col><Input type="text" rows={5} value={this.shareTo()} disabled /></Col>
                </Row>
                <Row>
                    <Col>ต้องการทราบชื่อผู้ทำแบบสอบถาม :</Col>
                    <Col><Input type="text" rows={5} value={this.wantName()} disabled /></Col>
                </Row>
                <Row>
                    <Col>ต้องการให้มีสมาชิกสำหรับทำแบบสอบถาม :</Col>
                    <Col><Input type="text" rows={5} value={this.haveGroup()} disabled /></Col>
                </Row>
                <br></br>
                <h3>ส่วนที่ {this.props.type === "prototype" ? "3" : "2"} : แบบสอบถาม</h3>
                <Row>
                    <Col>ชุดคำถามพื้นฐานสำเร็จรูป :</Col>
                </Row>
                {this.props.test.builtIns !== undefined ? this.showBuiltIn() : ""}
                <Row>
                    <Col>ชุดคำถามที่สร้างขึ้นเอง :</Col>
                </Row>
                <br></br>
                <Row>
                    {this.showSurvey()}
                </Row>
                <br></br>
                <h3>ส่วนที่ {this.props.type === "prototype" ? "4" : "3"} : ความถี่/ระยะเวลา</h3>
                <Row>
                    <Col>ความถี่ในการทำแบบสอบถาม :</Col>
                    <Col><Input type="text" rows={5} value={this.frequency()} disabled /></Col>
                </Row>
                {this.props.test.frequency.amount !== 0 ?
                    <div>
                        <Row>
                            <Col>วันที่กำหนดให้ทำแบบสอบถาม :</Col>
                        </Row>
                        {this.dateToDo()}
                    </div>
                    : ""}
                <Row>
                    <Col>ระยะเวลาเปิดปิดอัตโนมัติ :</Col>
                </Row>
                <Row>
                    <Col><Label>วันที่เริ่มต้น:</Label></Col>
                    <Col><Input type="text" rows={5} value={this.props.test.openAndCloseTimes.start.day + "/" + this.props.test.openAndCloseTimes.start.month + "/" + this.props.test.openAndCloseTimes.start.year} disabled /></Col>
                </Row>
                <Row>
                    <Col><Label>วันที่สิ้นสุด:</Label></Col>
                    <Col><Input type="text" rows={5} value={this.props.test.openAndCloseTimes.end.day + "/" + this.props.test.openAndCloseTimes.end.month + "/" + this.props.test.openAndCloseTimes.end.year} disabled /></Col>
                </Row>
                <br></br>
                <br></br>
                <Button color="secondary" onClick={this.props.type !== undefined ? this.backToEditStep1.bind(this) : this.backToStep3.bind(this)}>ย้อนกลับ</Button>&nbsp;
                <Button color="primary" onClick={this.saveDraft.bind(this)}>บันทึกแบบร่าง</Button>&nbsp;
                {this.state.checkP ?
                    <Button color="warning" onClick={this.savePrototype.bind(this)} disabled>บันทึกต้นแบบ</Button>
                    : <Button color="warning" onClick={this.savePrototype.bind(this)}>บันทึกต้นแบบ</Button>}&nbsp;
                <Button color="info" onClick={this.publish.bind(this)}>เผยแพร่</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        test: state
    }
}
export default connect(mapStateToProps)(ReviewSurvey);

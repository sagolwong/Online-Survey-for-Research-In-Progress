import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, FormGroup, Label, Input, Button, CardTitle, CardText, Row } from "reactstrap";
import axios from 'axios';

class CheckBeforeDo extends Component {
    constructor(props) {
        super(props);

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 543;

        this.state = {
            survey: {},
            checkAgree: false,
            name: "",
            checkGroup: true,
            already: false,
            frequency: [],
            listTimeToDo: [],
            nowDate: date,
            nowMonth: month,
            nowYear: year,
            sdate: 0,
            smonth: 0,
            syear: 0,
            edate: 0,
            emonth: 0,
            eyear: 0,
        }
        this.showRequestGroup = this.showRequestGroup.bind(this)
    }

    componentDidMount() {
        const surveyId = this.props.match.params.surveyId;
        const userId = "5dc9a42c824eb44fe43c8f94";
        console.log(surveyId);
        if (surveyId) {
            this.props.dispatch({
                type: 'SHOW_SURVEY'
            });
        }
        axios.get(`http://localhost:5000/surveys/find/` + surveyId)
            .then(response => {
                this.setState({
                    survey: response.data,
                    already: true,
                    sdate: response.data.openAndCloseTimes.start.day,
                    smonth: response.data.openAndCloseTimes.start.month,
                    syear: response.data.openAndCloseTimes.start.year,
                    edate: response.data.openAndCloseTimes.end.day,
                    emonth: response.data.openAndCloseTimes.end.month,
                    eyear: response.data.openAndCloseTimes.end.year,
                })
                console.log(this.state.survey);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/frequency/find/' + surveyId)
            .then(response => {
                this.setState({
                    frequency: response.data,
                    listTimeToDo: response.data[0].listTimeToDo
                })
                console.log(this.state.frequency);
                console.log(this.state.listTimeToDo);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    onChangeAgree() {
        this.setState({
            checkAgree: !this.state.checkAgree
        })
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    checkGroup() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        if (this.state.already) {
            if (this.state.survey.haveGroup) {
                if (this.state.checkGroup) {
                    this.state.survey.names.map(memberId => {
                        if (userId === memberId) {
                            this.setState({
                                checkGroup: false
                            })
                            console.log("1")
                        }
                    })
                }
                if (this.state.checkGroup) {
                    return this.showRequestGroup()
                }
            } else {
                this.setState({
                    checkGroup: false
                })
                console.log("2")
            }
        }
    }
    showRequestGroup() {
        return (
            <div>
                <Card style={{
                    height: "230px",
                    width: "470px"
                }}>
                    <h4 style={{ textAlign: "center", marginTop: "1rem" }}>ท่านยังไม่ได้เข้าร่วมเป็นสมาชิกทำแบบสอบถาม</h4>
                    <br></br>
                    <div style={{ marginLeft: "1rem" }}>
                        <p>ท่านต้องการเข้าร่วมเป็นสมาชิกเพื่อทำแบบบสอบถามหรือไม่? </p>
                        <CardTitle><a href="/">แบบสอบถาม : {this.state.survey.nameSurvey}</a></CardTitle>
                        <CardText>
                            <p>คำอธิบายแบบสอบถาม : </p>
                            {this.state.survey.description}
                        </CardText>
                    </div>

                </Card>
                <br></br>
                <Button style={{ width: "470px" }} color="info" onClick={this.agree.bind(this)}>เข้าร่วม</Button>
            </div>
        )
    }

    async agree() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        const surveyId = this.props.match.params.surveyId;
        var check = false;
        var member = {
            names: this.state.survey.names.concat(userId),
        }

        await axios.post(`http://localhost:5000/surveys/member/${this.props.match.params.surveyId}`, member)
            .then(res => {
                console.log(res.data)
                //window.location = `/online-survey-check/${this.props.match.params.surveyId}`;
            });

        /*await axios.get('http://localhost:5000/frequency/find/' + surveyId)
            .then(response => {
                this.setState({
                    frequency: response.data,
                    listTimeToDo: response.data[0].listTimeToDo
                })
                console.log(this.state.frequency);
                console.log(this.state.listTimeToDo);
            })
            .catch((error) => {
                console.log(error);
            })*/
        if (await this.state.frequency[0] !== undefined) {
            var data = []
            data = data.concat(surveyId);
            data = data.concat(this.state.frequency[0]._id);
            const request = {
                userId: userId,
                typeRequest: "frequency",
                data: data
            }

            axios.post(`http://localhost:5000/requests/create`, request)
                .then(res => { console.log(res.data) });


            const followResult = {
                surveyId: surveyId,
                userId: userId,
                frequencyId: this.state.frequency[0]._id
            }
            axios.post(`http://localhost:5000/followResults/create`, followResult)
                .then(res => { console.log(res.data) });
        }
        if (await this.state.listTimeToDo[0] !== undefined) {
            this.state.listTimeToDo.map(time => {
                if (time.day === this.state.nowDate && time.month === this.state.nowMonth && time.year === this.state.nowYear) {
                    check = true;
                }
            })

        }
        if (await check) window.location = `/online-survey-check/${surveyId}`;
        else window.location = `/`;

    }

    showAgreement() {
        if ((this.state.nowYear <= this.state.syear && (this.state.nowMonth < this.state.smonth || (this.state.nowDate < this.state.sdate && this.state.nowDate >= this.state.sdate))) || (this.state.nowMonth === this.state.smonth && this.state.nowDate < this.state.sdate)) {
            return (
                <div>
                    ยังไม่ถึงกำหนดเปิด
                </div>
            )
        } else if (this.state.nowYear > this.state.eyear || (this.state.nowYear === this.state.eyear && (this.state.nowMonth > this.state.emonth || (this.state.nowMonth === this.state.emonth && this.state.nowDate > this.state.edate)))) {
            return (
                <div>
                    เลยกำหนดการเปิดแล้ว
                </div>
            )
        } else {
            if (this.state.listTimeToDo[0] !== undefined) {
                var checkTime = false
                this.state.listTimeToDo.map(time => {
                    if (time.day === this.state.nowDate && time.month === this.state.nowMonth && time.year === this.state.nowYear) {
                        checkTime = true;
                    }
                })
                if (checkTime) {
                    return (
                        <div>
                            <Card style={{
                                height: "230px",
                                width: "470px"
                            }}>
                                <h4 style={{ textAlign: "center" }}>ข้อตกลงที่ควรทราบก่อนการทำแบบสอบถาม</h4>
                                <ul>
                                    {this.state.survey.shareTo === "close" ?
                                        <li>แบบสอบถามนี้เป็นแบบสอบถามประเภทปิด ผู้ที่ไม่ใช่สมาชิกไม่สามารถเข้าทำได้</li> :
                                        <li>แบบสอบถามนี้เป็นแบบสอบถามประเภทเปิด ผู้ที่ไม่ใช่สมาชิกไม่สามารถเข้าทำได้</li>}
                                    {this.state.survey.wantName ?
                                        <li>แบบสอบถามนี้ต้องการทราบชื่อผู้ทำแบบสอบถาม</li> :
                                        <li>แบบสอบถามนี้ไม่ต้องการทราบชื่อผู้ทำแบบสอบถาม</li>}
                                    <li>แบบสอบถามนี้สามารถเลือกปกปิดหรือไม่ปกปิดคำตอบของผู้ทำแบบสอบถามได้หลังจากตอบแบบสอบถามครบทุกข้อ</li>
                                    <br></br>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" onChange={this.onChangeAgree.bind(this)} />{''}
                                            รับทราบและยินยอมในข้อตกลง
                                            </Label>
                                        {console.log(this.state.checkAgree)}
                                    </FormGroup>
                                </ul>
                            </Card>
                            <br></br>
                            {this.state.checkAgree ?
                                <Button style={{ width: "470px" }} color="info" onClick={this.goToOnlineSurvey.bind(this)}>เข้าทำแบบสอบถาม</Button>
                                :
                                <Button style={{ width: "470px" }} color="info" onClick={this.goToOnlineSurvey.bind(this)} disabled>เข้าทำแบบสอบถาม</Button>}

                        </div>
                    )

                } else {
                    return (
                        <div>
                            ยังไม่ถึงกำหนดการ
                    </div>
                    )
                }
            } else {
                if (this.state.survey.shareTo === "close" || this.state.survey.shareTo === "open") {
                    //สมมติว่า log-in ไว้อยู่ก่อนแล้ว
                    return (
                        <div>
                            <Card style={{
                                height: "230px",
                                width: "470px"
                            }}>
                                <h4 style={{ textAlign: "center" }}>ข้อตกลงที่ควรทราบก่อนการทำแบบสอบถาม</h4>
                                <ul>
                                    {this.state.survey.shareTo === "close" ?
                                        <li>แบบสอบถามนี้เป็นแบบสอบถามประเภทปิด ผู้ที่ไม่ใช่สมาชิกไม่สามารถเข้าทำได้</li> :
                                        <li>แบบสอบถามนี้เป็นแบบสอบถามประเภทเปิด ผู้ที่ไม่ใช่สมาชิกไม่สามารถเข้าทำได้</li>}
                                    {this.state.survey.wantName ?
                                        <li>แบบสอบถามนี้ต้องการทราบชื่อผู้ทำแบบสอบถาม</li> :
                                        <li>แบบสอบถามนี้ไม่ต้องการทราบชื่อผู้ทำแบบสอบถาม</li>}
                                    <li>แบบสอบถามนี้สามารถเลือกปกปิดหรือไม่ปกปิดคำตอบของผู้ทำแบบสอบถามได้หลังจากตอบแบบสอบถามครบทุกข้อ</li>
                                    <br></br>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" onChange={this.onChangeAgree.bind(this)} />{''}
                                            รับทราบและยินยอมในข้อตกลง
                                        </Label>
                                        {console.log(this.state.checkAgree)}
                                    </FormGroup>
                                </ul>
                            </Card>
                            <br></br>
                            {this.state.checkAgree ?
                                <Button style={{ width: "470px" }} color="info" onClick={this.goToOnlineSurvey.bind(this)}>เข้าทำแบบสอบถาม</Button>
                                :
                                <Button style={{ width: "470px" }} color="info" onClick={this.goToOnlineSurvey.bind(this)} disabled>เข้าทำแบบสอบถาม</Button>}

                        </div>
                    )
                } else if (this.state.survey.shareTo === "public") {
                    if (this.state.survey.wantName) {
                        return (
                            <div>
                                <Card style={{
                                    height: "300px",
                                    width: "470px"
                                }}>
                                    <h4 style={{ textAlign: "center" }}>ข้อตกลงที่ควรทราบก่อนการทำแบบสอบถาม</h4>
                                    <ul>
                                        <li>แบบสอบถามนี้เป็นแบบสอบถามประเภทสาธารณะสามารถเข้าทำได้ทุกคนแม้ไม่ใช่สมาชิก</li>
                                        <li>แบบสอบถามนี้ต้องการทราบชื่อผู้ทำก่อนเข้าทำแบบสอบถาม</li>
                                        <li>แบบสอบถามนี้ไม่สามารถปกปิดคำตอบของผู้ทำแบบสอบถามได้</li>
                                        <br></br>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" onChange={this.onChangeAgree.bind(this)} />{''}
                                                รับทราบและยินยอมในข้อตกลง
                                </Label>
                                            {console.log(this.state.checkAgree)}
                                        </FormGroup>
                                        <br></br>
                                        <FormGroup>
                                            <Label>กรุณากรอกชื่อที่ใช้แทนตัวคุณ</Label>
                                            <Input required style={{ width: "350px" }} type="text" value={this.state.name} placeholder="ชื่อที่ใช้แทนตัวคุณ" onChange={this.onChangeName.bind(this)} />
                                            {console.log(this.state.name)}
                                        </FormGroup>
                                    </ul>
                                </Card>
                                <br></br>
                                {this.state.checkAgree ?
                                    <Button style={{ width: "470px" }} color="info" onClick={this.goToOnlineSurveyPublic.bind(this)}>เข้าทำแบบสอบถาม</Button>
                                    :
                                    <Button style={{ width: "470px" }} color="info" onClick={this.goToOnlineSurveyPublic.bind(this)} disabled>เข้าทำแบบสอบถาม</Button>}

                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <Card style={{
                                    height: "200px",
                                    width: "470px"
                                }}>
                                    <h4 style={{ textAlign: "center" }}>ข้อตกลงที่ควรทราบก่อนการทำแบบสอบถาม</h4>
                                    <ul>
                                        <li>แบบสอบถามนี้เป็นแบบสอบถามประเภทสาธารณะสามารถเข้าทำได้ทุกคนแม้ไม่ใช่สมาชิก</li>
                                        <li>แบบสอบถามนี้ไม่ต้องการทราบชื่อผู้ทำก่อนเข้าทำแบบสอบถาม</li>
                                        <li>แบบสอบถามนี้ไม่สามารถปกปิดคำตอบของผู้ทำแบบสอบถามได้</li>
                                        <br></br>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" onChange={this.onChangeAgree.bind(this)} />{''}
                                                รับทราบและยินยอมในข้อตกลง
                                </Label>
                                            {console.log(this.state.checkAgree)}
                                        </FormGroup>
                                    </ul>
                                </Card>
                                <br></br>
                                <Button style={{ width: "470px" }} color="info" onClick={this.goToOnlineSurveyPublic.bind(this)}>เข้าทำแบบสอบถาม</Button>
                            </div>
                        )
                    }
                }
            }

        }

    }
    goToOnlineSurveyPublic() {
        if (this.state.survey.wantName) {
            if (this.state.name !== "" && this.state.checkAgree) {
                window.location = `/online-survey/${this.props.match.params.surveyId}/name=${this.state.name}`;
            }

        } else {
            if (this.state.checkAgree) {
                window.location = `/online-survey/${this.props.match.params.surveyId}/name=`;
            }
        }
    }
    goToOnlineSurvey() {
        if (this.state.checkAgree) {
            window.location = `/online-survey/${this.props.match.params.surveyId}`;
        }
    }

    render() {
        return (
            <div className="sec">
                {this.state.checkGroup ? this.checkGroup() : this.showAgreement()}
                {console.log(this.state.checkGroup)}
            </div>
        )
    }
}
export default connect()(CheckBeforeDo);
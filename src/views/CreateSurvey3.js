import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'
import { connect } from 'react-redux';

class CreateSurvey3 extends Component {
    constructor(props) {
        super(props);

        //this.onChangeFrq1 = this.onChangeFrq1.bind(this);
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
        this.onSubmit = this.onSubmit.bind(this);
        this.sendData = this.sendData.bind(this);

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 543;


        this.state = {
            frequency: {
                amount: 0,
                unitsOfTime: ""
            },
            dateToDo: [],
            setFreq: false,
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

    componentDidMount() {
        if (this.props.test.comeFrom === "4-3") {
            this.setState({
                schedule: true,
                startDate: this.props.test.openAndCloseTimes.start.day,
                startMonth: this.props.test.openAndCloseTimes.start.month,
                startYear: this.props.test.openAndCloseTimes.start.year,
                endDate: this.props.test.openAndCloseTimes.end.day,
                endMonth: this.props.test.openAndCloseTimes.end.month,
                endYear: this.props.test.openAndCloseTimes.end.year,
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
        }

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
    backToStep2() {
        this.props.dispatch({
            type: 'BACKTOSTEP2'
        });
    }
    onSubmit(e) {
        e.preventDefault();

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
        /*const openAndCloseTimes = {
            start,
            end
        }*/
        /*const data = {
            frequency: this.state.frequency,
            doOnce: this.state.doOnce,
            openAndCloseTimes: openAndCloseTimes
        }

        this.props.dispatch({
            type: 'ADD_STEP3',
            data
        });
        console.log(data);*/

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

            const data = {
                frequency: this.state.frequency,
                doOnce: this.state.doOnce,
                openAndCloseTimes: openAndCloseTimes
            }

            this.props.dispatch({
                type: 'ADD_STEP3',
                data
            });
            console.log(data);
        }



        /*const data = {
            frequency: this.state.frequency,
            doOnce: this.state.doOnce,
            openAndCloseTimes: openAndCloseTimes
        }

        this.props.dispatch({
            type: 'ADD_STEP3',
            data
        });
        console.log(data);*/
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

        const data = {
            frequency: this.state.frequency,
            doOnce: this.state.doOnce,
            openAndCloseTimes: openAndCloseTimes,
            dateToDo: this.state.dateToDo
        }

        this.props.dispatch({
            type: 'ADD_STEP3',
            data
        });
        console.log(data);
    }
    saveDraft() {
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

        const data = {
            frequency: this.state.frequency,
            doOnce: this.state.doOnce,
            openAndCloseTimes: openAndCloseTimes,
            dateToDo: this.state.dateToDo,
            status: "draft"
        }

        this.props.dispatch({
            type: 'ADD_DRAFT_STEP3',
            data
        });
        console.log(data);
    }

    render() {
        return (
            <div className="sec">
                <Form>
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
                            {this.props.test.haveGroup === true ?
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
                            <Col sm={5}><Input type="text" placeholder="จำนวนครั้งต่อหน่วยเวลา" value={this.state.frequency.amount !== 0 ?this.state.frequency.amount:""} onChange={this.onChangeAmount} /></Col>
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
                    <br></br>
                    <Button color="secondary" onClick={this.backToStep2.bind(this)}>ย้อนกลับ</Button>&nbsp;
                    <Button color="primary" onClick={this.saveDraft.bind(this)}>บันทึกแบบร่าง</Button>&nbsp;
                    <Button color="info" onClick={this.onSubmit}>ต่อไป</Button>
                </Form>
                {console.log(this.props.test)}
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
export default connect(mapStateToProps)(CreateSurvey3);

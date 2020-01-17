import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'
import { connect } from 'react-redux';

class CreateSurvey3 extends Component {
    constructor(props) {
        super(props);

        this.onChangeFrq1 = this.onChangeFrq1.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeUnitTime = this.onChangeUnitTime.bind(this);
        this.onChangeDoOnce = this.onChangeDoOnce.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeStartMonth = this.onChangeStartMonth.bind(this);
        this.onChangeStartYear = this.onChangeStartYear.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeEndMonth = this.onChangeEndMonth.bind(this);
        this.onChangeEndYear = this.onChangeEndYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            frequency: {
                amount: 0,
                unitsOfTime: ""
            },
            doOnce: false,
            startDate: 0,
            startMonth: 0,
            startYear: 0,
            endDate: 0,
            endMonth: 0,
            endYear: 0
        };
    }

    onChangeFrq1(e) {
        this.setState({
            frequency: {
                amount: 1,
                unitsOfTime: "day"
            }
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
    onChangeDoOnce() {
        this.setState({
            doOnce: !this.state.doOnce
        })
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
    onSubmit(e) {
        e.preventDefault();

        const start = {
            day: this.state.startDate,
            month: this.state.startMonth,
            year: this.state.startYear
        }
        const end = {
            day: this.state.endDate,
            month: this.state.endMonth,
            year: this.state.endYear
        }
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

    render() {
        return (
            <div className="sec">
                <Form onSubmit={this.onSubmit}>
                    <div><p>ความถี่ในการทำแบบสอบถาม</p></div>
                    <FormGroup row>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" onChange={this.onChangeFrq1} />{''}
                                    1 ครั้ง
                        </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" />{''}
                                    มากกว่า 1 ครั้ง
                        </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col><Label>ทำแบบสอบถามทุกๆ</Label></Col>
                        <Col sm={5}><Input type="text" placeholder="จำนวนครั้งต่อหน่วยเวลา" onChange={this.onChangeAmount} /></Col>
                        <Col sm={3}>
                            <Input type="select" onChange={this.onChangeUnitTime}>
                                <option >หน่วยเวลา?</option>
                                <option value="day">วัน</option>
                                <option value="week">สัปดาห์</option>
                                <option value="month">เดือน</option>
                                <option value="year">ปี</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeDoOnce} />{''}
                            จำกัดให้สามารถทำแบบสอบถามได้แค่ 1 ครั้ง
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{''}
                            กำหนดระยะเวลาเปิดปิดอัตโนมัติ
                        </Label>
                    </FormGroup>
                    <FormGroup row>
                        <Col><Label for="descript">เริ่มต้น:</Label></Col>
                        <Col sm={3}>
                            <Input type="text" placeholder="วันที่" onChange={this.onChangeStartDate} />
                        </Col>
                        <Col sm={3}>
                            <Input type="select" onChange={this.onChangeStartMonth}>
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
                            <Input type="text" placeholder="พ.ศ." onChange={this.onChangeStartYear} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col><Label for="descript">สิ้นสุด:</Label></Col>
                        <Col sm={3}>
                            <Input type="text" placeholder="วันที่" onChange={this.onChangeEndDate} />
                        </Col>
                        <Col sm={3}>
                            <Input type="select" onChange={this.onChangeEndMonth}>
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
                            <Input type="text" placeholder="พ.ศ." onChange={this.onChangeEndYear} />
                        </Col>
                    </FormGroup>
                    <Button color="primary">เสร็จสิ้น</Button>

                    <Button color="info"><a href="/create-project/project-management">เผยแพร่</a></Button>
                </Form>
                {console.log(this.props.test)}
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

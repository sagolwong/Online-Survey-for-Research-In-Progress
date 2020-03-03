import React, { Component } from 'react'
import { FormGroup, Label, Input, Button } from 'reactstrap'
import SurveyCreator from "../components/SurveyCreator";
import { connect } from 'react-redux';

class CreateSurvey2 extends Component {
    constructor(props) {
        super(props);

        this.onChangeBuiltInWidgetGender = this.onChangeBuiltInWidgetGender.bind(this);
        this.onChangeBuiltInWidgetAges = this.onChangeBuiltInWidgetAges.bind(this);
        this.onChangeBuiltInWidgetStatus = this.onChangeBuiltInWidgetStatus.bind(this);
        this.onChangeBuiltInWidgetEducation = this.onChangeBuiltInWidgetEducation.bind(this);
        this.onChangeBuiltInWidgetJob = this.onChangeBuiltInWidgetJob.bind(this);
        this.onChangeBuiltInWidgetIncome = this.onChangeBuiltInWidgetIncome.bind(this);


        this.state = {
            builtInWidgetGender: false,
            builtInWidgetAges: false,
            builtInWidgetStatus: false,
            builtInWidgetEducation: false,
            builtInWidgetJob: false,
            builtInWidgetIncome: false,
        };
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

    render() {
        return (
            <div className="editor">
                <h4>Built-In</h4>
                <p>โปรดเลือกคำถามเกี่ยวกับข้อมูลส่วนตัวจากที่นี่</p>
                <FormGroup check>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetGender} />{''}
                            คำถามเรื่องเพศ
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetAges} />{''}
                            คำถามเรื่องอายุ
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetStatus} />{''}
                            คำถามเรื่องสถานภาพ
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetEducation} />{''}
                            คำถามเรื่องระดับการศึกษา
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetJob} />{''}
                            คำถามเรื่องอาชีพ
                        </Label>
                    </div>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetIncome} />{''}
                            คำถามเรื่องรายได้เฉลี่ยต่อเดือน
                        </Label>
                    </div>
                </FormGroup>
                <br></br>
                <SurveyCreator builtIns={this.state} />
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
export default connect(mapStateToProps)(CreateSurvey2);

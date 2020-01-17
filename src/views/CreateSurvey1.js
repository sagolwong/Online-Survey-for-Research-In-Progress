import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { connect } from 'react-redux';

class CreateSurvey1 extends Component {
    constructor(props) {
        super(props);

        this.onChangeSurveyName = this.onChangeSurveyName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeShareTo = this.onChangeShareTo.bind(this);
        this.onChangeWantName = this.onChangeWantName.bind(this);
        this.onChangeHaveTwoGroup = this.onChangeHaveTwoGroup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            surveyName: "",
            description: "",
            shareTo: "",
            wantName: false,
            haveTwoGroup: false,
        };
    }
    onChangeSurveyName(e) {
        this.setState({
            surveyName: e.target.value
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
    onChangeHaveTwoGroup(e) {
        this.setState({
            haveTwoGroup: !this.state.haveTwoGroup
        })
    }

    onSubmit(e) {
        e.preventDefault();
       
        const data = {
            surveyName: this.state.surveyName,
            description: this.state.description,
            shareTo: this.state.shareTo,
            wantName: this.state.wantName,
            haveTwoGroup: this.state.haveTwoGroup
        }
        //console.log(data);
        this.props.dispatch({
            type: 'ADD_STEP1',
            data
        });
        //window.location = '/create-project/project-management/create-survey2';
    }

    render() {
        return (
            <div className="sec">
                <div><h2>สร้างแบบสอบถามใหม่</h2></div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label>ชื่อแบบสอบถาม</Label>
                        <Input required type="text" placeholder="ชื่อโปรเจค" onChange={this.onChangeSurveyName} />
                    </FormGroup>
                    <FormGroup>
                        <Label>คำอธิบาย</Label>
                        <Input  type="textarea" placeholder="คำอธิบาย" onChange={this.onChangeDescription} />
                    </FormGroup>
                    <FormGroup>
                        <Label>ผู้มีสิทธิทำแบบสอบถาม</Label>
                        <Input type="select" onChange={this.onChangeShareTo}>
                            <option >ต้องการแสดงผลแบบใด?</option>
                            <option value="close">กลุ่มปิด</option>
                            <option value="open">กลุ่มเปิด</option>
                            <option value="public">กลุ่มสาธารณะ</option>
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeWantName} />{''}
                            ต้องการทราบชื่อผู้ทำแบบสอบถาม
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeHaveTwoGroup} />{''}
                            มีกลุ่มทดลองและกลุ่มควบคุม
                        </Label>
                    </FormGroup>
                    <Button color="info">ต่อไป</Button>
                </Form>
                {console.log(this.props.test)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        test: state
    }
}
export default connect(mapStateToProps)(CreateSurvey1);
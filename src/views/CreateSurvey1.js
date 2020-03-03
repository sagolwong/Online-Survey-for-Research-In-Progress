import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Card } from 'reactstrap'
import axios from 'axios';
import { connect } from 'react-redux';

class CreateSurvey1 extends Component {
    constructor(props) {
        super(props);

        this.onChangeSurveyName = this.onChangeSurveyName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeShareTo = this.onChangeShareTo.bind(this);
        this.onChangeWantName = this.onChangeWantName.bind(this);
        this.onChangeHaveGroup = this.onChangeHaveGroup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            surveyName: "",
            description: "",
            shareTo: "",
            wantName: false,
            haveGroup: false,
        };
    }
    componentDidMount() {
        if (this.props.test.nameSurvey !== "") {
            this.setState({
                surveyName: this.props.test.nameSurvey
            })
        }
        if (this.props.test.description !== "") {
            this.setState({
                description: this.props.test.description
            })
        }
        if (this.props.test.shareTo !== "") {
            this.setState({
                shareTo: this.props.test.shareTo
            })
        }

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
    onChangeHaveGroup(e) {
        this.setState({
            haveGroup: !this.state.haveGroup
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            surveyName: this.state.surveyName,
            description: this.state.description,
            shareTo: this.state.shareTo,
            wantName: this.state.wantName,
            haveGroup: this.state.haveGroup,
        }
        //console.log(data);
        this.props.dispatch({
            type: 'ADD_STEP1',
            data
        });
        //window.location = '/create-project/project-management/create-survey2';
    }

    render() {
        /*let filterUser = this.state.listUser.filter(user => {
            return user.firstname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })*/
        return (
            <div className="sec">
                <div><h2>สร้างแบบสอบถามใหม่</h2></div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label>ชื่อแบบสอบถาม</Label>
                        <Input required type="text" value={this.state.surveyName} placeholder="ชื่อโปรเจค" onChange={this.onChangeSurveyName} />
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
                            <Input type="checkbox" onChange={this.onChangeWantName} />{''}
                            ต้องการทราบชื่อผู้ทำแบบสอบถาม
                        </Label>
                    </FormGroup>
                    {this.state.shareTo !== "public" && this.state.shareTo !== "" ?
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={this.onChangeHaveGroup} />{''}
                                ต้องการให้มีสมาชิกสำหรับทำแบบสอบถาม
                        </Label>
                        </FormGroup> : ""}
                        <br></br>
                    <Button color="info">ต่อไป</Button>
                    <Button color="warning">บันทึกแบบร่าง</Button>
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
export default connect(mapStateToProps)(CreateSurvey1);
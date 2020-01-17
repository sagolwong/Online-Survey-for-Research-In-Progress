import React, { Component } from 'react'
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Row, Col, Button, NavLink, Breadcrumb, BreadcrumbItem, Input } from 'reactstrap'
import ListSurvey from '../components/ListSurvey';

export default class SampleGroupManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            nameSampleGroup: "",
            project: {},
            surveys: [],
            sampleGroup: {}
        }
        this.toggle = this.toggle.bind(this);
        this.comeback = this.comeback.bind(this);
        this.goToCreateSurvey = this.goToCreateSurvey.bind(this);
    }

    componentDidMount() {
        const projectId = this.props.match.params.projectId;
        const sampleGroupId = this.props.match.params.sampleGroupId;
        console.log(projectId);
        console.log(sampleGroupId);
        axios.get(`http://localhost:5000/projects/` + projectId)
            .then(response => {
                this.setState({
                    project: response.data
                })

                console.log(this.state.project);
            })
            .catch((error) => {
                console.log(error);
            })

        //const id = "5dc9a51b824eb44fe43c8f95"
        axios.get(`http://localhost:5000/surveys/group/` + sampleGroupId)
            .then(response => {
                this.setState({
                    surveys: response.data
                })

                console.log(this.state.surveys);
            })
            .catch((error) => {
                console.log(error);
            })

        //const id2 = "5e046a7de9573708fc7d4958"
        axios.get(`http://localhost:5000/sampleGroups/find/` + sampleGroupId)
            .then(response => {
                this.setState({
                    sampleGroup: response.data
                })

                console.log(this.state.sampleGroups);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    showGroupSurvey() {
        return (
            this.state.surveys.map(res => {
                return <ListSurvey survey={res} />
            })
        )
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    comeback() {
        window.location = '/project-management/' + this.props.match.params.projectId;
    }

    goToCreateSurvey(){
        window.location = `/create-survey/${this.props.match.params.projectId}/${this.props.match.params.sampleGroupId}`;
    }

    render() {
        return (
            <div className="sec">
                <div><h2>{this.state.project.nameProject}</h2></div>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <BreadcrumbItem><a href="/">sagolwong</a></BreadcrumbItem>
                            <BreadcrumbItem onClick={this.comeback}>{this.state.project.nameProject}</BreadcrumbItem>
                            <BreadcrumbItem active>{this.state.sampleGroup.nameSampleGroup}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                    <Col>
                        <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                            <DropdownToggle caret size="lg" color="info">
                                สร้าง+
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.goToCreateSurvey}>สร้างแบบสอบถาม</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Col>
                </Row>
                <div>
                    <Card>
                        <p align="center">---------------------- กลุ่มแบบสอบถาม ----------------------</p>
                        {this.showGroupSurvey()}
                    </Card>
                </div>
            </div>
        )
    }
}

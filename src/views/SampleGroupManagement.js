import React, { Component } from 'react'
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Row, Col, Button, Breadcrumb, BreadcrumbItem, Label } from 'reactstrap'
import ListSurvey from '../components/ListSurvey';
import ListPrototype from '../components/ListPrototype';

export default class SampleGroupManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            checkShowPrototype: false,
            nameSampleGroup: "",
            project: {},
            surveys: [],
            sampleGroup: {},
            listPrototype: []
        }
        this.toggle = this.toggle.bind(this);
        this.comeback = this.comeback.bind(this);
        this.showPrototypes = this.showPrototypes.bind(this);
        this.showMorePrototype = this.showMorePrototype.bind(this);
        this.goToCreateSurvey = this.goToCreateSurvey.bind(this);
    }

    componentDidMount() {
        const projectId = this.props.match.params.projectId;
        const sampleGroupId = this.props.match.params.sampleGroupId;
        const userId = "5dc9a42c824eb44fe43c8f94";
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

        axios.get('http://localhost:5000/prototypes/' + userId)
            .then(response => {
                this.setState({
                    listPrototype: response.data
                })
                console.log(this.state.listPrototype)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    showGroupSurvey() {
        return (
            this.state.surveys.map(res => {
                if (res.status === "publish") return <ul><ListSurvey survey={res} /></ul>
            })
        )
    }

    showGroupDraft() {
        return (
            this.state.surveys.map(res => {
                if (res.status === "draft") return <ul><ListSurvey survey={res} /></ul>
            })
        )
    }
    showPrototypes() {
        return (
            this.state.listPrototype.map((res, index) => {
                if (index < 3) {
                    return <Col sm={4}><ListPrototype prototype={res} projectId={this.props.match.params.projectId} sampleGroupId={this.props.match.params.sampleGroupId} /></Col>
                }
            })
        )
    }
    showMorePrototype(indexC) {
        return (
            this.state.listPrototype.map((res, index) => {
                if (((index + 1) / 3) < indexC && ((index + 1) / 3) > (indexC - 1)) {
                    return <Col sm={4}><ListPrototype prototype={res} projectId={this.props.match.params.projectId} sampleGroupId={this.props.match.params.sampleGroupId} /></Col>
                }
            })
        )
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    comeback() {
        window.location = '/project-management/' + this.props.match.params.projectId;
    }

    goToCreateSurvey() {
        window.location = `/create-survey/${this.props.match.params.projectId}/${this.props.match.params.sampleGroupId}`;
    }

    render() {
        var indexC = 2;
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
                    <Row>
                        <Col><Label>แม่แบบแบบสอบถาม</Label></Col>
                        {this.state.checkShowPrototype ?
                            <Col><Label><Button color="link" onClick={() => this.setState({ checkShowPrototype: false })}>แสดงแม่แบบน้อยลง ^</Button></Label></Col>
                            : <Col><Label><Button color="link" onClick={() => this.setState({ checkShowPrototype: true })}>แสดงแม่แบบเพิ่มเติม v</Button></Label></Col>}

                    </Row>
                    <Row>
                        {this.showPrototypes()}
                    </Row>
                </div>
                <br></br>
                {this.state.checkShowPrototype ?
                    <div>{
                        this.state.listPrototype.map((res, index) => {
                            if (((index + 1) / 3) < indexC && ((index + 1) / 3) > (indexC - 1)) {
                                indexC = indexC + 1;
                                return (
                                    <Row>
                                        {this.showMorePrototype(indexC - 1)}
                                    </Row>
                                )
                            }
                        })}</div>
                    : <div>
                        <Card>
                            <p align="center">---------------------- แบบร่าง ----------------------</p>
                            {this.showGroupDraft()}
                            <p align="center">---------------------- แบบสอบถาม ----------------------</p>
                            {this.showGroupSurvey()}
                        </Card>
                    </div>}

            </div>
        )
    }
}

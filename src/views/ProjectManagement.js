import React, { Component } from 'react'
import axios from 'axios';
import { ButtonDropdown, Modal, ModalFooter, ModalHeader, ModalBody, DropdownToggle, DropdownMenu, DropdownItem, Card, Row, Col, Button, NavLink, Breadcrumb, BreadcrumbItem, Input, Label } from 'reactstrap'
import ListSurvey from '../components/ListSurvey';
import ListSampleGroup from '../components/ListSampleGroup';
import ListPrototype from '../components/ListPrototype';

export default class ProjectManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modal: false,
            success: false,
            checkShowPrototype: false,
            nameSampleGroup: "",
            project: {},
            surveys: [],
            sampleGroups: [],
            listPrototype: []
        }
        this.toggle = this.toggle.bind(this);
        this.toggleModalCreate = this.toggleModalCreate.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.showPrototypes = this.showPrototypes.bind(this);
        this.showMorePrototype = this.showMorePrototype.bind(this);
        this.onChangeNameSampleGroup = this.onChangeNameSampleGroup.bind(this);
        this.goToCreateSurvey = this.goToCreateSurvey.bind(this);
    }

    componentDidMount() {
        const projectId = this.props.match.params.projectId;
        const userId = "5dc9a42c824eb44fe43c8f94";
        console.log(projectId);
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
        axios.get(`http://localhost:5000/surveys/` + projectId)
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
        axios.get(`http://localhost:5000/sampleGroups/` + projectId)
            .then(response => {
                this.setState({
                    sampleGroups: response.data
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

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.success !== this.state.success) {
            await axios.get(`http://localhost:5000/sampleGroups/` + this.props.match.params.projectId)
                .then(response => {
                    this.setState({
                        sampleGroups: response.data
                    })
                    console.log(this.state.sampleGroups);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    async toggleModalCreate() {
        const data = {
            nameSampleGroup: this.state.nameSampleGroup
        }
        console.log(data);
        const projectId = this.props.match.params.projectId;
        await axios.post(`http://localhost:5000/sampleGroups/createSampleGroup/${projectId}`, data)
            .then(res => console.log(res.data));

        await this.setState({
            modal: !this.state.modal,
            success: !this.state.success
        });
    }


    showGroupSurvey() {
        return (
            this.state.surveys.map(res => {
                if (res.sampleGroupId === "") {
                    if (res.status === "publish") {
                        return <ul><ListSurvey survey={res} /></ul>
                    }
                }
            })
        )
    }

    showGroupDraft() {
        return (
            this.state.surveys.map(res => {
                if (res.sampleGroupId === "") {
                    if (res.status === "draft") {
                        return <ul><ListSurvey survey={res} /></ul>
                    }
                }
            })
        )
    }

    showGroupSampleGroup() {
        return (
            this.state.sampleGroups.map(res => {
                return <ul><ListSampleGroup sampleGroup={res} projectId={this.props.match.params.projectId} /></ul>
            })
        )
    }

    showPrototypes() {
        return (
            this.state.listPrototype.map((res, index) => {
                if (index < 3) {
                    return <Col sm={4}><ListPrototype prototype={res} projectId={this.props.match.params.projectId} /></Col>
                }
            })
        )
    }
    showMorePrototype(indexC) {
        return (
            this.state.listPrototype.map((res, index) => {
                if (((index+1) / 3) < indexC && ((index+1) / 3) > (indexC - 1)) {
                    return <Col sm={4}><ListPrototype prototype={res} projectId={this.props.match.params.projectId} /></Col>
                }
            })
        )
    }

    onChangeNameSampleGroup(e) {
        this.setState({
            nameSampleGroup: e.target.value
        })
    }

    goToCreateSurvey() {
        window.location = '/create-survey/' + this.props.match.params.projectId;
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
                            <BreadcrumbItem active>{this.state.project.nameProject}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                    <Col>
                        <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                            <DropdownToggle caret size="lg" color="info">
                                สร้าง+
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.goToCreateSurvey}>สร้างแบบสอบถาม</DropdownItem>
                                <DropdownItem onClick={this.toggleModal}>สร้างกลุ่มตัวอย่าง</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}
                    fade={true}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Create New SampleGroup</ModalHeader>
                    <ModalBody>
                        <Input type="text" placeholder="name samplegroup" rows={5} value={this.state.nameSampleGroup} onChange={this.onChangeNameSampleGroup} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModalCreate}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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
                            if (((index+1) / 3) < indexC && ((index+1) / 3) > (indexC - 1)) {
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
                            <p align="center">------------------------ กลุ่มตัวอย่าง ------------------------</p>
                            {this.showGroupSampleGroup()}
                        </Card>
                    </div>}

            </div>
        )
    }
}

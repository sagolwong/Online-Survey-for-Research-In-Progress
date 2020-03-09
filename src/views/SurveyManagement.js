import React, { Component } from 'react'
import axios from 'axios';
import ListAnswer from '../components/ListAnswer';
import SimpleCrypto from "simple-crypto-js";
import { Row, Col, Card, InputGroup, InputGroupText, InputGroupAddon, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody } from 'reactstrap'

export default class SurveyManagement extends Component {
    constructor(props) {
        super(props);

        this.showListUser = this.showListUser.bind(this);
        this.showListName = this.showListName.bind(this);
        this.showMemberGroup = this.showMemberGroup.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.sendRequestDecrypt = this.sendRequestDecrypt.bind(this);
        this.cancel = this.cancel.bind(this);


        this.state = {
            survey: {},
            users: [],
            names: [],
            amountMember: 0,
            amountAnswer: 0,
            amountUser: 0,
            members: [],
            listUser: [],
            listName: [],
            listNameExperiments: [],
            listNameControls: [],
            search: "",
            answer: [],
            listAnswer: [],
            update: false,
            isOpen: false,
            modal1: false,
            modal2: false,
            checkType: false,
            checkEncrypt: false
        };
    }

    async componentDidMount() {
        const surveyId = this.props.surveyId;
        await axios.get(`http://localhost:5000/users/`)
            .then(response => {
                this.setState({
                    users: response.data
                })

                console.log(this.state.listUser);
            })
            .catch((error) => {
                console.log(error);
            })

        await axios.get(`http://localhost:5000/surveys/find/` + surveyId)
            .then(response => {
                this.setState({
                    survey: response.data,
                    amountMember: response.data.names.length,
                    names: response.data.names
                })
                console.log(this.state.survey);
            })
            .catch((error) => {
                console.log(error);
            })

        if (await this.state.survey.names[0] !== undefined) {
            this.state.survey.names.map(userId => {
                axios.get(`http://localhost:5000/users/` + userId)
                    .then(response => {
                        this.setState({
                            members: this.state.members.concat(response.data)
                        })

                        console.log(this.state.members);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        }
        await axios.get(`http://localhost:5000/answers/find/` + surveyId)
            .then(response => {
                this.setState({
                    answer: response.data,
                    listAnswer: response.data[0].answerUsers,
                    amountAnswer: response.data[0].amountAnswer,
                    amountUser: response.data[0].amountUser
                })
                console.log(this.state.answer);
                console.log(this.state.answer[0].answerUsers);
                console.log(this.state.listAnswer);
            })
            .catch((error) => {
                console.log(error);
            })
        /*if (await this.state.survey.listNameExperiments[0] !== undefined) {
            this.state.survey.listNameExperiments.map(userId => {
                axios.get(`http://localhost:5000/users/` + userId)
                    .then(response => {
                        this.setState({
                            listNameExperiments: this.state.listNameExperiments.concat(response.data)
                        })

                        console.log(this.state.listNameExperiments);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        }
        if (await this.state.survey.listNameControls[0] !== undefined) {
            this.state.survey.listNameControls.map(userId => {
                axios.get(`http://localhost:5000/users/` + userId)
                    .then(response => {
                        this.setState({
                            listNameControls: this.state.listNameControls.concat(response.data)
                        })

                        console.log(this.state.listNameControls);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        }*/
        if (await this.state.survey.shareTo === "open" || this.state.survey.shareTo === "close") {
            this.state.listAnswer.map(answer => {
                if (answer.head !== "" && answer.decryptKey === "") {
                    this.setState({ checkEncrypt: true })
                }
            })
            this.setState({ checkType: true })
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevState.update !== this.state.update) {
            await axios.get(`http://localhost:5000/surveys/find/` + this.props.surveyId)
                .then(response => {
                    this.setState({
                        survey: response.data,
                        amountMember: response.data.names.length,
                        names: response.data.names
                    })
                    console.log(this.state.survey);
                })
                .catch((error) => {
                    console.log(error);
                })

            if (await this.state.survey.listNameExperiments[0] !== undefined) {
                this.setState({
                    listNameExperiments: []
                })
                this.state.survey.listNameExperiments.map(userId => {
                    axios.get(`http://localhost:5000/users/` + userId)
                        .then(response => {
                            this.setState({
                                listNameExperiments: this.state.listNameExperiments.concat(response.data)
                            })

                            console.log(this.state.listNameExperiments);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
            }
            if (await this.state.survey.listNameControls[0] !== undefined) {
                this.setState({
                    listNameControls: []
                })
                this.state.survey.listNameControls.map(userId => {
                    axios.get(`http://localhost:5000/users/` + userId)
                        .then(response => {
                            this.setState({
                                listNameControls: this.state.listNameControls.concat(response.data)
                            })

                            console.log(this.state.listNameControls);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
            }
        }
    }

    updateSearch(e) {
        this.setState({
            search: e.target.value.substr(0, 20)
        })
    }

    showListUser() {
        let filterUser = this.state.users.filter(user => {
            return user.firstname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })
        if (this.state.search !== "") {
            return (
                <Card style={{
                    height: "100%",
                    width: "100%"
                }}>
                    < ul >
                        {filterUser.map(user => {
                            return <p onClick={() => {
                                this.setState(({ listName, listUser, search }) => {
                                    const mlistName = [...listName]
                                    const mlistUser = [...listUser]
                                    mlistName.splice(0, 0, user.firstname + "  " + user.lastname)
                                    mlistUser.splice(0, 0, user._id)
                                    return { listName: mlistName, listUser: mlistUser, search: "" }
                                })
                            }}>{user.firstname} {user.lastname}</p>
                        })}
                    </ul >
                </Card>
            )
        }
    }
    /*{
                                    listUser: this.state.listUser.concat(user._id),
                                    listName: this.state.listName.concat(user.firstname + "  " + user.lastname),
                                    search: ""
                                }*/

    showListName() {
        return (
            this.state.listName.map((name, index) => {
                return (
                    <ul>
                        {name}
                        <Button color="danger" onClick={() => {
                            this.setState(({ listName, listUser }) => {
                                const mlistName = [...listName]
                                const mlistUser = [...listUser]
                                mlistName.splice(index, 1)
                                mlistUser.splice(index, 1)
                                return { listName: mlistName, listUser: mlistUser }
                            })
                        }}>ลบ</Button>
                        {console.log(this.state.listUser)}
                        {console.log(this.state.listName)}
                    </ul>
                )
            })
        )
    }

    showMemberGroup() {
        return (
            this.state.members.map((member, index) => {
                return (
                    <ul>
                        <Row>
                            <Col>
                                {member.firstname}  {member.lastname}
                            </Col>
                            <Col>
                                <Button color="danger" onClick={() => {
                                    this.setState(({ members }) => {
                                        const mlistMember = [...members]
                                        mlistMember.splice(index, 1)
                                        return { members: mlistMember }
                                    })
                                    this.deleteMember(index)
                                }}>ลบรายชื่อ</Button>
                            </Col>
                        </Row>
                    </ul>
                )
            })
        )
    }
    /*{this.checkExperimentsGroup(index) !== undefined ? "" : <Button color="info" onClick={() => {
        this.addToExperimentsGroup(index)
    }}>เพิ่มเข้ากลุ่มทดลอง</Button>}
    {this.checkControlsGroup(index) !== undefined ? "" : <Button color="info" onClick={() => {
        this.addToControlsGroup(index)
    }}>เพิ่มเข้ากลุ่มควบคุม</Button>}*/

    checkExperimentsGroup(index) {
        if (this.state.survey.listNameExperiments[0] !== undefined) {
            return (
                this.state.survey.listNameExperiments.map(userId => {
                    if (userId === this.state.members[index]._id) return true;
                })
            )
        }

    }

    checkControlsGroup(index) {
        if (this.state.survey.listNameControls[0] !== undefined) {
            return (
                this.state.survey.listNameControls.map(userId => {
                    if (userId === this.state.members[index]._id) return true;
                })
            )
        }

    }

    async addToExperimentsGroup(index) {
        var ExperimentsGroup = {
            listNameExperiments: this.state.survey.listNameExperiments.concat(this.state.members[index]._id)
        }
        console.log(ExperimentsGroup);
        await axios.post(`http://localhost:5000/surveys/experiments/${this.props.surveyId}`, ExperimentsGroup)
            .then(res => console.log(res.data));

        await this.setState({
            update: !this.state.update
        })
    }

    async addToControlsGroup(index) {
        var ControlsGroup = {
            listNameControls: this.state.survey.listNameControls.concat(this.state.members[index]._id)
        }
        console.log(ControlsGroup);
        await axios.post(`http://localhost:5000/surveys/controls/${this.props.surveyId}`, ControlsGroup)
            .then(res => console.log(res.data));

        await this.setState({
            update: !this.state.update
        })
    }

    async deleteMember(index1) {
        await this.state.names.map((userId, index2) => {
            if (this.state.members[index1]._id === userId) {
                this.setState(({ names }) => {
                    const mlistNames = [...names]
                    mlistNames.splice(index2, 1)
                    return { names: mlistNames }
                })
            }
        })
        var member = {
            names: this.state.names
        }
        console.log(member);
        await axios.post(`http://localhost:5000/surveys/member/${this.props.surveyId}`, member)
            .then(res => console.log(res.data));

        this.setState({
            update: !this.state.update
        })


    }

    showListExperiments() {
        return (
            this.state.listNameExperiments.map((user, index) => {
                return (
                    <ul>
                        {user.firstname}  {user.lastname}
                        <Button color="danger">ลบรายชื่อ</Button>
                    </ul>
                )
            })
        )
    }

    showListControls() {
        return (
            this.state.listNameControls.map((user, index) => {
                return (
                    <ul>
                        {user.firstname}  {user.lastname}
                        <Button color="danger">ลบรายชื่อ</Button>
                    </ul>
                )
            })
        )
    }

    showAnswers() {
        console.log(this.state.listAnswer);
        return (
            this.state.listAnswer.map(res => {
                return <ListAnswer answer={res} surveyType={this.state.survey.shareTo} surveyWantName={this.state.survey.wantName}/>
            })
        )
    }

    sendRequest() {
        if (this.state.survey.haveGroup) {
            this.state.listUser.map(userId => {
                var request = {
                    userId: userId,
                    typeRequest: "member",
                    data: this.props.surveyId
                }
                console.log(request);
                axios.post('http://localhost:5000/requests/create', request)
                    .then(res => console.log(res.data));
            })
            this.setState({
                listUser: [],
                listName: []
            })
        } else if (!this.state.survey.haveGroup) {
            this.state.listUser.map(userId => {
                var request = {
                    userId: userId,
                    typeRequest: "doOnly",
                    data: this.props.surveyId
                }
                console.log(request);
                axios.post('http://localhost:5000/requests/create', request)
                    .then(res => console.log(res.data));
            })
            this.setState({
                listUser: [],
                listName: []
            })
        }

    }
    sendRequestDecrypt(){
        var userIds = [];
        var check = true;
        var secretKey = "SJyevrus"
        var simpleCryptoSystem = new SimpleCrypto(secretKey);

        this.state.listAnswer.map(answer => {
            var userId = simpleCryptoSystem.decrypt(answer.userId);
            userIds.map(sameUserId => {
                if(userId === sameUserId) check = false;
            })
            if(check){
                var request = {
                    userId: userId,
                    typeRequest: "decryption",
                    data: this.props.surveyId
                }
                console.log(request);
                axios.post('http://localhost:5000/requests/create', request)
                    .then(res => console.log(res.data));
                
                userIds = userIds.concat(userId);
                console.log(userIds);
            }
        })
    }

    cancel() {
        this.setState({
            listUser: [],
            listName: []
        })
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    toggleModal1() {
        this.setState({
            modal1: !this.state.modal1
        });
    }

    toggleModal2() {
        this.setState({
            modal2: !this.state.modal2
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col><p>มีจำนวนสมาชิก {this.state.amountMember} คน</p></Col>
                    <Col>
                        <form>
                            <InputGroup className="no-border">
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <i className="fas fa-search" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder={this.state.survey.haveGroup ? "เพิ่มรายชื่อผู้ที่ต้องให้เป็นสมาชิก" : "เพิ่มรายชื่อผู้ที่การให้ทำแบบสอบถาม"} />
                                {this.showListUser()}
                            </InputGroup>
                        </form>
                    </Col>
                    <Col>
                        <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle.bind(this)}>
                            <DropdownToggle caret size="lg" color="primary">
                                สร้างลิงค์
                        </DropdownToggle>
                            <DropdownMenu>
                                {this.state.survey.haveGroup ?
                                    <div>
                                        <DropdownItem onClick={this.toggleModal1.bind(this)}>สำหรับเชิญทำแบบสอบถาม</DropdownItem>
                                        <DropdownItem onClick={this.toggleModal2.bind(this)}>สำหรับเชิญเป็นสมาชิกทำแบบสอบถาม</DropdownItem>
                                    </div> :
                                    <div>
                                        <DropdownItem onClick={this.toggleModal1.bind(this)}>สำหรับเชิญทำแบบสอบถาม</DropdownItem>
                                    </div>}
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal1} toggle={this.toggleModal1.bind(this)}
                    fade={true} backdrop="static" className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal1.bind(this)}>ลิงค์สำหรับเชิญทำแบบสอบถาม</ModalHeader>
                    <ModalBody>
                        <Input type="text" rows={5} value={"http://localhost:3000/online-survey-check/" + this.props.surveyId} disabled />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modal2} toggle={this.toggleModal2.bind(this)}
                    fade={true} backdrop="static" className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal2.bind(this)}>ลิงค์สำหรับเชิญเป็นสมาชิกทำแบบสอบถาม</ModalHeader>
                    <ModalBody>
                        <Input type="text" rows={5} value={"http://localhost:3000/invite-to-group/" + this.props.surveyId} disabled />
                    </ModalBody>
                </Modal>
                <Row>
                    <Card>
                        {this.showListName()}
                    </Card>
                    <div>
                        {this.state.listName[0] !== undefined ? <div>
                            <Button color="info" onClick={this.sendRequest}>  ส่งคำขอ  </Button>
                            <Button color="danger" onClick={this.cancel} >  ยกเลิก  </Button>
                        </div> : ""}
                    </div>
                </Row>
                <br></br>
                <Col>
                    <div><p>รายชื่อสมาชิกทำแบบสอบถาม</p></div>
                    <Row>
                        <div>
                            <Card style={{
                                height: "110px",
                                width: "600px",
                                textAlign: "center"
                            }}>
                                {this.state.survey.haveGroup ? <div style={{ marginTop: "0.5rem" }}>{this.showMemberGroup()}</div> : <div style={{ marginTop: "2rem" }}>ไม่ได้ตั้งค่าให้ใช้งานส่วนนี้ได้</div>}
                            </Card>
                        </div>
                    </Row>
                </Col>
                <br></br>
                <br></br>
                <div>
                    <Row>
                        <Col>
                            <p>มีจำนวนคำตอบอยู่ {this.state.amountAnswer} คำตอบ</p>
                        </Col>
                        <Col>
                            <p>มีจำนวนผู้ตอบอยู่ {this.state.amountUser} คน</p>
                        </Col>
                        <Col>
                            {this.state.checkType ? this.state.checkEncrypt ?
                                <Button color="primary" onClick={this.sendRequestDecrypt}>ส่งคำขอดูคำตอบ</Button> :
                                <Button color="primary"  disabled>ส่งคำขอดูคำตอบ</Button>
                                : ""}
                        </Col>
                    </Row>
                    <br></br>
                    <Row style={{ marginLeft: "1rem" }}>
                        รายการคำตอบจากผู้เข้ามาทำแบบสอบถาม
                    </Row>
                    <br></br>
                    <Row style={{ marginLeft: "1rem" }}>
                        {this.showAnswers()}
                    </Row>
                </div>


            </div>
        )
    }
}
/*<Row>
                    <Col>กลุ่มทดลอง</Col>
                    <Col>กลุ่มควบคุม</Col>
                </Row>
                <Row>
                        <Col><Card>{this.showListExperiments()}</Card></Col>
                    <Col><Card>{this.showListControls()}</Card></Col>
                </Row>*/
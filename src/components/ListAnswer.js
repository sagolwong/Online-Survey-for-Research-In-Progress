import React, { Component } from 'react'
import axios from 'axios';
import SimpleCrypto from "simple-crypto-js";
import { Button, Card, Row, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class ListAnswer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkDecrypt: false,
            checkName: false,
            keys: [],
            values: [],
            user: {},
            modal1: false,
            modal2: false

        }
        this.showAnswer = this.showAnswer.bind(this);
        this.showName = this.showName.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.toggleModal2 = this.toggleModal2.bind(this);

    }
    componentDidMount() {
        const surveyType = this.props.surveyType;
        const surveyWantName = this.props.surveyWantName;
        var secretKey = "SJyevrus";
        var simpleCryptoSystem = new SimpleCrypto(secretKey);
        console.log(surveyType)

        if (surveyType === "open" || surveyType === "close") {
            if (surveyWantName) {
                if (this.props.answer.head !== "" && this.props.answer.decryptKey !== "") {
                    this.setState({ checkDecrypt: true, checkName: true })
                    var userId = simpleCryptoSystem.decrypt(this.props.answer.userId);
                    axios.get(`http://localhost:5000/users/` + userId)
                        .then(response => {
                            this.setState({
                                user: response.data
                            })

                            console.log(this.state.user);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                } else if (this.props.answer.head === "") {
                    this.setState({ checkDecrypt: true, checkName: true })
                    var userId = this.props.answer.userId;
                    axios.get(`http://localhost:5000/users/` + userId)
                        .then(response => {
                            this.setState({
                                user: response.data
                            })

                            console.log(this.state.user);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            } else {
                if (this.props.answer.head === "") {
                    this.setState({ checkDecrypt: true })
                }
            }

        } else if (surveyType === "public") {
            this.setState({ checkDecrypt: true })
            if (surveyWantName) this.setState({ checkName: true })
        }

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

    showAnswer() {
        var secretKey = "SJyevrus";
        var simpleCryptoSystem = new SimpleCrypto(secretKey);
        var decryptKey = simpleCryptoSystem.decrypt(this.props.answer.decryptKey);
        console.log(decryptKey)
        var simpleCrypto = new SimpleCrypto(decryptKey);
        var answer = JSON.parse(simpleCrypto.decrypt(this.props.answer.resultAsString));
        console.log(Object.keys(answer))
        console.log(Object.values(answer))
        console.log(Object.entries(answer))
        this.setState({
            keys: Object.keys(answer),
            values: Object.values(answer),
            modal1: true
        })
    }
    showDetail() {
        return (
            this.state.keys.map((key, index) => {
                return (
                    <p>{key} : {this.state.values[index].toString()}</p>
                )
            })
        )
    }
    showName() {
        const surveyType = this.props.surveyType;
        if ((surveyType === "open" || surveyType === "close") && this.state.checkName) {
            return <p>ผู้ตอบแบบสอบถาม : {this.state.user.firstname} {this.state.user.lastname}</p>
        } else if (surveyType === "public" && this.state.checkName) {
            return <p>ผู้ตอบแบบสอบถาม : {this.props.answer.name}</p>
        }
    }

    confirm(){
        if(this.props.delete){
            const index = this.props.index;
            this.props.delete(index)
        }
    }

    render() {
        return (
            <div style={{ marginBottom: "1rem" }}>
                <Row>
                    <Card style={{ height: "40px", width: "450px", marginRight: "0.5rem" }}>
                        {console.log(this.props.answer)}
                        <div style={{ marginLeft: "1rem", marginRight: "1rem", marginTop: "0.5rem" }}>
                            <CardTitle>
                                คำตอบจากแบบสอบถาม
                        </CardTitle>
                        </div>
                    </Card>
                    {this.state.checkDecrypt ?
                        <Button outline color="primary" style={{ marginRight: "0.5rem" }} onClick={this.showAnswer} >ดูคำตอบ</Button> :
                        ""}
                    <Button outline color="danger" onClick={this.toggleModal2}>ลบคำตอบ</Button>
                </Row>
                <Modal isOpen={this.state.modal1} toggle={this.toggleModal1}
                    fade={true}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal1}>คำตอบของผู้ตอบแบบสอบถาม</ModalHeader>
                    <ModalBody>
                        {this.showName()}
                        {this.showDetail()}
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modal2} toggle={this.toggleModal2}
                    fade={true}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal2}>คุณต้องการลบคำตอบนี้จริงหรือไม่ ?</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={this.confirm.bind(this)}>ใช่</Button> 
                        <Button color="danger" onClick={this.toggleModal2}>ไม่ใช่</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

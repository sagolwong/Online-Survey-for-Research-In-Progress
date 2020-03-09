import React, { Component } from 'react'
import axios from 'axios';
import SimpleCrypto from "simple-crypto-js";
import { Button, Card, Row, CardTitle, Modal, ModalHeader, ModalBody } from 'reactstrap'

export default class ListAnswer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkDecrypt: false,
            keys: [],
            values: [],
            modal: false
        }
        this.showAnswer = this.showAnswer.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    }
    componentDidMount() {
        const surveyType = this.props.surveyType;
        const surveyWantName = this.props.surveyWantName;
        console.log(surveyType)

        if ((surveyType === "open" || surveyType === "close") && surveyWantName) {
            if (this.props.answer.head !== "" && this.props.answer.decryptKey !== "") {
                this.setState({ checkDecrypt: true })
            }
        } else if (surveyType === "public") {
            this.setState({ checkDecrypt: true })
        }

    }
    toggleModal() {
        this.setState({
            modal: !this.state.modal
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
            modal: true
        })
    }
    showDetail(){
        return (
            this.state.keys.map((key,index)=>{
                return (
                <p>{key} : {this.state.values[index].toString()}</p>
                )
            })
        )
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
                    <Button outline color="danger" >ลบคำตอบ</Button>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}
                    fade={true}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>คำตอบของผู้ตอบแบบสอบถาม</ModalHeader>
                    <ModalBody>
                        {this.showDetail()}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

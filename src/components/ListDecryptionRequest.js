import React, { Component } from 'react'
import axios from 'axios';
import SimpleCrypto from "simple-crypto-js";
import { Row, Card, CardTitle, CardText, Button, Col, Input, Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap'

export default class ListDecryptionRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey: {},
            check: "",
            modal: false,
            secretKey: "",
            answer: [],
            listAnswer: [],
            mistake: false
        };
        this.agree = this.agree.bind(this);
        this.disagree = this.disagree.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }
    componentDidMount() {
        //รับค่า user แบบลักไก่
        const surveyId = this.props.decryptionRequest.data[0];
        axios.get('http://localhost:5000/surveys/find/' + surveyId)
            .then(response => {
                this.setState({
                    survey: response.data
                })
                console.log(this.state.survey);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5000/answers/find/` + surveyId)
            .then(response => {
                this.setState({
                    answer: response.data,
                    listAnswer: response.data[0].answerUsers,
                })
                console.log(this.state.answer);
                console.log(this.state.listAnswer);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    async agree() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        const surveyId = this.props.decryptionRequest.data[0];


        //window.location = '/online-survey-check/'+surveyId;
        var secretKey = "SJyevrus"
        var simpleCryptoSystem = new SimpleCrypto(secretKey);
        var simpleCrypto = new SimpleCrypto(this.state.secretKey);

        await this.state.listAnswer.map(answer => {
            var userIdA = simpleCryptoSystem.decrypt(answer.userId);
            if (userId === userIdA) {
                var head = simpleCrypto.decrypt(answer.head);
                if (head === "surveyJS") {
                    var key = simpleCryptoSystem.encrypt(this.state.secretKey);
                    answer.decryptKey = key
                    console.log(answer);
                } else {
                    this.setState({
                        mistake: true
                    })
                }
            }
        })
        if (await !this.state.mistake) {
            const editAnswer = {
                answerUsers: this.state.listAnswer
            }
            console.log(editAnswer);
            await axios.post(`http://localhost:5000/answers/decryption/${this.state.answer[0]._id}`, editAnswer)
                .then(res => console.log(res.data));

            await axios.delete('http://localhost:5000/requests/' + this.props.decryptionRequest._id)
                .then(res => console.log(res.data));

            window.location = await '/';
        }



    }
    disagree() {
        axios.delete('http://localhost:5000/requests/' + this.props.decryptionRequest._id)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }
    onChangePassword(e) {
        this.setState({
            secretKey: e.target.value
        })
    }

    render() {
        return (
            <div className="sec">
                <Row>
                    <p>ผู้วิจัยเจ้าของแบบสอบถาม </p>
                    <div><a href="/">{this.state.survey.nameSurvey}</a></div>
                    <p>ต้องการให้คุณเปิดเผยคำตอบที่ได้ทำไปในแบบสอบถาม</p>
                </Row>
                <Row>
                    <Card body>
                        <CardTitle><a href="/">{this.state.survey.nameSurvey}</a></CardTitle>
                        <CardText>{this.state.survey.description}</CardText>
                        <Row>
                            <Col><Button color="primary" size="lg" block onClick={this.toggleModal}>ตกลง</Button></Col>
                            <Col><Button color="danger" size="lg" block onClick={this.disagree}>ไม่ตกลง</Button></Col>
                        </Row>

                    </Card>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}
                    fade={true}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>กรุณากรอกรหัสที่คุณใช้เพื่อปกปิดคำตอบของคุณ</ModalHeader>
                    <ModalBody>
                        {this.state.mistake ? <p>รหัสผ่านผิด</p> : ""}
                        <Input type="password" placeholder="รหัสสำหรับเปิดเผยคำตอบของคุณ" rows={5} onChange={this.onChangePassword} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.agree}>ยืนยัน</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>ยกเลิก</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

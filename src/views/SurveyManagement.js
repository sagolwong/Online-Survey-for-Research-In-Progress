import React, { Component } from 'react'
import axios from 'axios';
import { Row, Col, Card, InputGroup, InputGroupText, InputGroupAddon, Input, Button } from 'reactstrap'

export default class SurveyManagement extends Component {

    componentDidMount(){
    
    }

    render() {
        return (
            <div >
                <Row>
                    <Col><p>มีผู้ตอบ 4 คน</p></Col>
                    <Col>
                        <form>
                            <InputGroup className="no-border">
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <i className="fas fa-search" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="เพิ่มรายชื่อเข้ากลุ่มตัวอย่าง" />
                            </InputGroup>
                        </form>
                    </Col>
                    <Col><Button color="success">  แชร์  </Button></Col>
                    <Col><Button color="info">เผยแพร่</Button></Col>
                </Row>
                <div><p>กลุ่มตัวอย่าง</p></div>
                <Row>
                    <div>
                       <Card>
                            รายชื่อกลุ่มตัวอย่าง
                       </Card>
                    </div>
                </Row>
                <Row>
                    <Col>กลุ่มทดลอง</Col>
                    <Col>กลุ่มควบคุม</Col>
                </Row>
                <Row>
                    <Col><Card>รายชื่อกลุ่มทดลอง</Card></Col>
                    <Col><Card>รายชื่อกลุ่มควบคุม</Card></Col>
                </Row>
            </div>
        )
    }
}

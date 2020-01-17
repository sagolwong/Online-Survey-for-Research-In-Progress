import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'reactstrap'
import axios from 'axios';


export default class Feedback extends Component {

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <h1>เริ่มต้นวิเคราะห์ข้อมูลทางสถิติ</h1>
                <Button color="primary" block>วิเคราะห์</Button>
                <Card>
                    <Row>
                       <Col><Button outline color="primary">ดู</Button></Col>
                       <Col><Button outline color="danger">ลบ</Button></Col> 
                    </Row>
                    
                </Card>
            </div>
        )
    }
}

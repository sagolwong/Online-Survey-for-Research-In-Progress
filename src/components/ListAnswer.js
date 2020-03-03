import React, { Component } from 'react'
import { Button, Card, Col, Row, CardTitle } from 'reactstrap'

export default class ListAnswer extends Component {
    render() {
        return (
            <div style={{marginBottom: "1rem"}}>
                <Row>
                    <Card style={{ height: "40px",width: "450px", marginRight: "0.5rem" }}>
                        {console.log(this.props.answer)}
                        <div style={{ marginLeft: "1rem", marginRight: "1rem", marginTop: "0.5rem" }}>
                            <CardTitle>
                                คำตอบจากแบบสอบถาม
                        </CardTitle>
                        </div>
                    </Card>
                    <Button outline color="primary" style={{marginRight: "0.5rem"}} >ดูคำตอบ</Button>
                    <Button outline color="danger" >ลบคำตอบ</Button>
                </Row>
            </div>
        )
    }
}

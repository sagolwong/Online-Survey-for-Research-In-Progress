import React, { Component } from 'react'
import '../assests/main.css'
import axios from 'axios';
import { Row, Card, CardTitle, CardText, Button, Col } from 'reactstrap'
import ListUpgradeRequest from '../components/ListUpgradeRequest';

export default class Requests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests:[]
        };
    }

    componentDidMount(){
        const userId = "5e203ad29a267a2818ee1996";
        axios.get('http://localhost:5000/requests/'+userId)
            .then(response => {
                this.setState({
                    requests: response.data
                })
                console.log(this.state.requests);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    showRequests(){
        if(this.state.requests !== undefined){
           return (
               this.state.requests.map(res => {
                if(res.typeRequest === "upgrade"){
                    return <ListUpgradeRequest upgradeRequest={res}/>
                }
            })
           ) 
        }else{
            return "ไม่มีรายการคำขอร้อง"
        }
    }

    render(){
        return (
            <div>
                {this.showRequests()}
            </div>
        )
    }

    /*render() {
        return (
            <div className="sec">
                <Row>
                    <div><a href="/">บ็อบบี้</a></div>
                    <p>สร้างแบบสอบถามขึ้นมาในโปรเจคที่คุณมีรายชื่ออยู่</p>
                </Row>
                <Row>
                    <Card body>
                        <CardTitle><a href="/">บริการของโรงพยาบาล</a></CardTitle>
                        <CardText>รายละเอียดชองแบบสอบถาม</CardText>
                        <Row>
                            <Col><Button color="primary" size="lg" block>ทำแบบสอบถาม</Button></Col>
                            <Col><Button color="success" size="lg" block>ขอดูผลลัพธ์</Button></Col>
                        </Row>

                    </Card>
                </Row>
            </div>
        )
    }*/
}

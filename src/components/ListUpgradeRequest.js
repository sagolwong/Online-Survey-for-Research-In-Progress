import React, { Component } from 'react'
import '../assests/main.css'
import axios from 'axios';
import { Row, Card, CardTitle, CardText, Button, Col } from 'reactstrap'

export default class ListUpgradeRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            check: ""
        };
        this.agree = this.agree.bind(this);
        this.disagree = this.disagree.bind(this);
    }

    componentDidMount() {
        //รับค่า user แบบลักไก่
        const userId = this.props.upgradeRequest.data[0];
        axios.get('http://localhost:5000/users/' + userId)
            .then(response => {
                this.setState({
                    profile: response.data
                })
                console.log(this.state.profile);
            })
            .catch((error) => {
                console.log(error);
            })

    }
    async agree() {
        const userId = this.props.upgradeRequest.data[0];
        var upgrade = await {
            gender: this.props.upgradeRequest.data[1],
            age: this.props.upgradeRequest.data[2],
        }

        await axios.post(`http://localhost:5000/users/upgrade/${userId}`, upgrade)
            .then(res => {
                this.setState({
                    check: res.data
                })
                console.log(res.data)
            });

        if (await this.state.check === "User upgrade!") {
            axios.delete('http://localhost:5000/requests/' + this.props.upgradeRequest._id)
                .then(res => console.log(res.data));
        }
        window.location = '/';
    }
    disagree() {
        axios.delete('http://localhost:5000/requests/' + this.props.upgradeRequest._id)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div className="sec">
                <Row>
                    <div><a href="/">{this.state.profile.firstname} {this.state.profile.lastname} </a></div>
                    <p> ต้องการอัพเกรดเป็นนักวิจัย</p>
                </Row>
                <Row>
                    <Card body>
                        <CardTitle><a href="/"></a></CardTitle>
                        <CardText>รายละเอียดของผู้ตอบที่ส่งมา</CardText>
                        <Row>
                            <Col><Button color="primary" size="lg" block onClick={this.agree}>ยอมรับ</Button></Col>
                            <Col><Button color="danger" size="lg" block onClick={this.disagree}>ไม่ยอมรับ</Button></Col>
                        </Row>

                    </Card>
                </Row>
            </div>
        )
    }
}

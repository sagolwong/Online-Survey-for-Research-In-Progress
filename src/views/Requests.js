import React, { Component } from 'react'
import '../assests/main.css'
import axios from 'axios';
import ListUpgradeRequest from '../components/ListUpgradeRequest';
import ListMemberRequest from '../components/ListMemberRequest';
import ListDoOnlyRequest from '../components/ListDoOnlyRequest';
import ListFrequencyRequest from '../components/ListFrequencyRequest';
import ListDecryptionRequest from '../components/ListDecryptionRequest';

export default class Requests extends Component {
    constructor(props) {
        super(props);

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 543;

        this.state = {
            requests: [],
            frequency: [],
            nowDate: date,
            nowMonth: month,
            nowYear: year
        };
    }

    async componentDidMount() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        var freq = [];
        await axios.get('http://localhost:5000/requests/' + userId)
            .then(response => {
                this.setState({
                    requests: response.data
                })
                console.log(this.state.requests);
            })
            .catch((error) => {
                console.log(error);
            })

        /* await this.state.requests.map(requests => {
             if (requests.typeRequest === "frequency") {
                 axios.get('http://localhost:5000/frequency/' + requests.data[1])
                     .then(response => {
                         freq = freq.concat(response.data);
                         console.log(response.data);
                     })
                     .catch((error) => {
                         console.log(error);
                     })
             }
         })
         await this.setState({
             frequency: freq
         })
         console.log(this.state.frequency);*/
    }

    showRequests() {
        if (this.state.requests !== undefined) {
            return (
                this.state.requests.map(res => {
                    if (res.typeRequest === "upgrade") {
                        return <ListUpgradeRequest upgradeRequest={res} />
                    } else if (res.typeRequest === "member") {
                        return <ListMemberRequest memberRequest={res} />
                    } else if (res.typeRequest === "doOnly") {
                        return <ListDoOnlyRequest doOnlyRequest={res} />
                    } else if (res.typeRequest === "frequency") {
                        return <ListFrequencyRequest frequencyRequest={res} />
                    } else if(res.typeRequest === "decryption") {
                        return <ListDecryptionRequest decryptionRequest={res} />
                    }
                })
            )
        } else {
            return "ไม่มีรายการคำขอร้อง"
        }
    }

    render() {
        return (
            <div>
                {this.showRequests()}
                {console.log(this.state.frequency)}
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

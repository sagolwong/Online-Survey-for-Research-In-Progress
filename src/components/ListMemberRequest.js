import React, { Component } from 'react'
import axios from 'axios';
import { Row, Card, CardTitle, CardText, Button, Col } from 'reactstrap'

export default class ListMemberRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey: {},
            check: "",
            frequency: []
        };
        this.agree = this.agree.bind(this);
        this.disagree = this.disagree.bind(this);
    }

    componentDidMount() {
        //รับค่า user แบบลักไก่
        const surveyId = this.props.memberRequest.data[0];
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

    }
    async agree() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        const surveyId = this.props.memberRequest.data[0];
        var checkRepeat = false;
        this.state.survey.names.map(memberId => {
            if (memberId === userId) checkRepeat = true;
        })
        if (!checkRepeat) {
            var member = await {
                names: this.state.survey.names.concat(userId),
            }

            await axios.post(`http://localhost:5000/surveys/member/${surveyId}`, member)
                .then(res => {
                    this.setState({
                        check: res.data
                    })
                    console.log(res.data)
                });

            if (await this.state.check === "Survey update!") {
                axios.delete('http://localhost:5000/requests/' + this.props.memberRequest._id)
                    .then(res => console.log(res.data));
            }

            await axios.get('http://localhost:5000/frequency/find/' + surveyId)
                .then(response => {
                    this.setState({
                        frequency: response.data
                    })
                    console.log(this.state.frequency);
                })
                .catch((error) => {
                    console.log(error);
                })
            if (await this.state.frequency[0] !== undefined) {
                var data = []
                data = data.concat(surveyId);
                data = data.concat(this.state.frequency[0]._id);
                const request = {
                    userId: userId,
                    typeRequest: "frequency",
                    data: data
                }

                axios.post(`http://localhost:5000/requests/create`, request)
                    .then(res => { console.log(res.data) });

                const followResult = {
                    surveyId: surveyId,
                    userId: userId,
                    frequencyId: this.state.frequency[0]._id
                }
                axios.post(`http://localhost:5000/followResults/create`, followResult)
                    .then(res => { console.log(res.data) });

            }
            window.location = await '/';
        }

    }
    disagree() {
        axios.delete('http://localhost:5000/requests/' + this.props.memberRequest._id)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div className="sec">
                <Row>
                    <p>ผู้วิจัยต้องการให้คุณเข้าร่วมทำโปรเจค </p>
                    <div><a href="/">{this.state.survey.nameSurvey}</a></div>
                </Row>
                <Row>
                    <Card body>
                        <CardTitle><a href="/">{this.state.survey.nameSurvey}</a></CardTitle>
                        <CardText>{this.state.survey.description}</CardText>
                        <Row>
                            <Col><Button color="primary" size="lg" block onClick={this.agree}>เข้าร่วม</Button></Col>
                            <Col><Button color="danger" size="lg" block onClick={this.disagree}>ไม่เข้าร่วม</Button></Col>
                        </Row>

                    </Card>
                </Row>
            </div>
        )
    }
}

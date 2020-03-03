import React, { Component } from 'react'
import axios from 'axios';
import { Row, Card, CardTitle, CardText, Button, Col } from 'reactstrap'

export default class ListFrequencyRequest extends Component {
    constructor(props) {
        super(props);

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 543;

        this.state = {
            survey: {},
            frequency: [],
            nowDate: date,
            nowMonth: month,
            nowYear: year
        };
        this.checkFrequency = this.checkFrequency.bind(this);
        this.agree = this.agree.bind(this);
        this.disagree = this.disagree.bind(this);
    }
    componentDidMount() {
        //รับค่า user แบบลักไก่
        const surveyId = this.props.frequencyRequest.data[0];
        const frequencyId = this.props.frequencyRequest.data[1];
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

        axios.get('http://localhost:5000/frequency/' + frequencyId)
            .then(response => {
                this.setState({
                    frequency: response.data.listTimeToDo
                })
                console.log(response.data);
                console.log(this.state.frequency);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    checkFrequency() {
        if (this.state.frequency[0] !== undefined) {
            return (
                this.state.frequency.map(time => {
                    if (time.day === this.state.nowDate && time.month === this.state.nowMonth && time.year === this.state.nowYear) {
                        return (
                            <div className="sec">
                                <Row>
                                    <p>วันนี้คุณมีนัดทำแบบสอบถาม : </p>
                                    <div><a href="/">{this.state.survey.nameSurvey}</a></div>
                                </Row>
                                <Row>
                                    <Card body>
                                        <CardTitle><a href="/">{this.state.survey.nameSurvey}</a></CardTitle>
                                        <CardText>{this.state.survey.description}</CardText>
                                        <Row>
                                            <Col><Button color="primary" size="lg" block onClick={this.agree}>ทำ</Button></Col>
                                            <Col><Button color="danger" size="lg" block onClick={this.disagree}>ไม่ทำ</Button></Col>
                                        </Row>

                                    </Card>
                                </Row>
                            </div>
                        )
                    }
                })
            )

        }

    }

    async agree() {
        const userId = "5e1976f8652e4342fc6c0223";
        const surveyId = this.props.frequencyRequest.data[0];
        /*await axios.delete('http://localhost:5000/requests/' + this.props.frequencyRequest._id)
            .then(res => console.log(res.data));*/

        window.location = '/online-survey-check/' + surveyId;
    }
    disagree() {
        axios.delete('http://localhost:5000/requests/' + this.props.frequencyRequest._id)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div >
                {this.checkFrequency()}
            </div>
        )
    }
}

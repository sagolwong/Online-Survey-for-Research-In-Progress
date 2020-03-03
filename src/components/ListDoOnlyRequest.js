import React, { Component } from 'react'
import axios from 'axios';
import { Row, Card, CardTitle, CardText, Button, Col } from 'reactstrap'

export default class ListDoOnlyRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey: {},
            check: ""
        };
        this.agree = this.agree.bind(this);
        this.disagree = this.disagree.bind(this);
    }

    componentDidMount() {
        //รับค่า user แบบลักไก่
        const surveyId = this.props.doOnlyRequest.data[0];
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
        const userId = "5e1976f8652e4342fc6c0223";
        const surveyId = this.props.doOnlyRequest.data[0];
        await axios.delete('http://localhost:5000/requests/' + this.props.doOnlyRequest._id)
            .then(res => console.log(res.data));

        window.location = '/online-survey-check/'+surveyId;
    }
    disagree() {
        axios.delete('http://localhost:5000/requests/' + this.props.doOnlyRequest._id)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div className="sec">
                <Row>
                    <p>ผู้วิจัยต้องการให้คุณทำแบบสอบถาม </p>
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
}

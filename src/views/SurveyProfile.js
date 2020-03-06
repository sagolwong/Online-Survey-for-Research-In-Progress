import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap'
import axios from 'axios';

export default class SurveyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey: {},
        };

    }

    componentDidMount() {
        const surveyId = this.props.surveyId;
        axios.get(`http://localhost:5000/surveys/find/` + surveyId)
            .then(response => {
                this.setState({
                    survey: response.data,
                })
                console.log(this.state.survey);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div >
                <Card>
                    <CardTitle>ชื่อแบบสอบถาม : {this.state.survey.nameSurvey}</CardTitle>
                    <CardText>รายละเอียดแบบสอบถาม : {this.state.survey.description}</CardText>
                    <CardText>ชนิดแบบสอบถาม : {this.state.survey.shareTo}</CardText>
                </Card>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { Card } from 'reactstrap'

export default class ListSurvey extends Component {
    constructor(props) {
        super(props);
        
        this.goToManageSurvey = this.goToManageSurvey.bind(this);
        
    }

    goToManageSurvey(){
        const surveyId = this.props.survey._id;
        window.location = `/survey-management/${surveyId}`;
    }
    render() {
        return (
            <div>
                <Card onClick={this.goToManageSurvey}>{this.props.survey.nameSurvey}</Card>
            </div>
        )
    }
}

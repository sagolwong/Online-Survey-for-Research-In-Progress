import React, { Component } from 'react'
import { Card } from 'reactstrap'
//import axios from 'axios';

export default class ListSurvey extends Component {
    constructor(props) {
        super(props);
        
        this.goToManageSurvey = this.goToManageSurvey.bind(this);
        this.goToEditSurvey = this.goToEditSurvey.bind(this);
        
    }
 

    goToManageSurvey(){
        const surveyId = this.props.survey._id;
        window.location = `/survey-management/${surveyId}`;
    }
    goToEditSurvey(){
        const surveyId = this.props.survey._id;
        const type = "draft"
        window.location = `/edit-survey/${type}/${surveyId}`;
    }
    
    render() {
        return (
            <div>
                <Card style={{width:"600px"}} onClick={this.props.survey.status === "publish" ? this.goToManageSurvey :this.goToEditSurvey}>{this.props.survey.nameSurvey}</Card>
            </div>
        )
    }
}

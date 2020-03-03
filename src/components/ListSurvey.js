import React, { Component } from 'react'
import { Card } from 'reactstrap'
//import axios from 'axios';

export default class ListSurvey extends Component {
    constructor(props) {
        super(props);
        
        this.goToManageSurvey = this.goToManageSurvey.bind(this);
        
    }
    /*componentDidMount(){
        if(this.props.survey.nameSurvey==="ทดสอบ"){
            axios.delete(`http://localhost:5000/surveys/`+this.props.survey._id)
                .then(res => console.log(res.data));
        }
    }*/

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

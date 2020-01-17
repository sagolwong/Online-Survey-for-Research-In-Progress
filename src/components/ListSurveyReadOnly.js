import React, { Component } from 'react'
import { Card } from 'reactstrap'

export default class ListSurveyReadOnly extends Component {

    render() {
        return (
            <div>
                <Card>{this.props.survey.nameSurvey}</Card>
            </div>
        )
    }
}

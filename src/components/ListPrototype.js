import React, { Component } from 'react'
import { Card } from 'reactstrap'

export default class ListPrototype extends Component {
    constructor(props) {
        super(props);


    }

    goToEditSurvey() {
        const prototypeId = this.props.prototype._id;
        const projectId = this.props.projectId;
        var sampleGroupId = "no";
        if (this.props.sampleGroupId !== undefined) {
            sampleGroupId = this.props.sampleGroupId;
        }
        const type = "prototype"
        window.location = `/edit-survey/${type}/${prototypeId}/${projectId}/${sampleGroupId}`;
    }

    render() {
        return (
            <div>
                <Card onClick={this.goToEditSurvey.bind(this)}>{this.props.prototype.nameSurvey}</Card>
                {console.log(this.props.projectId)}
                {console.log(this.props.sampleGroupId)}
            </div>
        )
    }
}

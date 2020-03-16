import React, { Component } from 'react'
import { Card } from 'reactstrap'

export default class ListPrototype extends Component {
    constructor(props) {
        super(props);
        
        
    }

    goToEditSurvey(){
        const prototypeId = this.props.prototype._id;
        const type = "prototype"
        window.location = `/edit-survey/${type}/${prototypeId}`;
    }

    render() {
        return (
            <div>
                <Card onClick={this.goToEditSurvey.bind(this)}>{this.props.prototype.nameSurvey}</Card>
            </div>
        )
    }
}

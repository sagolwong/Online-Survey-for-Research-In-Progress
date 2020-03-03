import React, { Component } from 'react'
import { Card } from 'reactstrap'

export default class ListSampleGroup extends Component {
    constructor(props) {
        super(props);
        
        this.goToSampleGroup = this.goToSampleGroup.bind(this);
        
    }
    goToSampleGroup(){
        const projectId = this.props.projectId;
        const sampleGroupId = this.props.sampleGroup._id;
        
        window.location = `/project-management/sample-group-management/${projectId}/${sampleGroupId}`;
    }

    render() {
        return (
            <div>
                <Card style={{width:"600px"}} onClick={this.goToSampleGroup}>{this.props.sampleGroup.nameSampleGroup}</Card>  
            </div>
        )
    }
}

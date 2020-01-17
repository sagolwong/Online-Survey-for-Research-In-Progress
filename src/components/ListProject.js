import React, { Component } from 'react'
import { Card } from 'reactstrap'

export default class ListProject extends Component {
    constructor(props) {
        super(props);
        
        this.goToManageProject = this.goToManageProject.bind(this);
        
    }

    goToManageProject(){
        const projectId = this.props.project._id;
        window.location = `/project-management/${projectId}`;
    }

    render() {
        return (
            <div>
                <Card onClick={this.goToManageProject}>{this.props.project.nameProject}</Card>
            </div>
        )
    }
}

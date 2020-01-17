import React, { Component } from 'react'
import { Card, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, } from 'reactstrap'
import classnames from 'classnames'
import axios from 'axios'
import ListProject from '../components/ListProject';

export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            projects: [],
            activeTab: '1'
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        axios.get('http://localhost:5000/users/5dc9a42c824eb44fe43c8f94')
            .then(response => {
                this.setState({
                    profile: response.data
                })
                console.log(this.state.profile);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5000/projects/find/` + userId)
            .then(response => {
                this.setState({
                    projects: response.data
                })

                console.log(this.state.projects);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab })
    }

    showGroupProject() {
        return (
            this.state.projects.map(res => {
                return <ListProject project={res} />
            })
        )
    }

    render() {
        return (
            <div className="sec">
                <Card body>
                    <div>{this.state.profile.firstname}</div>
                    <div>{this.state.profile.role}</div>
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1') }}
                                >
                                    โปรเจค
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                รายการโปรเจค
                                {this.showGroupProject()}
                            </TabPane>
                        </TabContent>
                    </div>
                </Card>
            </div>
        )
    }
}

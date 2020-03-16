import React, { Component } from 'react'
import { Card, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, } from 'reactstrap'
import classnames from 'classnames'
import axios from 'axios'
import ListPrototype from '../components/ListPrototype';

export default class Prototype extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            listPrototype: [],
            activeTab: '1'
        }
        this.toggle = this.toggle.bind(this);
        this.showPrototypes = this.showPrototypes.bind(this);
    }

    componentDidMount() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        axios.get('http://localhost:5000/users/'+userId)
            .then(response => {
                this.setState({
                    profile: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('http://localhost:5000/prototypes/' + userId)
            .then(response => {
                this.setState({
                    listPrototype: response.data
                })
                console.log(this.state.listPrototype)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab })
    }

    showPrototypes() {
        return (
            this.state.listPrototype.map(res => {
                return <ListPrototype prototype={res}/>
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
                                    ต้นแบบแบบสอบถาม
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                รายชื่อต้นแบบแบบสอบถาม
                                {this.showPrototypes()}
                            </TabPane>
                        </TabContent>
                    </div>
                </Card>
            </div>
        )
    }
}

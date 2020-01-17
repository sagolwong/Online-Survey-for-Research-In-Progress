import React, { Component } from 'react'
import { Card, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, } from 'reactstrap'
import classnames from 'classnames'
import axios from 'axios'
import ListSurveyReadOnly from '../components/ListSurveyReadOnly';



export default class Surveys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            listSurvey: [],
            surveys: [],
            name: "",
            activeTab: '1'
        }
        this.toggle = this.toggle.bind(this);
        this.showListSurvey = this.showListSurvey.bind(this);
    }

    async componentDidMount() {
        const userId = "5dca538c955945213c0d52ff";
        await axios.get('http://localhost:5000/users/5dc9a42c824eb44fe43c8f94')
            .then(response => {
                this.setState({
                    profile: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
        await axios.get('http://localhost:5000/listSurvey/find/' + userId)
            .then(response => {
                this.setState({
                    listSurvey: response.data[0].listSurvey
                })
                console.log(typeof this.state.listSurvey)
                console.log(response.data[0].listSurvey)
            })
            .catch((error) => {
                console.log(error);
            })
        await this.state.listSurvey.map(res => {
            //console.log(res)
            axios.get('http://localhost:5000/surveys/find/' + res)
                .then(response => {
                    this.setState({
                        surveys: this.state.surveys.concat(response.data)
                    })
                    console.log(this.state.surveys)

                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

    showListSurvey() {
        return (
            this.state.surveys.map(res => {
                //console.log(res)
                return <ListSurveyReadOnly survey={res}/>
        })
        )

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab })
    }

    render() {
        //console.log(this.state.lists)
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
                                    แบบสอบถามที่เคยทำ
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                รายชื่อแบบสอบถาม
                                {this.showListSurvey()}
                            </TabPane>
                        </TabContent>
                    </div>
                </Card>
            </div>
        )
    }
}

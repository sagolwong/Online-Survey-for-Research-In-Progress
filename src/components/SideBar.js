import React, { Component } from 'react'
import { Button, Row, Col } from "reactstrap";
import '../assests/sidebar.css'
import axios from 'axios';
import ListProject from './ListProject';
import ListSurveyReadOnly from './ListSurveyReadOnly';


export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            projects: [],
            otherSurveys: []
        }
        this.listProjects = this.listProjects.bind(this);
        this.listSurveys = this.listSurveys.bind(this);
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/users/5e37c88484824b4da85b9e76')
            .then(response => {
                this.setState({
                    profile: response.data
                })
                console.log(this.state.profile.firstname);
                console.log(this.state.profile.role);
                console.log(this.state.profile._id);
            })
            .catch((error) => {
                console.log(error);
            })
        if (await this.state.profile.recentProjects !== undefined) {
            var x;
            var l = this.state.profile.recentProjects.length;
            //console.log(this.state.profile.recentProjects);
            for (let i = 1; i <= (l / 2); i++) {
                x = this.state.profile.recentProjects[i - 1];
                this.state.profile.recentProjects[i - 1] = this.state.profile.recentProjects[l - i];
                this.state.profile.recentProjects[l - i] = x;
            }
            console.log(this.state.profile.recentProjects);
            this.state.profile.recentProjects.map(res => {
                axios.get(`http://localhost:5000/projects/` + res)
                    .then(response => {
                        this.setState({
                            projects: this.state.projects.concat(response.data)
                        })

                        console.log(this.state.projects);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        }
        if (await this.state.profile.recentOtherSurveys !== undefined) {
            var x;
            var l = this.state.profile.recentOtherSurveys.length;
            //console.log(this.state.profile.recentOtherSurveys);
            for (let i = 1; i <= (l / 2); i++) {
                x = this.state.profile.recentOtherSurveys[i - 1];
                this.state.profile.recentOtherSurveys[i - 1] = this.state.profile.recentOtherSurveys[l - i];
                this.state.profile.recentOtherSurveys[l - i] = x;
            }
            console.log(this.state.profile.recentOtherSurveys);
            this.state.profile.recentOtherSurveys.map(res => {
                axios.get(`http://localhost:5000/surveys/find/` + res)
                    .then(response => {
                        this.setState({
                            otherSurveys: this.state.otherSurveys.concat(response.data)
                        })

                        console.log(this.state.otherSurveys);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        }
    }
    /*check() {
        if (this.props.role === "Responder") {
            axios.get('http://localhost:5000/answers/'+this.props.id)
                .then(response => {
                    this.setState({
                        lists: response.data
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            axios.get('http://localhost:5000/projects/'+this.props.id)
                .then(response => {
                    this.setState({
                        lists: response.data.nameProject
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }*/

    responder() {
        return (
            <div><h4>แบบสอบถามที่เคยทำ</h4></div>
        )
    }

    researcher() {
        return (
            <Row>
                <Col><h4>โปรเจค</h4></Col>
                <Col><Button color="info"><a href="/create-project">สร้างโปรเจค</a></Button></Col>
            </Row>
        )
    }

    listSurveys() {
        if (this.state.profile.recentOtherSurveys !== undefined) {
            return (this.state.otherSurveys.map(res => {
                return <ListSurveyReadOnly survey={res} />
            }))
        }
    }

    listProjects() {
        console.log(this.state.projects);
        console.log(this.state.otherSurveys);
        if (this.state.projects !== undefined) {
            return (this.state.projects.map(res => {
                return <ListProject project={res} />
            }))
        }
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar_layout1">
                    <Row>
                        <Col>
                            <div className="container">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" width="100%" />
                            </div>
                        </Col>
                        <Col>
                            <div className="container">
                                <div className="p_name"><a href="/user-profile">{this.props.firstname}</a></div>
                                <div ><a href="/user-profile">ดูโปรไฟล์ของคุณ</a></div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="sidebar_layout2">
                    <div className="container">
                        {this.props.role === "Responder" ? this.responder() : this.researcher()}
                    </div>
                </div>
                <div className="sidebar_layout3">
                    <ul>
                        {this.props.role === "Responder" ? this.listSurveys() : this.listProjects()}
                    </ul>
                </div>
            </div>
        )
    }
}

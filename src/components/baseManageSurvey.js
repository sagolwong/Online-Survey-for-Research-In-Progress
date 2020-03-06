import React, { Component } from 'react'
import { Button, Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import axios from 'axios';
import '../assests/sidebar.css'
import SurveyProfile from '../views/SurveyProfile';
import SurveyManagement from '../views/SurveyManagement';
import FollowResult from '../views/FollowResult';
import Feedback from '../views/Feedback';

class baseManageSurvey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            manage: 1
        };

        this.changeProfile = this.changeProfile.bind(this);
        this.changeManage = this.changeManage.bind(this);
        this.changeFollow = this.changeFollow.bind(this);
        this.changeFeedback = this.changeFeedback.bind(this);
    }

    componentDidMount() {
        const surveyId = this.props.match.params.surveyId;
        if (surveyId) {
            this.props.dispatch({
                type: 'SURVEY_MANAGEMENT'
            });
        }
    }

    changeProfile() {
        this.setState({
            manage: 1
        })
    }

    changeManage() {
        this.setState({
            manage: 2
        })
    }

    changeFollow() {
        this.setState({
            manage: 3
        })
    }

    changeFeedback() {
        this.setState({
            manage: 4
        })
    }

    showComponent() {
        if (this.state.manage === 1) return <SurveyProfile surveyId={this.props.match.params.surveyId} />
        else if (this.state.manage === 2) return <SurveyManagement surveyId={this.props.match.params.surveyId} />
        else if (this.state.manage === 3) return <FollowResult surveyId={this.props.match.params.surveyId} />
        else if (this.state.manage === 4) return <Feedback surveyId={this.props.match.params.surveyId} />
    }

    render() {
        return (
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
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
                                        <div className="p_name"><a href="/user-profile">Sagolwong</a></div>
                                        <div ><a href="/user-profile">ดูโปรไฟล์ของคุณ</a></div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <br></br>
                        <br></br>
                        <div style={{marginLeft: "2rem"}}>
                            <h3 onClick={this.changeProfile}>รายละเอียด</h3><br></br>
                            <h3 onClick={this.changeManage}>การจัดการ</h3><br></br>
                            <h3 onClick={this.changeFollow}>ติดตามผล</h3><br></br>
                            <h3 onClick={this.changeFeedback}>วิเคราะห์ผลลัพธ์</h3><br></br>
                        </div>

                    </div>
                </Col>
                <Col lg="7" md={{ size: 6, offset: 3 }}>
                    <br></br>
                    {this.showComponent()}
                </Col>
            </Row>

        )
    }
}
export default connect()(baseManageSurvey);
//<h2 onClick={this.changeFollow}>ติดตามผล</h2>
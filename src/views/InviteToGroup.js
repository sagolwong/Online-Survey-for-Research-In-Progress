import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, Button, CardTitle, CardText, Row } from "reactstrap";
import axios from 'axios';

class InviteToGroup extends Component {
    constructor(props) {
        super(props);

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear() + 543;

        this.state = {
            survey: {},
            checkGroup: true,
            already: false,
            frequency: [],
            listTimeToDo:[],
            nowDate: date,
            nowMonth: month,
            nowYear: year
        }
        this.showRequestGroup = this.showRequestGroup.bind(this)
    }

    componentDidMount() {
        const surveyId = this.props.match.params.surveyId;
        const userId = "5dc9a42c824eb44fe43c8f94";
        console.log(surveyId);
        if (surveyId) {
            this.props.dispatch({
                type: 'SHOW_SURVEY'
            });
        }
        axios.get(`http://localhost:5000/surveys/find/` + surveyId)
            .then(response => {
                this.setState({
                    survey: response.data,
                    already: true
                })
                console.log(this.state.survey);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    checkGroup() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        if (this.state.already) {
            if (this.state.survey.haveGroup) {
                if (this.state.checkGroup) {
                    this.state.survey.names.map(memberId => {
                        if (userId === memberId) {
                            this.setState({
                                checkGroup: false
                            })
                            console.log("1")
                        }
                    })
                }
                if (this.state.checkGroup) {
                    return this.showRequestGroup()
                }
            } else {
                this.setState({
                    checkGroup: false
                })
                console.log("2")
            }
        }
    }
    showRequestGroup() {
        return (
            <div>
                <Card style={{
                    height: "230px",
                    width: "470px"
                }}>
                    <h4 style={{ textAlign: "center", marginTop: "1rem" }}>คำร้องขอเชิญท่านเข้าร่วมเป็นสมาชิกทำแบบสอบถาม</h4>
                    <br></br>
                    <div style={{ marginLeft: "1rem" }}>
                        <p>ผู้วิจัยต้องการให้คุณเข้าร่วมเป็นสมาชิกเพื่อทำแบบบสอบถาม </p>
                        <CardTitle><a href="/">แบบสอบถาม : {this.state.survey.nameSurvey}</a></CardTitle>
                        <CardText>
                            <p>คำอธิบายแบบสอบถาม : </p>
                            {this.state.survey.description}
                        </CardText>
                    </div>

                </Card>
                <br></br>
                <Button style={{ width: "470px" }} color="info" onClick={this.agree.bind(this)}>เข้าร่วม</Button>
            </div>
        )
    }

    async agree() {
        const userId = "5dc9a42c824eb44fe43c8f94";
        const surveyId = this.props.match.params.surveyId;
        var check = false;
        var member = {
            names: this.state.survey.names.concat(userId),
        }

        await axios.post(`http://localhost:5000/surveys/member/${this.props.match.params.surveyId}`, member)
            .then(res => {
                console.log(res.data)
                //window.location = `/online-survey-check/${this.props.match.params.surveyId}`;
            });

        await axios.get('http://localhost:5000/frequency/find/' + surveyId)
            .then(response => {
                this.setState({
                    frequency: response.data,
                    listTimeToDo: response.data[0].listTimeToDo
                })
                console.log(this.state.frequency);
                console.log(this.state.listTimeToDo);
            })
            .catch((error) => {
                console.log(error);
            })
        if (await this.state.frequency[0] !== undefined) {
            var data = []
            data = data.concat(surveyId);
            data = data.concat(this.state.frequency[0]._id);
            const request = {
                userId: userId,
                typeRequest: "frequency",
                data: data
            }

            axios.post(`http://localhost:5000/requests/create`, request)
                .then(res => { console.log(res.data) });

        }
        if(await this.state.listTimeToDo[0] !== undefined){
            this.state.listTimeToDo.map(time => {
                if (time.day === this.state.nowDate && time.month === this.state.nowMonth && time.year === this.state.nowYear) {
                    check = true;
                }
            })
            
        }
        if(await check) window.location = `/online-survey-check/${surveyId}`;
        else window.location =  `/`;
        
    }

    goToAgreement() {
        window.location = `/online-survey-check/${this.props.match.params.surveyId}`;
    }

    render() {
        return (
            <div className="sec">
                {this.state.checkGroup ? this.checkGroup() : this.goToAgreement()}
                {console.log(this.state.checkGroup)}
            </div>
        )
    }
}
export default connect()(InviteToGroup);
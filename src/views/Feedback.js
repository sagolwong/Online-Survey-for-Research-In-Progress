import React, { Component } from 'react'
import { Button } from 'reactstrap'
import axios from 'axios';
import ListAnswer from '../components/ListAnswer';


export default class Feedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answer:[],
            listAnswer:[]
        }
        this.showAnswers = this.showAnswers.bind(this);
    }

    componentDidMount(){
        const surveyId = this.props.surveyId;
        console.log(surveyId);
        axios.get(`http://localhost:5000/answers/find/` + surveyId)
            .then(response => {
                this.setState({
                    answer: response.data,
                    listAnswer: response.data[0].answerUsers
                })

                console.log(this.state.answer[0].answerUsers);
                console.log(this.state.listAnswer);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    showAnswers(){
        /*console.log(this.state.listAnswer);
        return(
            this.state.listAnswer.map(res => {
                return <ListAnswer answer={res} />
            })
        )*/
    }

    render() {
        return (
            <div>
                <h1>เริ่มต้นวิเคราะห์ข้อมูลทางสถิติ</h1>
                <Button color="primary" block>วิเคราะห์</Button>
                {this.showAnswers()}
            </div>
        )
    }
}

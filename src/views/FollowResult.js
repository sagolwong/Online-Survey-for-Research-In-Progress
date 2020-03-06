import React, { Component } from 'react'
import { Table } from 'reactstrap';
import axios from 'axios';

export default class FollowResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            survey: {},
            names: [],
            members: [],
            frequency: [],
            listTimeToDo: [],
            checkListTime: false,
            follower: [],

        };
        this.showTh = this.showTh.bind(this)
        this.showRow = this.showRow.bind(this)
        this.showName = this.showName.bind(this)
        this.showTD = this.showTD.bind(this)
    }


    async componentDidMount() {
        const surveyId = this.props.surveyId;
        await axios.get(`http://localhost:5000/surveys/find/` + surveyId)
            .then(response => {
                this.setState({
                    survey: response.data,
                    names: response.data.names
                })
                console.log(this.state.survey);
                console.log(this.state.names);
            })
            .catch((error) => {
                console.log(error);
            })
        if (await this.state.survey.names[0] !== undefined) {
            this.state.survey.names.map(userId => {
                axios.get(`http://localhost:5000/users/` + userId)
                    .then(response => {
                        this.setState({
                            members: this.state.members.concat(response.data)
                        })

                        console.log(this.state.members);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        }
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
            var date = []
            this.state.listTimeToDo.map(dates => {
                date = date.concat(dates.day + "-" + dates.month + "-" + dates.year);
            })
            this.setState({
                listTimeToDo: date,
                checkListTime: true
            })
            console.log(this.state.listTimeToDo);
        }
        if (await this.state.survey !== undefined) {
            axios.get('http://localhost:5000/followResults/findS/' + surveyId)
                .then(response => {
                    this.setState({
                        follower: response.data,
                    })
                    console.log(this.state.follower);

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    showTh() {
        return (
            this.state.listTimeToDo.map(date => {
                return (
                    <th>{date}</th>
                )
            })
        )
    }
    showRow() {
        return (
            this.state.follower.map((user,index)=>{
                return (
                    <tr>
                        <th scope="row">{this.showName(index)}</th>
                        {this.showTD(index)}
                    </tr>
                )
            })
        )
    }
    showName(index){
        return (
            this.state.members.map(mem => {
                if(mem._id === this.state.follower[index].userId){
                    return mem.firstname+" "+mem.lastname;
                }
            })
        )
    }
    showTD(index){
        return (
            this.state.listTimeToDo.map(dates => {
                return (
                    this.state.follower[index].follow.map(date =>{
                        if(dates === date) return "/";
                    })
                )
            })
        )
    }

    render() {
        return (
            <div >
                ติดตามผล
                <Table bordered>
                    <thead>
                        <tr>
                            <th>ชื่อ-นามสกุล</th>
                            {this.state.checkListTime ? this.showTh() : ""}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.checkListTime ? this.showRow() : ""}
                    </tbody>
                </Table>
            </div>
        )
    }
}

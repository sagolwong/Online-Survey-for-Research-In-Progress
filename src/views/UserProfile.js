import React, { Component } from 'react'
import { Row, Col, Card, CardImg, Form, FormGroup, Label, Input, CardTitle, Button } from 'reactstrap'
import axios from 'axios';

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            users: {},
            data: [],
            gender: "",
            age: 0
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/5dca538c955945213c0d52ff')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const userId = "5dd404efa2ee2a1478c79d5a";
        this.state.data[0] = userId;
        this.state.data[1] = this.state.gender;
        this.state.data[2] = this.state.age;

        var request = {
            userId: "5e203ad29a267a2818ee1996",
            typeRequest: "upgrade",
            data: this.state.data
        }

        console.log(request);

        axios.post('http://localhost:5000/requests/create', request)
          .then(res => console.log(res.data));

        /*axios.post('http://localhost:5000/users/upgrade/5dca538c955945213c0d52ff', upgrade)
          .then(res => console.log(res.data));*/

        window.location = '/';
    }

    render() {

        return (
            <div className="sec">
                <Row>
                    <Col>
                        <Card>
                            <div className="layout_user_profile1">
                                <CardImg top width="20%" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="COVER" />
                                <div>
                                    {this.state.users.firstname} {this.state.users.lastname}
                                </div>
                                <div>{this.state.users.role}</div>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <div className="layout_user_profile2">
                                <CardTitle>เพิ่มข้อมูลเพื่ออัพเกรดเป็นผู้วิจัย</CardTitle>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>gender: </label>
                                        <select ref="genderInput"
                                            required
                                            className="form-control"
                                            value={this.state.gender}
                                            onChange={this.onChangeGender}>
                                            <option value="male">male</option>
                                            <option value="female">female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>age: </label>
                                        <input type="number"
                                            required
                                            className="form-control"
                                            value={this.state.age}
                                            onChange={this.onChangeAge}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="อัพเกรด" className="btn btn-info" />
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

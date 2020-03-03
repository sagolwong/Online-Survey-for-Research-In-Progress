import React, { Component } from 'react'
import { Row, Col, Card, CardImg, Form, FormGroup, Label, Input, CardTitle, Button } from 'reactstrap'
import axios from 'axios';

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeJob = this.onChangeJob.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            users: {},
            data: [],
            gender: "",
            job: "",
            description: ""

        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/5dc9a42c824eb44fe43c8f94')
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

    onChangeJob(e) {
        this.setState({
            job: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const userId = "5e37c88484824b4da85b9e76";
        this.state.data[0] = userId;
        this.state.data[1] = this.state.gender;
        this.state.data[2] = this.state.job;
        this.state.data[3] = this.state.description;

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
                        {this.state.users.role === "Responder" ?
                            <Card>
                                <div className="layout_user_profile2">
                                    <CardTitle>เพิ่มข้อมูลเพื่ออัพเกรดเป็นผู้วิจัย</CardTitle>
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label>เพศ: </label>
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
                                            <label>อาชีพ: </label>
                                            <select ref="jobInput"
                                                required
                                                className="form-control"
                                                value={this.state.job}
                                                onChange={this.onChangeJob}>
                                                <option value="นักเรียน">นักเรียน</option>
                                                <option value="นิสิต/นักศึกษา">นิสิต/นักศึกษา</option>
                                                <option value="ข้าราชการ/รัฐวิสาหกิจ">ข้าราชการ/รัฐวิสาหกิจ</option>
                                                <option value="พนักงานบริษัทเอกชน">พนักงานบริษัทเอกชน</option>
                                                <option value="ธุรกิจส่วนตัว">ธุรกิจส่วนตัว</option>
                                                <option value="รับจ้าง">รับจ้าง</option>
                                                <option value="แม่บ้าน/พ่อบ้าน">แม่บ้าน/พ่อบ้าน</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>ทำไมถึงอยากยกระดับเป็นผู้วิจัยจงอธิบาย: </label>
                                            <textarea ref="descriptionInput"
                                                required
                                                className="form-control"
                                                value={this.state.description}
                                                onChange={this.onChangeDescription}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="อัพเกรด" className="btn btn-info" />
                                        </div>
                                    </form>
                                </div>
                            </Card> :
                            <Card style={{
                                height: "250px",
                                width: "400px"
                            }}>
                                <div className="layout_user_profile2">
                                    <h4 style={{ textAlign:"center" }} >รายละเอียดผู้ใช้</h4>
                                    <br></br>
                                    <Row>
                                        <Col>
                                            <label>เพศ: </label>
                                        </Col>
                                        <Col>
                                            <p>ชาย</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>อาชีพ: </label>
                                        </Col>
                                        <Col>
                                            <p>นิสิต/นักศึกษา</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>ทำไมถึงอยากยกระดับเป็นผู้วิจัยจงอธิบาย: </label>
                                        </Col>
                                        <Col>
                                            <p>ใช้งานเว็บทำงานวิจัย</p>
                                        </Col>
                                    </Row>
                                </div>

                            </Card>
                        }

                    </Col>
                </Row>
            </div>
        )
    }
}

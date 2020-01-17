import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios';

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeNameProject = this.onChangeNameProject.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            nameProject: "",
            description: "",
            project: {},
            profile: {}
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/5dc9a42c824eb44fe43c8f94')
            .then(response => {
                this.setState({
                    profile: response.data
                })
                console.log(this.state.profile);
                console.log(this.state.profile.recentProjects.length);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeNameProject(e) {
        this.setState({
            nameProject: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();

        var createProject = {
            nameProject: this.state.nameProject,
            description: this.state.description
        }
        var nameProject = this.state.nameProject;
        console.log(createProject);

        await axios.post('http://localhost:5000/projects/createProject/5dc9a42c824eb44fe43c8f94', createProject)
            .then(res => console.log(res.data));


        await axios.get(`http://localhost:5000/projects/5dc9a42c824eb44fe43c8f94/` + nameProject)
            .then(response => {
                this.setState({
                    project: response.data
                })

                console.log(this.state.project[0]._id);
            })
            .catch((error) => {
                console.log(error);
            })

        if (await this.state.profile.recentProjects.length < 10) {
            const editRecentProject = await {
                recentOtherSurveys: this.state.profile.recentOtherSurveys,
                recentProjects: this.state.profile.recentProjects.concat(this.state.project[0]._id)
            }
            await axios.post('http://localhost:5000/users/edit/5dc9a42c824eb44fe43c8f94', editRecentProject)
                .then(res => console.log(res.data));
        } else {
            this.state.profile.recentProjects[0] = await this.state.profile.recentProjects[1];
            this.state.profile.recentProjects[1] = await this.state.profile.recentProjects[2];
            this.state.profile.recentProjects[2] = await this.state.profile.recentProjects[3];
            this.state.profile.recentProjects[3] = await this.state.profile.recentProjects[4];
            this.state.profile.recentProjects[4] = await this.state.profile.recentProjects[5];
            this.state.profile.recentProjects[5] = await this.state.profile.recentProjects[6];
            this.state.profile.recentProjects[6] = await this.state.profile.recentProjects[7];
            this.state.profile.recentProjects[7] = await this.state.profile.recentProjects[8];
            this.state.profile.recentProjects[8] = await this.state.profile.recentProjects[9];
            this.state.profile.recentProjects[9] = await this.state.project[0]._id;
            const editRecentProject = await {
                recentOtherSurveys: this.state.profile.recentOtherSurveys,
                recentProjects: this.state.profile.recentProjects
            }
            await axios.post('http://localhost:5000/users/edit/5dc9a42c824eb44fe43c8f94', editRecentProject)
                .then(res => console.log(res.data));
        }

        window.location = await '/project-management/' + this.state.project[0]._id;
    }

    render() {
        return (
            <div className="sec">
                <div><h2>สร้างโปรเจคแบบสอบถามใหม่</h2></div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="projectName">ชื่อโปรเจค</Label>
                        <Input type="text" value={this.state.nameProject} onChange={this.onChangeNameProject} placeholder="ชื่อโปรเจค" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descript">คำอธิบาย</Label>
                        <Input type="textarea" value={this.state.description} onChange={this.onChangeDescription} placeholder="คำอธิบาย" />
                    </FormGroup>
                    <input type="submit" value="สร้างโปรเจค" className="btn btn-info" ></input>
                </Form>

            </div>
        )
    }
}

import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import CreateSurvey1 from '../views/CreateSurvey1';
import CreateSurvey2 from '../views/CreateSurvey2';
import CreateSurvey3 from '../views/CreateSurvey3';

class baseCreateSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            survey: [],
            sampleGroup: {}
        }
        this.showForm = this.showForm.bind(this);
    }

    async componentDidMount() {
        const projectId = this.props.match.params.projectId;
        const sampleGroupId = this.props.match.params.sampleGroupId;
        console.log(projectId);
        console.log(sampleGroupId);
        await axios.get(`http://localhost:5000/projects/` + projectId)
            .then(response => {
                this.setState({
                    project: response.data
                })

                console.log(this.state.project._id);
            })
            .catch((error) => {
                console.log(error);
            })

        //const id2 = "5e046a7de9573708fc7d4958"
        if (sampleGroupId !== undefined) {
            await axios.get(`http://localhost:5000/sampleGroups/find/` + sampleGroupId)
                .then(response => {
                    this.setState({
                        sampleGroup: response.data
                    })

                    console.log(this.state.sampleGroup._id);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        const data = await {
            projectId: this.state.project._id,
            sampleGroupId: this.state.sampleGroup._id
        }
        console.log(data);
        await this.props.dispatch({
            type: 'ADD_STEP0',
            data
        });

    }

    showForm() {
        if (this.props.test.step === 1) {
            return <CreateSurvey1 />
        } else if (this.props.test.step === 2) {
            return <CreateSurvey2 />
        } else if (this.props.test.step === 3) {
            return <CreateSurvey3 />
        } else if (this.props.test.step === 4) {
            const data = {
                projectId: this.props.test.projectId,
                sampleGroupId: this.props.test.sampleGroupId,
                nameSurvey: this.props.test.nameSurvey,
                description: this.props.test.description,
                shareTo: this.props.test.shareTo,
                wantName: this.props.test.wantName,
                haveGroup: this.props.test.haveGroup,
                names: this.props.test.names,
                listNameExperiments: this.props.test.listNameExperiments,
                listNameControls: this.props.test.listNameControls,
                frequency: this.props.test.frequency,
                doOnce: this.props.test.doOnce,
                openAndCloseTimes: this.props.test.openAndCloseTimes,
                qprocess: this.props.test.qprocess,
                builtIns: this.props.test.builtIns,
                data: this.props.test.data
            }
            console.log(data);
            axios.post(`http://localhost:5000/surveys/create`, data)
                .then(res => {
                    console.log(res.data)
                    axios.get(`http://localhost:5000/surveys/${this.state.project._id}/` + data.nameSurvey)
                        .then(response => {
                            if (this.props.test.dateToDo !== undefined) {
                                const frequency = {
                                    surveyId: response.data[0]._id,
                                    listTimeToDo: this.props.test.dateToDo
                                }
                                axios.post(`http://localhost:5000/frequency/create`, frequency)
                                    .then(res => console.log(res.data))
                            }

                            console.log(response.data[0]._id);
                            window.location = '/survey-management/' + response.data[0]._id;
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                });


            //window.location = '/survey-management/' + ;

        }
    }



    render() {
        return (
            <div>
                {this.showForm()}
                {console.log(this.props.test)}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        test: state
    }
}
export default connect(mapStateToProps)(baseCreateSurvey);
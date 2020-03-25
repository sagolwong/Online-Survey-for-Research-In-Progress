import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import EditSurvey from '../views/EditSurvey';
import ReviewSurvey from '../views/ReviewSurvey';

class baseEditSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            prototype: {},
            data: {}
        }
        this.showEditForm = this.showEditForm.bind(this);
    }
    async componentDidMount() {
        const type = this.props.match.params.type;
        const id = this.props.match.params.id;
        var projectId = "";
        var sampleGroupId = "";

        if(await type ==="prototype"){
            projectId = this.props.match.params.projectId;
            if(this.props.match.params.sampleGroupId !== "no") sampleGroupId = this.props.match.params.sampleGroupId;
        }

        if (await type === "draft") {
            await axios.get(`http://localhost:5000/surveys/find/` + id)
                .then(response => {
                    this.setState({
                        survey: response.data
                    })

                    console.log(this.state.survey);
                })
                .catch((error) => {
                    console.log(error);
                })

            var data = await {
                projectId: this.state.survey.projectId,
                sampleGroupId: this.state.survey.sampleGroupId,
                nameSurvey: this.state.survey.nameSurvey,
                description: this.state.survey.description,
                shareTo: this.state.survey.shareTo,
                wantName: this.state.survey.wantName,
                haveGroup: this.state.survey.haveGroup,
                doOnce: this.state.survey.doOnce,
                frequency: this.state.survey.frequency,
                openAndCloseTimes: this.state.survey.openAndCloseTimes,
                builtIns: this.state.survey.builtIns,
                data: this.state.survey.data,
                status: this.state.survey.status
            }
        } else if (await type === "prototype") {
            await axios.get(`http://localhost:5000/prototypes/find/` + id)
                .then(response => {
                    this.setState({
                        prototype: response.data
                    })

                    console.log(this.state.prototype);
                })
                .catch((error) => {
                    console.log(error);
                })

            var data = await {
                projectId: projectId,
                sampleGroupId: sampleGroupId,
                nameSurvey: this.state.prototype.nameSurvey,
                description: this.state.prototype.description,
                shareTo: this.state.prototype.shareTo,
                wantName: this.state.prototype.wantName,
                haveGroup: this.state.prototype.haveGroup,
                doOnce: this.state.prototype.doOnce,
                frequency: this.state.prototype.frequency,
                openAndCloseTimes: this.state.prototype.openAndCloseTimes,
                builtIns: this.state.prototype.builtIns,
                data: this.state.prototype.data,
                status: "prototype"
            }
        }
        this.setState({ data: data })
        console.log(data);
        await this.props.dispatch({
            type: 'EDIT_STEP0',
            data
        });
    }

    showEditForm() {
        if (this.props.test.step === "e1") {
            return <EditSurvey />
        } else if (this.props.test.step === "e2") {
            console.log(this.props.test)
            return <ReviewSurvey type={this.props.match.params.type} />
        } else if (this.props.test.step === "e3") {
            console.log(this.props.test)
            if (this.props.match.params.type === "prototype") {
                /*if (this.props.test.nameSampleGroup !== "") {
                    const sample = {
                        nameSampleGroup: this.props.test.nameSampleGroup
                    }
                    var data = {};
                    console.log(sample);
                    const projectId = this.props.test.projectId;
                    axios.post(`http://localhost:5000/sampleGroups/createSampleGroup/${projectId}`, sample)
                        .then(res => {
                            console.log(res.data)
                            axios.get(`http://localhost:5000/sampleGroups/findSG/${projectId}/${this.props.test.nameSampleGroup}`)
                                .then(response => {
                                    data = {
                                        projectId: this.props.test.projectId,
                                        sampleGroupId: response.data[0]._id,
                                        nameSurvey: this.props.test.nameSurvey,
                                        description: this.props.test.description,
                                        shareTo: this.props.test.shareTo,
                                        wantName: this.props.test.wantName,
                                        haveGroup: this.props.test.haveGroup,
                                        names: this.props.test.names,
                                        frequency: this.props.test.frequency,
                                        doOnce: this.props.test.doOnce,
                                        openAndCloseTimes: this.props.test.openAndCloseTimes,
                                        qprocess: this.props.test.qprocess,
                                        builtIns: this.props.test.builtIns,
                                        data: this.props.test.data,
                                        status: this.props.test.status
                                    }
                                    axios.post(`http://localhost:5000/surveys/create`, data)
                                        .then(res => {
                                            console.log(res.data)
                                            axios.get(`http://localhost:5000/surveys/${this.props.test.projectId}/` + data.nameSurvey)
                                                .then(response => {
                                                    console.log(response.data[0]._id);
                                                    if (this.props.test.status === "publish") {
                                                        if (this.props.test.dateToDo !== undefined) {
                                                            const frequency = {
                                                                surveyId: response.data[0]._id,
                                                                listTimeToDo: this.props.test.dateToDo
                                                            }
                                                            axios.post(`http://localhost:5000/frequency/create`, frequency)
                                                                .then(res => console.log(res.data))
                                                        }
                                                        window.location = '/survey-management/' + response.data[0]._id;
                                                    } else if (this.props.test.status === "draft") {
                                                        window.location = '/';
                                                    }

                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                })
                                        });

                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        });*/
                /*data = {
                    projectId: this.props.test.projectId,
                    sampleGroupId: response.data[0]._id,
                    nameSurvey: this.props.test.nameSurvey,
                    description: this.props.test.description,
                    shareTo: this.props.test.shareTo,
                    wantName: this.props.test.wantName,
                    haveGroup: this.props.test.haveGroup,
                    names: this.props.test.names,
                    frequency: this.props.test.frequency,
                    doOnce: this.props.test.doOnce,
                    openAndCloseTimes: this.props.test.openAndCloseTimes,
                    qprocess: this.props.test.qprocess,
                    builtIns: this.props.test.builtIns,
                    data: this.props.test.data,
                    status: this.props.test.status
                }
                axios.post(`http://localhost:5000/surveys/create`, data)
                    .then(res => {
                        console.log(res.data)
                        axios.get(`http://localhost:5000/surveys/${this.props.test.projectId}/` + data.nameSurvey)
                            .then(response => {
                                console.log(response.data[0]._id);
                                if (this.props.test.status === "publish") {
                                    if (this.props.test.dateToDo !== undefined) {
                                        const frequency = {
                                            surveyId: response.data[0]._id,
                                            listTimeToDo: this.props.test.dateToDo
                                        }
                                        axios.post(`http://localhost:5000/frequency/create`, frequency)
                                            .then(res => console.log(res.data))
                                    }
                                    window.location = '/survey-management/' + response.data[0]._id;
                                } else if (this.props.test.status === "draft") {
                                    window.location = '/';
                                }

                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    });*/

                // } else if (this.props.test.nameSampleGroup === "" /*&& this.props.test.sampleGroupId !== ""*/) {
                const data = {
                    projectId: this.props.test.projectId,
                    sampleGroupId: this.props.test.sampleGroupId,
                    nameSurvey: this.props.test.nameSurvey,
                    description: this.props.test.description,
                    shareTo: this.props.test.shareTo,
                    wantName: this.props.test.wantName,
                    haveGroup: this.props.test.haveGroup,
                    names: this.props.test.names,
                    frequency: this.props.test.frequency,
                    doOnce: this.props.test.doOnce,
                    openAndCloseTimes: this.props.test.openAndCloseTimes,
                    qprocess: this.props.test.qprocess,
                    builtIns: this.props.test.builtIns,
                    data: this.props.test.data,
                    status: this.props.test.status
                }
                axios.post(`http://localhost:5000/surveys/create`, data)
                    .then(res => {
                        console.log(res.data)
                        axios.get(`http://localhost:5000/surveys/${this.props.test.projectId}/` + data.nameSurvey)
                            .then(response => {
                                console.log(response.data[0]._id);
                                if (this.props.test.status === "publish") {
                                    if (this.props.test.dateToDo !== undefined) {
                                        const frequency = {
                                            surveyId: response.data[0]._id,
                                            listTimeToDo: this.props.test.dateToDo
                                        }
                                        axios.post(`http://localhost:5000/frequency/create`, frequency)
                                            .then(res => console.log(res.data))
                                    }
                                    window.location = '/survey-management/' + response.data[0]._id;
                                } else if (this.props.test.status === "draft") {
                                    window.location = '/';
                                }

                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    });
                // }
            } else if (this.props.match.params.type === "draft") {
                const data = {
                    projectId: this.props.test.projectId,
                    sampleGroupId: this.props.test.sampleGroupId,
                    nameSurvey: this.props.test.nameSurvey,
                    description: this.props.test.description,
                    shareTo: this.props.test.shareTo,
                    wantName: this.props.test.wantName,
                    haveGroup: this.props.test.haveGroup,
                    names: this.props.test.names,
                    frequency: this.props.test.frequency,
                    doOnce: this.props.test.doOnce,
                    openAndCloseTimes: this.props.test.openAndCloseTimes,
                    qprocess: this.props.test.qprocess,
                    builtIns: this.props.test.builtIns,
                    data: this.props.test.data,
                    status: this.props.test.status
                }
                axios.post(`http://localhost:5000/surveys/editSurvey/${this.props.match.params.id}`, data)
                    .then(res => {
                        console.log(res.data)
                        axios.get(`http://localhost:5000/surveys/${this.props.test.projectId}/` + data.nameSurvey)
                            .then(response => {
                                console.log(response.data[0]._id);
                                if (this.props.test.status === "publish") {
                                    if (this.props.test.dateToDo !== undefined) {
                                        const frequency = {
                                            surveyId: response.data[0]._id,
                                            listTimeToDo: this.props.test.dateToDo
                                        }
                                        axios.post(`http://localhost:5000/frequency/create`, frequency)
                                            .then(res => console.log(res.data))
                                    }
                                    window.location = '/survey-management/' + response.data[0]._id;
                                } else if (this.props.test.status === "draft") {
                                    window.location = '/';
                                }

                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    });
            }
        }
    }
    render() {
        return (
            <div>
                {this.showEditForm()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        test: state
    }
}
export default connect(mapStateToProps)(baseEditSurvey);

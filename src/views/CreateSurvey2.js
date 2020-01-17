import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'
import SurveyCreator from "../components/SurveyCreator";
import { connect } from 'react-redux';

class CreateSurvey2 extends Component {
    constructor(props) {
        super(props);

        this.onChangeBuiltInWidgetGender = this.onChangeBuiltInWidgetGender.bind(this);
        this.onChangeBuiltInWidgetAges = this.onChangeBuiltInWidgetAges.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            builtInWidgetGender: false,
            builtInWidgetAges: false,
            goToStep3: false
        };
    }

    onChangeBuiltInWidgetGender(e) {
        this.setState({
            builtInWidgetGender: !this.state.builtInWidgetGender
        })
    }
    onChangeBuiltInWidgetAges(e) {
        this.setState({
            builtInWidgetAges: !this.state.builtInWidgetAges
        })
    }
    onSubmit(e) {
        e.preventDefault();
       
        this.setState({
            goToStep3: true
        })
        //window.location = '/create-project/project-management/create-survey3';
    }

    render() {
        return (
            <div className="editor">
                <h4>Built-In</h4>
                <p>โปรดเลือกคำถามเกี่ยวกับข้อมูลส่วนตัวจากที่นี่</p>
                <FormGroup check>
                    <div>
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetGender} />{''}
                            คำถามเรื่องเพศ
                        </Label>
                    </div>
                        
                        <Label check>
                            <Input type="checkbox" onChange={this.onChangeBuiltInWidgetAges} />{''}
                            คำถามเรื่องอายุ
                        </Label>
                    </FormGroup>
                <SurveyCreator builtIns={this.state}/>
                <Button color="info" onSubmit={this.onSubmit}>ต่อไป</Button>
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
export default connect(mapStateToProps)(CreateSurvey2);

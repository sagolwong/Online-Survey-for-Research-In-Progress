import React, { Component } from "react";
import { Button } from 'reactstrap'
import * as SurveyJSCreator from "survey-creator";
import * as SurveyKo from "survey-knockout";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "icheck/skins/square/blue.css";

import * as widgets from "surveyjs-widgets";
import { connect } from 'react-redux';

SurveyJSCreator.StylesManager.applyTheme("default");

widgets.icheck(SurveyKo, $);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

class SurveyCreator extends Component {
  surveyCreator;
  componentDidMount() {
    let options = { showEmbededSurveyTab: true };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    console.log(JSON.parse(JSON.stringify(this.surveyCreator.text)));
  }
  render() {
    return <div id="surveyCreatorContainer" />
  }
  saveMySurvey = () => {
    console.log(JSON.parse(JSON.stringify(this.surveyCreator.text)));
    let builtIns;
    let formSurvey;
    if (this.props.builtIns.builtInWidgetGender && this.props.builtIns.builtInWidgetAges) {
      builtIns = [
        { builtInWidget: "gender" },
        { builtInWidget: "ages" }
      ]
    } else if (this.props.builtIns.builtInWidgetGender && !this.props.builtIns.builtInWidgetAges) {
      builtIns = [
        { builtInWidget: "gender" }
      ]
    } else if (!this.props.builtIns.builtInWidgetGender && this.props.builtIns.builtInWidgetAges) {
      builtIns = [
        { builtInWidget: "ages" }
      ]
    }

    if (builtIns) {
      formSurvey = {
        data: JSON.parse(JSON.stringify(this.surveyCreator.text)),
        builtIns: builtIns
      }
    } else {
      formSurvey = {
        data: JSON.parse(JSON.stringify(this.surveyCreator.text))
      }
    }


    this.props.dispatch({
      type: 'ADD_STEP2',
      formSurvey
    });


    console.log(this.props.test)
  };
}
const mapStateToProps = (state) => {
  return {
    test: state
  }
}
export default connect(mapStateToProps)(SurveyCreator);
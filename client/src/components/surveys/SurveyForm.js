//SurveyForm shows a form for a user to add a new survey
import React, { Component } from 'react';
// reduxForm allows component to communicate with redux store, much
// like connect function in components
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return <div>SurveyForm</div>;
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);

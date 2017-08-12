//SurveyFormReview shows users their inputs for review

import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';

const SurveyFormReview = ({ onCancel, formValues }) => {
  const reviewFields = formFields.map(field => {
    return (
      <div key={field.name}>
        <label>
          {field.label}
        </label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  //console.log(state);
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);

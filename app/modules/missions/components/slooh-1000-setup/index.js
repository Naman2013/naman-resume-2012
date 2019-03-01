import React, { Component } from 'react';
import { Select } from '../../../../components/common/select';
import Button from '../../../../components/common/style/buttons/Button';
import './styles.scss';

export class Slooh1000Setup extends Component {
  render() {
    const {
      categoryListOpts,
      setCategory,
      objectListOpt,
      setObject,
    } = this.props;
    console.log(objectListOpt);
    return (
      <div className="slooh-1000-setup">
        <div className="row setup-header">
          <h2>Set up with Slooh Recommender!</h2>
          <p>
            Welcome to the Slooh Recommender! Tell us what you want to see,
            we’ll tell you which scope to use, and the best time to see it!
          </p>
        </div>

        <div className="steps row">
          <div className="col-sm-6 step-1">
            <span>Step 1: Choose Category</span>
            <Select
              handleChange={setCategory}
              options={categoryListOpts}
              placeholder="Choose"
            />
          </div>

          <div className="col-sm-6 step-2">
            <span>Step 2: Choose Object</span>
            <Select
              handleChange={setObject}
              options={objectListOpt}
              placeholder="Choose"
              isDisabled={objectListOpt.length === 0}
            />
          </div>
        </div>

        <div className="steps row">
          <div className="col-sm-6 messages">
            <p>(messages go here)</p>
          </div>

          <div className="col-sm-6 step-3">
            <span>Step 3: Click or tap to schedule</span>
            <Button text="Schedule Mission" onClickEvent={() => {}} />
          </div>
        </div>
      </div>
    );
  }
}

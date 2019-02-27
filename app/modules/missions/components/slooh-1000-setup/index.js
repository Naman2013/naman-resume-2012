import DropDown from 'app/components/common/DropDown';
import React, { Component } from 'react';
import './styles.scss';

export class Slooh1000Setup extends Component {
  render() {
    const { categoryListOpts, setCategory } = this.props;
    return (
      <div className="slooh-1000-setup">
        <h2>Set up with Slooh Recommender2!</h2>
        <p>
          Welcome to the Slooh Recommender! Tell us what you want to see, we’ll
          tell you which scope to use, and the best time to see it!
        </p>

        <div className="steps row">
          <div className="col-sm-6 step-1">
            <span>Step 1: Choose Category</span>
            <DropDown
              handleSelect={() => {}}
              selectedIndex={1}
              options={categoryListOpts}
            />
          </div>

          <div className="col-sm-6 step-2">
            <span>Step 2: Choose Object</span>
            <DropDown handleSelect={() => {}} selectedIndex={1} options={[]} />
          </div>
        </div>
      </div>
    );
  }
}

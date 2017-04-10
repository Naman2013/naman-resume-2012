import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import s from './call-to-action.scss';

class CallToAction extends Component {
  render() {
    return (
      <div className={s.CallToAction}>
        <h1>Nothing here yet...  Create something new!</h1>
        <hr className={s.Divider} />
        <Link className="button btn-primary" to="/publish-post">
          Contribute Content
        </Link>
      </div>
    );
  }
}

export default CallToAction;

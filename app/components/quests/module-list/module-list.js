/** *********************************
* V4 Quest Step
*
*
*
***********************************/

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import modules from './moduleListConfig';
import styles from './module-list.style';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;


export const ModuleList = (props) => {
  const {
    moduleList,
    questId,
  } = props;
  return (
    <div className="root">
      {moduleList.map((mod) => {
        const {
          moduleType,
          moduleId,
        } = mod;
        const module = modules.enumValueOf(moduleType);
        if (!module) return null;
        return (
          // <Request
          //   authorizationRedirect
          //   serviceURL={module.apiEndpoint}
          //   model={module.model}
          //   method="POST"
          //   serviceExpiresFieldName="expires"
          //   requestBody={{
          //     moduleId,
          //     questId,
          //   }}
          //   render={({
          //     fetchingContent,
          //     modeledResponses,
          //   }) => (
          //     <Fragment>
          //       {module.render({ fetching: fetchingContent, ...modeledResponses[module.model.name] })}
          //     </Fragment>
          //   )}
          // />
          // remove the code on line 58 and uncomment above once APIs are working
          <div>{module.render({ fetching: false, ...module.model.model() })}</div>
        )
      })}
      <style jsx>{styles}</style>
    </div>
  );
};

ModuleList.propTypes = {
  moduleList: arrayOf(shape({
    moduleId: string,
    moduleIdUser: number,
    moduleIndex: number,
    moduleType: string,
  })),
};

ModuleList.defaultProps = {
  moduleList: [],
}

export default ModuleList;

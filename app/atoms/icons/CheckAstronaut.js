import React from 'react';
import SVGRoot from './SVGRoot';

const CheckAstronaut = ({ width, height }) => (
  <SVGRoot width={width} height={height}>
    <g id="UniversalNavigation_LoggedInUser" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="05_UVSLNav_Alerts_b_AlertPref" transform="translate(-786.000000, -152.000000)" fill="#41566F" fillRule="nonzero">
        <g id="Group-18" transform="translate(764.000000, 83.000000)">
          <g id="Group-16" transform="translate(20.000000, 66.000000)">
            <g id="Check_Blue" transform="translate(2.000000, 3.000000)">
              <path d="M4.52659679,7.63512562 C4.07321503,8.12162479 3.33756373,8.12162479 2.88440078,7.63512562 L0.340036323,4.90490726 C-0.113345441,4.41864287 -0.113345441,3.62925569 0.340036323,3.14299131 C0.793199274,2.65649213 1.52885057,2.65649213 1.98223234,3.14299131 L3.49817291,4.76942944 C3.61261242,4.89199343 3.79838516,4.89199343 3.91304348,4.76942944 L8.01776766,0.364874384 C8.47093061,-0.121624795 9.20658191,-0.121624795 9.65996368,0.364874384 C9.8776832,0.5984973 10,0.915473116 10,1.24583236 C10,1.57619159 9.8776832,1.89316741 9.65996368,2.12679033 L4.52659679,7.63512562 Z" id="Shape" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </SVGRoot>
);

CheckAstronaut.defaultProps = {
  width: '10',
  height: '8',
};

export default CheckAstronaut;

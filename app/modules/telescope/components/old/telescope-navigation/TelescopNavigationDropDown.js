// @flow
import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import noop from 'lodash/fp/noop';
import './index.scss';

const CustomOption = props => {
  const {
    children,
    data: {
      value,
      thumbnailURL,
      observatoryUniqueID,
      telescopeUniqueID,
      instruments
    },
    selectProps: { activeInstrumentID, updateCurrentInstrument },
    selectOption
  } = props;

  const path = `telescope-details/${observatoryUniqueID}/${telescopeUniqueID}`;

  const handleClick = (instrument: Object) => () => {
    if (instrument.instrUniqueId === activeInstrumentID) return;
    selectOption(value);
    return updateCurrentInstrument(instrument);
  };

  return (instruments && instruments.length) ? (
    <div className="dropdown-opt">
      <div className="dropdown-name">
        <img
          className="option-icon"
          src={thumbnailURL}
          alt={children}
        />
        <Container fluid>
          <Row>
            <Col sm={6} md={3}>{children}: </Col>
            <Col sm={6} md={9} className="option-instruments">
            {instruments.map(instrument => {
              return (
                <Link
                  key={instrument.instrUniqueId}
                  to={`${path}/${instrument.instrUniqueId}`}
                  className={classnames('dropdown-link', {
                    active: instrument.instrUniqueId === activeInstrumentID,
                  })}
                  onClick={handleClick(instrument)}
                >
                  {instrument.instrTelescopeShortName}
                </Link>
              )
            })}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  ) : null;
};

type TTelescopNavigationDropDown = {
  selectedIndex?: number,
  options: Array<{
    value: number | string,
    label: string | Object,
    thumbnailURL: string,
    observatoryUniqueID: string,
    telescopeUniqueID: string,
    instruments: Array<Object>
  }>,
  handleBlur?: Function,
  handleMenuClose?: Function,
  autoFocus?: boolean,
  defaultMenuIsOpen?: boolean,
  customOption?: React.Node,
  activeInstrumentID: string,
  updateCurrentInstrument: Function
};

const TelescopNavigationDropDown = (props: TTelescopNavigationDropDown) => {
  const { options,
    defaultMenuIsOpen = false,
    selectedIndex = 0,
    autoFocus = false,
    handleBlur = noop,
    handleMenuClose = noop,
    customOption = CustomOption,
    activeInstrumentID,
    updateCurrentInstrument
  } = props;

  return (options && options.length) ? (
    <div className="root telescop-select-wrapper">
      <Select
        defaultMenuIsOpen={defaultMenuIsOpen}
        components={{
          Option: props =>
            customOption(props, selectedIndex),
        }}
        defaultValue={options[0]}
        onBlur={handleBlur}
        onMenuClose={handleMenuClose}
        options={options}
        value={selectedIndex}
        isSearchable={false}
        classNamePrefix="slooh-select"
        autoFocus={autoFocus}
        activeInstrumentID={activeInstrumentID}
        updateCurrentInstrument={updateCurrentInstrument}
      />
    </div>
  ) : null;
};

export default TelescopNavigationDropDown;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridContainer from '../grid/GridContainer';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';

class ObjectVisibilityProfile extends Component {
  state = {
    riseAndSetTimeAPIResponse: undefined,
    month: 1,
    day: 22,
    year: 2018,
  }

  fetchRiseSetData = () => {
    console.log('TODO: implement rise/set data');
  }

  handleMonthChange = (event) => {
    console.log(event.target.value);
  }

  render() {
    return (
      <GridContainer theme={{ margin: '20px 0 0 0' }}>
        <form
          method="POST"
          onChange={this.handleDateChange}
        >
          <Row>
            <StaticCell title="Rise &#38; set times">
              <select onChange={this.handleMonthChange} id="month-select">
                <option value="01">Jan</option>
                <option value="02">Feb</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">Aug</option>
                <option value="09">Sept</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
            </StaticCell>
          </Row>
          <Row>
            <StaticCell title="Rise" hasBorderScale={[true]}>
              <p>6&#58;08 am</p>
            </StaticCell>
            <StaticCell title="Transit" hasBorderScale={[true]}>
              <p>10&#58;44 am</p>
            </StaticCell>
            <StaticCell title="Set">
              <p>3&#58;18 pm</p>
            </StaticCell>
          </Row>
          <Row>
            <StaticCell title="Notes">
              <p>Slightly difficult to see...</p>
            </StaticCell>
          </Row>
        </form>
      </GridContainer>
    );
  }
}

ObjectVisibilityProfile.propTypes = {};

export default ObjectVisibilityProfile;

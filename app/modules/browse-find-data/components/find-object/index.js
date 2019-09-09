import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import './styles.scss';

export class FindObject extends PureComponent {
  state = {
    findValue: '',
  };

  findObject = e => {
    const { fetchBrowseFindDataAction } = this.props;
    const { findValue } = this.state;
    fetchBrowseFindDataAction(findValue);
  };

  resetFindData = () => {
    const { resetBrowseFindDataAction } = this.props;
    this.setState({ findValue: '' });
    resetBrowseFindDataAction();
  };

  render() {
    const {
      browserFindData,
      isDisabled,
      onSelect,
      selectedObject,
    } = this.props;
    const { findValue } = this.state;
    const { findMessage, findData } = browserFindData;

    return (
      <div className="find-object-container">
        <input
          placeholder="Find a Slooh 1000 Object"
          value={findValue}
          onChange={e => this.setState({ findValue: e.target.value })}
          disabled={isDisabled}
        />

        <div className="find-object-actions">
          <Button onClick={this.findObject} disabled={isDisabled}>
            Find
          </Button>
          <Button onClick={this.resetFindData} disabled={isDisabled}>
            Clear
          </Button>
        </div>

        {findMessage && !isDisabled && (
          <>
            <hr />

            <div
              className="find-object-message"
              dangerouslySetInnerHTML={{ __html: findMessage }}
            />

            <div className="find-object-result-list">
              {findData.map(item => (
                <div
                  className={cx('search-results-item', {
                    selected: item.astroObjectId === selectedObject,
                  })}
                  key={item.astroObjectId}
                  onClick={() => onSelect(item.astroObjectId)}
                >
                  {item.title}
                </div>
              ))}
            </div>

            <hr />
          </>
        )}
      </div>
    );
  }
}

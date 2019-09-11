import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import './styles.scss';

export class FindObject extends PureComponent {
  componentDidMount() {
    this.resetFindData();
  }

  componentWillUnmount() {
    this.resetFindData();
  }

  findObject = e => {
    const { fetchBrowseFindDataAction, onFind, findValue } = this.props;
    fetchBrowseFindDataAction(findValue).then(() => onFind());
  };

  resetFindData = () => {
    const { resetBrowseFindDataAction, onChange } = this.props;
    onChange('');
    resetBrowseFindDataAction();
  };

  render() {
    const {
      browserFindData,
      onSelect,
      selectedObject,
      findObjectResultVisible,
      onChange,
      findValue,
    } = this.props;
    const { findMessage, findData } = browserFindData;

    return (
      <div className="find-object-container">
        <input
          placeholder="Find a Slooh 1000 Object"
          value={findValue}
          onChange={e => onChange(e.target.value)}
        />

        <div className="find-object-actions">
          <Button onClick={this.findObject}>Find</Button>
          <Button onClick={this.resetFindData}>Clear</Button>
        </div>

        {findMessage && findObjectResultVisible && (
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

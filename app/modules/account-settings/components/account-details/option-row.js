import React, { PureComponent } from 'react';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { Row, Col } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';

// TODO: refactor using React hook
class AccountOptionRow extends PureComponent {
  state = { editableId: null };

  onClick = id => () => this.setState({ editableId: id });

  onCancel = () => this.setState({ editableId: null });

  render() {
    const { i, label, currentValue, hintText } = this.props;
    const { editableId } = this.state;
    const id = `${i}-${label}-${currentValue}`;

    return (
      <DeviceContext.Consumer>
        {context => (
          <div className="i-box i-box-white pad-40 margin-bot-10 min-height-150">
            <Row>
              <Col md={context.isDesktop ? 6 : 12}>
                <h4 className="h-4">{label}</h4>

                <div className="margin-top-10">
                  <h2 className="h-2 h-2-md text-capitalize">
                    {editableId === id ? (
                      <div className="form-field">
                        <input
                          type="text"
                          className="input"
                          placeholder={currentValue}
                        />
                      </div>
                    ) : (
                      <span>{currentValue}</span>
                    )}
                  </h2>
                </div>
              </Col>

              {context.isDesktop ? (
                <Col md={6} className="row-reverse">
                  {editableId === id ? (
                    <div className="btn-group margin-top-15">
                      <Btn onClick={this.onCancel}>Cancel</Btn>
                      <Btn>Submit</Btn>
                    </div>
                  ) : (
                    <div className="btn-group margin-top-21">
                      <Btn mod="block-140" onClick={this.onClick(id)}>
                        Edit
                      </Btn>
                    </div>
                  )}
                </Col>
              ) : null}
            </Row>
          </div>
        )}
      </DeviceContext.Consumer>
    );
  }
}

export { AccountOptionRow };

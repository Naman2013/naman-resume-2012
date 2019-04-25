import React, { PureComponent } from 'react';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
import InputField from 'app/components/form/InputField';
import Btn from 'app/atoms/Btn';

// TODO: refactor using React hook
class AccountOptionRow extends PureComponent {
  state = { editableId: null };

  onClick = id => () => this.setState({ editableId: id });

  render() {
    const { i, name, type } = this.props;
    const { editableId } = this.state;
    // TODO: replace with normal id
    const id = `${i}${name}`;

    return (
      <DeviceContext.Consumer>
        {context => (
          <div
            onClick={this.onClick(id)}
            className="i-box i-box-white pad-40 margin-bot-10"
          >
            <Row>
              <Col md={context.isDesktop ? 6 : 12}>
                <h4 className="h-4">{name}</h4>

                <div className="margin-top-10">
                  <h2 className="h-2 h-2-md text-capitalize">
                    {editableId === id ? (
                      <Field
                        name="password"
                        type="password"
                        className="form-field ml-0 test"
                        label={type}
                        component={InputField}
                      />
                    ) : (
                      <span>{type}</span>
                    )}
                  </h2>
                </div>
              </Col>

              {context.isDesktop ? (
                <Col md={6} className="row-reverse">
                  {editableId === id ? (
                    <div className="btn-group margin-top-15">
                      <Btn>Submit</Btn>
                      <Btn>Cancel</Btn>
                    </div>
                  ) : (
                    <Btn mod="block-140">Edit</Btn>
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

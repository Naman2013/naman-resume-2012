import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';

class AccountOptionRow extends PureComponent {
  state = { editableId: null, value: '' };

  onClick = id => () => this.setState({ editableId: id });

  onCancel = () => this.setState({ editableId: null });

  handleChange = e => this.setState({ value: e.target.value });

  handleSubmit = () => {
    const { value } = this.state;
    const { fetchAccountFormFieldAction, formFieldName } = this.props;
    // TODO: use debounce for validation
    if (value && value.length > 3) {
      this.onCancel();
      fetchAccountFormFieldAction(formFieldName, value);
    }
  };

  render() {
    const { i, label, currentValue, hintText, transformText } = this.props;
    const { value } = this.state;
    const { editableId } = this.state;
    const id = `${i}-${label}-${currentValue}`;

    return (
      <div className="i-box i-box-white pad-40 margin-bot-10 min-height-150">
        <Row>
          <Col md={7}>
            <h4 className="h-4">{label}</h4>

            <div className="margin-top-10">
              <h2
                className={`h-2 h-2-md ${
                  transformText ? 'text-capitalize' : 'text-no-transform'
                }`}
              >
                {editableId === id ? (
                  <div className="form-field">
                    <input
                      type="text"
                      className="input"
                      placeholder={hintText}
                      value={value || currentValue}
                      onChange={this.handleChange}
                    />
                  </div>
                ) : (
                  <span>{currentValue}</span>
                )}
              </h2>
            </div>
          </Col>

          <Col md={5} className="row-reverse">
            {editableId === id ? (
              <div className="btn-group margin-top-15">
                <Btn onClick={this.onCancel}>Cancel</Btn>
                <Btn onClick={this.handleSubmit}>Submit</Btn>
              </div>
            ) : (
              <div className="btn-group margin-top-21">
                <Btn mod="block-140" onClick={this.onClick(id)}>
                  Edit
                </Btn>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export { AccountOptionRow };

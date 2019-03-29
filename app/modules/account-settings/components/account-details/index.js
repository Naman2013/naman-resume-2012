// @flow
import React, { Fragment, PureComponent } from 'react';
import { Field } from 'redux-form';
import InputField from 'components/form/InputField';
import { Container, Row, Col } from 'react-bootstrap';
import { TFormField, TAccountTypeItem } from '../../types';
import { DeviceContext } from 'providers/DeviceProvider';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import img from './image-temp.png';

type TAccountDetails = {
  accountTypeItems      : Array<TAccountTypeItem>,
  accountDetailsOptions : Array<TFormField>,
  paymentDetailsOptions : Array<TFormField>,
};

const AccountDetails = (props: TAccountDetails) => {
  const {
    accountTypeItems,
    accountDetailsOptions,
    paymentDetailsOptions,
  } = props;
  if(!accountTypeItems || !accountDetailsOptions || !paymentDetailsOptions) {
    return null;
  }
  const styleBg = {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%'
  };

  const renderActions = () => {
    return (
      <div className="btn-group pad-top-20 pad-bot-40">
        <Btn mod="circle">
          <Icon i="info" />
        </Btn>
        <Btn mod="circle">
          <Icon i="ellipsis-h" />
        </Btn>
        <Btn>Upgrade</Btn>
      </div>
    )
  };

  return (
      <DeviceContext.Consumer>
        {context => (
        <Fragment>
          <div
            className="pad-40-20 shadow"
            style={context.isTablet ? styleBg : null}
          >
            <Container fluid>
              <Row noGutters>
                {context.isDesktop ? (
                  <Col md={4}>
                    <div className="i-image">
                      <img src={img} alt=""/>
                    </div>
                  </Col>
                ) : null }

                <Col md={context.isDesktop ? 8 : 12} className="flex-col">
                  <div className="i-box i-box-white pad-40 no-bottom-pad">
                    <h4
                      className="h-4 pad-bot-20 font-weight-normal"
                    >
                      Account type:
                    </h4>
                    <hr className="hr" />
                    <h2
                      className="h-2 h-2-lg h-2-dark pad-top-15 pad-bot-10"
                    >
                      Astronomer
                    </h2>
                    <hr className="hr" />
                    <ul className="list-with-params">
                      {accountTypeItems.map((item, i) => {
                        return (
                          <li key={i}>
                            <h5 className="h-5 font-weight-normal">
                              {item.label}: {item.name}
                            </h5>
                          </li>
                        )
                      })}
                    </ul>

                    {renderActions()}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <AccountDetailsHeader title="Account details"/>

          <div className="margin-40-20">
            <Container fluid>
              {accountDetailsOptions.map((option, i) => {
                return <AccountOptionRow key={i} i={i} {...option} />;
              })}
            </Container>
          </div>

          <AccountDetailsHeader title="Payment details"/>

          <div className="margin-40-20">
            <Container fluid>
              {paymentDetailsOptions.map((option, i) => {
                return <AccountOptionRow key={i} i={i} {...option} />;
              })}
            </Container>
          </div>
        </Fragment>
      )}
    </DeviceContext.Consumer>
  );
};

const AccountDetailsHeader = ({ title }) => {
  return (
    <DeviceContext.Consumer>
      {context => (
        <div className="margin-40-20">
          <Container fluid>
            <Row className="align-items-center">
              <Col
                md={context.isMobile ? 12 : 8}
                className={
                  context.isMobile ? 'flex-row justify-content-center' : null
                }>
                <h2 className="h-2 h-2-primary h-2-bold">
                  {title}
                </h2>
              </Col>

              <Col
                md={context.isMobile ? 12 : 4}
                className={
                  context.isMobile
                    ? 'flex-row justify-content-center margin-top-10'
                    : 'row-reverse'
                }>
                <Btn>Edit all <Icon i="pencil" /></Btn>
              </Col>

              <hr className="hr margin-top-10 pad-bot-15 left-right-15" />
            </Row>
          </Container>
        </div>
      )}
    </DeviceContext.Consumer>
  )
};

class AccountOptionRow extends PureComponent<TFormField>  {

  state = { editableId: null };

  onClick = id => e => {
    console.log('id', id);
    this.setState({ editableId: id });
  };

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
            className="i-box i-box-white pad-40 margin-bot-10">
            <Row>
              <Col md={context.isDesktop ? 6 : 12}>
                <h4 className="h-4 h-4-normal">{name}</h4>

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
    )
  }
}

export { AccountDetails };

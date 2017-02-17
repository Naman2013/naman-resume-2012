import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { fetchMashupSettings } from '../../modules/mashup-settings/get-mashup-actions';
import s from './TintUp.scss';

const SDK_INSTANCE_REFERENCE = 'SDK_INSTANCE_REFERENCE';

const mapStateToProps = ({ mashupSettings }) => ({
  mashupSettings,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMashupSettings,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class TintUp extends Component {
  componentWillMount() {
    this.props.actions.fetchMashupSettings();
  }

  componentWillReceiveProps(nextProps) {
    const { result, fetching } = nextProps.mashupSettings;
    if (result.scriptSource) {
      this.appendTintUpScript(nextProps);
    }
  }

  componentWillUnMount() {
    this.unloadSDK();
  }

  unloadSDK() {
    const loadedTintSDK = document.getElementById(SDK_INSTANCE_REFERENCE);
    if (loadedTintSDK) {
      document.body.removeChild(document.getElementById(SDK_INSTANCE_REFERENCE))
    }

    if (_.has(window, 'HM')) {
      delete window.HM;
    }
  }

  appendTintUpScript(props) {
    const { result } = props.mashupSettings;
    const { scriptSource } = result;

    this.unloadSDK();

    const loadedTintSDK = document.getElementById(SDK_INSTANCE_REFERENCE);
    if (!loadedTintSDK) {
      const tintScript = document.createElement('script');
      tintScript.src = result.scriptSource;
      tintScript.id = SDK_INSTANCE_REFERENCE;
      tintScript.type = 'text/javascript';
      document.getElementsByTagName('body')[0].appendChild(tintScript);
    }
  }

  render() {
    const { fetching } = this.props.mashupSettings;
    const { dataId, personalizationId } = this.props.mashupSettings.result;
    return (
      <div className={s.tintUpRoot}>
        {
          !fetching && dataId && personalizationId ?
            <div
              className="tintup"
              data-id={dataId}
              data-columns="3"
              data-expand="false"
              data-infinitescroll="true"
              data-personalization-id={personalizationId}
              style={{ height: '620px', width: '100%' }}
            /> : null
        }
      </div>
    );
  }
}

export default TintUp;

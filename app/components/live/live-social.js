import React, { Component, PropTypes } from 'react';
import SponsoredBy from '../common/sponsored-by';
import { camera } from '../community/tools/community-icon';
import styles from './live-social.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class LiveSocial extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0
    };
  }

  handleSelect(index, last) {
    this.setState({
      selectedTab: index,
    });
  }

  render() {
    const { selectedTab } = this.state;
    Tabs.setUseDefaultStyles(false);

    return (

      <section className={styles.liveView}>

        <header className={styles.liveViewHeader}>
          <h2>TRANSCONTINENTAL ECLIPSE</h2>
          <SponsoredBy />
        </header>

        <Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={selectedTab}>

          <TabList className={styles.liveTelescopeTabs}>
          <Tab>
            <h6>Main Show</h6>
            <div className="telescope"></div>
          </Tab>
          <Tab>
            <h6>Another Show</h6>
            <div className="telescope"></div>
          </Tab>
          <Tab>
            <h6>Another Show</h6>
            <div className="telescope"></div>
          </Tab>
          <Tab>
            <h6>Another Show</h6>
            <div className="telescope"></div>
          </Tab>
        </TabList>

          <TabPanel><aside className={styles.liveViewContent}>1</aside></TabPanel>
          <TabPanel><aside className={styles.liveViewContent}>2</aside></TabPanel>
          <TabPanel><aside className={styles.liveViewContent}>3</aside></TabPanel>
          <TabPanel><aside className={styles.liveViewContent}>4</aside> </TabPanel>

        </Tabs>

        <footer className={styles.liveCameraTabs}>
          <div className="camera-icon">{camera}</div>
          <div className="camera"></div>
          <div className="camera"></div>
          <div className="camera"></div>
        </footer>

      </section>

    )
  }
}


export default LiveSocial;

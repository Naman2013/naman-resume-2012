import React, { Component } from 'react';
import Lists from './lists';

class ProfileLists extends Component {
  componentDidMount() {
    const {
      params,
      getProfileLists,
      getPrivateProfile,
      getPublicProfile,
    } = this.props;
    if (params.private) getPrivateProfile();
    if (params.public) getPublicProfile(params.customerUUID);
    if (params.filterType) {
      if (params.private) getProfileLists(params.filterType);
      if (params.public)
        getProfileLists(params.filterType, params.customerUUID);
    }
  }

  componentDidUpdate(prevProps) {
    const { params, getProfileLists } = this.props;
    if (prevProps.params.filterType !== params.filterType) {
      if (params.private) getProfileLists(params.filterType);
      if (params.public) {
        getProfileLists(params.filterType, params.customerUUID);
      }
    }
    return null;
  }

  render() {
    const { data, params, profileLists } = this.props;
    const hubFilters = data.profileMenuList.find(el => el.name === 'Lists')
      .subMenus;
    const formatedHubFilter = hubFilters.map(filter => ({
      title: filter.name,
      linkURL: filter.linkUrl,
    }));

    return (
      <div className="my-lists-hub i-root">
        <Lists
          data={data}
          profileLists={profileLists}
          filterType={params.filterType}
          filterOptions={formatedHubFilter}
        />
      </div>
    );
  }
}

export default ProfileLists;

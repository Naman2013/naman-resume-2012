import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from "../tab-header";
import { Button } from '../button';
import { ImageSlider } from '../image-slider';
import { PhotoRoll } from './photo-roll';
import UploadPhoto from 'app/modules/profile-photos/containers/upload-photo';
import { GalleryCard } from './gallery-card';
import {
    fetchFiltersLists,
    setFilters,
    setSelectedTagsTabIndex,
  } from 'app/modules/my-pictures-filters/actions';
  import { fetchObjectTypeList } from 'app/modules/object-type-list/actions'; 
  import {
    selectObjectTypeList,
    selectSelectedFilters,
    selectTelescopeList,
    selectTimeList,
  } from 'app/modules/profile-photos/selectors';
  import { connect } from 'react-redux';
  import { bindActionCreators } from 'redux';
  import { deleteTag, setTag } from 'app/modules/profile-photos/thunks';
import { FilterDropdown } from 'app/modules/profile-photos/components/filter-dropdown';
import { SelectedFilters } from '../../common/selected-filters';
import { Observation } from './observation';
import { Mission } from './mission';
import { getTagsApi, deleteTagApi, setTagApi } from 'app/modules/mission-details/api';
import { getUserInfo } from 'app/modules/User';
import Modal from 'react-modal';
import ImageDetails from 'app/modules/image-details/containers/image-details';
import MissionDetails from 'app/modules/mission-details/containers/mission-details';
import GalleryDetails from 'app/modules/gallery-details/containers/gallery-details';
import { getFitsDataApi } from 'app/modules/profile-photos/api';


const mapTypeToRequest = {
    observations: 'fetchPhotoRollAndCounts',
    photoroll: 'fetchPhotoRollAndCounts',
    missions: 'fetchMissionsAndCounts',
    galleries: 'fetchGalleriesAndCounts',
};

const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      minWidth: '300px',
      width: '90%',
      height: '90%',
      maxWidth: '95%',
      padding: '10px 20px',      
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
};

class PhotoHub extends Component{

    componentDidMount() {
        // const { actions, type, params = {} } = this.props;
        // const { activePage } = this.state;
        // const fetchImages = actions[mapTypeToRequest[type]];
        // const { customerUUID } = params;
        // const PHOTOS_ON_ONE_PAGE = 9;
        // const PREVIOUS_PAGE = activePage - 1;
        // const firstImageNumber =
        //   activePage === 1 ? 1 : PREVIOUS_PAGE * PHOTOS_ON_ONE_PAGE + 1;
    
        // fetchImages({
        //   sharedOnly: type === 'observations',
        //   firstImageNumber,
        //   firstMissionNumber: firstImageNumber,
        //   customerUUID,
        //   publicGalleries: params.public ? 'y' : null,
        // });
        //  fetchMissionsAndCounts | fetchGalleriesAndCounts | fetchPhotoRollAndCounts
        
        this.fetchFilters();
      }


    componentWillUnmount() {
        this.handleFilterChange({
          pierNumber: null,
          observatoryId: null,
          filterType: null,
          timeFilter: null,
          dateFilter: null,
          missionSystemTags: [],
          missionUserTags: [],
          pictureUserTags: [],
        });
        this.handleApplyFilter();
    }
    state = {
        selectedheader: "Photo Roll",
        isFilterOpen: false,
        tagsData: { isFetching: true, tagList: [] },
        fitsData: { isFetching: false,
                    isLoaded: false,
                    data: {},},
        showModal: false,
        modalParams:{},
    }

    fetchFilters = () => {
        const { actions } = this.props;
        const { fetchFiltersLists, fetchObjectTypeList } = actions;
        fetchFiltersLists();
        fetchObjectTypeList();
    };

    onTabChange=(title)=>{
        const { getMyPictures, ref, getMissionImages, getGalleryList } = this.props;
        
        switch(title){

            case "Photo Roll":
                getMyPictures({
                    viewType: 'photoRoll',
                    maxImageCount: 18,
                    firstImageNumber: 1,
                    sharedOnly: false,                    
                });                
                break;

            case "Observations":
                getMyPictures({
                    viewType: 'photoRoll',  
                    sharedOnly: true,
                    maxImageCount: 18,
                    firstImageNumber: 1,               
                }); 
                break;
            
            case "Missions":
                getMissionImages({
                    maxMissionCount: 18,
                    firstMissionNumber: 1,                    
                }); 
                break;

            case "Galleries":
                getGalleryList({
                    maxItemsPerPage : 18,
                    paginationStartIndex: 1,                   
                });
                break;
        }
        this.setState({selectedheader: title});
    };        

    setFilterOpen = isFilterOpen => this.setState({ isFilterOpen });

    handleFilterChange = filter => {
        this.props.actions.setFilters({ ...filter });
    };
    
    handleApplyFilter = () => {
        // const { actions, type, params = {}, } = this.props;
        // const { customerUUID } = params;
        const { selectedheader } = this.state;
        const { getMyPictures, getMissionImages, getGalleryList } = this.props;
        // const fetchImages = actions[mapTypeToRequest[type]];
    
        // this.setState({ activePage: 1 });
        // fetchImages({
        //   sharedOnly: type === 'observations',
        //   customerUUID,
        //   publicGalleries: params.public ? 'y' : null,
        // });
        switch(selectedheader){

            case "Photo Roll":
                getMyPictures({
                    viewType: 'photoRoll',
                    maxImageCount: 18,
                    firstImageNumber: 1,
                    sharedOnly: false,                  
                });                
                break;

            case "Observations":
                getMyPictures({
                    viewType: 'photoRoll',
                    maxImageCount: 18,
                    firstImageNumber: 1,            
                    sharedOnly: true,               
                }); 
                break;
            
            case "Missions":
                getMissionImages({
                    maxMissionCount: 18,
                    firstMissionNumber: 1, 
                }); 
                break;

            case "Galleries":
                getGalleryList({
                    maxItemsPerPage : 18,
                    paginationStartIndex: 1, 
                });
                break;
        }        
    };    

    getTagsAction = (data) =>{ 
        let {tagsData} = this.state;
        tagsData.isFetching=true;        
        this.setState({tagsData: tagsData});
        const { token, at, cid, tagClass = 'image', tagType = 'user', } = getUserInfo();
        const { customerImageId } = data;
        getTagsApi({ token, at, cid, tagClass, tagType, customerImageId}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                this.setState({tagsData: {isFetching: false, tagList: res.tagList}});
            }
        });
    }

    deleteTagsAction = (data) =>{
        let {tagsData} = this.state;
        tagsData.isFetching=true;        
        this.setState({tagsData: tagsData});
        const { token, at, cid, tagClass = 'image', tagType = 'user', } = getUserInfo();
        const { customerImageId, text } = data;
        deleteTagApi({ token, at, cid, tagClass, tagType, customerImageId, text}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                this.setState({tagsData: {isFetching: false, tagList: res.tagList, data: res}});
            }
        });
    }

    setTagsAction = (data) =>{
        let {tagsData} = this.state;
        tagsData.isFetching=true;        
        this.setState({tagsData: tagsData});
        const { token, at, cid, tagClass = 'image', tagType = 'user', } = getUserInfo();
        const { customerImageId, text } = data;
        setTagApi({ token, at, cid, tagClass, tagType, customerImageId, text}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                this.setState({tagsData: {isFetching: false, tagList: res.tagList, data: res}});
            }
        });
    }

    getFitsDataAction = (data) => {
        const { token, at, cid} = getUserInfo();
        return getFitsDataApi({token, at, cid, ...data}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                this.setState({fitsData: {isFetching: false, isLoaded: true, data: res}});
            }
        })
    }

    render() {
        const { heading, 
                sectionHeadingLabel,
                headerlist, 
                telescopeList,
                objectTypeList,
                selectedFilters,            
                timeList,
                myPicturesFilters,
                headerspaceequally, 
                photoHub, 
                getMyPictures,
                params,
                privateProfileData,                
                actions: {                    
                    setSelectedTagsTabIndex,
                    // getTags,
                    // setTag,
                    // deleteTag,
                  },
                 } = this.props;
                 const tagActions = {
                    getTags: this.getTagsAction,
                    setTag: this.setTagsAction,
                    deleteTag: this.deleteTagsAction,
                  };
        const { selectedheader, isFilterOpen, tagsData, showModal, modalParams, fitsData, } = this.state;
        
        const getTabContent = header => {                        
            switch (header) {
                case "Photo Roll":
                    return <PhotoRoll 
                                imageList={photoHub.imageList} 
                                getMyPictures={getMyPictures} 
                                countPerTab={photoHub.countPerTab}
                                totalCount={photoHub.totalCount}
                                tagActions={tagActions}
                                tagsData= {tagsData}
                                showModal={(params)=>this.setState({showModal: true, modalParams: params})}
                                />;
                case "Observations":
                    return <Observation 
                                imageList={photoHub.imageList}
                                getMyPictures={getMyPictures} 
                                countPerTab={photoHub.countPerTab}
                                totalCount={photoHub.totalCount}
                                showModal={(params)=>this.setState({showModal: true, modalParams: params})}
                                />;
                case "Missions":
                    return <Mission 
                                imageList={photoHub.imageList}
                                getMyPictures={getMyPictures} 
                                countPerTab={photoHub.countPerTab}
                                totalCount={photoHub.totalCount}
                                showModal={(params)=>this.setState({showModal: true, modalParams: params})}
                                getFitsData={this.getFitsDataAction}
                                fitsData={fitsData}
                                />;             
                case "Galleries":
                    return <GalleryCard 
                                imageList={photoHub.galleryList}
                                getMyPictures={getMyPictures} 
                                countPerTab={photoHub.countPerTab}
                                totalCount={photoHub.totalCount}
                                showModal={(params)=>this.setState({showModal: true, modalParams: params})}
                                />;
                default:
                    break;
            }
        }
        return (
            <div className="photo-hub-main">
                <h2 className="photo-hub-heading">{heading} {sectionHeadingLabel}</h2>    
                    <div className="photo-hub-card-header">
                        <TabHeader
                            headings={headerlist}
                            activeHeading={selectedheader}
                            spaceequally={headerspaceequally}
                            theme={"dark"}
                            onTabChange={this.onTabChange}
                        /> 
                        {photoHub && (
                            <UploadPhoto 
                            onHide={()=>this.onTabChange(selectedheader)}
                            newButton={true} />
                        )}
                        {/* <Button
                            type={"button"}
                            onClickEvent={()=>{}} 
                            text={"Upload Photo"}                                             
                            style={"upload-button"}
                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/upload_white.svg"}
                        /> */}
                        {/* {canUploadToPhotoHub && <UploadPhoto onHide={this.fetchImages} />} */}
                    </div>
                    <FilterDropdown
                        isOpen={isFilterOpen}
                        setOpen={this.setFilterOpen}
                        onChange={this.handleFilterChange}
                        telescopeList={telescopeList}
                        timeList={timeList}
                        objectTypeList={objectTypeList}
                        selectedFilters={selectedFilters}
                        onApply={this.handleApplyFilter}
                        //tags component
                        setSelectedTagsTabIndex={setSelectedTagsTabIndex}
                        myPicturesFilters={myPicturesFilters}
                        newButton={true}
                    />                         
                    {/* <h5 className="sort-filter">{"Sort & Filter"}</h5>  */}
                    {isFilterOpen && (
                        <div className="filter-shader animated fadeIn faster" />
                    )}
                    <SelectedFilters
                        {...{
                            selectedFilters,
                            telescopeList,
                            timeList,
                            objectTypeList,
                        }}
                        onChange={this.handleFilterChange}
                        onApply={this.handleApplyFilter}
                    />
                    {photoHub &&(                        
                        <div>
                            {getTabContent(selectedheader)}  
                            {photoHub.emptySetFlag ? (
                                <div className="empty-photoHub">
                                    <h2 className="photo-hub-heading">{photoHub.emptySetDisplay}</h2>    
                                </div>
                            ):null}                                                       
                        </div>
                    )}
                    <Modal
                        isOpen={showModal}
                        contentLabel="Bio"
                        onRequestClose={()=>this.setState({showModal: false})}
                        style={customModalStyles}
                        ariaHideApp={false}
                        shouldCloseOnOverlayClick={false}
                        >
                        <i
                            className="fa fa-close"
                            onClick={()=>this.setState({showModal: false})}
                            role="button"
                            style={{float: "right", fontSize: "20px"}}
                        />
                        {(selectedheader === "Photo Roll" || selectedheader === "Observations") && (
                            <ImageDetails
                                params={modalParams}                                
                            />
                        )}

                        {selectedheader === "Missions" && (
                            <MissionDetails
                                params={modalParams}
                                newDash
                            />
                        )}
                        
                        {selectedheader === "Galleries" && (
                            <GalleryDetails
                                params={modalParams}
                                newDash
                            />
                        )}                        

                    </Modal>         
            </div>   
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
      {
        // fetchMissionsAndCounts,
        // fetchGalleriesAndCounts,
        // fetchPhotoRollAndCounts,
        // fetchMorePhotoroll,
        // fetchMoreMissions,
        // fetchMoreGalleries,
  
        fetchFiltersLists,
        fetchObjectTypeList,
        setFilters,        
        setSelectedTagsTabIndex,
        
        setTag,
        deleteTag,
      },
      dispatch
    ),
  });
  
  const mapStateToProps = state => {
    return {
    //   missionsList: state.myPictures.missions.response.imageList,
    //   missionsEmptyMsg: state.myPictures.missions.response.emptySetDisplay,
    //   missionsCount: state.myPictures.missions.imageCount,
    //   galleryList: state.galleries.galleryList,
    //   galleryCount: state.galleries.galleryCount,
    //   galleryEmptyMsg: state.galleries.emptySetDisplay,
    //   photoRollList: state.myPictures.photoRoll.response.imageList,
    //   photoRollCount: state.myPictures.photoRoll.imageCount,
    //   observationsList: state.myPictures.photoRoll.response.imageList,
    //   photoRollEmptyMsg: state.myPictures.photoRoll.response.emptySetDisplay,
    //   observationsCount: state.myPictures.observations.imageCount,
    //   fitsData: state.photoHubs.fitsData,
    //   tagsData: state.photoHubs.tagsData,
  
      telescopeList: selectTelescopeList()(state),
      timeList: selectTimeList()(state),
      objectTypeList: selectObjectTypeList()(state),
      selectedFilters: selectSelectedFilters()(state),
      myPicturesFilters: state.myPicturesFilters,
    //   privateProfileData: makePrivateProfileUserDataSelector()(state),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhotoHub)

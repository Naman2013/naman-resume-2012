import { PureComponent } from 'react';
import React from "react";
import './style.scss';
import { ClubCard } from '../club-card';
import { Link } from 'react-router';
import Pagination from '../../common/v4-pagination/pagination';
import ProfileGroups from '../../common/profile-groups/profile-groups';


export class ClubList extends PureComponent{

    state = {
        activePage: 1,
    }  

    PHOTOS_ON_ONE_PAGE=9

    shouldComponentUpdate(nextProps){
        return (this.props.clubList !== nextProps.clubList)
    }

    handlePageChange = ({ activePage }) => {
        const { getClubList } = this.props;       
        const PREVIOUS_PAGE = activePage - 1;
        this.startFrom = activePage === 1 ? 1 : PREVIOUS_PAGE * this.PHOTOS_ON_ONE_PAGE + 1;
       
        getClubList({
            callSource: "profile",
            paginationStartIndex: this.startFrom,
            maxItemsPerPage: this.PHOTOS_ON_ONE_PAGE 
        });
        this.setState({ activePage });
      };
    
    render() {
        const { heading, showExploreClubs, clubList, totalClubsCount, data, getMyClubListDataAction } = this.props;
        const { activePage } = this.state;
      
        return (
            clubList !== (undefined || null) ? (
            <div className="club-list-main">
                <div className="my-club-header">
                    <h2 className="club-list-heading">{heading}</h2>    
                    <ProfileGroups
                        data={data}
                        getMyClubListDataAction={getMyClubListDataAction}
                    />
                </div>
                                    
                    <div className="club-list">
                        {clubList.map(club=>(
                            <ClubCard
                                club={club}
                            />
                        ))}
                        {showExploreClubs &&(
                            <div className="club-explore-card">
                                <div >
                                    <Link className="club-explore-card-head" to={"/groups/all"}>
                                        <h4 className="club-title">Explore Other Clubs</h4>
                                        <img className="club-card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                    </Link>                                    
                                    
                                </div>        
                                <p className="club-subtitle">Find Some awesome communities to share progress and receive experience</p>
                        </div>
                        )}                            
                    </div>
                    <Pagination
                        pagesPerPage={this.PHOTOS_ON_ONE_PAGE}
                        activePage={activePage}
                        onPageChange={this.handlePageChange}                        
                        totalPageCount={Math.ceil(totalClubsCount / this.PHOTOS_ON_ONE_PAGE)}
                    />                                    
            </div>   
        ):null);
    }

}
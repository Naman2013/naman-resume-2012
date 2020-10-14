import { Component } from 'react';
import React from "react";
import './style.scss';
import { GuideCard } from '../guide-card';
import { TabHeader } from '../tab-header';
import Pagination from '../../common/v4-pagination/pagination';

export class BookMark extends Component{
    
    state={
        activeHeading: "Objects",
        activePage: 1,
    }

    PHOTOS_ON_ONE_PAGE=9

    fetchList = (title, paginationStartIndex) => {
        const { getBookmarkList } = this.props;

        switch(title){

            case "Objects":
                getBookmarkList({
                    readingListType: "object",
                    paginationStartIndex,
                    maxItemsPerPage: this.PHOTOS_ON_ONE_PAGE
                });
                break;

            case "Illuminations":
                getBookmarkList({
                    readingListType: "story",
                    paginationStartIndex,
                    maxItemsPerPage: this.PHOTOS_ON_ONE_PAGE
                });
                break;
            
            case "Star Party":
                getBookmarkList({
                    readingListType: "show",
                    paginationStartIndex,
                    maxItemsPerPage: this.PHOTOS_ON_ONE_PAGE
                });
                break;

            case "Guides":
                getBookmarkList({
                    readingListType: "guide",
                    paginationStartIndex,
                    maxItemsPerPage: this.PHOTOS_ON_ONE_PAGE
                });
                break;
        }
    }

    handlePageChange = ({ activePage }) => {          
        const { activeHeading } = this.state;
        const PREVIOUS_PAGE = activePage - 1;
        this.startFrom = activePage === 1 ? 1 : PREVIOUS_PAGE * this.PHOTOS_ON_ONE_PAGE + 1;
       
        this.fetchList(activeHeading, this.startFrom);
       
        this.setState({ activePage });
      };
    

    onTabChange=(title)=>{
        this.fetchList(title, 1);
        this.setState({activeHeading: title});
    };

    render() {
        const {heading, guideList, emptySetDisplay, totalCount } = this.props;
        const { activeHeading, activePage } = this.state;

        return (
            guideList !== (undefined || null) && (
                <div className="guide-list-main">
                    <h2 className="guide-list-heading">{heading}</h2>
                        <TabHeader
                            headings={["Objects", "Guides", "Star Party", "Illuminations"]}
                            activeHeading={activeHeading}
                            spaceequally={false}
                            theme={"dark"}
                            onTabChange={this.onTabChange}
                        />                        
                        <div className="guide-list">                        
                            {guideList.map(guide=>(
                                <GuideCard
                                    guide={guide}
                                />
                            ))}
                            {guideList.length === 0 && (
                                <div className="empty-guide">
                                    <h3 className="empty-card-heading">{emptySetDisplay}</h3>
                                </div>
                                
                            )}                                                
                        </div> 
                        <Pagination
                            pagesPerPage={this.PHOTOS_ON_ONE_PAGE}
                            activePage={activePage}
                            onPageChange={this.handlePageChange}
                            totalPageCount={Math.ceil(totalCount / this.PHOTOS_ON_ONE_PAGE)}
                        />                                                              
                </div> 
            )  
        );
    }

}
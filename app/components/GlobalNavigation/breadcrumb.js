import React from 'react';
import { browserHistory } from 'react-router';

const contentClickHandler = (link) => {  
    browserHistory.push(link);
};

const QuestBreadCrumb = ({sloohQuestBreadCrumbQuestTitle,sloohQuestBreadCrumbQuestLinkURL }) => (
  (sloohQuestBreadCrumbQuestLinkURL ?
    <div>
    <div className="breadcrumb">  
	    <span onClick={() => contentClickHandler(sloohQuestBreadCrumbQuestLinkURL)} role="button">
        	<h4 className="breadcrumbBoldtxt">Return to Quest:&nbsp;</h4>
        	<h4 className="breadcrumbNormaltxt">{sloohQuestBreadCrumbQuestTitle}</h4>
    	    </span>
    </div>

<style jsx>
{`

  .breadcrumb{
    position:  fixed;
    margin-top: 60px;
    background-color: #FFF;
    width: 100%;
    padding: 4px 0px 4px 10px;    
    border-bottom: 2px solid #ced2d8;
    
  }

  .breadcrumb .icon{
    background-image: url('https://vega.slooh.com/assets/v4/common/arrow_horz.svg');
    display: inline;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    transform: rotate(180deg);
    width: 25px;
    height: 25px;
    float: left;
  }

  .breadcrumbNormaltxt{
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 14px;
  }

  .breadcrumbBoldtxt{
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 16px;
    font-weight: bold;
  }

  .breadcrumb span{
    display: inline;
    cursor: pointer;
    color: #41566f;
  }

  .breadcrumb span h4{
    display: inline; 
  }
  
  `}
  </style>
  </div>:null)
);

export default QuestBreadCrumb;
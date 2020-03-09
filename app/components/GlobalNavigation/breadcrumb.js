import React from 'react';

const QuestBreadCrumb = ({  }) => (
    <div>
    <div className="breadcrumb">
        <div className="icon" ></div>
        <h4>A Mystery of the Island Universes</h4>
    </div>

<style jsx>
{`

  .breadcrumb{
    position:  fixed;
    margin-top: 60px;
    background-color: #FFF;
    width: 100%;
    padding: 0px 0px 0px 10px;    
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

  .breadcrumb .icon h4{
    display: inline;
    cursor: pointer;
  }`}
  </style>
  </div>
);

export default QuestBreadCrumb;
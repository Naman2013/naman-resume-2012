import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
const {
  string,
  arrayOf,
  number,
  bool,
  shape,
} = PropTypes;

const propTypes = {
  description: string,
  detailList: arrayOf(shape({
    label: string,
    text: string,
  })),
  hasIcon: bool,
  iconURL: string,
  subTitle: string,
  title: string,
};

const getIconStyle = (iconURL) => ({
  backgroundImage: iconURL,
});

const RecommendedObjectsItem = ({
  description,
  detailList,
  hasIcon,
  iconURL,
  subTitle,
  title,
}) => (<div  key={uniqueId()} className="card-object">
      <div className="object-icon">{hasIcon ? <div style={getIconStyle()} />: null}</div>      
      <div className="object-name" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="list-item" dangerouslySetInnerHTML={{ __html: description }} />
      <div className="user-btn">options</div>
      <style jsx>{`
        .card-object {
          width: 300px;
          height: 464px;
          background-color: white;
          box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
          margin: 3px;
          padding: 0 40px;
          background-image: url("https://vega.slooh.com/assets/v4/dashboard/object-card-bg.png");
          background-size: 100%;
          background-repeat: no-repeat;
        }
        .object-icon {
          width: 100%;
          height: 127px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: 50%;
          background-image: url("https://vega.slooh.com/assets/v4/dashboard/object-icon-container.png");
        }
        .object-icon div {
          width: 100%;
          height: 100%;
        }
        .object-name {
          color: #41566F;
          font-family: "Adobe Garamond Pro", "adobe-garamond-pro", "Adobe Garamond", "Garamond", serif;
          font-size: 20px;
          padding: 20px 0;
          border-top: 1px solid #D9DEE4;
        }
        .list-item {
          padding: 20px 0 5px 0;
          border-top: 1px solid #D9DEE4;
          border-bottom: 1px solid #D9DEE4;
        }
      `}</style>
      <style jsx global>{`
        .user-btn {
          font-size: 11px;
          text-transform: uppercase;
          color: #41565F;
          padding: 10px 15px;
          margin: 0 auto;
          border: 1px dashed #41566F;
          border-radius: 25px;
          max-width: 60%;
          font-weight: 600;
          letter-spacing: 1px;
          margin-top: 20px;
          transition: all ease-in-out 0.3s;
          cursor: pointer;
        }
        .user-btn:hover {
          background: white;
          font-weight: 800;
        }
      `}</style>

    </div>);

export default RecommendedObjectsItem;

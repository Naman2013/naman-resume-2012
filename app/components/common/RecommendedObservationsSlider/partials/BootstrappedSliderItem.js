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

const BootstrappedObservationSliderItem = ({

}) => (<div className="card-obs" key={uniqueId()}>
    <div className="obs-left">
      <div>Title</div>
      <div className="card-obs-author">By Author</div>
      <div className="card-obs-desc">Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it  tristique de ullam ecorpere pretium…</div>
    </div>
      <style jsx>{`
        .card-obs {
          font-weight: 600;
          letter-spacing: 1px;
          background-color: white;
          box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
          margin: 3px;
          padding: 0 40px;
          color: #41566F;
          font-family: "Adobe Garamond Pro","adobe-garamond-pro","Adobe Garamond","Garamond",serif;
          font-size: 24px;
          padding: 80px;
        }
        .obs-left {
          width: 50%;
          text-align: left;
        }
        .card-obs-title {
          font-family: "Adobe Garamond Pro","adobe-garamond-pro","Adobe Garamond","Garamond",serif;
          font-size: 18px;
          color: #616E7D;
          letter-spacing: 1px;
          font-weight: 400;
        }
        .card-obs-author {
          font-family: "Brandon Grotesque","brandon-grotesque",sans-serif;
          font-size: 10px;
          border-top: solid 1px #D9DEE4;
          border-bottom: solid 1px #D9DEE4;
          text-transform: uppercase;
          padding: 10px 0;
        }
        .card-obs-desc {
          font-size: 19px;
          font-weight: 100;
          color: #616E7D;
          padding: 20px 0;
        }
      `}</style>
    </div>);

export default BootstrappedObservationSliderItem;

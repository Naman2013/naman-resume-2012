import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { white } from '../../styles/variables/colors';


const baseUrl = 'assets/images/store';
const SloohStorePromo = () =>
  <div className="promo-container">
  <div className="promo-text">
    Introducing:
    <h2 className="title">SLOOH STORE</h2>
    <div className="store-description">Premium products offered for purchase at Amazon, which enrich your appreciation of outer space and help support the Slooh community.</div>
  </div>
  <div className="product-container top">
    <a className="btn-primary btn-store" rel="noopener noreferrer" target="_blank" href="https://www.amazon.com/s?marketplaceID=ATVPDKIKX0DER&me=A237ME1DXB1HVR&merchant=A237ME1DXB1HVR&redirect=true">Shop Now</a>
    <figure className="glasses">
      <img width="50%" className="product-image" src={`${baseUrl}/glasses.png`} />
      <div className="glasses-text">Slooh Solar Eclipse Sunglasses</div>
    </figure>
  </div>
  <div className="flex-row product-container">
    <figure>
      <img height="50%" className="product-image-book" src={`${baseUrl}/book.png`} />
      <div className="book-text">Slooh Books</div>
    </figure>
    <figure className="kindle-container">
      <img height="50%" className="product-image kindle" src={`${baseUrl}/KindleDevice.png`} />
      <div className="kindle-text">E-Reader Books</div>
    </figure>
    <figure>
      <img height="45%" className="product-image giftcard" src={`${baseUrl}/GiftCards.png`} />
      <div className="giftcard-text">Slooh Memberships</div>
    </figure>
  </div>
    <img height="50%" className="store-tag" src={`${baseUrl}/SloohStoreTag.png`} />
  <style jsx>{`
    .promo-container {
      position: relative;
      background-image: url('${baseUrl}/gradiant-bg-pattern.jpg');
      background-repeat: repeat-x;
      background-position: center -360px;
      height: 1000px;
      width: 100%;
      margin-top: 5px;
    }

    .title {
      font-size: 57px;
    }

    .store-description {
      font-size: 19px;
    }

    .promo-text {
      width: 50%;
      padding: 100px;
    }

    .store-tag {
      position: absolute;
      right: 50px;
      top: -5px;
    }

    .link {
      color: ${white};
    }
    .btn-store {
      vertical-align: middle;
      display: inline-block;
    }
    .glasses {
      padding-left: 200px;
      vertical-align: middle;
      display: inline-block;
    }

    .flex-row {
      display: flex;
      flex-direction: row;
    }

    .product-container {
      padding: 25px 100px;
    }

    .product-image-book {
      margin-top: 15px;
    }

    .top {
      padding: 0 100px;
      margin-top: -15px;
    }

    .kindle-container {
      margin-left: -85px;
    }

    .book-text {
      margin-top: -15px;
    }

    .kindle {
      margin-right: 100px;
    }

    .kindle-text {
      padding-left: 30px;
    }

    .giftcard-text {
      padding-top: 30px;
      padding-left: 15px;
    }

    .glasses-text {
      padding-top: 25px;
    }
  `}</style>
  </div>;


SloohStorePromo.propTypes = {
};

export default SloohStorePromo;

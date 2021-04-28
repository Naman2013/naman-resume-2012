import { Component } from 'react';
import React from "react";
import './style.scss';
import 'ol/ol.css';
import Graticule from 'ol/layer/Graticule';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {mapVector} from "./map";
import { WKT } from 'ol/format/WKT';
import { Point } from 'ol/geom/Point';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {Zoom} from 'ol/control/Zoom';
import Select from 'react-select';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import Static from 'ol/source/ImageStatic';
import Projection from 'ol/proj/Projection';
import {getCenter} from 'ol/extent';


export class ObjectMap extends Component{
  state={
    map: null,
    view: null,
  }
    componentDidMount(){
      
      var vectorLayer = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          features: (new GeoJSON()).readFeatures(mapVector)   
          // url: "https://vega.slooh.com/assets/v4/dashboard-new/objectmap/test.js"
        })
      });

      
     
      // var zoomControl = new Zoom({
      //   zoomInTipLabel: 'Zoom closer in',
      //   zoomOutTipLabel: 'Zoom further out',
      //   className: 'ol-zoom custom-zoom-control'
      // });

      var displayFeatureInfo = function(pixel) {
        
        vectorLayer.getFeatures(pixel).then(function(features) {
          var feature = features.length ? features[0] : undefined; 
          if (features.length) {         
            
          }
        });
      
      };
      
      
      var extent = [0, 0, 1550, 1125];
      var projection = new Projection({
        code: 'static-image',
        units: 'pixels',
        extent: extent,
      });

      var imageLayer=new ImageLayer({
        source: new Static({
          // attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
          url: 'https://vega.slooh.com/assets/v4/dashboard-new/objectmap/working_copy.svg',
          projection: projection,
          imageExtent: extent,
          imageLoadFunction: function (image, src) {
            image.getImage().src = src;
            image.getImage().width = extent.getWidth(extent);
            image.getImage().height = extent.getHeight(extent);
         }
        }),
      }) ;

      var view =new View({
        projection: projection,
        center: getCenter(extent),
        zoom: 3,
        maxZoom: 10,
        minZoom: 3,
        constrainOnlyCenter: true,
        extent: extent,
      })
        var map = new Map({
          controls: [],
            layers: [              
              imageLayer,
              // vectorLayer,                       
              // new Graticule({
              //   // the style to use for the lines, optional.
              //   strokeStyle: new Stroke({
              //     color: 'rgba(65,86,111,0.9)',
              //     width: 2,
              //     lineDash: [0.5, 4]
              //   }),
              //   showLabels: true,
              //   wrapX: false
              // })
            ],
            target: 'map',
          view: view
          });
          // map.on('pointermove', function(evt) {
          //   if (evt.dragging) {
          //     return;
          //   }
          //   var pixel = map.getEventPixel(evt.originalEvent);
          //   displayFeatureInfo(pixel);
          // });
          
          map.on('click', function(evt) {
            displayFeatureInfo(evt.pixel);
          });
          // map.on('click', this.handleMapClick.bind(this));
          this.setState({map: map, view: view});
          
    }

    handleFindObject(){
      // var position = fromLonLat();
      this.state.view.animate({center:[ 81.5505, -67.5 ], zoom: 25, duration: 2000});
    }

    handleMapClick(event) {

      // create WKT writer
      var wktWriter = new WKT();
  
      // derive map coordinate (references map from Wrapper Component state)
      var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);
  
      // create Point geometry from clicked coordinate
      var clickedPointGeom = new Point( clickedCoordinate );
  
      // write Point geometry to WKT with wktWriter
      var clickedPointWkt = wktWriter.writeGeometry( clickedPointGeom );
      
      // place Flux Action call to notify Store map coordinate was clicked
      Actions.setRoutingCoord( clickedPointWkt );
  
    } 

    statusOptions = [
      { value: 'All', label: 'All' },
      { value: 'Not Started', label: 'Not Started' },
      { value: 'In-Progress', label: 'In-Progress' },
      { value: 'Completed', label: 'Completed' },
    ];

    difficultyOptions = [
      { value: 'All', label: 'All' },
      { value: 'Start Here', label: 'Start Here' },
      { value: '100', label: '100' },
      { value: '200', label: '200' },
      { value: '300', label: '300' },
      { value: '400', label: '400' },
    ];

    seasonalityOptions = [
      { value: 'All', label: 'All' },
      { value: 'None', label: 'None' },
      { value: 'Winter - Summer', label: 'Winter - Summer' },
      { value: 'Spring - Fall', label: 'Spring - Fall' },
    ]

    gradeLevelOptions = [
      { value: 'All', label: 'All' },
      { value: 'None', label: 'None' },
      { value: 'Elementary', label: 'Elementary' },
      { value: 'Middle', label: 'Middle' },
      { value: 'High School', label: 'High School' },
      { value: 'College', label: 'College' },
    ]

    state = {
      selectedStatus: { value: 'All', label: 'All' },
      selectedDifficulty: { value: 'All', label: 'All' },
      selectedSeasonality: { value: 'All', label: 'All' },
      selectedGradeLevel: { value: 'All', label: 'All' }
    };

    handleStutusChange = selectedStatus => {     
      this.setState({ selectedStatus });      
    };

    handleDifficultyChange = selectedDifficulty => {      
      this.setState({ selectedDifficulty });      
    };

    handleSeasonalityChange = selectedSeasonality => {      
      this.setState({ selectedSeasonality });      
    };

    handleGradeLevelChange = selectedGradeLevel => {      
      this.setState({ selectedGradeLevel });      
    };

    colourStyles = {
      container: styles => ({...styles, flex: 1}),
      control: styles => ({ ...styles, backgroundColor: '#111111', border: 'none', flex: 1 }),
      singleValue: (styles) => ({ ...styles, color: '#FFF' })
      // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //   const color = chroma(data.color);
      //   return {
      //     ...styles,
      //     backgroundColor: isDisabled ? 'red' : blue,
      //     color: '#FFF',
      //     cursor: isDisabled ? 'not-allowed' : 'default',
          
      //   };
      // },
      
    };

    render() {     
      const { selectedStatus, selectedDifficulty, selectedSeasonality, selectedGradeLevel } = this.state;

        return (
          <div>
            <div id="map" class="map"></div>  
            <div className="control-div">
              <div className="controls">
                <span className="select-label">Status: </span>
                <Select                 
                  value={selectedStatus}
                  onChange={this.handleStutusChange}
                  options={this.statusOptions}
                  isSearchable={false}
                  styles={this.colourStyles}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              </div>
              
              <div className="controls">
                <span className="select-label">Difficulty: </span>
                <Select                  
                  value={selectedDifficulty}
                  onChange={this.handleDifficultyChange}
                  options={this.difficultyOptions}
                  isSearchable={false}
                  styles={this.colourStyles}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              </div>
              <div className="controls">
                <span className="select-label">Seasonality: </span>
                <Select                  
                  value={selectedSeasonality}
                  onChange={this.handleSeasonalityChange}
                  options={this.seasonalityOptions}
                  isSearchable={false}
                  styles={this.colourStyles}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              </div>
              <div className="controls">
                <span className="select-label">Grade-Level: </span>
                <Select                  
                  value={selectedGradeLevel}
                  onChange={this.handleGradeLevelChange}
                  options={this.gradeLevelOptions}
                  isSearchable={false}
                  styles={this.colourStyles}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              </div>
              <div className="separator-line">
              </div>
              <div className="settings">                 
                  <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/gear_icon.svg"/>
                  <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/maximize_icon.svg"/>
                  <img className="setting-icons"src="https://vega.slooh.com/assets/v4/dashboard-new/map_icon.svg"/>
              </div>
            </div>
            {/* <button onClick={()=>this.handleFindObject()}>find</button> */}
          </div>
        );
    }

}
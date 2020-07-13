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

      var view =new View({
        center: [ 0, 0 ],
        zoom: 2
      })
     
      // var zoomControl = new Zoom({
      //   zoomInTipLabel: 'Zoom closer in',
      //   zoomOutTipLabel: 'Zoom further out',
      //   className: 'ol-zoom custom-zoom-control'
      // });

      var displayFeatureInfo = function(pixel) {
        
        vectorLayer.getFeatures(pixel).then(function(features) {
          var feature = features.length ? features[0] : undefined; 
          if (features.length) {         
            console.log("object name: "+feature.get('name'));
            console.log("object id: "+feature.getId());
          }
        });
      
      };
      
      
        var map = new Map({
          controls: [],
            layers: [
              vectorLayer,                       
              new Graticule({
                // the style to use for the lines, optional.
                strokeStyle: new Stroke({
                  color: 'rgba(65,86,111,0.9)',
                  width: 2,
                  lineDash: [0.5, 4]
                }),
                showLabels: true,
                wrapX: false
              })
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

    render() {     
     
        return (
          <div>
            <div id="map" class="map"></div>  
            <button onClick={()=>this.handleFindObject()}>find</button>
          </div>
        );
    }

}
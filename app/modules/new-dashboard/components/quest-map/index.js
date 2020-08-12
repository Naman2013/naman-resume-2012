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
import {composeCssTransform} from 'ol/transform';
import Layer from 'ol/layer/Layer';
import { QuestCard } from '../quest-card';
import { getQuestCard } from '../../dashboardApi';
import { Spinner } from 'app/components/spinner/index';
import { getUserInfo } from 'app/modules/User';

export class QuestMap extends Component{
  state={
    map: null,
    view: null,
    showQuestCard: false,
    questCardDetails: [],
    isloading1: false,
    selectedControls: [],
  }

  constructor (props){
    super(props);
    const { questMapControls } = this.props;
    const selectedControls = questMapControls[0].controlList.map(control=>control.selectedIndex);      
    this.state={
      map: null,
      view: null,
      showQuestCard: false,
      questCardDetails: [],
      isloading1: false,
      selectedControls:selectedControls
    }    
  }
    componentDidMount(){     
     
      var vectorLayer = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          features: (new GeoJSON()).readFeatures(mapVector)   
          // url: "https://vega.slooh.com/assets/v4/dashboard-new/objectmap/test.js"
        })
      });

      
     
      // // var zoomControl = new Zoom({
      // //   zoomInTipLabel: 'Zoom closer in',
      // //   zoomOutTipLabel: 'Zoom further out',
      // //   className: 'ol-zoom custom-zoom-control'
      // // });
      const self = this;
      var displayFeatureInfo = function(pixel) {
        const { showQuestCard } = self.state;
        // vectorLayer.getFeatures(pixel).then(function(features) {
        //   var feature = features.length ? features[0] : undefined; 
        //   if (features.length) {         
        //     console.log("object name: "+feature.get('name'));
        //     console.log("object id: "+feature.getId());
        //   }
        // });

        if(showQuestCard)
          self.setState({showQuestCard: false, questCardDetails: []});
        else{
          self.setState({isloading1: true});
          const { token, at, cid } = getUserInfo();
          getQuestCard({
            token, 
            at, 
            cid,
            questId: 153,
            questUUID: '2b7fc283-9539-11ea-a953-062dce25bfa1',
            questVersion: 1.1
          }).then(response=>{
            self.setState({isloading1: false, questCardDetails: response.data, showQuestCard: true});
            
          });         
        }
          
      };
      
      
      // var extent = [0, 0, 1204, 1125];
      // var projection = new Projection({
      //   code: 'xkcd-image',
      //   units: 'pixels',
      //   extent: extent,
      // });

      // var imageLayer=new ImageLayer({
      //   source: new Static({
      //     attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
      //     url: 'https://vega.slooh.com/assets/v4/dashboard-new/objectmap/working_copy.svg',
      //     projection: projection,
      //     imageExtent: extent,
      //   }),
      // }) ;

      // var view =new View({
      //   projection: projection,
      //   center: getCenter(extent),
      //   zoom: 3,
      //   maxZoom: 6,
      //   minZoom: 3,
      //   constrainOnlyCenter: true,
      //   extent: extent,
      // })
      //   var map = new Map({
      //     controls: [],
      //       layers: [              
      //         imageLayer,
      //         // vectorLayer,                       
      //         // new Graticule({
      //         //   // the style to use for the lines, optional.
      //         //   strokeStyle: new Stroke({
      //         //     color: 'rgba(65,86,111,0.9)',
      //         //     width: 2,
      //         //     lineDash: [0.5, 4]
      //         //   }),
      //         //   showLabels: true,
      //         //   wrapX: false
      //         // })
      //       ],
      //       target: 'map',
      //     view: view
      //     });
      //     // map.on('pointermove', function(evt) {
      //     //   if (evt.dragging) {
      //     //     return;
      //     //   }
      //     //   var pixel = map.getEventPixel(evt.originalEvent);
      //     //   displayFeatureInfo(pixel);
      //     // });

      var highlightStyle = new Style({
        fill: new Fill({
          color: 'rgba(255,255,255,0.7)',
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 3,
        }),
      });


      var view = new View({
        center: [0, 0],
        extent: [-180, -36, 22, 90],
        projection: 'EPSG:4326',
        zoom: 2,
        
      });

            var svgContainer = document.createElement('div');
            var xhr = new XMLHttpRequest();            
            xhr.open('GET', 'https://vega.slooh.com/assets/v4/dashboard-new/objectmap/working_copy.svg',true);
            // xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://vega.slooh.com'); 
            xhr.setRequestHeader('Content-Type','application/xml');
            xhr.addEventListener('load', function () {
              var svg = xhr.responseXML.documentElement;
              svgContainer.ownerDocument.importNode(svg);
              svgContainer.appendChild(svg);
            });
            xhr.send();

            var width = 2560;
            var height = 1280;
            var svgResolution = 360 / width;
            svgContainer.style.width = width + 'px';
            svgContainer.style.height = height + 'px';
            svgContainer.style.transformOrigin = 'top left';
            svgContainer.className = 'svg-layer';

           

            var backgroundLayer=
              new Layer({
                render: function (frameState) {
                  var scale = svgResolution / frameState.viewState.resolution;
                  var center = frameState.viewState.center;
                  var size = frameState.size;
                  var cssTransform = composeCssTransform(
                    size[0] / 2,
                    size[1] / 2,
                    scale,
                    scale,
                    frameState.viewState.rotation,
                    -center[0] / svgResolution - width / 2,
                    center[1] / svgResolution - height / 2
                  );
                  svgContainer.style.transform = cssTransform;
                  svgContainer.style.opacity = 1;
                  return svgContainer;
                },
              })
            
            


            var map = new Map({
              controls: [],
              target: 'map',
              view: view,
              layers: [                   
                backgroundLayer,
                vectorLayer,
              ]
            });

           
            
                     
          map.on('click', function(evt) {
            displayFeatureInfo(evt.pixel);
          });
          // map.on('click', this.handleMapClick.bind(this));
          this.setState({map: map, view: view });
          
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

   
    handleOptionChange = (controlIndex, selectedIndex)=>{      
      let { selectedControls } = this.state;
      selectedControls[controlIndex]=selectedIndex;
      this.setState({selectedControls: selectedControls});
    }

   

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
      const { showQuestCard, questCardDetails, isloading1 } = this.state
      const { questMapControls } = this.props;      
      const { selectedControls } = this.state;
      
        return (
          <div>
             <Spinner
              loading={isloading1}
              text="Please wait...loading discussions"
            />
            <div className="map-container">
              <div id="map" class="map">
              
              </div>
              {showQuestCard && (
                  <div className="popup">
                    <QuestCard
                      onHide={()=> this.setState({showQuestCard: false})}
                      questCardDetails={questCardDetails}
                    />
                </div> 
              )}
               
              
            </div>
           
            <div className="control-div">
              {questMapControls[0].controlList.map((control, i)=>(
                <div className="controls">
                <span className="select-label">{control.controlId}: </span>
                <Select                 
                  value={control.list[selectedControls[i]]}
                  onChange={(idx, selected)=>this.handleOptionChange(i,idx.index)}
                  options={control.list}
                  isSearchable={false}
                  styles={this.colourStyles}
                  getOptionLabel={option => option.value }
                  getOptionValue={option => option.key}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              </div>
              ))}
              {/* <div className="controls">
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
              </div> */}
              <div className="separator-line">
              </div>
              <div className="settings"> 
                {/* {questMapControls[1].controlList.map(control=>(
                  <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/gear_icon.svg"/>
                ))}                */}
                  <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/gear_icon.svg"/>   
                  <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/maximize_icon.svg"/>
                  <img className="setting-icons"src="https://vega.slooh.com/assets/v4/dashboard-new/map_icon.svg"/>
              </div>
            </div>
            <button onClick={()=>this.handleFindObject()}>find</button>
          </div>
        );
    }

}
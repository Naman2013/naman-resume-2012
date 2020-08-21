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
import { getObjectCard, getObjectMap } from '../../dashboardApi';
import { Spinner } from 'app/components/spinner/index';
import { getUserInfo } from 'app/modules/User';
import Switch from "react-switch";
import { Dropdown } from 'react-bootstrap';
import { ObjectCard } from '../object-card';


export class ObjectMap extends Component{
  state={
    map: null,
    view: null,
    showObjectCard: false,
    objectCardDetails: [],
    isloading1: false,
    selectedControls: [],
    mapExpanded: false,
    hideMap: false,
    selectedToggleControls: [],
    explanationText: null,
  }

  constructor (props){
    super(props);
    const { objectMapControls } = this.props;
    const selectedControls = objectMapControls[0].controlList.map(control=>control.selectedIndex);      
    const selectedToggleControls = objectMapControls[1].controlList.map(control=>{return false});      
    this.state={
      map: null,
      view: null,
      showObjectCard: false,
      objectCardDetails: [],
      isloading1: false,
      selectedControls:selectedControls,
      selectedToggleControls: selectedToggleControls,
      explanationText: null,
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
        const { showObjectCard } = self.state;
        // vectorLayer.getFeatures(pixel).then(function(features) {
        //   var feature = features.length ? features[0] : undefined; 
        //   if (features.length) {         
        //     console.log("object name: "+feature.get('name'));
        //     console.log("object id: "+feature.getId());
        //   }
        // });

        if(showObjectCard)
          self.setState({showObjectCard: false, objectCardDetails: []});
        else{
          self.setState({isloading1: true});
          const { token, at, cid } = getUserInfo();
          getObjectCard({
            token, 
            at, 
            cid,
            objectId: 6,
            objectUUID: '2b7fc283-9539-11ea-a953-062dce25bfa1',
            objectVersion: 1.1
          }).then(response=>{
            self.setState({isloading1: false, objectCardDetails: response.data, showObjectCard: true});
            
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
        // extent: [-180, -36, 22, 90],
        projection: 'EPSG:4326',
        zoom: 2,
        
      });

            // var svgContainer = document.createElement('div');
            // var xhr = new XMLHttpRequest();            
            // xhr.open('GET', 'https://vega.slooh.com/assets/v4/dashboard-new/objectmap/working_copy.svg',true);
            // // xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://vega.slooh.com'); 
            // xhr.setRequestHeader('Content-Type','application/xml');
            // xhr.addEventListener('load', function () {
            //   var svg = xhr.responseXML.documentElement;
            //   svgContainer.ownerDocument.importNode(svg);
            //   svgContainer.appendChild(svg);
            // });
            // xhr.send();

            // var width = 2560;
            // var height = 1280;
            // var svgResolution = 360 / width;
            // svgContainer.style.width = width + 'px';
            // svgContainer.style.height = height + 'px';
            // svgContainer.style.transformOrigin = 'top left';
            // svgContainer.className = 'svg-layer';

           

            // var backgroundLayer=
            //   new Layer({
            //     render: function (frameState) {
            //       var scale = svgResolution / frameState.viewState.resolution;
            //       var center = frameState.viewState.center;
            //       var size = frameState.size;
            //       var cssTransform = composeCssTransform(
            //         size[0] / 2,
            //         size[1] / 2,
            //         scale,
            //         scale,
            //         frameState.viewState.rotation,
            //         -center[0] / svgResolution - width / 2,
            //         center[1] / svgResolution - height / 2
            //       );
            //       svgContainer.style.transform = cssTransform;
            //       svgContainer.style.opacity = 1;
            //       return svgContainer;
            //     },
            //   })
            
            


            var map = new Map({
              controls: [],
              target: 'map',
              view: view,
              layers: [                   
                // backgroundLayer,
                // vectorLayer,
              ]
            });

           
            
                     
          map.on('click', function(evt) {
            displayFeatureInfo(evt.pixel);
          });
          // map.on('click', this.handleMapClick.bind(this));
          this.setState({map: map, view: view });
          this.getObjectMapInit();
          
    }

    getObjectMapInit(){
      const { token, at, cid } = getUserInfo();     
      const self = this;
      getObjectMap({token, cid, at,default: true}).then(response=>{       
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = map.getLayers().array_;

          if(arrayLayers.length > 0)
            arrayLayers.map(layer=>{
              map.removeLayer(layer);
            });
            
          layerList.map(layer=>{            
            map.addLayer(this.getLayer(layer.source, layer.type, layer.style, layer.data));
          })
          // map.addLayer(this.getVectorLayer());

          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);
          self.setState({map: map});
        }
        
      });
    }

    getSVGLayer(source){
      var svgContainer = document.createElement('div');
            var xhr = new XMLHttpRequest();            
            xhr.open('GET', source ,true);
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
              return backgroundLayer;
    }

    getVectorLayer(url, data){
      return new VectorLayer({
        source: new VectorSource({
          // url: url,
          format: new GeoJSON(),
          features: (new GeoJSON()).readFeatures(data)   
         
        }),
        visible: true,
        title: 'vector map'
      });
    }

    getGraticleLayer(style){
      return new Graticule({
                // the style to use for the lines, optional.
                style,
                showLabels: true,
                wrapX: false
              });
    }

    getLayer(source, type, style, data){
      switch(type){
        case "Image":
          return this.getSVGLayer(source); 
        case "Vector":
          return this.getVectorLayer(source,data);
        case "Graticule":
          return this.getGraticleLayer(style)
        
          // return this.getVectorLayer();         
      }
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

    handleExpandMap = () => {
      const { mapExpanded } = this.state;
      this.setState({mapExpanded: !mapExpanded});
      var elem = document.getElementById('quest-Map');
      const self=this;
      const exitHandlerFun = () => {
        const element = document.fullscreenElement;
        const { mapExpanded } = this.state;
        if (element === null) 
        {      
            // Run code on exit            
            self.setState({mapExpanded: !mapExpanded});
            document.removeEventListener("fullscreenchange", exitHandlerFun);
        }
      };
      if(elem.requestFullscreen){
        elem.requestFullscreen();
        document.addEventListener("fullscreenchange",exitHandlerFun ,false);
      }
      else if(elem.mozRequestFullScreen){
          elem.mozRequestFullScreen();
          document.addEventListener("mozfullscreenchange", ()=>this.exitHandler(self),false);
      }
      else if(elem.webkitRequestFullscreen){
          elem.webkitRequestFullscreen();
          document.addEventListener("webkitfullscreenchange", ()=>this.exitHandler(self),false);
      }
      else if(elem.msRequestFullscreen){
          elem.msRequestFullscreen();
          document.addEventListener("msfullscreenchange", ()=>this.exitHandler(self),false);
      }
      
      
    }

    handleContractMap = () => {            
      if(document.exitFullscreen){
        document.exitFullscreen();
      }
      else if(document.mozCancelFullScreen){
          document.mozCancelFullScreen();
      }
      else if(document.webkitExitFullscreen){
          document.webkitExitFullscreen();
      }
      else if(document.msExitFullscreen){
          document.msExitFullscreen();
      }      
    }
   
    handleOptionChange = (controlIndex, selectedIndex)=>{         
      let { selectedControls } = this.state;
      const { objectMapControls } = this.props;
      const { controlList } = objectMapControls[0];
      const { token, at, cid } = getUserInfo();
      const layers = ["astroObjects", "graticule"];
      const self = this;
      let filterList=[];
      selectedControls[controlIndex]=selectedIndex;
      this.setState({selectedControls: selectedControls});
      controlList.map((control,i)=>{
        filterList.push({"controlId": control.controlId, "key": control.list[selectedControls[i]].key});
      });
      // console.log(filterList);
      getObjectMap({token, cid, at, filterList, layerList: layers}).then(response=>{       
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = map.getLayers().array_;

          if(arrayLayers.length > 0)
            arrayLayers.map(layer=>{
              map.removeLayer(layer);
            });
            
          layerList.map(layer=>{            
            map.addLayer(this.getLayer(layer.source, layer.type, layer.style, layer.data));
          })
          // map.addLayer(this.getVectorLayer());

          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);
          self.setState({map: map});
        }
        
      });
    }

    handleToogleChange = (i) => {
      let { selectedToggleControls } = this.state;      
      selectedToggleControls[i]=!selectedToggleControls[i];
      this.setState({selectedToggleControls: selectedToggleControls});
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
      const { showObjectCard, objectCardDetails, isloading1 } = this.state
      const { objectMapControls } = this.props;      
      const { selectedControls, hideMap, mapExpanded, selectedToggleControls, explanationText } = this.state;
  
        return (
          <div id="quest-Map">
             <Spinner
              loading={isloading1}
              text="Please wait...loading discussions"
            />
            <div className="map-container">
              <div id="map" class="map">
              
              </div>
              {showObjectCard && (
                  <div className="object-card-popup">
                    <ObjectCard
                      onHide={()=> this.setState({showObjectCard: false})}
                      objectCardDetails={objectCardDetails}
                    />
                </div> 
              )}
               
              
            </div>
           {objectMapControls && (
              <div className="control-div">
              {objectMapControls.map(controlArray=>(
                  controlArray.controlType === "dropdownList" ? (
                    controlArray.controlList.map((control,i)=>(
                      <div className="controls">
                        <span className="select-label">{control.prompt} </span>
                        <Dropdown className="settings-dropdown">
                          <Dropdown.Toggle  id="dropdown-basic">
                          <span className="control-label">{control.list[selectedControls[i]].value}</span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {control.list.map((item,j )=> (
                              <Dropdown.Item
                                key={item.controlId}
                                onClick={()=>this.handleOptionChange(i,j)}
                                className={selectedControls[i] === j ? "control-menu-item-selected" : "control-menu-item"}                                
                              >
                                <span style={{fontWeight: item.bold ? "bold" : "normal", marginLeft: item.indent? "10px" : "unset" }}>{item.value}</span>
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>                       
                      </div>
                    ))                      
                  ) :
                  controlArray.controlType === "iconToggle" ? (
                    controlArray.controlList.map((control,i)=>(
                      <div className="controls">
                        <span className={selectedToggleControls[i] ? "select-label-disabled" : "select-label"}>{control.list[0].value} </span>
                        <Switch 
                          onChange={()=>this.handleToogleChange(i)} 
                          checked={selectedToggleControls[i]} 
                          width={20}
                          height={10}
                          className={"toggle"}
                          onColor="#888"
                          offColor="#888"
                          uncheckedIcon={false}
                          checkedIcon={false}
                          />
                        <span className={selectedToggleControls[i] ? "select-label" : "select-label-disabled"}>{control.list[1].value} </span>
                      </div>
                  )))
                  :
                  controlArray.controlType === "iconList" ? (                   
                    <div className="settings"> 
                      {controlArray.controlList[0].show && (
                        <Dropdown className="settings-dropdown">
                         <Dropdown.Toggle  id="dropdown-basic" block>
                           <img className="setting-icons" 
                           src={controlArray.controlList[0].iconURL}
                           onClick={()=>{}}
                         />
                         </Dropdown.Toggle>
                         <Dropdown.Menu>
                           {controlArray.controlList[0].target.menuItems.map((menu,i)=>(
                               <Dropdown.Item
                               key={i}
                               onClick={()=>{}}
                               className="control-menu-item"
                             >
                               {menu.prompt}
                             </Dropdown.Item>
                           ))}
                         </Dropdown.Menu>                    
                       </Dropdown>
                     )}
     
                     {controlArray.controlList[1].show && !mapExpanded && (
                       <img className="setting-icons" 
                         src={controlArray.controlList[1].iconURL}
                         onClick={this.handleExpandMap}
                       />
                     )}
     
                     {controlArray.controlList[2] && mapExpanded &&(
                       <img className="setting-icons" 
                         src={controlArray.controlList[2].iconURL}
                         onClick={this.handleContractMap}
                         />
                     )}
     
                     {controlArray.controlList[3].show && !hideMap &&(
                       <img className="setting-icons" 
                         src={controlArray.controlList[3].iconURL}
                         onClick={()=>this.setState({hideMap: !hideMap})}
                       />
                     )}
     
                     {controlArray.controlList[4] && hideMap &&(
                       <img className="setting-icons" 
                         src={controlArray.controlList[4].iconURL}
                         onClick={()=>this.setState({hideMap: !hideMap})}
                         />
                     )}
                    </div>
                    )
                    
                  : null
              ))}




            {/* {objectMapControls.mapControls[0].controlList.map((control, i)=>(
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
            ))} */}
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
            {/* <div className="separator-line">
            </div>
            <div className="settings"> 
                {objectMapControls[1].controlList[0].show && (
                   <Dropdown className="settings-dropdown">
                    <Dropdown.Toggle  id="dropdown-basic" block>
                      <img className="setting-icons" 
                      src={objectMapControls[1].controlList[0].iconURL}
                      onClick={()=>{}}
                    />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {objectMapControls[1].controlList[0].target.menuItems.map((menu,i)=>(
                          <Dropdown.Item
                          key={i}
                          onClick={()=>{}}
                        >
                          {menu.prompt}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>                    
                  </Dropdown>
                )}

                {objectMapControls[1].controlList[1].show && !mapExpanded && (
                  <img className="setting-icons" 
                    src={objectMapControls[1].controlList[1].iconURL}
                    onClick={this.handleExpandMap}
                  />
                )}

                {objectMapControls[1].controlList[2] && mapExpanded &&(
                  <img className="setting-icons" 
                    src={objectMapControls[1].controlList[2].iconURL}
                    onClick={this.handleContractMap}
                    />
                )}

                {objectMapControls[1].controlList[3].show && !hideMap &&(
                  <img className="setting-icons" 
                    src={objectMapControls[1].controlList[3].iconURL}
                    onClick={()=>this.setState({hideMap: !hideMap})}
                  />
                )}

                {objectMapControls[1].controlList[4] && hideMap &&(
                  <img className="setting-icons" 
                    src={objectMapControls[1].controlList[4].iconURL}
                    onClick={()=>this.setState({hideMap: !hideMap})}
                    />
                )} */}






                {/* <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/gear_icon.svg"/>   
                <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/maximize_icon.svg"/>
                <img className="setting-icons"src="https://vega.slooh.com/assets/v4/dashboard-new/map_icon.svg"/> */}
            {/* </div> */}
            {explanationText && (
                      <span className="control-label">{explanationText}</span>
                    )}
            </div>
           )}
            
            <button onClick={()=>this.handleFindObject()}>find</button>
          </div>
        );
    }

}
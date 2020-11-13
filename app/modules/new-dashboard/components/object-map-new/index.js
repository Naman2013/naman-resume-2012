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
import {Fill, Stroke, Style, Text, Circle} from 'ol/style';
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
import { getObjectCard, getObjectMap, setObjectMap } from '../../dashboardApi';
import { Spinner } from 'app/components/spinner/index';
import { getUserInfo } from 'app/modules/User';
import Switch from "react-switch";
import { Dropdown } from 'react-bootstrap';
import { ObjectCard } from '../object-card';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import Overlay from 'ol/Overlay';
import classnames from 'classnames';

export class ObjectMap extends Component{
  // state={
  //   map: null,
  //   view: null,
  //   showObjectCard: false,
  //   objectCardDetails: [],
  //   isloading1: false,
  //   selectedControls: [],
  //   mapExpanded: false,
  //   hideMap: false,
  //   selectedToggleControls: [],
  //   explanationText: null,
  //   layerList: [],
  //   currentZoom: 2,
  //   scrollZoomLock: false,
  //   objectMapControls: [],
  // }

  constructor (props){
    super(props);
    const { objectMapControls } = this.props;
    // const selectedControls = objectMapControls[0].controlList.map(control=>control.selectedIndex);      
    // const selectedToggleControls = objectMapControls[1].controlList.map(control=>{return false});
    
    this.state={
      map: null,
      view: null,
      showObjectCard: false,
      objectCardDetails: [],
      isloading1: false,
      mapExpanded: false,
      hideMap: false,
      // selectedControls:selectedControls,
      // selectedToggleControls: selectedToggleControls,
      explanationText: null,
      layerList: [],
      currentZoom: 2,
      scrollZoomLock: false,
      hideTooltipZoomLevel: 8,
      objectMapControls: objectMapControls,
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
        if(showObjectCard)
        {
          self.setState({showObjectCard: false, objectCardDetails: []});
          map.getInteractions().forEach(function(interaction) {
            if (interaction instanceof MouseWheelZoom) {
              interaction.setActive(true);
            }
          }, this);
        }          
        else{
          map.forEachFeatureAtPixel(pixel, function(feature, layer){
            self.setState({isloading1: true});
            const { token, at, cid } = getUserInfo();
            getObjectCard({
              token, 
              at, 
              cid,
              objectId: feature.getId(),
              objectUUID: '2b7fc283-9539-11ea-a953-062dce25bfa1',
              objectVersion: 1.1,              
            }).then(response=>{
              self.setState({isloading1: false, objectCardDetails: response.data, showObjectCard: true});
              map.getInteractions().forEach(function(interaction) {
                if (interaction instanceof MouseWheelZoom) {
                  interaction.setActive(false);
                }
              }, this); 
            });
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
        extent: [-180, -90, 180, 90],
        projection: 'EPSG:4326',
        // zoom: 2,
        // minZoom:2,
        // maxZoom: 9,
        showFullExtent: true,
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

            map.on('moveend', function(e) {
              const { currentZoom } = self.state;
              var newZoom = Math.floor(map.getView().getZoom());
              if (currentZoom != newZoom) {
                self.setState({currentZoom: newZoom});
              }
            });
            
                     
          map.on('click', function(evt) {
            displayFeatureInfo(evt.pixel);
          });
          
          let popup = document.getElementById('object_map_hover_popup');
          let popupOverlay = new Overlay({
            element: popup,
            autoPan: true,
            autoPanAnimation: {
              duration: 250,
            },
            // offset: [-9,-9]
          });
          map.addOverlay(popupOverlay);

          map.on('pointermove', (e)=> {            
            if (e.dragging) {
              $(element).popover('dispose');
              return;
            }
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            var target = map.getTarget();
            document.getElementById(target).style.cursor = hit ? 'pointer' : '';            
            const {hideTooltipZoomLevel} = this.state;
            const curzoom=map.getView().getZoom();            
            if(hit && curzoom <= hideTooltipZoomLevel){
              var coordinate = e.coordinate;  
              map.forEachFeatureAtPixel(pixel, function(feature, layer) {                
                // popup.innerHTML = "<h2 class='popup-text'>" + feature.get('tooltip') + "</h2>";
                popup.innerHTML = "<h1 class='popup-text'>" + feature.get('name') + "</h1>";
                popup.hidden = false;
                popupOverlay.setPosition(coordinate); 
              });  
                           
            }
            else{
              popup.innerHTML = '';
              popup.hidden = true;              
            }
            // var fs = map.queryRenderedFeatures(e.point, { layers: ['svg-layer']});
           
            // if (fs.length > 0) {
              
            //   f = fs[0];
            //   if (f.id !== lastFeatureId) {
            //     lastFeatureId = f.id;
            //     // some visual effect now that the mouse is over a new layer.
            //   }
            // }
            // map.getTarget().style.cursor = hit ? 'pointer' : '';
          });


          this.setState({map: map, view: view });
          this.getObjectMapInit();
          
    }

    resetObjectMap(data){
      const { token, at, cid } = getUserInfo();     
      const self = this;
      getObjectMap({token, cid, at, default: true, ...data}).then(response=>{       
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = map.getLayers().array_;
          // view.fit(res.extent, map.getSize());
          // var view = new View({
          //   center: res.center,
          //   extent: res.extent,
          //   projection: 'EPSG:4326',
          //   zoom: res.initialZoomLevel,
          //   minZoom: res.minZoomLevel,
          //   maxZoom: res.maxZoomLevel,
          //   // showFullExtent: true,
          // });
          if(arrayLayers.length > 0)
            arrayLayers.map(layer=>{
              map.removeLayer(layer);
            });
          // map.setView(view);
          layerList.map(layer=>{            
            map.addLayer(this.getLayer(layer.source, layer.type, layer.style, layer.data));
          })
          // map.addLayer(this.getVectorLayer());

          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);         
          // map.getView().setZoom(res.initialZoomLevel);   
          // map.getView().setMinZoom(res.minZoomLevel);
          // // map.getView().setExtent(res.extent);
          // map.getView().setMaxZoom(res.maxZoomLevel);
          // // map.moveTo(fromLonLat([19,19]));
          // map.getView().setCenter(res.center);
          map.getView().fit(res.extent, map.getSize());
          self.setState({map: map, explanationText: res.explanation, hideTooltipZoomLevel: res.hideTooltipZoomLevel});
        }
        
      });
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
          // map.getView().fit([-100, -90, 0, 90], map.getSize());

          // var view = new View({
          //   center: res.center,
          //   extent: res.extent,
          //   projection: 'EPSG:4326',
          //   zoom: res.initialZoomLevel,
          //   minZoom: res.minZoomLevel,
          //   maxZoom: res.maxZoomLevel,
          //   // showFullExtent: true,
          // });

          if(arrayLayers.length > 0)
            arrayLayers.map(layer=>{
              map.removeLayer(layer);
            });
           
            

            // var view = new View({
            //   center: [0, 0],
            //   // extent: res.extent,
            //   projection: 'EPSG:4326',
            //   zoom: res.initialZoomLevel,
            //   minZoom: res.minZoomLevel,
            //   maxZoom: res.maxZoomLevel,
            //   showFullExtent: true,
            // });  
          // map.setView(view);
          layerList.map(layer=>{            
            map.addLayer(this.getLayer(layer.source, layer.type, layer.style, layer.data, res.hideTooltipZoomLevel));
          })
          // map.addLayer(this.getVectorLayer());

          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);
          // map.getView().fitExtent(res.extent, map.getSize());
          // map.getView().setMinZoom(res.minZoomLevel);
          // map.getView().setZoom(res.initialZoomLevel);   
          // // map.getView().setExtent(res.extent);
          map.getView().setMaxZoom(res.maxZoomLevel);          
          map.getView().fit(res.extent, map.getSize());
          map.getView().setCenter(res.center);
          self.setState({map: map, explanationText: res.explanation, hideTooltipZoomLevel: res.hideTooltipZoomLevel});
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

    

    getVectorLayer(url, data, showLableZoomLevel){

      let ifeatures=[];   
      const { map } = this.state;
      // data.map(item => { 
      //   // if(item.badgeIconURL !== ""){ 
      //     let feature = this.getIconFeature(item.XBadgeCoordDeg, item.YBadgeCoordDeg, item.badgeLabel );
      //     feature.setId(item.questId);
      //     var font = 'normal ' + item.labelFontSize + 'px ' + item.labelFontName;
      //     let style = this.getIconSytle(item.badgeAnchorX, item.badgeAnchorY, item.badgeIconURL, item.badgeLabel, item.XLabelOffset, item.YLabelOffset, font, item.badgeScaleX, item.badgeScaleY, item.badgeLabelColor);
      //     // feature=this.setIconSyle(feature,style);
      //     const self = this;
      //     feature.set('tooltip', item.badgeTooltipText);
      //     // feature.setStyle(style);
      //     feature.setStyle((feature,resolution)=>{
      //       const temp=(1/Math.pow(resolution, 1.1));
             

      //       var x = Math.sin((temp * Math.PI) / 180) * 3;
      //       // var y = Math.sin((i * Math.PI) / 180) * 4;
      //       style.getImage().setScale(x);
      //       // style.getText().setScale(x < 0.8 ? 0.8 : x);
      //       style.getText().setScale(x+0.5);
      //       return style;
      //     });
      //     ifeatures.push(feature);         
        
      // });    
     
      
      // const style={pointerEvents: 'none'};
      // const vectorLayer=new VectorLayer({        
      //   source: new VectorSource({         
      //     features: ifeatures
      //   })                
        
      // });
      // this.setState({vectorLayer: vectorLayer});
      // return vectorLayer;

      return new VectorLayer({
        source: new VectorSource({
          // url: url,
          format: new GeoJSON(),
          features: (new GeoJSON()).readFeatures(data),  
          wrapX: false,
          noWrap: true
        }),
        style: (feature, resolution ) => {
            const temp=(1/Math.pow(resolution, 1.1));
            var x = Math.sin((temp * Math.PI) / 180);
            // if(x<0)
            //   x=x*-1;
            // style.getImage().setScale(x);
            // style.getText().setScale(x+0.5);
            const radius=1/Math.pow(resolution, 1/2);
            const textScale= radius*0.3;
            const textOffsetY= radius+8;
            return new Style({
              image: new Circle({
                radius: radius,
                fill: new Fill({
                  color: '#3399CC',
                }),
                stroke: new Stroke({
                  color: '#cccccc',
                  width: 2,
                }),
                // scale: x,
              }),              
              
              text: map.getView().getZoom() > showLableZoomLevel ? new Text({
                text: feature.get('name'),
                fill: new Fill({color: '#FFFFFF'}),
                offsetX: 0,
                offsetY: textOffsetY,
                textAlign: 'center',
                textBaseline: 'top',
                scale: textScale
              }) : null,
            });
          },
        visible: true,
        title: 'vector map',
        // declutter: true,
      });
    }

    getGraticleLayer(style){
      return new Graticule({
                // the style to use for the lines, optional.
                style,
                showLabels: true,                            
              });
    }

    getIconFeature(lat, lon, text){
      return new Feature({
        geometry: new Point([lat,lon]),
        name: text,
      });      
    }

    getIconSytle(alat, alon, icon, text, offsetX, offsetY, font, scalex, scaley, color){
     return new Style({
        image: new Icon({
          anchor: [alat, alon],
          src: icon,
          crossOrigin: '',
          scale: scalex,
          // rotation: Math.PI / 4,
        }),
        text: new Text({
          text: text,
          scale: 0.8,
          // rotation: Math.PI / 4,
          textAlign: 'center',
          textBaseline: 'top',
          fill: new Fill({color: color}),
          offsetX: offsetX,
          offsetY: offsetY,
          font: font,
        }),
      });
    }


    getLayer(source, type, style, data, showLableZoomLevel){
      switch(type){
        case "Image":
          return this.getSVGLayer(source); 
        case "Vector":
          return this.getVectorLayer(source,data, showLableZoomLevel);
        case "Graticule":
          return this.getGraticleLayer(style)
        
          // return this.getVectorLayer();         
      }
    }


    handleFindObject(){
      // var position = fromLonLat();
      this.state.view.animate({center:[ 81.5505, -67.5 ], zoom: 25, duration: 2000});
    }   

    handleNavigationClick = (direction) => {
      const { map } = this.state;      
      let newCenterInPx;
      let center = map.getView().getCenter();
      let centerInPx = map.getPixelFromCoordinate(center);
      switch (direction) {
        case 'left': newCenterInPx = [centerInPx[0] - 100, centerInPx[1]]; break;
        case 'right': newCenterInPx = [centerInPx[0] + 100, centerInPx[1]]; break;
        case 'top': newCenterInPx = [centerInPx[0], centerInPx[1] - 100]; break;
        case 'bottom': newCenterInPx = [centerInPx[0], centerInPx[1] + 100]; break;
      }
      var newCenter = map.getCoordinateFromPixel(newCenterInPx);
      map.getView().setCenter(newCenter);
    }   

    handleSetObjectMap = (data, handleResponse) => {
      const {at, cid, token} = getUserInfo();
      const { objectMapControls } = this.state;
      const { map, mapExpanded } = this.state;
      const extent = map.getView().calculateExtent();
      const center = map.getView().getCenter();       
      const mapIsFullscreen= mapExpanded ? 1 : 0;      
      let filterList=[];           
      objectMapControls.map(menucontrol=>{
          menucontrol.controlList.map((control,i)=>{
          if(control.controlType === ("dropdownList" || "iconToggle"))
            filterList.push({"controlId": control.controlId, "key": control.list[control.selectedIndex].key});
          if(control.controlId === "gear"){
            control.target.menuItems.map(menu=>{
              if(menu.type === "toggle")
                filterList.push({"controlId": menu.controlId, "key": menu.default });
              else 
                if(data.controlId === menu.controlId && menu.type !== "toggle")
                  filterList.push({"controlId": menu.controlId, "key": 1 });
                else
                  filterList.push({"controlId": menu.controlId, "key": 0 })
            })
          }
        })
      });
      getObjectMap({at, cid, token, extent, center, mapIsFullscreen, filterList}).then(response=>{
        const res=response.data;
        if(!res.apiError){
          if(handleResponse){               
            const { layerList } = res;
            let {map} = self.state;
            const arrayLayers = map.getLayers().array_;          
           
            if(arrayLayers.length > 0)
              arrayLayers.map(layer=>{
                map.removeLayer(layer);
              });
            
            layerList.map(layer=>{            
              map.addLayer(this.getLayer(layer.source, layer.type, layer.style, layer.data, res.hideTooltipZoomLevel));
            })            
            map.getView().setMaxZoom(res.maxZoomLevel);          
            map.getView().fit(res.extent, map.getSize());
            map.getView().setCenter(res.center);
            self.setState({map: map, explanationText: res.explanation, hideTooltipZoomLevel: res.hideTooltipZoomLevel});
          }
        }
      })
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
      var elem = document.getElementById('object-Map');
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
   
    handleOptionChange = (controlType, controlIndex, selectedIndex)=>{     
      let {objectMapControls} = this.state;
      objectMapControls.map((control, i) => {
        if(control.controlType === controlType){
           objectMapControls[i].controlList[controlIndex].selectedIndex = selectedIndex;
            this.setState({objectMapControls}, this.handleFilterChange);
            return;
        }    
      });    
      // let { selectedControls } = this.state;
      // selectedControls[controlIndex]=selectedIndex;
      // this.setState({selectedControls: selectedControls}, this.handleFilterChange);
    }

    handleFilterChange = () => {
      const { token, at, cid } = getUserInfo();
      const layers = ["astroObjects", "graticule"];
      const self = this;
      const { objectMapControls } = this.state;
      // const { controlList } = objectMapControls[0];
      // const { controlList: toggleControlList } = objectMapControls[1];
      const { map, mapExpanded } = this.state;
      const extent = map.getView().calculateExtent();
      const center = map.getView().getCenter();
      const mapIsFullscreen= mapExpanded ? 1 : 0;        
      let {  selectedControls, selectedToggleControls } = this.state;
      let filterList=[];
      objectMapControls.map(menucontrol=>{
          menucontrol.controlList.map((control,i)=>{
          if(control.controlType === "dropdownList" || control.controlType === "iconToggle")
            filterList.push({"controlId": control.controlId, "key": control.list[control.selectedIndex].key});
          if(control.controlId === "gear"){
            control.target.menuItems.map(menu=>{
              if(menu.type === "toggle")
                filterList.push({"controlId": menu.controlId, "key": menu.default });
              else                 
                filterList.push({"controlId": menu.controlId, "key": 0 })
            })
          }
        })
      });
      // toggleControlList.map((toggle,i) =>{
      //   filterList.push({"controlId": toggle.controlId, "key": selectedToggleControls[i] ? toggle.list[1].key : toggle.list[0].key})
      // })
      getObjectMap({token, cid, at, mapIsFullscreen, filterList, layerList: layers, center, extent}).then(response=>{       
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = map.getLayers().array_;          
          // view.fit([-100,-90,0,90], map.getSize());  
          // var view = new View({
          //   center: res.center,
          //   extent: res.extent,
          //   projection: 'EPSG:4326',
          //   zoom: res.initialZoomLevel,
          //   minZoom: res.minZoomLevel,
          //   maxZoom: res.maxZoomLevel,
          //   // showFullExtent: true,
          // });        
          if(arrayLayers.length > 0)
            arrayLayers.map(layer=>{              
              map.removeLayer(layer);
            });
          // map.setView(view);          
          layerList.map(layer=>{            
            map.addLayer(this.getLayer(layer.source, layer.type, layer.style, layer.data));
          })
          // map.addLayer(this.getVectorLayer());

          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);          
          // map.getView().setMinZoom(res.minZoomLevel);
          // map.getView().setZoom(res.initialZoomLevel);      
          // // map.getView().setExtent(res.extent);
          // map.getView().setMaxZoom(res.maxZoomLevel);
          // map.getView().setCenter(res.center);
          map.getView().fit(res.extent, map.getSize());
          map.getView().setCenter(res.center);
          self.setState({map: map, view: view, explanationText: res.explanation, hideTooltipZoomLevel: res.hideTooltipZoomLevel});
        }
        
      });
    }


    handleToogleChange = (i) => {
      let { selectedToggleControls } = this.state;      
      selectedToggleControls[i]=!selectedToggleControls[i];      
      this.setState({selectedToggleControls: selectedToggleControls}, this.handleFilterChange);
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

    onObjectCardClose = () =>{
      let { map } = this.state;
      map.getInteractions().forEach(function(interaction) {
        if (interaction instanceof MouseWheelZoom) {
          interaction.setActive(true);
        }
      }, this);
      this.setState({showObjectCard: false, map: map});
    }

    handleZoomOut = () => {
      let { map } = this.state;
      let currentZoom = Math.floor(map.getView().getZoom());
      if(currentZoom > 2){
        currentZoom=currentZoom-1;        
        this.setState({currentZoom}, ()=>map.getView().setZoom(currentZoom));
      }      
    }

    handleZoomIn = () => {
      let { map } = this.state;
      let currentZoom = Math.floor(map.getView().getZoom());
      if(currentZoom < 9) {
        currentZoom=currentZoom+1;        
        this.setState({currentZoom}, ()=>map.getView().setZoom(currentZoom));
      }       
    }

    handleGearIconChange = (controlIndex, selectedMenu) => { 
      let toggle=false;
      let { objectMapControls } = this.state;
      const controlId = selectedMenu.controlId;
      const controlState = (!selectedMenu.default) ? 1 : 0;
      if(selectedMenu.resetFilters){
      
        this.setState({objectMapControls});
        // const selectedControls = objectMapControls[0].controlList.map(control=>control.selectedIndex);     
        // this.setState({selectedControls: selectedControls});        
      }

      if(selectedMenu.type === "toggle"){
       
          objectMapControls[2].controlList.map((control, i) =>{
            if(control.controlId === "gear"){
              control.target.menuItems.map((menu, index) =>{
                if(menu.menuAction === selectedMenu.menuAction){
                  toggle=objectMapControls[2].controlList[i].target.menuItems[index].default;
                  objectMapControls[2].controlList[i].target.menuItems[index].default=!toggle;
                }                  
              })
            }
          });        
      }

       switch(selectedMenu.menuAction){
        case "reset":
          this.setState({objectMapControls}, this.handleSetObjectMap({controlId, controlState, default: true,}, true));
          // this.resetObjectMap({layerList: selectedMenu.menuTarget});           
          break;
        case "toggleZoomLock":
          const { map } = this.state;
          map.getInteractions().forEach(function(interaction) {
            if (interaction instanceof MouseWheelZoom) {
              interaction.setActive(toggle);
            }
          }, this);
          this.setState({objectMapControls}, this.handleSetObjectMap({controlId, controlState},false));                   
          break;
        case "toggleLayers":
          this.setState({objectMapControls}, this.handleSetObjectMap({controlId, controlState}, true));   
          break;
        case "setCurrentMapViewAsDefault":
        case "setTonightMapViewAsDefault":          
          this.setState({objectMapControls}, this.handleSetObjectMap({controlId, controlState}, false));   
          break;
        default:      
          break;
      }
        
        
    }

    render() {          
      const { showObjectCard, objectCardDetails, isloading1, currentZoom } = this.state
      const { objectMapControls } = this.props;      
      const { hideMap, mapExpanded, explanationText } = this.state;      
        return (
          <div id="object-Map">
             <Spinner
              loading={isloading1}
              text="Please wait..."
            />
            <div className="map-container">
              <div id="map" className={mapExpanded ? "Object-map-fullscreen":"Object-map"}>
              
              </div>
              <div id="object_map_hover_popup" className="hover-popup" >test</div>
              {showObjectCard && (
                  <div className="object-card-popup">
                    <ObjectCard
                      onHide={this.onObjectCardClose}
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
                          <span className="control-label">{control.list[control.selectedIndex].value}</span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu style={{maxHeight: '300px', overflowY: 'auto' }}>
                            {control.list.map((item,j )=> (
                              <Dropdown.Item
                                key={item.controlId}
                                onClick={()=>this.handleOptionChange(controlArray.controlType, i, j)}
                                className={control.selectedIndex === j ? "control-menu-item-selected" : "control-menu-item"}                                
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
                        <span className={control.selectedIndex ? "select-label-disabled" : "select-label"}>{control.list[0].value} </span>
                        <Switch 
                          onChange={(checked)=>this.handleOptionChange(controlArray.controlType, i, checked ? 1 : 0)} 
                          checked={control.selectedIndex} 
                          width={20}
                          height={10}
                          className={"toggle"}
                          onColor="#888"
                          offColor="#888"
                          uncheckedIcon={false}
                          checkedIcon={false}
                          />
                        <span className={control.selectedIndex ? "select-label" : "select-label-disabled"}>{control.list[1].value} </span>
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
                               onClick={()=>{this.handleGearIconChange(i, menu)}}
                               className="control-menu-item"
                             >
                               {menu.default && menu.type === "toggle" && (
                                 <i class="fa fa-check" style={{marginRight: '5px'}} aria-hidden="true"></i>
                               )}
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

                        <img className={classnames('setting-icons', {'disabled-control': !(currentZoom > 2)})}
                         src="https://vega.slooh.com/assets/v4/dashboard-new/minus.svg"
                         onClick={this.handleZoomOut}
                         />

                        <img className="setting-icons" 
                         src="https://vega.slooh.com/assets/v4/dashboard-new/zoom-minus-magnifier.svg"
                        //  onClick={()=>this.setState({hideMap: !hideMap})}
                         />

                        <img className="setting-icons" 
                          className={classnames('setting-icons', {'disabled-control': !(currentZoom < 9)})}
                         src="https://vega.slooh.com/assets/v4/dashboard-new/plus.svg"
                         onClick={this.handleZoomIn}
                         />

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
            
            {/* <button onClick={()=>this.handleFindObject()}>find</button> */}

            <button onClick={()=>this.handleNavigationClick('left')}>left</button>
            <button onClick={()=>this.handleNavigationClick('right')}>right</button>
            <button onClick={()=>this.handleNavigationClick('top')}>up</button>
            <button onClick={()=>this.handleNavigationClick('bottom')}>down</button>

          </div>
        );
    }

}
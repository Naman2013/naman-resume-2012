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
import {mapVector, testmapVector} from "./map";
import { WKT } from 'ol/format/WKT';
import  Point from 'ol/geom/Point';
import {Fill, Stroke, Style, Text, Icon} from 'ol/style';
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
import { getQuestCard, getQuestMap } from '../../dashboardApi';
import { Spinner } from 'app/components/spinner/index';
import { getUserInfo } from 'app/modules/User';
import { Dropdown } from 'react-bootstrap';
import Feature from 'ol/Feature';
import {getVectorContext} from 'ol/render';
import {Group as LayerGroup} from 'ol/layer';
import Overlay from 'ol/Overlay';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import { defaults as defaultInteractions } from 'ol/interaction';

export class QuestMap extends Component{
  state={
    map: null,
    view: null,
    showQuestCard: false,
    questCardDetails: [],
    isloading1: false,
    selectedControls: [],
    mapExpanded: false,
    hideMap: false,
    explanationText: null,
    vectorLayer: null,
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
      selectedControls:selectedControls,
      mapExpanded: !questMapControls[1].controlList[1].show,
      hideMap: questMapControls[1].controlList[3].show,
    }    
  }
    componentDidMount(){     
     
      // var vectorLayer = new VectorLayer({
      //   source: new VectorSource({
      //     format: new GeoJSON(),
      //     features: (new GeoJSON()).readFeatures(mapVector)   
      //     // url: "https://vega.slooh.com/assets/v4/dashboard-new/objectmap/test.js"
      //   }),
      //   zIndex: 1
      // });

      
     
      // // var zoomControl = new Zoom({
      // //   zoomInTipLabel: 'Zoom closer in',
      // //   zoomOutTipLabel: 'Zoom further out',
      // //   className: 'ol-zoom custom-zoom-control'
      // // });
      const self = this;
      var displayFeatureInfo = function(pixel) {
        const { showQuestCard, vectorLayer } = self.state;
        if(showQuestCard)
        {
            self.setState({showQuestCard: false, questCardDetails: []});
            map.getInteractions().forEach(function(interaction) {
              if (interaction instanceof MouseWheelZoom) {
                interaction.setActive(true);
              }
            }, this);
        }
        else{     
          map.forEachFeatureAtPixel(pixel, function(feature, layer) {
            // console.log("object name: "+feature.get('name'));
            // console.log("object id: "+feature.getId());
                popup.innerHTML = '';
                popup.hidden = true;
                self.setState({isloading1: true});
                const { token, at, cid } = getUserInfo();
                getQuestCard({
                  token, 
                  at, 
                  cid,
                  questId: feature.getId(),
                  // questId: 194,
                  questUUID: 'ae699819-c1df-11ea-a953-062dce25bfa1',
                  questVersion: 1.1
                }).then(response=>{
                  self.setState({isloading1: false, questCardDetails: response.data, showQuestCard: true});            
                  map.getInteractions().forEach(function(interaction) {
                    if (interaction instanceof MouseWheelZoom) {
                      interaction.setActive(false);
                    }
                  }, this);    
                });    
          });
        }
        // vectorLayer.getFeatures(pixel).then(function(features) {
         
        //   var feature = features.length ? features[0] : undefined; 
        //   if (features.length) {  
        //     console.log("object name: "+feature.get('name'));
        //     console.log("object id: "+feature.getId());
        //     if(showQuestCard)
        //       self.setState({showQuestCard: false, questCardDetails: []});
        //     else{
        //       self.setState({isloading1: true});
        //       const { token, at, cid } = getUserInfo();
        //       getQuestCard({
        //         token, 
        //         at, 
        //         cid,
        //         questId: feature.getId(),
        //         // questId: 194,
        //         questUUID: 'ae699819-c1df-11ea-a953-062dce25bfa1',
        //         questVersion: 1.1
        //       }).then(response=>{
        //         self.setState({isloading1: false, questCardDetails: response.data, showQuestCard: true});                
        //       });         
        //     }
        //   }
        //   else
        //   if(showQuestCard)
        //       self.setState({showQuestCard: false, questCardDetails: []});
        // });

        
          
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
        zoom: 0,
        // maxZoom: 6,
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
            
            
            
            // var controls = Control.defaults({rotate: false});
            
            var map = new Map({
              interactions: defaultInteractions({altShiftDragRotate:false, pinchRotate:false}),
              controls: [],
              target: 'map',
              view: view,
              layers: [                   
                // backgroundLayer,
                // vectorLayer,
              ],
              
            });

            
           
            
                     
          map.on('click', function(evt) {
            displayFeatureInfo(evt.pixel);
          });          
          let popup = document.getElementById('hover_popup');
          let popupOverlay = new Overlay({
            element: popup,
            autoPan: true,
            autoPanAnimation: {
              duration: 250,
            },
            // offset: [-9,-9]
          });
          map.addOverlay(popupOverlay);

          map.on('pointermove', function (e) {            
            if (e.dragging) {
              $(element).popover('dispose');
              return;
            }
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            var target = map.getTarget();
            document.getElementById(target).style.cursor = hit ? 'pointer' : '';            
            
            if(hit){
              var coordinate = e.coordinate;  
              map.forEachFeatureAtPixel(pixel, function(feature, layer) {                
                popup.innerHTML = "<h2 class='popup-text'>" + feature.get('tooltip') + "</h2>";
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


          // map.on('click', this.handleMapClick.bind(this));
          this.setState({map: map, view: view });
          this.getQuestMapInit();          
    }


    resetQuestMap(data){
      const { token, at, cid } = getUserInfo();
      const self = this;
      
      // console.log(filterList);
      getQuestMap({token, cid, at, ...data}).then(response=>{       
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = map.getLayers().array_;
          let mapLayerList=[]
          if(arrayLayers.length > 0)
            arrayLayers.map(layer=>{
              map.removeLayer(layer);
            });          
          layerList.map(layer=>{    
            mapLayerList.push(this.getLayer(layer.source, layer.type, layer.data));                       
          })
          map.addLayer(new LayerGroup({
            layers: mapLayerList
          }));
          // map.addLayer(this.getVectorLayer());

          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);
         
          map.getView().setZoom(0);
          self.setState({map: map, explanationText: res.explanation});
        }
        else
          self.props.validateResponseAccess(res);
      });
    }




    getQuestMapInit(){
      const { token, at, cid } = getUserInfo();
      const self = this;
      
      // console.log(filterList);
      getQuestMap({token, cid, at, default: true}).then(response=>{
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = map.getLayers().array_;

          if(arrayLayers.length > 0)
            arrayLayers.map(layer=>{
              map.removeLayer(layer);
            });          
            
            // map.addLayer(this.testVectorLayer(false));
            // map.addLayer(this.testVectorLayer(true));

          layerList.map(layer=>{                        
            map.addLayer(this.getLayer(layer.source, layer.type, layer.data));           
          })
        //   var style = new Style({
        //     image: new Icon({
        //         src: 'http://www.williambuck.com/portals/0/Skins/WilliamBuck2014/images/location-icon.svg'
        //     })
        // });
          // map.addLayer(this.getVectorLayer());
          map.getView().setMaxZoom(res.maxZoomLevel);
          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);
          // var properties = map.getView().getProperties();
          // properties["maxZoom"] = res.maxZoomLevel;
          // map.setView(new ol.View(properties));
          self.setState({map: map, explanationText: res.explanation});
          
          setTimeout(()=>{            
            document.getElementsByClassName('ol-layer')[0].style.pointerEvents='none';            
          }, 500);
          
        }
        else
         self.props.validateResponseAccess(res)
        
      });
    }

    getSVGLayer(source,data){
      var svgContainer = document.createElement('div');
            // var xhr = new XMLHttpRequest();            
            // xhr.open('GET', source ,true);
            // // xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://vega.slooh.com'); 
            // xhr.setRequestHeader('Content-Type','application/xml');
            // xhr.addEventListener('load', function () {
            //   var svg = xhr.responseXML.documentElement;
            //   svgContainer.ownerDocument.importNode(svg);
            //   svgContainer.appendChild(svg);
            // });
            // xhr.send();
            // var svg = data;
           
            // var parser = new DOMParser();
            // var doc = parser.parseFromString(data, "image/svg+xml");
            // svgContainer.ownerDocument.importNode('data:image/svg+xml;charset=utf-8,'+svg);
            svgContainer.innerHTML=data;
            svgContainer.style.position="absolute";
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
               
              },                

              )
              return backgroundLayer;
    }

    getVectorLayer(data, layer){      
      let ifeatures=[];
      // let feature = this.getIconFeature(0, -10, "test" );
      // let style = this.getIconSytle(0.5, 0.9, "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png", "test" );
      // feature = this.setIconSyle(feature,style);
      // features.push(feature);
      data.map(item => { 
        if(item.badgeIconURL !== ""){ 
          let feature = this.getIconFeature(item.XBadgeCoordDeg, item.YBadgeCoordDeg, item.badgeLabel );
          feature.setId(item.questId);
          var font = 'normal ' + item.labelFontSize + 'px ' + item.labelFontName;
          let style = this.getIconSytle(item.badgeAnchorX, item.badgeAnchorY, item.badgeIconURL, item.badgeLabel, item.XLabelOffset, item.YLabelOffset, font, item.badgeScaleX, item.badgeScaleY, item.badgeLabelColor);
          // feature=this.setIconSyle(feature,style);
          const self = this;
          feature.set('tooltip', item.badgeTooltipText);
          // feature.setStyle(style);
          feature.setStyle((feature,resolution)=>{
            const temp=(1/Math.pow(resolution, 1.1));
            // const {map} = self.state;
            // const zoom=map.getView().getZoom();
            // let i =0.4;
            // if(zoom>0)
            //   i=i+(Math.floor(zoom)/10)
            // switch(Math.floor(zoom)){
            //   case 0:
            //     i=0.4;
            //     break;
            //   case 1:
            //     i=0.5;
            //     break;
            //   case 2:
            //     i=0.6;
            //     break;
            //   case 3:
            //     i=0.7;
            //     break;
            //   case 4:
            //     i=0.8;
            //     break;
            //   case 5:
            //     i= 0.9;
            //     break;
            //   case 6:
            //     i=1;
            //     break;
            // }
            // let i = ((0.1-resolution))+0.5;       

            var x = Math.sin((temp * Math.PI) / 180) * 3;
            // var y = Math.sin((i * Math.PI) / 180) * 4;
            style.getImage().setScale(x);
            // style.getText().setScale(x < 0.8 ? 0.8 : x);
            style.getText().setScale(x+0.5);
            return style;
          });
          ifeatures.push(feature);
          // layer.on('postrender', (event) => {         
          //   let i = 0;
          //   let j = 45;
          //   var vectorContext = getVectorContext(event);
          //   var x = Math.cos((i * Math.PI) / 180) * 3;
          //   var y = Math.cos((j * Math.PI) / 180) * 4;
          //   style.getImage().setScale([x, y]);
          //   style.getText().setScale([x, y]);
          //   vectorContext.drawFeature(feature, style);
          // });
        }
        
      });    
     
      // layer.on('postrender', (event) => {
      //   let i = 0;
      //   let j = 45;
      //   var vectorContext = getVectorContext(event);
      //   var x = Math.cos((i * Math.PI) / 180) * 3;
      //   var y = Math.cos((j * Math.PI) / 180) * 4;
      //   iconStyle.getImage().setScale([x, y]);
      //   iconStyle.getText().setScale([x, y]);
      //   vectorContext.drawFeature(feature, style);
      // });
      const style={pointerEvents: 'none'};
      const vectorLayer=new VectorLayer({        
        source: new VectorSource({
          // format: new GeoJSON({dataProjection: 'EPSG:4326'}),
          // features: (new GeoJSON()).readFeatures(mapVector)   
          // url: "https://vega.slooh.com/assets/v4/dashboard-new/objectmap/test.js"
          features: ifeatures
        })        
        // zIndex: 1
        
      });
      this.setState({vectorLayer: vectorLayer});
      return vectorLayer;
    }

    testVectorLayer(test){
      return new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON({dataProjection: 'EPSG:4326'}),
          features: (new GeoJSON()).readFeatures(test ? testmapVector : mapVector)   
          // url: "https://vega.slooh.com/assets/v4/dashboard-new/objectmap/test.js"
          // features: features
        }),
        zIndex: 1
      });
    }


    getLayer(source, type, data){
      switch(type){

        case "Image":
          return this.getSVGLayer(source, data); 

        case "VectorLayer":
          const { map } = this.state;
          let layer = map.getLayers().array_[0];
          return this.getVectorLayer(data, layer);
          // return this.getVectorLayer();      
          // return this.testVectorLayer(false)   ;
      }
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

    
    
    setIconSyle(iconFeature, iconStyle){
      iconFeature.setStyle(()=> {
        let i = 1;       
        var x = Math.sin((i * Math.PI) / 180) * 3;
        var y = Math.sin((i * Math.PI) / 180) * 4;
        iconStyle.getImage().setScale([x, y]);
        iconStyle.getText().setScale([x, y]);
        return iconStyle;
      });
      return iconFeature;
    }


    handleFindObject(){
      // var position = fromLonLat();
      this.state.view.animate({center: fromLonLat([ 130, 433 ]), zoom: 18, duration: 2000});
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
            setTimeout( ()=> { self.state.map.updateSize(); self.state.map.getView().setZoom(0)}, 100);
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

    handleGearIconChange = (menu) => { 
      if(menu.resetFilters){
        const { questMapControls } = this.props;
        const selectedControls = questMapControls[0].controlList.map(control=>control.selectedIndex);     
        this.setState({selectedControls: selectedControls});
      }
      // switch(menu.menuAction){
      //   case "reset":
      //     this.resetQuestMap({layerList: menu.menuTarget});
          
      //     break;
      //   default:
          this.resetQuestMap({layerList: menu.menuTarget});
      //     break;
      // }
    }
   
    handleOptionChange = (controlIndex, selectedIndex)=>{         
      let { selectedControls } = this.state;
      const { questMapControls } = this.props;
      const { controlList } = questMapControls[0];
      const { token, at, cid } = getUserInfo();
      const layers = ["questMap", "pathfinder"];
      const self = this;
      let filterList=[];
      selectedControls[controlIndex]=selectedIndex;
      this.setState({selectedControls: selectedControls});
      controlList.map((control,i)=>{
        filterList.push({"controlId": control.controlId, "key": control.list[selectedControls[i]].key});
      });
      // console.log(filterList);
      getQuestMap({token, cid, at, filterList, layerList: layers}).then(response=>{
       
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = map.getLayers().array_;

          if(arrayLayers.length > 0)
            arrayLayers.map(layer=>{
              map.removeLayer(layer);
            });
            // map.addLayer(this.getVectorLayer());
          layerList.map(layer=>{            
            map.addLayer(this.getLayer(layer.source, layer.type, layer.data));
          })
          // container = document.getElementById('popover');
 
          // overlay = new Overlay({
          //   element: container,
          //   autoPan: true,
          //   autoPanAnimation: {
          //     duration: 250,
          //   },
          // });
          // map.addOverlay(overlay)

          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);
          self.setState({map: map, explanationText: res.explanation});
        }
        else
          self.props.validateResponseAccess(res)
      });
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

    onQuestCardClose = () =>{
      let { map } = this.state;
      map.getInteractions().forEach(function(interaction) {
        if (interaction instanceof MouseWheelZoom) {
          interaction.setActive(true);
        }
      }, this);
      this.setState({showQuestCard: false, map: map});
    }

    render() {          
      const { showQuestCard, questCardDetails, isloading1 } = this.state
      const { questMapControls } = this.props;      
      const { selectedControls, hideMap, mapExpanded, explanationText } = this.state;
      
        return (
          <div id="quest-Map">
             <Spinner
              loading={isloading1}
              text="Please wait..."
            />
            <div className="map-container">
              <div id="map" className={mapExpanded ? "Quest-map-fullscreen":"Quest-map"}>
              </div>
              
              <div id="hover_popup" className="hover-popup" >test</div>
              {showQuestCard && (
                  <div className="popup">
                    <QuestCard
                      onHide={this.onQuestCardClose}
                      questCardDetails={questCardDetails}
                    />
                </div> 
              )}
               
              
              
            </div>
           <div className="controls-div">
            <div className="dropdown-control-div col-md-offset-1">
              {questMapControls[0].controlList.map((control, i)=>(
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


                {/* <Select                 
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
                /> */}
              </div>
              ))}
              </div>
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
              </div> */}
               {/* <div className="control-div"> */}
                  <div className="settings-controls"> 
                {/* {questMapControls[1].controlList.map(control=>(
                  <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/gear_icon.svg"/>
                ))}                */}

                  {questMapControls[1].controlList[0].show && (
                     <Dropdown className="settings-dropdown">
                      <Dropdown.Toggle  id="dropdown-basic" block>
                        <img className="setting-icons" 
                        src={questMapControls[1].controlList[0].iconURL}
                        onClick={()=>{}}
                      />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {questMapControls[1].controlList[0].target.menuItems.map((menu,i)=>(
                            <Dropdown.Item
                            key={i}
                            onClick={()=>{this.handleGearIconChange(menu)}}
                            className="control-menu-item"
                          >
                            {menu.prompt}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>                    
                    </Dropdown>
                  )}

                  {questMapControls[1].controlList[1].show && !mapExpanded && (
                    <img className="setting-icons" 
                      src={questMapControls[1].controlList[1].iconURL}
                      onClick={this.handleExpandMap}
                    />
                  )}

                  {questMapControls[1].controlList[2] && mapExpanded &&(
                    <img className="setting-icons" 
                      src={questMapControls[1].controlList[2].iconURL}
                      onClick={this.handleContractMap}
                      />
                  )}

                  {questMapControls[1].controlList[3] && !hideMap &&(
                    <img className="setting-icons" 
                      src={questMapControls[1].controlList[3].iconURL}
                      onClick={()=>this.setState({hideMap: !hideMap})}
                    />
                  )}

                  {questMapControls[1].controlList[4] && hideMap &&(
                    <img className="setting-icons" 
                      src={questMapControls[1].controlList[4].iconURL}
                      onClick={()=>this.setState({hideMap: !hideMap})}
                      />
                  )}

                    
                


                    {explanationText && (
                      <span className="control-label">{explanationText}</span>
                    )}


                  {/* <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/gear_icon.svg"/>   
                  <img className="setting-icons" src="https://vega.slooh.com/assets/v4/dashboard-new/maximize_icon.svg"/>
                  <img className="setting-icons"src="https://vega.slooh.com/assets/v4/dashboard-new/map_icon.svg"/> */}
              </div>
              
              </div>
            {/* </div> */}
            {/* <button onClick={()=>this.handleFindObject()}>find</button> */}
          </div>
        );
    }

}
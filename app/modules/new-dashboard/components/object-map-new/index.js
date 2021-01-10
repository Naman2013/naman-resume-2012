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
import {Fill, Stroke, Style, Text, Circle, Icon} from 'ol/style';
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
import ObjectCard from '../object-card';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import Overlay from 'ol/Overlay';
import classnames from 'classnames';
import MapNavigation from '../../common/map-navigation';
import Feature from 'ol/Feature';
import  Point from 'ol/geom/Point';
import { Tooltip } from 'react-tippy';

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
      currentZoom: 0,
      scrollZoomLock: false,
      hideTooltipZoomLevel: 8,
      objectMapControls: undefined,
      zoomIncrement: 1,
      panMovement: 100,
      maxZoomLevel: 10,
      mapTitle: "", 
      mapSubtitle: "",
      titleBackgoundColor: "#35485B",
      navigationBackgroundColor: "#35485B",
      showLeftPan: true,
      showRightPan: true,
      showUpPan: true,
      showDownPan: true,
      showZoomIn: true,
      showZoomOut: true,   
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
            if(layer.get('title') !== "ecliptic" && layer.get('title') !== "celestial equator" && feature.get('name') !== undefined){
              self.setState({isloading1: true});
              const { token, at, cid } = getUserInfo();
              getObjectCard({
                token, 
                at, 
                cid,
                callSource: "objectMap",
                objectId: feature.getId(),
                objectUUID: '2b7fc283-9539-11ea-a953-062dce25bfa1',
                objectVersion: 1.1,
                layerId: layer.get('title'),              
              }).then(response=>{
                self.setState({isloading1: false, objectCardDetails: response.data, showObjectCard: true});
                map.getInteractions().forEach(function(interaction) {
                  if (interaction instanceof MouseWheelZoom) {
                    interaction.setActive(false);
                  }
                }, this); 
              });
              }
            
          });                   
        }
          
      };
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
              var view=map.getView();                           
              var newZoom =view.getZoom();
              const extent = view.calculateExtent(map.getSize());   
              self.setState({
                showLeftPan: Math.floor(extent[0]) > -180,
                showDownPan: Math.floor(extent[1]) > -90,
                showRightPan: Math.ceil(extent[2]) < 180,
                showUpPan: Math.ceil(extent[3]) < 90,
                currentZoom: newZoom,
              })
              // if (currentZoom != newZoom) {
              //   self.setState({currentZoom: newZoom});
              // }
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
            // if (e.dragging) {
            //   $(element).popover('dispose');
            //   return;
            // }
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            var target = map.getTarget();
            document.getElementById(target).style.cursor = hit ? 'pointer' : '';            
            const {hideTooltipZoomLevel} = this.state;
            const curzoom=map.getView().getZoom();            
            if(hit){
              var coordinate = e.coordinate;  
              map.forEachFeatureAtPixel(pixel, function(feature, layer) {                
                // popup.innerHTML = "<h2 class='popup-text'>" + feature.get('tooltip') + "</h2>";  
                if(layer.get('title') === "sunandmoon" && feature.get('name') !== undefined && curzoom >= hideTooltipZoomLevel){
                  var name=feature.get('name').replace(/\n/g,'<br>')
                  popup.innerHTML = "<h1 class='popup-text'>" + name + "</h1>";
                  popup.hidden = false;
                  popupOverlay.setPosition(coordinate); 
                }
                else if(layer.get('title') === "astroObjects" && feature.get('name') !== undefined && curzoom <= hideTooltipZoomLevel){
                  var name=feature.get('name').replace(/\n/g,'<br>')
                  popup.innerHTML = "<h1 class='popup-text'>" + name + "</h1>";
                  popup.hidden = false;
                  popupOverlay.setPosition(coordinate); 
                }                
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
      this.setState({isloading1: true});
      getObjectMap({token, cid, at, default: true, ...data}).then(response=>{       
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = [...map.getLayers().getArray()];          
           
            if(arrayLayers.length > 0)
              arrayLayers.forEach((layer)=> map.removeLayer(layer));
          // map.setView(view);
          layerList.map(layer=>{            
            map.addLayer(this.getLayer(layer.source, layer.type, layer.styles, layer.data, res.hideTooltipZoomLevel, layer.dataType, layer.startingOffset,layer.layerId));
          })
          // map.addLayer(this.getVectorLayer());

          // mapObject.addLayer(raster);

          // map.addLayer([mapLayer]);
          // map.getLayers().extend(layerList);         
          // map.getView().setZoom(res.initialZoomLevel);   
          // map.getView().setMinZoom(res.minZoomLevel);
          // // map.getView().setExtent(res.extent);
          map.getView().setMaxZoom(res.maxZoomLevel);
          // // map.moveTo(fromLonLat([19,19]));
          // map.getView().setCenter(res.center);
          map.getView().fit(res.extent, map.getSize());
          map.getInteractions().forEach(function(interaction) {
            if (interaction instanceof MouseWheelZoom) {
              interaction.setActive(!res.mapControls[2].controlList[0].target.menuItems[1].default);
            }
          }, this);
          self.setState({isloading1: false, map: map, explanationText: res.explanation, hideTooltipZoomLevel: res.hideTooltipZoomLevel, objectMapControls: res.mapControls, zoomIncrement: res.zoomIncrement, panMovement: res.panMovement, maxZoomLevel: res.maxZoomLevel,mapTitle: res.mapTitle, mapSubtitle: res.mapSubtitle, navigationBackgroundColor: res.navigationBackgroundColor, titleBackgoundColor: res.titleBackgoundColor},()=>{
            if(res.mapIsFullscreen!==mapExpanded)
            {
              if(res.mapIsFullscreen) 
                this.handleExpandMap();                
              else 
                this.handleContractMap();
            }            
          });
        }
        
      });
    }

    getObjectMapInit(){
      const { token, at, cid } = getUserInfo();  
      const { mapExpanded, objectMapControls } = this.state;
      const self = this;
      this.setState({isloading1: true});
      getObjectMap({token, cid, at,default: true}).then(response=>{       
        const res=response.data;
        if(!res.apiError){
          const { layerList } = res;
          let {map} = self.state;
          const arrayLayers = [...map.getLayers().getArray()];          
           
            if(arrayLayers.length > 0)
              arrayLayers.forEach((layer)=> map.removeLayer(layer));
          layerList.map(layer=>{            
            map.addLayer(this.getLayer(layer.source, layer.type, layer.styles, layer.data, res.hideTooltipZoomLevel, layer.dataType, layer.startingOffset,layer.layerId));
          })  
          map.getView().setMaxZoom(res.maxZoomLevel);          
          map.getView().fit(res.extent, map.getSize());
          map.getView().setCenter(res.center);
          map.getInteractions().forEach(function(interaction) {
            if (interaction instanceof MouseWheelZoom) {
              interaction.setActive(!res.mapControls[2].controlList[0].target.menuItems[1].default);
            }
          }, this);
          self.setState({isloading1: false, map: map, explanationText: res.explanation, hideTooltipZoomLevel: res.hideTooltipZoomLevel, objectMapControls: res.mapControls, zoomIncrement: res.zoomIncrement, panMovement: res.panMovement, maxZoomLevel: res.maxZoomLevel,mapTitle: res.mapTitle, mapSubtitle: res.mapSubtitle, navigationBackgroundColor: res.navigationBackgroundColor, titleBackgoundColor: res.titleBackgoundColor},()=>{           
            
            if(res.mapIsFullscreen!==mapExpanded)
            {
              if(res.mapIsFullscreen) 
                this.handleExpandMap();                
              else 
                this.handleContractMap();
            }           
            
           
          });
        }
        
      });
    }

    getSVGLayer(source, data){
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

            // var width = 2560;
            // var height = 1280;
            // var svgResolution = 360 / width;
            // svgContainer.style.width = width + 'px';
            // svgContainer.style.height = height + 'px';
            // svgContainer.style.transformOrigin = 'top left';
            // svgContainer.className = 'svg-layer';

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
              })
              return backgroundLayer;
    }

    

    getVectorLayer(url, data, showLableZoomLevel, layerId){

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
        title: layerId,
        // declutter: true,
      });
    }

    getStandardVectorLayer(data, style, layerId){
      const { map } = this.state; 
      return new VectorLayer({
        source: new VectorSource({
          // url: url,
          format: new GeoJSON(),
          features: (new GeoJSON()).readFeatures(data),  
          wrapX: false,
          noWrap: true,
          showLabels: true, 
        }),
        style: (feature, resolution ) => {
            const temp=(1/Math.pow(resolution, 1.1));
            var x = Math.sin((temp * Math.PI) / 180);
            // if(x<0)
            //   x=x*-1;
            // style.getImage().setScale(x);
            // style.getText().setScale(x+0.5);
            const radius=1/Math.pow(resolution, 1/2);
            const textScale= radius*style.textScale;
            const textOffsetY= radius+8;
            return new Style({
              // image: new Circle({
              //   radius: radius,
              //   fill: new Fill({
              //     color: '#3399CC',
              //   }),
              //   stroke: new Stroke({
              //     color: '#cccccc',
              //     width: 2,
              //   }),
              //   // scale: x,
              // }),              
              stroke: new Stroke(style.strokeStyle),


              text:new Text({
                text: feature.get('name'),
                fill: new Fill({color: style.labelColor}),
                // offsetX: 0,
                // offsetY: textOffsetY,
                // textAlign: 'center',
                textBaseline: 'bottom',
                scale: textScale,
                placement: 'line',
              }) ,
            });
          },
        visible: true,
        title: layerId,
        // declutter: true,
      });
    }

    getIconVectorLayer(data, showLabelZoomLevel, layerId){      
      let ifeatures=[];
      const { map } = this.state;
      // let feature = this.getIconFeature(0, -10, "test" );
      // let style = this.getIconSytle(0.5, 0.9, "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png", "test" );
      // feature = this.setIconSyle(feature,style);
      // features.push(feature);      
      data.map(item => { 
        if(item.iconURL !== ""){ 
          let feature = this.getIconFeature(item.XCoordDeg, item.YCoordDeg, item.labelText );
          feature.setId(item.objectId);
          var font = 'normal ' + item.labelFontSize + 'px ' + item.labelFontName;
          let style = this.getIconSytle(item.anchorX, item.anchorY, item.iconURL, item.labelText, item.XLabelOffset, item.YLabelOffset, font, item.ScaleX, item.ScaleY, item.labelColor);
          // feature=this.setIconSyle(feature,style);
          const self = this;          
          feature.set('tooltip', item.tooltipText);
          feature.set('color', item.labelColor);
          feature.set('offsetX', item.XLabelOffset);
          feature.set('offsetY', item.YLabelOffset)
          // feature.setStyle(style);
          feature.setStyle((feature,resolution)=>{
            const currentZoom = self.state.map.getView().getZoom();
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
            const radius=1/Math.pow(resolution, 1/4);
            style.getImage().setScale(x);
            // style.getText().setScale(x < 0.8 ? 0.8 : x);
            if (currentZoom < showLabelZoomLevel){              
              style.setText(new Text({
                text: feature.get('name'),
                scale: 0.8,
                // rotation: Math.PI / 4,
                textAlign: 'center',
                textBaseline: 'top',
                fill: new Fill({color: feature.get('color')}),
                offsetX: feature.get('offsetX'),
                offsetY: feature.get('offsetY'),
                font: font,
              }));
              style.getText().setScale(x+0.5);
            }              
            else
              style.setText("");
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
          features: ifeatures,
          wrapX: false,
          noWrap: true,
        }),        
        // zIndex: 1        
        title: layerId,
        
      });      
      return vectorLayer;
    }



    getGraticleLayer(style, offset){
      var width=document.getElementById("map");     
      return new Graticule({
                // the style to use for the lines, optional.
                // style,
                strokeStyle:  new Stroke(style.strokeStyle),  
                showLabels: true, 
                wrapX: false,
                visible:true, 
                targetSize: width/30,               
                intervals:  [15],
                extent: [-180, -90, 180, 90],                
                lonLabelStyle: new Text({                 
                  font: '12px Calibri,sans-serif',
                  textAlign: 'start',
                  textBaseline: 'bottom',
                  fill: new Fill({
                      color: 'rgba(255,255,255,1)',
                  }), 
                }), 
                latLabelStyle: new Text({
                  font: '12px Calibri,sans-serif',
                  textAlign: 'end',
                  fill: new Fill({
                    color: 'rgba(255,255,255,1)'
                  }),
                  // stroke: Stroke({
                  //   color: 'rgba(255,255,255,1)',
                  //   width: 3
                  // })
                }),
                lonLabelFormatter: (longitude)=>{  
                    // let degree = 180 + longitude;
                    // degree=degree+offset;
                    // if(degree >= 360)
                    //   degree=degree-360;
                    // const temp = degree - offset;
                    // degree= offset-temp;
                    // if(degree < 0)
                    //   degree=degree*(-1)
                    let degree=longitude < 0 ? (longitude * -1) + 180 : 180-longitude;
                    degree=degree+offset;
                    if(degree >= 360)
                      degree=degree-360;
                    const hours = Math.floor(degree / 15);
                    const mins = Math.floor(degree % 15);
                    return hours + 'h' + (mins > 0 ?  ' ' + mins + 'm' : '' );  
                },
                latLabelFormatter: (latitude)=>{       
                  const degree=this.ConvertDDToDMS(latitude)                  
                  if(degree.deg === 0 && degree.min === 0)
                    return degree.deg + '°';
                  else
                    return  (degree.dir === "N" ? "" : "- ") + degree.deg + '°';         
                    // return (degree.dir === "N" ? "" : "- ") + degree.deg + '° ' + degree.min + "' ";         
                  // const degree = 180 + longitude;
                  // const hours = Math.floor(degree / 15);
                  // const mins = Math.floor(degree % 15);
                  // return hours + 'h' + (mins > 0 ?  ' ' + mins + 'm' : '' );  
                }
              }); 
    }

    getIconFeature(lat, lon, text){
      return new Feature({
        geometry: new Point([lat,lon]),
        name: text,
      });      
    }

    ConvertDDToDMS(D){
      const M=0|(D%1)*60e7;  
      return {
          dir : D<0?'S':'N',
          deg : 0|(D<0?D=-D:D),
          min : 0|M/1e7,
          sec : (0|M/1e6%1*6e4)/100
      };
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
          placement: 'line',
        }),
      });
    }


    getLayer(source, type, style, data, showLableZoomLevel, dataType, offset, layerId){
      switch(type){
        case "Image":
          return this.getSVGLayer(source, data, layerId); 
        case "Vector":
          switch(dataType){
            case "Icons":
              return this.getIconVectorLayer(data, showLableZoomLevel, layerId);
            case "CircleGeoJson":
              return this.getVectorLayer(source,data, showLableZoomLevel, layerId);
            case "StandardGeoJson":
              return this.getStandardVectorLayer(data, style, layerId);
          }          
        case "Graticule":
          return this.getGraticleLayer(style,offset, layerId)
        
          // return this.getVectorLayer();         
      }
    }


    handleFindObject(){
      // var position = fromLonLat();
      this.state.view.animate({center:[ 81.5505, -67.5 ], zoom: 25, duration: 2000});
    }   

    handleNavigationClick = (direction) => {
      const { map, panMovement } = this.state;      
      let newCenterInPx;
      let center = map.getView().getCenter();
      let centerInPx = map.getPixelFromCoordinate(center);
      switch (direction) {
        case 'left': newCenterInPx = [centerInPx[0] - panMovement, centerInPx[1]]; break;
        case 'right': newCenterInPx = [centerInPx[0] + panMovement, centerInPx[1]]; break;
        case 'top': newCenterInPx = [centerInPx[0], centerInPx[1] - panMovement]; break;
        case 'bottom': newCenterInPx = [centerInPx[0], centerInPx[1] + panMovement]; break;
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
      const mapIsFullscreen= mapExpanded;      
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
                if(data.controlId === menu.controlId && menu.type !== "toggle")
                  filterList.push({"controlId": menu.controlId, "key": true });
                else
                  filterList.push({"controlId": menu.controlId, "key": false })
            })
          }
        })
      });
      getObjectMap({at, cid, token, extent, center, mapIsFullscreen, filterList,}).then(response=>{
        const res=response.data;
        const self=this;
        if(!res.apiError){
          if(handleResponse){               
            const { layerList } = res;
            let {map} = self.state;
            const arrayLayers = [...map.getLayers().getArray()];          
           
            if(arrayLayers.length > 0)
              arrayLayers.forEach((layer)=> map.removeLayer(layer));
            layerList.map(layer=>{            
              map.addLayer(this.getLayer(layer.source, layer.type, layer.styles, layer.data, res.hideTooltipZoomLevel, layer.dataType, layer.startingOffset,layer.layerId));
            })            
            map.getView().setMaxZoom(res.maxZoomLevel);          
            map.getView().fit(res.extent, map.getSize());
            map.getView().setCenter(res.center);
            map.getInteractions().forEach(function(interaction) {
              if (interaction instanceof MouseWheelZoom) {
                interaction.setActive(!res.mapControls[2].controlList[0].target.menuItems[1].default);
              }
            }, this);
            self.setState({map: map, explanationText: res.explanation, hideTooltipZoomLevel: res.hideTooltipZoomLevel, objectMapControls: res.mapControls, zoomIncrement: res.zoomIncrement, panMovement: res.panMovement, maxZoomLevel: res.maxZoomLevel,mapTitle: res.mapTitle, mapSubtitle: res.mapSubtitle, navigationBackgroundColor: res.navigationBackgroundColor, titleBackgoundColor: res.titleBackgoundColor},()=>{
              if(res.mapIsFullscreen!==mapExpanded)
              {
                if(res.mapIsFullscreen) 
                  this.handleExpandMap();                
                else 
                  this.handleContractMap();
              }   
            });
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
      const { mapExpanded, map } = this.state;      
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
            setTimeout( ()=> { self.state.map.updateSize(); self.state.map.getView().setZoom(0)}, 100);
        }
      };
      document.removeEventListener("fullscreenchange", exitHandlerFun);
        if(elem.requestFullscreen){
         elem.requestFullscreen().catch(err=>{
          self.setState({mapExpanded: false});    
          document.removeEventListener("fullscreenchange", exitHandlerFun);             
         });                 
          document.addEventListener("fullscreenchange",exitHandlerFun ,false);
        }
        else if(elem.mozRequestFullScreen){
            elem.mozRequestFullScreen().catch(err=>{
              self.setState({mapExpanded: false});    
              document.removeEventListener("fullscreenchange", exitHandlerFun);
             });             
            document.addEventListener("mozfullscreenchange", exitHandlerFun,false);
        }
        else if(elem.webkitRequestFullscreen){
            elem.webkitRequestFullscreen().catch(err=>{
              self.setState({mapExpanded: false});    
              document.removeEventListener("fullscreenchange", exitHandlerFun);
             });             
            document.addEventListener("webkitfullscreenchange", exitHandlerFun,false);
        }
        else if(elem.msRequestFullscreen){
            elem.msRequestFullscreen().catch(err=>{
              self.setState({mapExpanded: false});    
              document.removeEventListener("fullscreenchange", exitHandlerFun); 
             });             
            document.addEventListener("msfullscreenchange", exitHandlerFun,false);
        }      
        this.setState({mapExpanded: !mapExpanded});
      
    }

    handleContractMap = () => {  
      const { mapExpanded, map } = this.state;
      if(this.fullScreenMode = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen){
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
      else{
        this.setState({mapExpanded: !mapExpanded});
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
      const mapIsFullscreen= mapExpanded;        
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
            const arrayLayers = [...map.getLayers().getArray()];          
           
            if(arrayLayers.length > 0)
              arrayLayers.forEach((layer)=> map.removeLayer(layer));
            layerList.map(layer=>{            
              map.addLayer(this.getLayer(layer.source, layer.type, layer.styles, layer.data, res.hideTooltipZoomLevel, layer.dataType, layer.startingOffset,layer.layerId));
            })            
            map.getView().setMaxZoom(res.maxZoomLevel);          
            map.getView().fit(res.extent, map.getSize());
            map.getView().setCenter(res.center);
            map.getInteractions().forEach(function(interaction) {
              if (interaction instanceof MouseWheelZoom) {
                interaction.setActive(!res.mapControls[2].controlList[0].target.menuItems[1].default);
              }
            }, this);
            self.setState({map: map, explanationText: res.explanation, hideTooltipZoomLevel: res.hideTooltipZoomLevel, objectMapControls: res.mapControls, zoomIncrement: res.zoomIncrement, panMovement: res.panMovement, maxZoomLevel: res.maxZoomLevel ,mapTitle: res.mapTitle, mapSubtitle: res.mapSubtitle, navigationBackgroundColor: res.navigationBackgroundColor, titleBackgoundColor: res.titleBackgoundColor},()=>{
              if(res.mapIsFullscreen!==mapExpanded)
              {
                if(res.mapIsFullscreen) 
                  this.handleExpandMap();                
                else 
                  this.handleContractMap();
              }              
            });   
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
      let { map, zoomIncrement } = this.state;
      let currentZoom = map.getView().getZoom();
      if(currentZoom > 0){
        currentZoom=(currentZoom-zoomIncrement) < 0 ? 0 : (currentZoom-zoomIncrement);        
        this.setState({currentZoom}, ()=>map.getView().setZoom(currentZoom));
      }      
    }

    handleZoomIn = () => {
      let { map, zoomIncrement, maxZoomLevel } = this.state;
      let currentZoom = map.getView().getZoom();
      if(currentZoom < maxZoomLevel) {
        currentZoom=(currentZoom+zoomIncrement) > maxZoomLevel ? maxZoomLevel : (currentZoom+zoomIncrement);        
        this.setState({currentZoom}, ()=>map.getView().setZoom(currentZoom));
      }       
    }

    handleGearIconChange = (controlIndex, selectedMenu) => { 
      let toggle=false;
      let { objectMapControls } = this.state;
      const controlId = selectedMenu.controlId;
      const controlState = (!selectedMenu.default) ? 1 : 0;
      // if(selectedMenu.resetFilters){
      
      //   this.setState({objectMapControls});
      //   // const selectedControls = objectMapControls[0].controlList.map(control=>control.selectedIndex);     
      //   // this.setState({selectedControls: selectedControls});        
      // }

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
       switch(selectedMenu.controlId){
        case "resetMap":
          this.setState({objectMapControls}, this.handleSetObjectMap(selectedMenu,true));
          // this.resetObjectMap({layerList: selectedMenu.menuTarget});           
          break;
        case "lockZoomWhenScrolling":
          const { map } = this.state;
          map.getInteractions().forEach(function(interaction) {
            if (interaction instanceof MouseWheelZoom) {
              interaction.setActive(toggle);
            }
          }, this);
          this.setState({objectMapControls}, this.handleSetObjectMap(selectedMenu,true));                   
          break;
        case "alwaysShowSunAndMoon":
          this.setState({objectMapControls}, this.handleSetObjectMap(selectedMenu, true));   
          break;
        case "setCurrentMapViewAsDefault":
        case "setTonightMapViewAsDefault":          
          this.setState({objectMapControls}, this.handleSetObjectMap(selectedMenu, true));   
          break;
        default:      
          break;
      } 
    }
    
    render() {          
      const { showObjectCard, objectCardDetails, isloading1, currentZoom, maxZoomLevel, titleBackgoundColor, navigationBackgroundColor, showDownPan, showLeftPan, showRightPan, showUpPan } = this.state
      const { scrollToRef, refreshPhotoHub } = this.props;      
      const { hideMap, mapExpanded, explanationText, objectMapControls, mapTitle, mapSubtitle } = this.state;
        return (
          <div id="object-Map" allowfullscreen>
             <Spinner
              loading={isloading1}
              text="Please wait..."
            />
            <div className="map-container">
              <div id="map" className={mapExpanded ? "Object-map-fullscreen":"Object-map"}>
              <div className="map-navigation-div">
                <MapNavigation
                    onLeftButtonClick={()=>this.handleNavigationClick('left')}
                    onRightButtonClick={()=>this.handleNavigationClick('right')}
                    onUpButtonClick={()=>this.handleNavigationClick('top')}
                    onDownButtonClick={()=>this.handleNavigationClick('bottom')}
                    onZoomInButtonClick={this.handleZoomIn}
                    onZoomOutButtonClick={this.handleZoomOut}
                    zoomInDisabled={(currentZoom >= maxZoomLevel)}
                    zoomOutDisabled={!(showUpPan || showLeftPan || showRightPan || showDownPan)}
                    navigationBackgroundColor={navigationBackgroundColor}
                    panUpDisabled={!showUpPan}
                    panLeftDisabled={!showLeftPan} 
                    panRightDisabled={!showRightPan}
                    panDownDisabled={!showDownPan}
                  />
              </div>
                <div className="title-div" style={{backgroundColor: titleBackgoundColor}}>
                    <h2 className="object-map-title">{mapTitle}</h2>
                    <h5 className="object-map-subtitle">{mapSubtitle}</h5>
                </div>              
              </div>
              
              <div id="object_map_hover_popup" className="hover-popup" >test</div>
              {showObjectCard && (
                  <div className="object-card-popup">
                    <ObjectCard
                      onHide={this.onObjectCardClose}
                      objectCardDetails={objectCardDetails}
                      scrollToRef={scrollToRef}
                      refreshPhotoHub={refreshPhotoHub}
                    />
                </div> 
              )}
               
              
            </div>
           {objectMapControls && (
              <div className="control-div">
                <div className="dropdown-control-div col-md-offset-1">
                  {objectMapControls.slice(0,2).map(controlArray=>(
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
                      :null
                      
                  ))}
                </div>

              {objectMapControls.slice(-1).map(controlArray=>(
                controlArray.controlType === "iconList" ? (                   
                  <div className="settings-controls"> 
                    {controlArray.controlList[0].show && (
                      <Dropdown className="settings-dropdown">
                        <Tooltip title={controlArray.controlList[0].showTooltip ? controlArray.controlList[0].tooltipText : ""}> 
                          <Dropdown.Toggle  id="dropdown-basic" block>
                            <img className="setting-icons" 
                            src={controlArray.controlList[0].iconURL}                         
                          />
                          </Dropdown.Toggle>
                          </Tooltip>
                       
                       <Dropdown.Menu>
                         {controlArray.controlList[0].target.menuItems.map((menu,i)=>(
                            <Dropdown.Item
                             key={i}
                             onClick={menu.enabled ? ()=>{this.handleGearIconChange(i, menu)} : null}
                             className={menu.enabled ? "control-menu-item" : "control-menu-item-disabled"}
                             
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
                     <Tooltip title={controlArray.controlList[1].showTooltip ? controlArray.controlList[1].tooltipText : ""}>
                      <img className="setting-icons" 
                        src={controlArray.controlList[1].iconURL}
                        onClick={this.handleExpandMap}
                      />
                     </Tooltip>
                   )}
   
                   {controlArray.controlList[2] && mapExpanded &&(
                     <Tooltip title={controlArray.controlList[2].showTooltip ? controlArray.controlList[2].tooltipText : ""}>
                      <img className="setting-icons" 
                        src={controlArray.controlList[2].iconURL}
                        onClick={this.handleContractMap}
                        />
                      </Tooltip>
                   )}
   
                   {controlArray.controlList[3].show && !hideMap &&(
                     <Tooltip title={controlArray.controlList[3].showTooltip ? controlArray.controlList[3].tooltipText : ""}>
                      <img className="setting-icons" 
                        src={controlArray.controlList[3].iconURL}
                        onClick={()=>this.setState({hideMap: !hideMap})}
                      />
                     </Tooltip>
                   )}
   
                   {controlArray.controlList[4] && hideMap &&(
                     <Tooltip title={controlArray.controlList[4].showTooltip ? controlArray.controlList[4].tooltipText : ""}>
                      <img className="setting-icons" 
                        src={controlArray.controlList[4].iconURL}
                        onClick={()=>this.setState({hideMap: !hideMap})}
                        />
                     </Tooltip>
                   )}

                      {/* <img className={classnames('setting-icons', {'disabled-control': !(currentZoom > 0)})}
                       src="https://vega.slooh.com/assets/v4/dashboard-new/minus.svg"
                       onClick={this.handleZoomOut}
                       />

                      <img className="setting-icons" 
                       src="https://vega.slooh.com/assets/v4/dashboard-new/zoom-minus-magnifier.svg"
                      //  onClick={()=>this.setState({hideMap: !hideMap})}
                       />

                      <img className="setting-icons" 
                        className={classnames('setting-icons', {'disabled-control': !(currentZoom < 10)})}
                       src="https://vega.slooh.com/assets/v4/dashboard-new/plus.svg"
                       onClick={this.handleZoomIn}
                       /> */}

                      {explanationText && (
                        <span className="control-label">{explanationText}</span>
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
            
            </div>
           )}
            
            {/* <button onClick={()=>this.handleFindObject()}>find</button> */}

            {/* <button onClick={()=>this.handleNavigationClick('left')}>left</button>
            <button onClick={()=>this.handleNavigationClick('right')}>right</button>
            <button onClick={()=>this.handleNavigationClick('top')}>up</button>
            <button onClick={()=>this.handleNavigationClick('bottom')}>down</button> */}
            {/* <br/> */}
            {/* <MapNavigation
              onLeftButtonClick={()=>this.handleNavigationClick('left')}
              onRightButtonClick={()=>this.handleNavigationClick('right')}
              onUpButtonClick={()=>this.handleNavigationClick('top')}
              onDownButtonClick={()=>this.handleNavigationClick('bottom')}
              onZoomInButtonClick={this.handleZoomIn}
              onZoomOutButtonClick={this.handleZoomOut}
            /> */}
          </div>
        );
    }

}
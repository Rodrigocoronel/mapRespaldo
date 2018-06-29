import React, { Component } from 'react'

import { GoogleStyles } from './styles';
import { connect } from 'react-redux'

import {request} from '../../actions/request';

import swal from 'sweetalert2';

/*Kml*/
import diputados1 from './diputados1.kml';
import diputados2 from './diputados2.kml';
import diputados3 from './diputados3.kml';
import diputados4 from './diputados4.kml';
import diputados5 from './diputados5.kml';
import diputados6 from './diputados6.kml';
import diputados7 from './diputados7.kml';
import diputados8 from './diputados8.kml';

/*Images*/
import angry from './images/angry.png';
import haha from './images/haha.png';
import like from './images/like.png';
import love from './images/love.png';
import sad from './images/sad.png';
import wow from './images/wow.png';

import * as actions from '../../actions/secciones.js';

let map = null,
    myParser,
    markers = [],
    circles = [];

const generateIcon = () => {

    let random = (Math.floor((Math.random() * 6) + 1)) - 1;
    
    return {
        url: random == 0 ? angry :
            (random == 1 ? haha :
            (random == 2 ? like :
            (random == 3 ? love :
            (random == 4 ? sad : wow)))),

        size: new window.google.maps.Size(60, 60),

        scaledSize: new window.google.maps.Size(40, 40),
        
        origin: new window.google.maps.Point(-15,0)
    }

}
let geoXml;

class Map extends Component {

    constructor(props) {
        super(props)
        this.state={
            coord : '',
            mapas : [
                {filtrado : 1 , distrito : 0 , index : 0},
            ], 
            mapaRegistro : 0,
            mapaActual : 0,
            conteoMapas : 0,
            primero : true,
        }


    }



    componentDidMount() {

        

        let _self = this;
        // crear el mapa 
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: new window.google.maps.LatLng(30.197045, -115.212226),
            zoom: 7,
            mapTypeId: 'roadmap',
            styles: GoogleStyles,
        });

        /**
         *
         * CODIGO PARA PONER UN KML
         *
         */

        // assign "useTheData" as the after parse function
        geoXml = new window.geoXML3.parser({map: map, afterParse: useTheData, singleInfoWindow: true,});
        geoXml.parse(diputados1);
        geoXml.parse(diputados2);
        geoXml.parse(diputados3);
        geoXml.parse(diputados4);
        geoXml.parse(diputados5);
        geoXml.parse(diputados6);
        geoXml.parse(diputados7);
        geoXml.parse(diputados8);

        // function to retain closure on the placemark and associated text
        function bindPlacemark(placemark, obj) {
            window.google.maps.event.addListener(placemark,"click", function() {
                
                //action
                _self.props.getInfo(obj.name,_self.props.filtrado,_self.props.periodo.created_at);

            });


        }

        // "afterParse" function, adds click listener to each placemark to "alert" the name
        function useTheData(doc) {
          for (var i = 0; i < doc[0].placemarks.length; i++) {
            var placemark = doc[0].placemarks[i].polygon || doc[0].placemarks[i].marker || doc[0].placemarks[i].polyline;
            bindPlacemark(placemark, doc[0].placemarks[i]);
           
            } 
          
        };
        

    }

    componentWillReceiveProps (nextProps) {

        let {filtrado , seccion , distrito , periodo} = nextProps;
        let {mapas , mapaActual , mapaRegistro , conteoMapas} = this.state;
        let index = -1;
        mapaRegistro = mapaActual;
        let _self  = this;
        let kmlCargar = '';
        let regexfiltrado;
        let show;
        let showLimit;
        let hide = '';
        let hideLimit;
        let docIndex , indexD;
        
        if(distrito > 0) {
            
            regexfiltrado='diputados'+distrito;
            
            var patt = new RegExp(regexfiltrado);
            
            for(let x=0 ; x<geoXml.docs.length ; x++) {
                let regex = patt;
                let match = regex.exec(geoXml.docs[x].baseUrl);
                
                if(match !== null){
                    geoXml.showDocument(geoXml.docs[x]);
                    docIndex = x;
                }
                else
                    geoXml.hideDocument(geoXml.docs[x]);
            }
        }else if(distrito === 0){
            show=0;
            showLimit = 8;
                
            //show all the districts of filter
            if(geoXml.docs.length > 0){
                for(show; show < showLimit; show++) {
                    geoXml.showDocument(geoXml.docs[show]);
                }
            }
        }
        
        //buscar la seccion
       function findSeccion(element) {
          return element.name == nextProps.seccion;
        }

        // funcion para simular un click
        function triggerMarker(marker) {
            window.google.maps.event.trigger(marker, 'click', {});
        }

        if(seccion !== '') {
            let x,limit;
            if(distrito !== 0){
                index = geoXml.docs[docIndex].placemarks.findIndex(findSeccion);
            }
            else{
                
                x = 0;
                limit = 8;
                
                for(x; x < limit; x++){
                    indexD = geoXml.docs[x].placemarks.findIndex(findSeccion);
                    if(indexD !== -1){
                        docIndex = x;
                        index = indexD;
                    }
                }
                
            }
            
            if(index !== -1) {
                let coords = geoXml.docs[docIndex].placemarks[index].Polygon[0].outerBoundaryIs[0].coordinates[0];
                //map.setCenter(new window.google.maps.LatLng(coords.lat, coords.lng));
                //map.setZoom(15);
                triggerMarker(geoXml.docs[docIndex].placemarks[index].polygon)
            }else {
                swal("Sección", "No encontrada", "error");
            }
        }
        console.log(this.props)
        console.log(nextProps)
        if( (this.props.periodo !== nextProps.periodo || this.props.filtrado !== nextProps.filtrado) && this.props.periodo !== undefined){
            console.log('entro',nextProps.periodo)
            let url = '';
            if(nextProps.filtrado === 1){
                url = 'seccionesDiputadosDistrito/';
            }else{
                url = 'seccionesSenadoresDistrito/';
            }
            for(var dis=1 ; dis < 9 ; dis++){
                request.get('api/'+url+dis+'/'+periodo.created_at)
                .then(function(response){
                    if(response.status === 200){
                        // response.data.map((key,index)=>{
                        //     console.log(key)
                        // })           
                        print(response.data)
                        
                    }
                });
            }
        }

        function buscarKml (distrito) {
                
                regexfiltrado='diputados'+distrito;
                let index_kml;
                var patt = new RegExp(regexfiltrado);
                
                for(let x=0 ; x<geoXml.docs.length ; x++) {
                    let regex = patt;
                    let match = regex.exec(geoXml.docs[x].baseUrl);
                    
                    if(match !== null){
                        index_kml = x;
                        break;
                    }
                }

                return index_kml;
            }

            function print(params) {

                let index_kml = buscarKml(params[0].distrito)
                console.log('params --> '+params[0].distrito)
                console.log('index del docs -->' + index_kml)
                for(var x = 0 ; x<params.length ; x++){
                    // console.log(params[x].color)
                    geoXml.docs[index_kml].placemarks[x].polygon.fillColor = params[x].color;
                    
                }
                if(nextProps.distrito == 0){
                    geoXml.hideDocument(geoXml.docs[index_kml]);
                    geoXml.showDocument(geoXml.docs[index_kml]);
                }
                else if(params[0].distrito == nextProps.distrito ){
                    geoXml.hideDocument(geoXml.docs[index_kml]);
                    geoXml.showDocument(geoXml.docs[index_kml]);
                }
                
            }

        console.log(geoXml.docs)

    }


    render() {
        return (
            <div style={{ height: '650px', width: '100%' }}>
                <div style={{ height: '100%', width: '100%' }} id="map"></div>
            </div>
        )
    }

}


export default connect(
    null,
    actions,
)(Map)
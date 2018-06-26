import React, { Component } from 'react'

import { GoogleStyles } from './styles';
import { connect } from 'react-redux'

import swal from 'sweetalert2';

import diputados from './seccionesconcolores.kml';
import diputados1 from './diputados1.kml';
import diputados2 from './diputados2.kml';
import diputados3 from './diputados3.kml';
import diputados4 from './diputados4.kml';
import diputados5 from './diputados5.kml';
import diputados6 from './diputados6.kml';
import diputados7 from './diputados7.kml';
import diputados8 from './diputados8.kml';
import senadores from './senadores.kml';
import senadores1 from './senadores1.kml';
import senadores2 from './senadores2.kml';
import senadores3 from './senadores3.kml';
import senadores4 from './senadores4.kml';
import senadores5 from './senadores5.kml';
import senadores6 from './senadores6.kml';
import senadores7 from './senadores7.kml';
import senadores8 from './senadores8.kml';


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

        console.log(senadores1)

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
        let {filtrado , seccion , distrito } = nextProps;
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
            if(filtrado == 1) {
            regexfiltrado='diputados'+distrito;
            }else {
                regexfiltrado='senadores'+distrito;
            }
            var patt = new RegExp(regexfiltrado);
            console.log(regexfiltrado)
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
            if(geoXml.docs.length > 8){
                if(filtrado == 1 ) {
                    show=0;
                    showLimit = 8;
                    hide=8;
                    hideLimit = 16; 
                }
                else {
                    show=8;
                    showLimit = 16
                    hide=0;
                    hideLimit = 8; 
                }
            }else{
                if(filtrado == 1 ) {
                    show=0;
                    showLimit = 8;
                }
                else {
                    show=8;
                    showLimit = 16
                }
            }

            //show all the districts of filter
            if(geoXml.docs.length > 0){
                for(show; show < showLimit; show++) {
                geoXml.showDocument(geoXml.docs[show]);
            }
            }
            
            //hide all other option
            if(hide !== ''){
                for(hide; hide < hideLimit; hide++) {
                    geoXml.hideDocument(geoXml.docs[hide]);
                }
            }
        }

        if(filtrado === 2 && this.state.primero) {
            geoXml.hideDocument(geoXml.docs[0]);
            geoXml.hideDocument(geoXml.docs[1]);
            geoXml.hideDocument(geoXml.docs[2]);
            geoXml.hideDocument(geoXml.docs[3]);
            geoXml.hideDocument(geoXml.docs[4]);
            geoXml.hideDocument(geoXml.docs[5]);
            geoXml.hideDocument(geoXml.docs[6]);
            geoXml.hideDocument(geoXml.docs[7]);
            geoXml.parse(senadores1);
            geoXml.parse(senadores2);
            geoXml.parse(senadores3);
            geoXml.parse(senadores4);
            geoXml.parse(senadores5);
            geoXml.parse(senadores6);
            geoXml.parse(senadores7);
            geoXml.parse(senadores8);

            this.setState({primero : false})
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
                if(filtrado == 1){
                    x = 0;
                    limit = 8;
                }else{
                    x = 8;
                    limit = 16;
                }
                for(x; x < limit; x++){
                    indexD = geoXml.docs[x].placemarks.findIndex(findSeccion);
                    if(indexD !== -1){
                        docIndex = x;
                        index = indexD;
                    }
                }
                
            }
            console.log(docIndex)
            console.log(index)
            if(index !== -1) {
                let coords = geoXml.docs[docIndex].placemarks[index].Polygon[0].outerBoundaryIs[0].coordinates[0];
                //map.setCenter(new window.google.maps.LatLng(coords.lat, coords.lng));
                //map.setZoom(15);
                triggerMarker(geoXml.docs[docIndex].placemarks[index].polygon)
            }else {
                swal("Sección", "No encontrada", "error");
            }
        }

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
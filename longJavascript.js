
        ////////////////////////////////////////////////
////////////////VARIABLES////////////////
////////////////////////////////////////////////
// initialize the map
        var map = L.map('map');
        // load a tile layer
        mapLink = '<a href="http://www.esri.com/">Esri</a>';
        wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        var Satelite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; ' + mapLink + ', ' + wholink,
            maxZoom: 19,
        })
        var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
            attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
            minZoom: 1,
            maxZoom: 19
        }).addTo(map);
        //API key
        var OWM_API_KEY = '3361df6687a5458ad0f9e3556c666018';
//Markers clustergroups
        var markersTemp = L.layerGroup();
//Current city displayed
var cityname = "stad";
//Current chemicals displayed
var displaystate = "SO2";
//Clickable map popups
var popup = L.po
var popup = L.popup();
//Varaibles for compare charts
var comparegraphs = 0;
var id = 0;
//List with sensors to compare
var ssensor = [];
//Boolean to check if sensor is already clicked
var selected = false;
//Boolean to check if we are comparing sensors or not
var compare = false;
//Graphs
let tempChart2 = document.getElementById("tempChart2").getContext('2d');
let pressureChart2 = document.getElementById("pressureChart2").getContext('2d');
let O3Chart2 = document.getElementById("O3Chart2").getContext('2d');
let PM1Chart2 = document.getElementById("PM1Chart2").getContext('2d');
//Lists with data for the compare charts
var idList = [];
var labelList = [];
var chartSO2List = [];
var chartNO2List = [];
var chartO3List = [];
var chartPM10List = [];
var colorList = ["#ff3434", "#00a80d", "#34d8ff", "#c834ff", "#0000e3"];
var labelsList = [];
//Compare sensors butonns
var last24hCButton = document.getElementById("24hChartC");
var lastWeekCButton = document.getElementById("weekChartC");
var lastMonthCButton = document.getElementById("monthChartC");
var lastYearCButton = document.getElementById("2DaysChartC");
//Says what button is selected to display right data
var selectedCompareChart = "24h";
//ChartCollection charts
let tempChart = document.getElementById("tempChart").getContext('2d');
let pressureChart = document.getElementById("pressureChart").getContext('2d');
let O3Chart = document.getElementById("O3Chart").getContext('2d');
let PM1Chart = document.getElementById("PM1Chart").getContext('2d');
//Chartcollection lists
var chartLabels = [];
var chartDataTemp = [];
var chartDataPressure = [];
var chartDataO3 = [];
var chartDataPM1 = [];
//Chartcollection buttons
var last24hButton = document.getElementById("24hChart");
var lastWeekButton = document.getElementById("weekChart");
var lastMonthButton = document.getElementById("monthChart");
var lastYearButton = document.getElementById("2DaysChart");
//Chartcollection selected button
var selectedChart = "24h";
var localid = 0

var allData = []
$(function () {
    d3.json("allData.json", function(data){
        console.log(data)
        allData[0] = data.allData;
        allData[1] = data.dayData;
        allData[2] = data.twoDaysData;
        allData[3] = data.sensorLocations;
        console.log(allData[3][0])
    });
/*    var staticOutput = document.querySelector('.js-static-output');
    var isAuthenticated = staticOutput.dataset.isAuthenticated;
    var outputId = staticOutput.dataset.outputId;

    console.log(isAuthenticated);
    console.log(outputId);
        $.getJSON( "/customer/jsonized/output/"+outputId, function( data ) {
  allData = data;
  console.log( allData[0] );
  console.log( allData[1] );
  console.log( allData[2] );
    console.log( allData[3] );
});*/
    setTimeout(function () {
        console.log("Started");
        samplescript(0);
    }, 3000);
});

function samplescript(outputId) {
    /////////////////////Script om map te laden//////////////////////////

    /**
     * A JavaScript library for using OpenWeatherMap's layers and OWM's city data for leaflet based maps without hassle.
     * License: CC0 (Creative Commons Zero), see https://creativecommons.org/publicdomain/zero/1.0/
     * Project page: https://github.com/buche/leaflet-openweathermap/
     */

    L.OWM = L.TileLayer.extend({
        options: {
            appId: 'GET_YOUR_OWN_APPID',
            /* pass your own AppId as parameter when creating the layer. Get your own AppId at https://www.openweathermap.org/appid */
            baseUrl: "https://{s}.tile.openweathermap.org/map/{layername}/{z}/{x}/{y}.png",
            maxZoom: 18,
            showLegend: true,
            legendImagePath: null,
            legendPosition: 'bottomleft',
            attribution: 'Weather from <a href="https://openweathermap.org/" alt="World Map and worldwide Weather Forecast online">OpenWeatherMap</a>'
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
            var tileurl = this.options.baseUrl.replace('{layername}', this._owmLayerName);
            tileurl = tileurl + '?appid=' + this.options.appId;

            this._map = null;
            this._legendControl = null;
            this._legendId = null;
            this._owmtileurl = tileurl;
            L.TileLayer.prototype.initialize.call(this, this._owmtileurl, options);
        },

        onAdd: function (map) {
            this._map = map;
            if (this.options.showLegend && this.options.legendImagePath != null) {
                this._legendControl = this._getLegendControl();
                this._legendId = this._legendControl.addLegend(this.options.legendImagePath);
            }
            L.TileLayer.prototype.onAdd.call(this, map);
        },

        onRemove: function (map) {
            if (this._legendControl != null) {
                this._legendControl.removeLegend(this._legendId);
                this._legendControl = null;
                this._legendId = null;
            }
            L.TileLayer.prototype.onRemove.call(this, map);
            this._map = null;
        },

        _getLegendControl: function () {
            if (typeof this._map._owm_legendcontrol == 'undefined' || !this._map._owm_legendcontrol) {
                this._map._owm_legendcontrol = new L.OWM.LegendControl({
                    position: this.options.legendPosition
                });
                this._map.addControl(this._map._owm_legendcontrol);
            }
            return this._map._owm_legendcontrol;
        }
    });

    (function () {

        L.OWM.Precipitation = L.OWM.extend({
            _owmLayerName: 'precipitation'
        });
        L.OWM.precipitation = function (options) {
            return new L.OWM.Precipitation(options);
        };

        L.OWM.PrecipitationClassic = L.OWM.extend({
            _owmLayerName: 'precipitation_cls'
        });
        L.OWM.precipitationClassic = function (options) {
            var layer = new L.OWM.PrecipitationClassic(options);
            if (layer.options.legendImagePath == null) {
                layer.options.legendImagePath = 'https://openweathermap.org/img/a/PR.png';
            }
            return layer;
        };

        L.OWM.Rain = L.OWM.extend({
            _owmLayerName: 'rain'
        });
        L.OWM.rain = function (options) {
            return new L.OWM.Rain(options);
        };

        L.OWM.RainClassic = L.OWM.extend({
            _owmLayerName: 'rain_cls'
        });
        L.OWM.rainClassic = function (options) {
            var layer = new L.OWM.RainClassic(options);
            if (layer.options.legendImagePath == null) {
                layer.options.legendImagePath = 'https://openweathermap.org/img/a/RN.png';
            }
            return layer;
        };

        L.OWM.Snow = L.OWM.extend({
            _owmLayerName: 'snow'
        });
        L.OWM.snow = function (options) {
            var layer = new L.OWM.Snow(options);
            if (layer.options.legendImagePath == null) {
                layer.options.legendImagePath = 'https://openweathermap.org/img/a/SN.png';
            }
            return layer;
        };

        L.OWM.Clouds = L.OWM.extend({
            _owmLayerName: 'clouds'
        });
        L.OWM.clouds = function (options) {
            return new L.OWM.Clouds(options);
        };

        L.OWM.CloudsClassic = L.OWM.extend({
            _owmLayerName: 'clouds_cls'
        });
        L.OWM.cloudsClassic = function (options) {
            var layer = new L.OWM.CloudsClassic(options);
            if (layer.options.legendImagePath == null) {
                layer.options.legendImagePath = 'https://openweathermap.org/img/a/NT.png';
            }
            return layer;
        };

        L.OWM.Pressure = L.OWM.extend({
            _owmLayerName: 'pressure'
        });
        L.OWM.pressure = function (options) {
            var layer = new L.OWM.Pressure(options);
            if (layer.options.legendImagePath == null) {
                layer.options.legendImagePath = 'https://openweathermap.org/img/a/PN.png';
            }
            return layer;
        };

        L.OWM.PressureContour = L.OWM.extend({
            _owmLayerName: 'pressure_cntr'
        });
        L.OWM.pressureContour = function (options) {
            return new L.OWM.PressureContour(options);
        };

        L.OWM.Temperature = L.OWM.extend({
            _owmLayerName: 'temp'
        });
        L.OWM.temperature = function (options) {
            var layer = new L.OWM.Temperature(options);
            if (layer.options.legendImagePath == null) {
                layer.options.legendImagePath = 'https://openweathermap.org/img/a/TT.png';
            }
            return layer;
        };

        L.OWM.Wind = L.OWM.extend({
            _owmLayerName: 'wind'
        });
        L.OWM.wind = function (options) {
            var layer = new L.OWM.Wind(options);
            if (layer.options.legendImagePath == null) {
                layer.options.legendImagePath = 'https://openweathermap.org/img/a/UV.png';
            }
            return layer;
        };

    }());

    L.OWM.LegendControl = L.Control.extend({
        options: {
            position: "bottomleft"
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
            this._container = L.DomUtil.create('div', 'owm-legend-container');
            this._container.style.display = 'none';
            this._legendCounter = 0;
            this._legendContainer = new Array();
        },

        onAdd: function (map) {
            return this._container;
        },

        addLegend: function (legendImagePath) {
            var legendId = this._legendCounter++;
            this._legendContainer[legendId] = legendImagePath;
            this._redrawLegend();
            this._container.style.display = 'block';
            return legendId;
        },

        removeLegend: function (legendId) {
            if (typeof this._legendContainer[legendId] != 'undefined') {
                delete this._legendContainer[legendId];
            }
            // reset counter if no legend is in collection
            var containerEmpty = true;
            for (var idx in this._legendContainer) {
                containerEmpty = false;
                break;
            }
            if (containerEmpty) {
                this._legendCounter = 0;
                this._container.style.display = 'none';
            }
            this._redrawLegend();
        },

        _redrawLegend: function () {
            this._container.innerHTML = ''; // clear container
            var isLeft = this.options.position.indexOf('left') !== -1;
            var cssFloat = isLeft ? 'left' : 'right';
            for (var idx in this._legendContainer) {
                if (isNaN(idx)) {
                    continue;
                }
                var imgPath = this._legendContainer[idx];
                var item = L.DomUtil.create('div', 'owm-legend-item', this._container);
                item.style.cssFloat = cssFloat;
                if (isLeft) {
                    item.style.marginRight = '10px';
                } else {
                    item.style.marginLeft = '10px';
                }
                item.innerHTML = '<img src="' + imgPath + '" border="0" />';
            }
        }
    });

    /**
     * Layer for current weather of cities.
     */
    L.OWM.Current = L.Layer.extend({

        options: {
            appId: null, // get your free Application ID at www.openweathermap.org
            type: 'city', // available types: 'city'. 'station' is not supported any more
            lang: 'en', // available: 'en', 'de', 'ru', 'fr', 'nl', 'es', 'ca' (not every language is finished yet)
            minZoom: 7,
            interval: 0, // interval for rereading city data in minutes
            progressControl: true, // available: true, false
            imageLoadingUrl: 'owmloading.gif', // URL of loading image relative to HTML document
            imageLoadingBgUrl: null, // URL of background image for progress control
            temperatureUnit: 'C', // available: 'K' (Kelvin), 'C' (Celsius), 'F' (Fahrenheit)
            temperatureDigits: 1,
            speedUnit: 'ms', // available: 'ms' (m/s), 'kmh' (km/h), 'mph' (mph)
            speedDigits: 0,
            popup: true, // available: true, false
            keepPopup: true, // available: true, false
            showOwmStationLink: true, // available: true, false
            showWindSpeed: 'both', // available: 'speed', 'beaufort', 'both'
            showWindDirection: 'both', // available: 'deg', 'desc', 'both'
            showTimestamp: true, // available: true, false
            showTempMinMax: true, // available: true, false
            useLocalTime: true, // available: true, false
            clusterSize: 150,
            imageUrlCity: 'https://openweathermap.org/img/w/{icon}.png',
            imageWidth: 50,
            imageHeight: 50,
            imageUrlStation: 'https://openweathermap.org/img/s/istation.png',
            imageWidthStation: 25,
            imageHeightStation: 25,
            imageUrlPlane: 'https://openweathermap.org/img/s/iplane.png',
            imageWidthPlane: 25,
            imageHeightPlane: 25,
            markerFunction: null, // user defined function for marker creation
            popupFunction: null, // user defined function for popup creation
            caching: true, // use caching of current weather data
            cacheMaxAge: 15, // maximum age of cache content in minutes before it gets invalidated
            keepOnMinZoom: false // keep or remove markers when zoom < minZoom
        },

        initialize: function (options) {
            L.setOptions(this, options);
            this._layer = L.layerGroup();
            this._timeoutId = null;
            this._requests = {};
            this._markers = new Array();
            this._markedMarker = null;
            this._map = null;
            this._urlTemplate = 'https://api.openweathermap.org/data/2.5/box/{type}?{appId}cnt=300&format=json&units=metric&bbox={minlon},{minlat},{maxlon},{maxlat},10';
            this._directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
            this._msbft = [0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7, 37.0, 41.5, 46.2, 51.0, 56.1, 61.3]; // Beaufort scala
            this._tempUnits = {
                K: 'K',
                C: '°C',
                F: 'F'
            };
            this._progressCtrl = null;
            if (this.options.progressControl) {
                var bgIcon;
                if (this.options.imageLoadingBgUrl) {
                    bgIcon = this.options.imageLoadingBgUrl;
                } else {
                    bgIcon = this.options.imageUrlCity.replace('{icon}', '10d');
                    if (this.options.type != 'city') {
                        var bgIcon = this.options.imageUrlStation;
                    }
                }
                this._progressCtrl = L.OWM.progressControl({
                    type: this.options.type,
                    bgImage: bgIcon,
                    imageLoadingUrl: this.options.imageLoadingUrl,
                    owmInstance: this
                });
            }
            this._cache = L.OWM.currentCache({
                maxAge: this.options.cacheMaxAge
            });
        },

        onAdd: function (map) {
            this._map = map;
            this._map.addLayer(this._layer);
            this._map.on('moveend', this.update, this);
            // add progress control
            if (this._progressCtrl != null) {
                this._map.addControl(this._progressCtrl);
            }
            this.update();
        },

        onRemove: function (map) {
            // clear timeout
            if (this._timeoutId !== null) {
                window.clearTimeout(this._timeoutId);
                this._timeoutId = null;
            }
            // remove progress control
            if (this._progressCtrl != null) {
                this._map.removeControl(this._progressCtrl);
            }
            // remove layer and markers
            this._map.off('moveend', this.update, this);
            this._map.removeLayer(this._layer);
            this._layer.clearLayers();
            this._map = null;
            this._cache.clear();
        },

        getAttribution: function () {
            return 'Weather from <a href="https://openweathermap.org/" ' +
                'alt="World Map and worldwide Weather Forecast online">OpenWeatherMap</a>';
        },

        update: function () {
            // clear existing timeout
            if (this._timeoutId) {
                window.clearTimeout(this._timeoutId);
                this._timeoutId = null;
            }

            var _this = this;

            // clear requests for all types
            for (var typ in this._requests) {
                var request = this._requests[typ];
                this.fire('owmloadingend', {
                    type: typ
                });
                request.abort();
            }
            this._requests = {};

            if (this._map.getZoom() < this.options.minZoom) {
                this.fire('owmloadingend', {
                    type: _this.options.type
                });
                if (!this.options.keepOnMinZoom) {
                    this._layer.clearLayers();
                }
                return;
            }

            // try to get cached data first
            var bounds = this._map.getBounds();
            var data = null;
            if (this.options.caching) {
                data = this._cache.get(bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth());
            }
            if (data !== null) {
                // using cached data
                this._processRequestedData(this, data);
            } else {
                // fetch new data from OWM
                this.fire('owmloadingstart', {
                    type: _this.options.type
                });
                var url = this._urlTemplate
                    .replace('{appId}', this.options.appId ? 'APPID=' + this.options.appId + '&' : '')
                    .replace('{type}', this.options.type)
                    .replace('{minlon}', bounds.getWest())
                    .replace('{minlat}', bounds.getSouth())
                    .replace('{maxlon}', bounds.getEast())
                    .replace('{maxlat}', bounds.getNorth());
                this._requests[this.options.type] = L.OWM.Utils.jsonp(url, function (data) {
                    delete _this._requests[_this.options.type];

                    if (!_this._map) {
                        // Nothing to do if layer is gone but this request is still active
                        return;
                    }

                    if (_this.options.caching) {
                        _this._cache.set(data, _this._map.getBounds());
                    }
                    _this._processRequestedData(_this, typeof data.list == 'undefined' ? new Array() : data.list);
                    _this.fire('owmloadingend', {
                        type: _this.options.type
                    });
                });
            }
            if (this.options.interval && this.options.interval > 0) {
                this._timeoutId = window.setTimeout(function () {
                    _this.update()
                }, 60000 * this.options.interval);
            }
        },

        _processRequestedData: function (_this, data) {

            // read all cities
            var stations = {};
            for (var i in data) {
                var stat = data[i];
                if (!_this._map) { // maybe layer is gone while we are looping here
                    return;
                }
                // only use cities having a minimum distance of some pixels on the map
                var pt = _this._map.latLngToLayerPoint(new L.LatLng(stat.coord.Lat, stat.coord.Lon));
                var key = '' + (Math.round(pt.x / _this.options.clusterSize)) + "_" + (Math.round(pt.y / _this.options.clusterSize));
                if (!stations[key] || parseInt(stations[key].rang) < parseInt(stat.rang)) {
                    stations[key] = stat;
                }
            }

            // hide LayerGroup from map and remove old markers
            var markerWithPopup = null;
            if (_this.options.keepPopup) {
                markerWithPopup = _this._getMarkerWithPopup(_this._markers);
            }
            if (_this._map && _this._map.hasLayer(_this._layer)) {
                _this._map.removeLayer(_this._layer);
            }
            _this._layer.clearLayers();

            // add the cities as markers to the LayerGroup
            _this._markers = new Array();
            for (var key in stations) {
                var marker;
                if (_this.options.markerFunction != null && typeof _this.options.markerFunction == 'function') {
                    marker = _this.options.markerFunction.call(_this, stations[key]);
                } else {
                    marker = _this._createMarker(stations[key]);
                }
                marker.options.owmId = stations[key].id;
                _this._layer.addLayer(marker);
                _this._markers.push(marker);
                if (_this.options.popup) {
                    if (_this.options.popupFunction != null && typeof _this.options.popupFunction == 'function') {
                        marker.bindPopup(_this.options.popupFunction.call(_this, stations[key]));
                    } else {
                        marker.bindPopup(_this._createPopup(stations[key]));
                    }
                }
                if (markerWithPopup != null &&
                    typeof markerWithPopup.options.owmId != 'undefined' &&
                    markerWithPopup.options.owmId == marker.options.owmId) {
                    markerWithPopup = marker;
                }
            }

            // add the LayerGroup to the map
            _this._map && _this._map.addLayer(_this._layer);
            if (markerWithPopup != null) {
                markerWithPopup.openPopup();
            }
            _this.fire('owmlayeradd', {
                markers: _this._markers
            });
        },

        _getMarkerWithPopup: function (markers) {
            var marker = null;
            for (var idx in markers) {
                var m = markers[idx];
                if (m._popup && m._map && m._map.hasLayer(m._popup)) {
                    marker = m;
                    break;
                }
            }
            return marker;
        },

        _createPopup: function (station) {
            var showLink = typeof station.id != 'undefined' && this.options.showOwmStationLink;
            var txt = '<div class="owm-popup-name">';
            if (showLink) {
                var typ = 'station';
                if (typeof station.weather != 'undefined') {
                    typ = 'city';
                }
                txt += '<a href="https://openweathermap.org/' + typ + '/' + station.id + '" target="_blank" title="' +
                    this.i18n('owmlinktitle', 'Details at OpenWeatherMap') + '">';
            }
            txt += station.name;
            if (showLink) {
                txt += '</a>';
            }
            txt += '</div>';
            if (typeof station.weather != 'undefined' && typeof station.weather[0] != 'undefined') {
                if (typeof station.weather[0].description != 'undefined' && typeof station.weather[0].id != 'undefined') {
                    txt += '<div class="owm-popup-description">' +
                        this.i18n('id' + station.weather[0].id, station.weather[0].description + ' (' + station.weather[0].id + ')') +
                        '</div>';
                }
            }
            var imgData = this._getImageData(station);
            txt += '<div class="owm-popup-main"><img src="' + imgData.url + '" width="' + imgData.width +
                '" height="' + imgData.height + '" border="0" />';
            if (typeof station.main != 'undefined' && typeof station.main.temp != 'undefined') {
                txt += '<span class="owm-popup-temp">' + this._temperatureConvert(station.main.temp) +
                    '&nbsp;' + this._displayTemperatureUnit() + '</span>';
            }
            txt += '</div>';
            txt += '<div class="owm-popup-details">';
            if (typeof station.main != 'undefined') {
                if (typeof station.main.humidity != 'undefined') {
                    txt += '<div class="owm-popup-detail">' +
                        this.i18n('humidity', 'Humidity') +
                        ': ' + station.main.humidity + '&nbsp;%</div>';
                }
                if (typeof station.main.pressure != 'undefined') {
                    txt += '<div class="owm-popup-detail">' +
                        this.i18n('pressure', 'Pressure') +
                        ': ' + station.main.pressure + '&nbsp;hPa</div>';
                }
                if (this.options.showTempMinMax) {
                    if (typeof station.main.temp_max != 'undefined' && typeof station.main.temp_min != 'undefined') {
                        txt += '<div class="owm-popup-detail">' +
                            this.i18n('temp_minmax', 'Temp. min/max') +
                            ': ' +
                            this._temperatureConvert(station.main.temp_min) +
                            '&nbsp;/&nbsp;' +
                            this._temperatureConvert(station.main.temp_max) +
                            '&nbsp;' + this._displayTemperatureUnit() + '</div>';
                    }
                }
            }
            if (station.rain != null && typeof station.rain != 'undefined' && typeof station.rain['1h'] != 'undefined') {
                txt += '<div class="owm-popup-detail">' +
                    this.i18n('rain_1h', 'Rain (1h)') +
                    ': ' + station.rain['1h'] + '&nbsp;ml</div>';
            }
            if (typeof station.wind != 'undefined') {
                if (typeof station.wind.speed != 'undefined') {
                    txt += '<div class="owm-popup-detail">';
                    if (this.options.showWindSpeed == 'beaufort' || this.options.showWindSpeed == 'both') {
                        txt += this.i18n('windforce', 'Wind Force') +
                            ': ' + this._windMsToBft(station.wind.speed);
                        if (this.options.showWindSpeed == 'both') {
                            txt += '&nbsp;(' + this._convertSpeed(station.wind.speed) + '&nbsp;' +
                                this._displaySpeedUnit() + ')';
                        }
                    } else {
                        txt += this.i18n('wind', 'Wind') + ': ' +
                            this._convertSpeed(station.wind.speed) + '&nbsp;' +
                            this._displaySpeedUnit();
                    }
                    txt += '</div>';
                }
                if (typeof station.wind.gust != 'undefined') {
                    txt += '<div class="owm-popup-detail">';
                    if (this.options.showWindSpeed == 'beaufort' || this.options.showWindSpeed == 'both') {
                        txt += this.i18n('gust', 'Gust') +
                            ': ' + this._windMsToBft(station.wind.gust);
                        if (this.options.showWindSpeed == 'both') {
                            txt += '&nbsp;(' + this._convertSpeed(station.wind.gust) + '&nbsp;' +
                                this._displaySpeedUnit() + ')';
                        }
                    } else {
                        txt += this.i18n('gust', 'Gust') + ': ' +
                            this._convertSpeed(station.wind.gust) + '&nbsp;' +
                            this._displaySpeedUnit();
                    }
                    txt += '</div>';
                }
                if (typeof station.wind.deg != 'undefined') {
                    txt += '<div class="owm-popup-detail">';
                    txt += this.i18n('direction', 'Windrichtung') + ': ';
                    if (this.options.showWindDirection == 'desc' || this.options.showWindDirection == 'both') {
                        txt += this._directions[(station.wind.deg / 22.5).toFixed(0)];
                        if (this.options.showWindDirection == 'both') {
                            txt += '&nbsp;(' + station.wind.deg + '°)';
                        }
                    } else {
                        txt += station.wind.deg + '°';
                    }
                    txt += '</div>';
                }
            }
            if (typeof station.dt != 'undefined' && this.options.showTimestamp) {
                txt += '<div class="owm-popup-timestamp">';
                txt += '(' + this._convertTimestamp(station.dt) + ')';
                txt += '</div>';
            }
            txt += '</div>';
            return txt;
        },

        _getImageData: function (station) {
            var imageUrl;
            var imageWidth = this.options.imageWidth;
            var imageHeight = this.options.imageHeight;
            var imageUrlTemplate = this.options.imageUrlCity;
            if (station.weather && station.weather[0] && station.weather[0].icon) {
                imageUrl = imageUrlTemplate.replace('{icon}', station.weather[0].icon);
            } else if (station.type && station.type == 1) {
                imageUrl = this.options.imageUrlPlane;
                imageWidth = this.options.imageWidthPlane;
                imageHeight = this.options.imageWidthPLane;
            } else {
                imageUrl = this.options.imageUrlStation;
                imageWidth = this.options.imageWidthStation;
                imageHeight = this.options.imageWidthStation;
            }
            return {
                url: imageUrl,
                width: imageWidth,
                height: imageHeight
            };
        },

        _createMarker: function (station) {
            var imageData = this._getImageData(station);
            var icon = L.divIcon({
                className: '',
                iconAnchor: new L.Point(25, imageData.height / 2),
                popupAnchor: new L.Point(0, -10),
                html: this._icondivtext(station, imageData.url, imageData.width, imageData.height)
            });
            var marker = L.marker([station.coord.Lat, station.coord.Lon], {
                icon: icon
            });
            return marker;
        },

        _icondivtext: function (station, imageurl, width, height) {
            var txt = '';
            txt += '<div class="owm-icondiv">' +
                '<img src="' + imageurl + '" border="0" width="' + width + '" height="' + height + '" />';
            if (typeof station.main != 'undefined' && typeof station.main.temp != 'undefined') {
                txt += '<div class="owm-icondiv-temp">' + this._temperatureConvert(station.main.temp) +
                    '&nbsp;' + this._displayTemperatureUnit() + '</div>';
            }
            txt += '</div>';
            return txt;
        },

        _temperatureConvert: function (tempC) {
            var temp = tempC;
            switch (this.options.temperatureUnit) {
                case 'K':
                    temp = (tempC + 273.15);
                    break;
                case 'C':
                    break;
                case 'F':
                    temp = ((tempC + 273.15) * 1.8 - 459.67);
                    break;
            }
            return temp.toFixed(this.options.temperatureDigits);
        },

        _displayTemperatureUnit: function () {
            var unit = this._tempUnits['K'];
            if (typeof this._tempUnits[this.options.temperatureUnit] != 'undefined') {
                unit = this._tempUnits[this.options.temperatureUnit];
            }
            return unit;
        },

        _windMsToBft: function (ms) {
            var bft = 18;
            for (var key in this._msbft) {
                if (ms < this._msbft[key]) {
                    bft = key;
                    break;
                }
            }
            return bft;
        },

        _displaySpeedUnit: function () {
            var unit = 'm/s';
            switch (this.options.speedUnit) {
                case 'kmh':
                    unit = 'km/h'
                    break;
                case 'mph':
                    unit = 'mph'
                    break;
            }
            return unit;
        },

        _convertSpeed: function (speed) {
            var sp = speed;
            switch (this.options.speedUnit) {
                case 'kmh':
                    sp = 3.6 * sp;
                    break;
                case 'mph':
                    sp = 2.236 * sp;
                    break;
            }
            return sp.toFixed(this.options.speedDigits);
        },

        _convertTimestamp: function (tstmp) {
            if (this.options.useLocalTime) {
                return (new Date(tstmp * 1000));
            } else {
                return (new Date(tstmp * 1000)).toUTCString();
            }
        },

        i18n: function (key, fallback) {
            var lang = this.options.lang;
            if (typeof L.OWM.Utils.i18n != 'undefined' &&
                typeof L.OWM.Utils.i18n[lang] != 'undefined' &&
                typeof L.OWM.Utils.i18n[lang][key] != 'undefined') {
                return L.OWM.Utils.i18n[lang][key]
            }
            return fallback;
        }

    });
    L.OWM.current = function (options) {
        return new L.OWM.Current(options);
    };

    L.OWM.ProgressControl = L.Control.extend({

        options: {
            position: "topleft",
            type: 'city',
            bgImage: null // bgImage is set in L.OWM.Current when creating this ProgressControll instance
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
            this._container = L.DomUtil.create('div', 'leaflet-control-layers');
            if (this.options.bgImage != null) {
                this._container.style.backgroundImage = 'url(' + this.options.bgImage + ')';
                this._container.style.backgroundRepeat = 'no-repeat';
                this._container.style.backgroundPosition = 'center center';
            }
            L.DomEvent.disableClickPropagation(this._container);
            this._container.innerHTML = '<img src="' + this.options.imageLoadingUrl + '" width="50" height="50" />';
        },

        onAdd: function (map) {
            this._map = map;
            this.options.owmInstance.on('owmloadingstart', this._activate, this);
            this.options.owmInstance.on('owmloadingend', this._deactivate, this);
            return this._container;
        },

        _activate: function (e) {
            if (e.target.options.type == this.options.type) {
                this._container.style.display = 'block';
            }
        },

        _deactivate: function (e) {
            if (e.target.options.type == this.options.type) {
                this._container.style.display = 'none';
            }
        },

        onRemove: function (map) {
            this.options.owmInstance.off('owmloadingstart', this._activate, this);
            this.options.owmInstance.off('owmloadingend', this._deactivate, this);
            this._container.style.display = 'none';
            this._map = null;
        }

    });
    L.OWM.progressControl = function (options) {
        return new L.OWM.ProgressControl(options);
    };

    L.OWM.CurrentCache = L.Class.extend({

        options: {
            maxAge: 15 // age in minutes before cache data is invalidated
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
            this.clear();
        },

        clear: function () {
            this._cachedData = null;
            this._cachedTime = 0;
            this._cachedBBox = {
                minLon: 181,
                minLat: 91,
                maxLon: -181,
                maxLat: -91
            };
        },

        get: function (minLon, minLat, maxLon, maxLat) {
            if (this._cachedData == null) {
                // no cached data available
                return null;
            }
            if ((new Date()).getTime() - this._cachedTime > 60000 * this.options.maxAge) {
                // cached data is too old
                this.clear();
                return null;
            }
            if (minLon <= this._cachedBBox.minLon || minLat <= this._cachedBBox.minLat ||
                maxLon >= this._cachedBBox.maxLon || maxLat >= this._cachedBBox.maxLat) {
                // new area is outside of cached area
                this.clear();
                return null;
            }

            // clip cached data to bounds
            var clippedStations = new Array();
            var cnt = 0;
            for (var k in this._cachedData.list) {
                var station = this._cachedData.list[k];
                if (station.coord.Lon >= minLon && station.coord.Lon <= maxLon &&
                    station.coord.Lat >= minLat && station.coord.Lat <= maxLat) {
                    clippedStations[k] = station;
                    cnt++;
                }
            }
            return clippedStations;
        },

        set: function (data, bounds) {
            this._cachedData = data;
            this._cachedBBox.minLon = bounds.getWest();
            this._cachedBBox.minLat = bounds.getSouth();
            this._cachedBBox.maxLon = bounds.getEast();
            this._cachedBBox.maxLat = bounds.getNorth();
            this._cachedTime = (new Date()).getTime();
        }

    });
    L.OWM.currentCache = function (options) {
        return new L.OWM.CurrentCache(options);
    };


    L.OWM.Utils = {

        callbacks: {},
        callbackCounter: 0,

        jsonp: function (url, callbackFn) {
            var _this = this;
            var elem = document.createElement('script');
            var counter = this.callbackCounter++;
            var callback = 'L.OWM.Utils.callbacks[' + counter + ']';
            var abort = function () {
                if (elem.parentNode) {
                    return elem.parentNode.removeChild(elem);
                }
            };

            this.callbacks[counter] = function (data) {
                delete _this.callbacks[counter];
                return callbackFn(data);
            };

            elem.src = '' + url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callback;
            elem.type = 'text/javascript';
            document.getElementsByTagName('body')[0].appendChild(elem);
            return {
                abort: abort
            };
        },

        i18n: {
            en: {
                owmlinktitle: 'Details at OpenWeatherMap',
                temperature: 'Temperature',
                temp_minmax: 'Temp. min/max',
                wind: 'Wind',
                gust: 'Gust',
                windforce: 'Wind Force',
                direction: 'Direction',
                rain_1h: 'Rain',
                humidity: 'Humidity',
                pressure: 'Pressure'

                    // weather conditions, see https://openweathermap.org/weather-conditions
                    ,
                id200: 'Thunderstorm with Light Rain',
                id201: 'Thunderstorm with Rain',
                id202: 'Thunderstorm with Heavy Rain',
                id210: 'Light Thunderstorm',
                id211: 'Thunderstorm',
                id212: 'Heavy Thunderstorm',
                id221: 'Ragged Thunderstorm',
                id230: 'Thunderstorm with Light Drizzle',
                id231: 'Thunderstorm with Drizzle',
                id232: 'Thunderstorm with Heavy Drizzle'

                    ,
                id300: 'Light Intensity Drizzle',
                id301: 'Drizzle',
                id302: 'Heavy Intensity Drizzle',
                id310: 'Light Intensity Drizzle Rain',
                id311: 'Drizzle Rain',
                id312: 'Heavy Intensity Drizzle Rain',
                id321: 'Shower Drizzle'

                    ,
                id500: 'Light Rain',
                id501: 'Moderate Rain',
                id502: 'Heavy Intensity Rain',
                id503: 'Very Heavy Rain',
                id504: 'Extreme Rain',
                id511: 'Freezing Rain',
                id520: 'Light Intensity Shower Rain',
                id521: 'Shower Rain',
                id522: 'Heavy Intensity Shower Rain'

                    ,
                id600: 'Light Snow',
                id601: 'Snow',
                id602: 'Heavy Snow',
                id611: 'Sleet',
                id621: 'Shower Snow',
                id622: 'Heavy Shower Snow'

                    ,
                id701: 'Mist',
                id711: 'Smoke',
                id721: 'Haze',
                id731: 'Sand/Dust Whirls',
                id741: 'Fog',
                id751: 'Sand'

                    ,
                id800: 'Sky is Clear',
                id801: 'Few Clouds',
                id802: 'Scattered Clouds',
                id803: 'Broken Clouds',
                id804: 'Overcast Clouds'

                    ,
                id900: 'Tornado',
                id901: 'Tropical Storm',
                id902: 'Hurricane',
                id903: 'Cold',
                id904: 'Hot',
                id905: 'Windy',
                id906: 'Hail'
            },

            it: {
                owmlinktitle: 'Dettagli su OpenWeatherMap',
                temperature: 'Temperatura',
                temp_minmax: 'Temp. min / max ',
                wind: 'Vento',
                gust: 'Raffica',
                windforce: 'Forza del vento',
                direction: 'Direzione',
                rain_1h: 'Pioggia',
                humidity: 'Umidità',
                pressure: 'Pressione'

                    // condizioni meteorologiche, consultare https://openweathermap.org/weather-conditions
                    // Temporale
                    ,
                id200: 'Tempesta con pioggia debole',
                id201: 'Tempesta di pioggia',
                id202: 'Tempesta con forti piogge',
                id210: 'Tempesta debole',
                id211: 'Tempesta',
                id212: 'Tempesta forte',
                id221: 'Tempesta irregolare',
                id230: 'Tempesta con deboli acquerugi',
                id231: 'Tempesta con pioviggine',
                id232: 'Tempesta con forte pioviggine'

                    // Pioggerella
                    ,
                id300: 'Debole pioviggine',
                id301: 'Pioggerella',
                id302: 'Forti acquerugi',
                id310: 'Pioggia / leggera pioggerellina',
                id311: 'Pioggia / pioviggine',
                id312: 'Pioggia / pioviggine forte',
                id321: 'Pioviggine intensa'

                    // Pioggia
                    ,
                id500: 'Debole pioggia',
                id501: 'Pioggia moderata',
                id502: 'Pioggia forte',
                id503: 'Pioggia molto forte',
                id504: 'Pioggia estrema',
                id511: 'Grandine',
                id520: 'Pioggia leggera',
                id521: 'Pioggia',
                id522: 'Pioggia forte',
                id531: 'pioggia irregolare'

                    // neve
                    ,
                id600: 'Neve Debole',
                id601: 'Neve',
                id602: 'Forte nevicata',
                id611: 'Nevischio',
                id612: 'Nevischio moderato',
                id615: 'Debole pioggia e neve',
                id616: 'Pioggia e neve',
                id620: 'Nevischio Leggero',
                id621: 'Neve moderata',
                id622: 'Forte nevicata'

                    // atmosfera
                    ,
                id701: 'Bruma',
                id711: 'Fumo',
                id721: 'Foschia',
                id731: 'Vortici di sabbia/polvere',
                id741: 'Nebbia',
                id751: 'Sabbia',
                id761: 'Polvere',
                id762: 'Cenere vulcanica',
                id771: 'Tempesta',
                id781: 'Tornado'

                    // Nuvole
                    ,
                id800: 'Cielo sereno',
                id801: 'Alcune nuvole',
                id802: 'Nuvole sparse',
                id803: 'Tempo nuvoloso',
                id804: 'Nuvoloso'

                    // Estremo
                    ,
                id900: 'Tornado',
                id901: 'Tempesta tropicale',
                id902: 'Uragano',
                id903: 'Molto freddo',
                id904: 'Molto caldo',
                id905: 'Ventoso',
                id906: 'Forte grandine'

                    // aggiuntivo
                    ,
                id951: 'Calmo',
                id952: 'Brezza leggera',
                id953: 'Brezza sostenuta',
                id954: 'Brezza moderata',
                id955: 'Brezza fresca',
                id956: 'Brezza forte',
                id957: 'Vento forte, vicino a burrasca',
                id958: 'Burrasca',
                id959: 'Forte burrasca',
                id960: 'Tempesta',
                id961: 'Tempesta violenta',
                id962: 'Uragano'
            },

            de: {
                owmlinktitle: 'Details bei OpenWeatherMap',
                temperature: 'Temperatur',
                temp_minmax: 'Temp. min/max',
                wind: 'Wind',
                gust: 'Windböen',
                windforce: 'Windstärke',
                direction: 'Windrichtung',
                rain_1h: 'Regen',
                humidity: 'Luftfeuchtigkeit',
                pressure: 'Luftdruck'

                    // Wetterbedingungen, siehe https://openweathermap.org/weather-conditions
                    ,
                id200: 'Gewitter mit leichtem Regen' // 'Thunderstorm with Light Rain'
                    ,
                id201: 'Gewitter mit Regen' // 'Thunderstorm with Rain'
                    ,
                id202: 'Gewitter mit Starkregen' // 'Thunderstorm with Heavy Rain'
                    ,
                id210: 'Leichtes Gewitter' // 'Light Thunderstorm'
                    ,
                id211: 'Mäßiges Gewitter' // 'Thunderstorm'
                    ,
                id212: 'Starkes Gewitter' // 'Heavy Thunderstorm'
                    //	, id221: 'Ragged Thunderstorm'
                    //	, id230: 'Thunderstorm with Light Drizzle'
                    //	, id231: 'Thunderstorm with Drizzle'
                    //	, id232: 'Thunderstorm with Heavy Drizzle'

                    ,
                id300: 'Leichter Nieselregen' // 'Light Intensity Drizzle'
                    ,
                id301: 'Nieselregen' // 'Drizzle'
                    ,
                id302: 'Starker Nieselregen' // 'Heavy Intensity Drizzle'
                    //	, id310: 'Light Intensity Drizzle Rain'
                    //	, id311: 'Drizzle Rain'
                    //	, id312: 'Heavy Intensity Drizzle Rain'
                    //	, id321: 'Shower Drizzle'

                    ,
                id500: 'Leichter Regen' // 'Light Rain'
                    ,
                id501: 'Mäßiger Regen' // 'Moderate Rain'
                    ,
                id502: 'Starker Regen' // 'Heavy Intensity Rain'
                    ,
                id503: 'Ergiebiger Regen' // 'Very Heavy Rain'
                    ,
                id504: 'Starkregen' // 'Extreme Rain'
                    ,
                id511: 'Gefrierender Regen' // 'Freezing Rain'
                    ,
                id520: 'Leichte Regenschauer' // 'Light Intensity Shower Rain'
                    ,
                id521: 'Mäßige Regenschauer' // 'Shower Rain'
                    ,
                id522: 'Wolkenbruchartige Regenschauer' // 'Heavy Intensity Shower Rain'

                    ,
                id600: 'Leichter Schneefall' // 'Light Snow'
                    ,
                id601: 'Mäßiger Schneefall' // 'Snow'
                    ,
                id602: 'Starker Schneefall' // 'Heavy Snow'
                    ,
                id611: 'Schneeregen' // 'Sleet'
                    ,
                id621: 'Schneeschauer' // 'Shower Snow'
                    ,
                id622: 'Starke Schneeschauer' // 'Heavy Shower Snow'

                    ,
                id701: 'Dunst' // 'Mist'
                    ,
                id711: 'Rauch' // 'Smoke'
                    ,
                id721: 'Eingetrübt' // 'Haze'
                    ,
                id731: 'Sand-/Staubwirbel' // 'Sand/Dust Whirls'
                    ,
                id741: 'Nebel' // 'Fog'
                    ,
                id751: 'Sand' // 'Sand'

                    ,
                id800: 'Wolkenlos' // 'Sky is Clear'
                    ,
                id800d: 'Sonnig' // 'Sky is Clear' at day
                    ,
                id800n: 'Klar' // 'Sky is Clear' at night
                    ,
                id801: 'Leicht bewölkt' // 'Few Clouds'
                    ,
                id802: 'Wolkig' // 'Scattered Clouds'
                    ,
                id803: 'Stark bewölkt' // 'Broken Clouds'
                    ,
                id804: 'Bedeckt' // 'Overcast Clouds'

                    ,
                id900: 'Tornado' // 'Tornado'
                    ,
                id901: 'Tropischer Sturm' // 'Tropical Storm'
                    ,
                id902: 'Orkan' // 'Hurricane'
                    ,
                id903: 'Kälte' // 'Cold'
                    ,
                id904: 'Hitze' // 'Hot'
                    ,
                id905: 'Windig' // 'Windy'
                    ,
                id906: 'Hagel' // 'Hail'
            },

            ru: {
                owmlinktitle: 'Информация в OpenWeatherMap',
                temperature: 'Температура',
                temp_minmax: 'Макс./Мин. темп',
                wind: 'Ветер',
                gust: 'Порывы',
                windforce: 'Сила',
                direction: 'Направление',
                rain_1h: 'Дождь',
                humidity: 'Влажность',
                pressure: 'Давление'

                    // weather conditions, see https://openweathermap.org/weather-conditions
                    ,
                id200: 'Гроза с легким дождем' // 'Thunderstorm with Light Rain'
                    ,
                id201: 'Гроза с дождем' // 'Thunderstorm with Rain'
                    ,
                id202: 'Гроза с ливнем' // 'Thunderstorm with Heavy Rain'
                    ,
                id210: 'Легкая гроза' // 'Light Thunderstorm'
                    ,
                id211: 'Гроза' // 'Thunderstorm'
                    ,
                id212: 'Сильная гроза' // 'Heavy Thunderstorm'
                    ,
                id221: 'Прерывистая гроза' // 'Ragged Thunderstorm'
                    ,
                id230: 'Гроза с мелкой моросью' // 'Thunderstorm with Light Drizzle'
                    ,
                id231: 'Гроза с моросью' // 'Thunderstorm with Drizzle'
                    ,
                id232: 'Гроза с сильной моросью' // 'Thunderstorm with Heavy Drizzle'

                    ,
                id300: 'Морось слабой интенсивности' // 'Light Intensity Drizzle'
                    ,
                id301: 'Морось' // 'Drizzle'
                    ,
                id302: 'Морось сильной интенсивности' // 'Heavy Intensity Drizzle'
                    ,
                id310: 'Малоинтенсивный моросящий дождь' // 'Light Intensity Drizzle Rain'
                    ,
                id311: 'Моросящий дождь' // 'Drizzle Rain'
                    ,
                id312: 'Сильноинтенсивный моросящий дождь' // 'Heavy Intensity Drizzle Rain'
                    ,
                id321: 'Проливной дождь' // 'Shower Drizzle'

                    ,
                id500: 'Небольшой дождь' //'Light Rain'
                    ,
                id501: 'Дождь' // 'Moderate Rain'
                    ,
                id502: 'Сильный дождь' //'Heavy Intensity Rain'
                    ,
                id503: 'Очень сильный дождь' //'Very Heavy Rain'
                    ,
                id504: 'Сильный ливень' // 'Extreme Rain'
                    ,
                id511: 'Ледяной дождь' // 'Freezing Rain'
                    ,
                id520: 'Кратковременный слабый дождь' //'Light Intensity Shower Rain'
                    ,
                id521: 'Кратковременный дождь' //'Shower Rain'
                    ,
                id522: 'Кратковременный сильный дождь' //'Heavy Intensity Shower Rain'

                    ,
                id600: 'Слабый снег' // 'Light Snow'
                    ,
                id601: 'Снег' // 'Snow'
                    ,
                id602: 'Сильный снег' // 'Heavy Snow'
                    ,
                id611: 'Снег с дождем' //'Sleet'
                    ,
                id621: 'Кратковременный снег' // 'Shower Snow'
                    ,
                id622: 'Кратковременный сильный снег' //'Heavy Shower Snow'

                    ,
                id701: 'Мгла' // 'Mist'
                    ,
                id711: 'Смог' //'Smoke'
                    ,
                id721: 'Дымка' // 'Haze'
                    ,
                id731: 'Песочные/пыльевые вихри' // 'Sand/Dust Whirls'
                    ,
                id741: 'Туман' // 'Fog'
                    ,
                id751: 'Песок' // 'Sand'

                    ,
                id800: 'Ясно' // 'Sky is Clear'
                    ,
                id801: 'Малооблачно' // 'Few Clouds'
                    ,
                id802: 'Переменная облачность' // 'Scattered Clouds'
                    ,
                id803: 'Облачно с прояснениями' // 'Broken Clouds'
                    ,
                id804: 'Облачно' // 'Overcast Clouds'

                    ,
                id900: 'Торнадо' // 'Tornado'
                    ,
                id901: 'Тропический шторм' // 'Tropical Storm'
                    ,
                id902: 'Ураган' // 'Hurricane'
                    ,
                id903: 'Холод' //'Cold'
                    ,
                id904: 'Жара' //'Hot'
                    ,
                id905: 'Ветрено' //'Windy'
                    ,
                id906: 'Γрад' // 'Hail'
            },

            fr: {
                owmlinktitle: 'Détails à OpenWeatherMap',
                temperature: 'Température',
                temp_minmax: 'Temp. min/max',
                wind: 'Vent',
                gust: 'Rafales',
                windforce: 'Force du vent',
                direction: 'Direction',
                rain_1h: 'Pluie',
                humidity: 'Humidité',
                pressure: 'Pression'

                    // Les conditions météorologiques, voir https://openweathermap.org/weather-conditions
                    ,
                id200: 'Orage avec pluie légère' // 'Thunderstorm with Light Rain'
                    ,
                id201: 'Orage avec pluie' // 'Thunderstorm with Rain'
                    ,
                id202: 'Orage avec fortes précipitations' // 'Thunderstorm with Heavy Rain'
                    //	, id210: 'Light Thunderstorm'
                    ,
                id211: 'Orage',
                id212: 'Orage violent' // 'Heavy Thunderstorm'
                    //	, id221: 'Ragged Thunderstorm'
                    ,
                id230: 'Orage avec bruine faible' // 'Thunderstorm with Light Drizzle'
                    ,
                id231: 'Orage avec bruine' // 'Thunderstorm with Drizzle'
                    //	, id232: 'Thunderstorm with Heavy Drizzle'

                    //	, id300: 'Light Intensity Drizzle'
                    ,
                id301: 'Bruine' // 'Drizzle'
                    //	, id302: 'Heavy Intensity Drizzle'
                    //	, id310: 'Light Intensity Drizzle Rain'
                    //	, id311: 'Drizzle Rain'
                    //	, id312: 'Heavy Intensity Drizzle Rain'
                    //	, id321: 'Shower Drizzle'

                    ,
                id500: 'Pluie légère' // 'Light Rain'
                    ,
                id501: 'Pluie modérée' // 'Moderate Rain'
                    ,
                id502: 'Pluie battante' // 'Heavy Intensity Rain'
                    //	, id503: 'Very Heavy Rain'
                    //	, id504: 'Extreme Rain'
                    ,
                id511: 'Pluie verglassante' // 'Freezing Rain'
                    ,
                id520: 'Averses de pluie fine' // 'Light Intensity Shower Rain'
                    //	, id521: 'Shower Rain'
                    //	, id522: 'Heavy Intensity Shower Rain'

                    ,
                id600: 'Légers flocons' // 'Light Snow'
                    ,
                id601: 'Neige' // 'Snow'
                    ,
                id602: 'Fortes chutes de neige' // 'Heavy Snow'
                    ,
                id611: 'Neige fondue' // 'Sleet'
                    ,
                id621: 'Averses de neige' // 'Shower Snow'
                    ,
                id622: 'Fortes chutes de neige' // 'Heavy Shower Snow'

                    ,
                id701: 'Brume' // 'Mist'
                    ,
                id711: 'Fumée' // 'Smoke'
                    ,
                id721: 'Brume' // 'Haze'
                    ,
                id731: 'Tourbillons de sable/poussière' // 'Sand/Dust Whirls'
                    ,
                id741: 'Brouillard' // 'Fog'
                    //	, id751: 'Sand'

                    ,
                id800: 'Ciel dégagé' // 'Sky is Clear'
                    ,
                id801: 'Ciel voilé',
                id802: 'Nuageux' // 'Scattered Clouds'
                    ,
                id803: 'Nuageux' // 'Broken Clouds'
                    ,
                id804: 'Ciel couvert' // 'Overcast Clouds'

                    ,
                id900: 'Tornade' // 'Tornado'
                    ,
                id901: 'Tempête tropicale' // 'Tropical Storm'
                    ,
                id902: 'Ouragan' // 'Hurricane'
                    ,
                id903: 'Froid' // 'Cold'
                    ,
                id904: 'Chaleur' // 'Hot'
                    ,
                id905: 'Venteux' // 'Windy'
                    ,
                id906: 'Grêle' // 'Hail'
            },

            nl: { //dutch translation
                owmlinktitle: 'Details op OpenWeatherMap',
                temperature: 'Temperatuur',
                temp_minmax: 'Temp. min/max',
                wind: 'Wind',
                gust: 'Windvlaag',
                windforce: 'Windkracht',
                direction: 'Richting',
                rain_1h: 'Regen',
                humidity: 'Luchtvochtigheid',
                pressure: 'Luchtdruk'

                    // weeercondities, see https://openweathermap.org/weather-conditions
                    ,
                id200: 'Onweer met lichte regen',
                id201: 'Onweer met met regen',
                id202: 'Onweer met hevige regen',
                id210: 'Lichte onweersbui',
                id211: 'Onweersbui',
                id212: 'Hevig onweer',
                id221: 'Onregelmatige onweersbui',
                id230: 'Onweer met licht motregen',
                id231: 'Onweer met motregen',
                id232: 'Onweer met hevige motregen'

                    ,
                id300: 'Lichte motregen',
                id301: 'Motregen',
                id302: 'Hevige motregen',
                id310: 'Lichte motregen / regen',
                id311: 'Motregen / regen',
                id312: 'Hevige motregen / regen',
                id321: 'Douche motregen'

                    ,
                id500: 'Lichte regen',
                id501: 'Gematigde regen',
                id502: 'Hevige regen',
                id503: 'Erg hevige regen',
                id504: 'Extreme regen',
                id511: 'Hagel',
                id520: 'Lichte miezerregen',
                id521: 'Miezerregen',
                id522: 'Hevige miezerregen'

                    ,
                id600: 'Lichte sneeuwval',
                id601: 'Sneeuw',
                id602: 'Hevige sneeuwval',
                id611: 'Ijzel',
                id621: 'Douche sneeuw',
                id622: 'Hevige douche sneeuw'

                    ,
                id701: 'Mist',
                id711: 'Rook',
                id721: 'Nevel',
                id731: 'Zand/stof werveling',
                id741: 'Mist',
                id751: 'Zand'

                    ,
                id800: 'Onbewolkt',
                id801: 'Licht bewolkt',
                id802: 'Half bewolkt',
                id803: 'Overwegend bewolkt',
                id804: 'Bewolkt'

                    ,
                id900: 'Tornado',
                id901: 'Tropische Storm',
                id902: 'Orkaan',
                id903: 'Koud',
                id904: 'Heet',
                id905: 'Winderig',
                id906: 'Hagel'
            },

            es: { //spanish translation
                owmlinktitle: 'Detalles en OpenWeatherMap',
                temperature: 'Temperatura',
                temp_minmax: 'Temp. mín/máx',
                wind: 'Viento',
                gust: 'Ráfagas',
                windforce: 'Fuerza del viento',
                direction: 'Dirección',
                rain_1h: 'Lluvia',
                humidity: 'Humedad',
                pressure: 'Presión'

                    // weather conditions, see https://openweathermap.org/weather-conditions
                    // Thunderstorm
                    ,
                id200: 'Tormenta con lluvia débil',
                id201: 'Tormenta con lluvia',
                id202: 'Tormenta con lluvia fuerte',
                id210: 'Tormenta débil',
                id211: 'Tormenta',
                id212: 'Tormenta fuerte',
                id221: 'Tormenta irregular',
                id230: 'Tormenta con llovizna débil',
                id231: 'Tormenta con llovizna',
                id232: 'Tormenta con llovizna fuerte'

                    // Drizzle
                    ,
                id300: 'Llovizna débil',
                id301: 'Llovizna',
                id302: 'Llovizna fuerte',
                id310: 'Lluvia/llovizna débil',
                id311: 'Lluvia/llovizna',
                id312: 'Lluvia/llovizna fuerte',
                id321: 'Chubasco de llovizna'

                    // Rain
                    ,
                id500: 'Lluvia débil',
                id501: 'Lluvia moderada',
                id502: 'Lluvia fuerte',
                id503: 'Lluvia muy fuerte',
                id504: 'Lluvia extrema',
                id511: 'Granizo',
                id520: 'Chubasco de lluvia débil',
                id521: 'Chubasco de lluvia',
                id522: 'Chubasco de lluvia fuerte',
                id531: 'Chubasco de lluvia irregular'

                    // Snow
                    ,
                id600: 'Nieve débil',
                id601: 'Nieve',
                id602: 'Nieve fuerte',
                id611: 'Aguanieve',
                id612: 'Chubasco de aguanieve',
                id615: 'Lluvia y nieve débiles',
                id616: 'Lluvia y nieve',
                id620: 'Chubasco de nieve débil',
                id621: 'Chubasco de nieve',
                id622: 'Chubasco de nieve fuerte'

                    // Atmosphere
                    ,
                id701: 'Bruma',
                id711: 'Humo',
                id721: 'Neblina',
                id731: 'Torbellinos de arena/polvo',
                id741: 'Niebla',
                id751: 'Arena',
                id761: 'Polvo',
                id762: 'Ceniza volcánica',
                id771: 'Tempestad',
                id781: 'Tornado'

                    // Clouds
                    ,
                id800: 'Cielo despejado',
                id801: 'Algunas nubes',
                id802: 'Nubes dispersas',
                id803: 'Intérvalos nubosos',
                id804: 'Nublado'

                    // Extreme
                    ,
                id900: 'Tornado',
                id901: 'Tormenta tropical',
                id902: 'Huracán',
                id903: 'Bajas temperaturas',
                id904: 'Altas temperaturas',
                id905: 'Ventoso',
                id906: 'Granizo'

                    // Additional
                    ,
                id951: 'Calma',
                id952: 'Brisa ligera',
                id953: 'Brisa suave',
                id954: 'Brisa moderada',
                id955: 'Brisa fresca',
                id956: 'Brisa fuerte',
                id957: 'Viento fuerte, próximo a vendaval',
                id958: 'Vendaval',
                id959: 'Vendaval fuerte',
                id960: 'Tempestad',
                id961: 'Tempestad violenta',
                id962: 'Huracán'
            },

            ca: { //catalan translation
                owmlinktitle: 'Detalls en OpenWeatherMap',
                temperature: 'Temperatura',
                temp_minmax: 'Temp. mín/màx',
                wind: 'Vent',
                gust: 'Ràfegues',
                windforce: 'Força del vent',
                direction: 'Direcció',
                rain_1h: 'Pluja',
                humidity: 'Humitat',
                pressure: 'Pressió'

                    // weather conditions, see https://openweathermap.org/weather-conditions
                    // Thunderstorm
                    ,
                id200: 'Tempesta amb pluja feble',
                id201: 'Tempesta amb pluja',
                id202: 'Tempesta amb pluja forta',
                id210: 'Tempesta feble',
                id211: 'Tempesta',
                id212: 'Tempesta forta',
                id221: 'Tempesta irregular',
                id230: 'Tempesta amb plugim feble',
                id231: 'Tempesta amb plugim',
                id232: 'Tempesta amb plugim fort'

                    // Drizzle
                    ,
                id300: 'Plugim feble',
                id301: 'Plugim',
                id302: 'Plugim fort',
                id310: 'Pluja/plugim feble',
                id311: 'Pluja/plugim',
                id312: 'Pluja/plugim fort',
                id321: 'Ruixat de plugim'

                    // Rain
                    ,
                id500: 'Pluja feble',
                id501: 'Pluja moderada',
                id502: 'Pluja forta',
                id503: 'Pluja molt forta',
                id504: 'Pluja extrema',
                id511: 'Calabruix',
                id520: 'Ruixat de pluja feble',
                id521: 'Ruixat de pluja',
                id522: 'Ruixat de pluja fort',
                id531: 'Ruixat de pluja irregular'

                    // Snow
                    ,
                id600: 'Neu feble',
                id601: 'Neu',
                id602: 'Neu forta',
                id611: 'Aiguaneu',
                id612: 'Ruixat de aguanieve',
                id615: 'Pluja i neu febles',
                id616: 'Pluja i neu',
                id620: 'Ruixat de neu feble',
                id621: 'Ruixat de neu',
                id622: 'Ruixat de neu fort'

                    // Atmosphere
                    ,
                id701: 'Bruma',
                id711: 'Fum',
                id721: 'Boirina',
                id731: 'Torbellinos de arena/polvo',
                id741: 'Boira',
                id751: 'Sorra',
                id761: 'Pols',
                id762: 'Cendra volcànica',
                id771: 'Tempestat',
                id781: 'Tornado'

                    // Clouds
                    ,
                id800: 'Cel clar',
                id801: 'Alguns núvols',
                id802: 'Núvols dispersos',
                id803: 'Intervals nuvolosos',
                id804: 'Ennuvolat'

                    // Extreme
                    ,
                id900: 'Tornado',
                id901: 'Tempesta tropical',
                id902: 'Huracà',
                id903: 'Temperatures baixes',
                id904: 'Temperatures altes',
                id905: 'Ventós',
                id906: 'Calabruix'

                    // Additional
                    ,
                id951: 'Calma',
                id952: 'Brisa lleugera',
                id953: 'Brisa suau',
                id954: 'Brisa moderada',
                id955: 'Brisa fresca',
                id956: 'Brisa forta',
                id957: 'Vent fort, pròxim a vendaval',
                id958: 'Ventada',
                id959: 'Ventada forta',
                id960: 'Tempesta',
                id961: 'Tempesta violenta',
                id962: 'Huracà'
            },
            pt_br: { //brazillian translation
                owmlinktitle: 'Detalhes em OpenWeatherMap',
                temperature: 'Temperatura',
                temp_minmax: 'Temp. min/max',
                wind: 'Vento',
                gust: 'Rajadas',
                windforce: 'Força do Vento',
                direction: 'Direção',
                rain_1h: 'Chuva',
                humidity: 'Umidade',
                pressure: 'Pressão'

                    // weather conditions, see https://openweathermap.org/weather-conditions
                    ,
                id200: 'Trovoadas com chuva fraca',
                id201: 'Trovoadas com chuva',
                id202: 'Trovoadas com chuva forte',
                id210: 'Trovoadas leves',
                id211: 'Trovoadas',
                id212: 'Trovoadas fortes',
                id221: 'Trovoadas irregulares',
                id230: 'Trovoadas com garoa fraca',
                id231: 'Trovoadas com garoa',
                id232: 'Trovoadas com garoa forte'

                    ,
                id300: 'Garoa de fraca intensidade',
                id301: 'Garoa',
                id302: 'Garoa de forte intensidade',
                id310: 'Chuva com garoa de fraca intensidade',
                id311: 'Chuva com garoa',
                id312: 'Chuva com garoa de forte intensidade',
                id321: 'Garoa persistente'

                    ,
                id500: 'Chuva fraca',
                id501: 'Chuva',
                id502: 'Chuva forte',
                id503: 'Chuva muito forte',
                id504: 'Chuva extrema',
                id511: 'Chuva de granizo',
                id520: 'Aguaceiro de chuva fraco',
                id521: 'Aguaceiro de chuva',
                id522: 'Aguaceiro de chuva forte'

                    ,
                id600: 'Neve fraca',
                id601: 'Neve',
                id602: 'Neve forte',
                id611: 'Chuva com neve',
                id621: 'Aguaceiro de neve',
                id622: 'Aguaceiro de neve forte'

                    ,
                id701: 'Névoa',
                id711: 'Fumaça',
                id721: 'Bruma',
                id731: 'Redemoinhos de Areia/Poeira',
                id741: 'Neblina',
                id751: 'Areia'

                    ,
                id800: 'Ceu está limpo',
                id801: 'Poucas nuvens',
                id802: 'Nuvens dispersas',
                id803: 'Cirros',
                id804: 'Nublado'

                    ,
                id900: 'Tornado',
                id901: 'Tempestade tropical',
                id902: 'Furacão',
                id903: 'Frio',
                id904: 'Calor',
                id905: 'Ventania',
                id906: 'Granizo'
            }
        }
    };
    setTimeout(function () {


        //Overlay  maps
        var clouds = L.OWM.clouds({
            opacity: 0.8,
            legendImagePath: '/NT2.png',
            appId: OWM_API_KEY
        });
        var rain = L.OWM.rain({
            opacity: 0.5,
            appId: OWM_API_KEY
        });

        var snow = L.OWM.snow({
            opacity: 0.5,
            appId: OWM_API_KEY
        });

        var pressurecntr = L.OWM.pressureContour({
            opacity: 0.5,
            appId: OWM_API_KEY
        });
        var temp = L.OWM.temperature({
            opacity: 0.5,
            appId: OWM_API_KEY
        });
        var wind = L.OWM.wind({
            opacity: 0.5,
            appId: OWM_API_KEY
        });
        var baseMaps = {
            "Streets": Wikimedia,
            "Satelite": Satelite
        };
        var overlayMaps = {
            "Clouds": clouds,
            "Rain": rain,
            "Snow": snow,
            "Pressure contour": pressurecntr,
            "Temperature": temp,
            "Wind": wind
        };
        //Add overlays to map
        L.control.layers(baseMaps, overlayMaps).addTo(map);
        
        //Add searchbar to map
        var controlSearch = new L.Control.Search({
            position: 'topright',
            layer: markersTemp,
            initial: false,
            zoom: 18,
            marker: false
        });
        map.addControl(controlSearch);
        /*
        ////////////////
        On document load
        ////////////////
        */
        document.addEventListener("DOMContentLoaded", function () {
            lastMomentDataPull(0);
        });
        /*
        /////////////////////////////////////
        Places the sensor on their locations
        /////////////////////////////////////
        */
        //JSON file that contains the sensor names, longitude, latitude and it's device id
        
            var longem = 0;
            var latgem = 0;
            var mapLat = 0;
            var mapLon = 0;
            var amountData = 0;
            allData[3].forEach(function (d) {
                d.lat = +d.lat;
                d.lon = +d.lon;
                mapLat = mapLat + d.lat;
                mapLon = mapLon + d.lon;
                amountData++;
                var sensor = iconPicker(null, map.getZoom(), 38, 59, 80, d.lat, d.lon)
                allData[1].forEach(function(data){
                    if(d.Deviceid == data.deviceId){
                        sensor = iconPicker(data.so2, map.getZoom(), 38, 59, 80, d.lat, d.lon)
                    }

                });
                 
                /*{
                            title: d.naam,
                            icon: iconPicker(d.s1, 14, 38, 59, 80) //Standaardwaarden SO2
                        });*/
                sensor.bindPopup("Locatie: " + d.naam);
                sensor.on('click', onCircleClick, d);
                markersTemp.addLayer(sensor);
            });
            markersTemp.addTo(map);
            longem = mapLon / amountData;
            latgem = mapLat / amountData;
            getCurrentLocation(latgem, longem);
            map.setView([mapLat / amountData, mapLon / amountData], 14);
       
        /*
        ////////////////////////////////////////////////////////////////////////////////
        Changes currently displayed chemical and gives changeDust buttons a function
        ////////////////////////////////////////////////////////////////////////////////
        */
        document.getElementById("changePM10").onclick = function () {
            document.getElementById("displayeddust").innerHTML = "PM10";
            displaystate = "PM10";
            adjustIcon();
        }
        document.getElementById("changeO3").onclick = function () {
            document.getElementById("displayeddust").innerHTML = "O3";
            displaystate = "O3";
            adjustIcon();
        }
        document.getElementById("changeSO2").onclick = function () {
            document.getElementById("displayeddust").innerHTML = "SO2";
            displaystate = "SO2";
            adjustIcon();
        }
        document.getElementById("changeNO2").onclick = function () {
            document.getElementById("displayeddust").innerHTML = "NO2";
            displaystate = "NO2";
            adjustIcon();
        }
        /*
        //////////////////////
        Close chart collection
        //////////////////////
        */
        document.getElementById("closeChartCollection").onclick = function () {
            document.getElementById("chartCollection").style.visibility = "hidden";
        }
        /*
        ////////////////////////////
        Close compare chart screen
        ////////////////////////////
        */
        document.getElementById("closecompare").onclick = function () {
            compare = false;
            document.getElementById("comparePart").style.visibility = "hidden";
            document.getElementById("comparePart").style.display = "none";
            document.getElementById("compare").style.visibility = "visible";
            document.getElementById("map").style.height = "100%";
            document.getElementById("legendCollection").style.bottom = "5%";
        }
        /*
        //////////////////////////////////////////////
        Sets functions for eacht compare charts button
        //////////////////////////////////////////////
        */
        last24hCButton.onclick = function () {
            last24hCButton.style.backgroundColor = "#13abc4";
            last24hCButton.style.color = "#fff";
            lastWeekCButton.style.backgroundColor = "#fff";
            lastWeekCButton.style.color = "#13abc4";
            lastMonthCButton.style.backgroundColor = "#fff";
            lastMonthCButton.style.color = "#13abc4";
            lastYearCButton.style.backgroundColor = "#fff";
            lastYearCButton.style.color = "#13abc4";
            selectedCompareChart = "24h";
            chartCompareButtons();
        }
        lastWeekCButton.onclick = function () {
            lastWeekCButton.style.backgroundColor = "#13abc4";
            lastWeekCButton.style.color = "#fff";
            last24hCButton.style.backgroundColor = "#fff";
            last24hCButton.style.color = "#13abc4";
            lastMonthCButton.style.backgroundColor = "#fff";
            lastMonthCButton.style.color = "#13abc4";
            lastYearCButton.style.backgroundColor = "#fff";
            lastYearCButton.style.color = "#13abc4";
            selectedCompareChart = "week";
            chartCompareButtons();
        }
        lastMonthCButton.onclick = function () {
            lastMonthCButton.style.backgroundColor = "#13abc4";
            lastMonthCButton.style.color = "#fff";
            last24hCButton.style.backgroundColor = "#fff";
            last24hCButton.style.color = "#13abc4";
            lastWeekCButton.style.backgroundColor = "#fff";
            lastWeekCButton.style.color = "#13abc4";
            lastYearCButton.style.backgroundColor = "#fff";
            lastYearCButton.style.color = "#13abc4";
            selectedCompareChart = "month";
            chartCompareButtons();
        }
        lastYearCButton.onclick = function () {
            lastYearCButton.style.backgroundColor = "#13abc4";
            lastYearCButton.style.color = "#fff";
            last24hCButton.style.backgroundColor = "#fff";
            last24hCButton.style.color = "#13abc4";
            lastWeekCButton.style.backgroundColor = "#fff";
            lastWeekCButton.style.color = "#13abc4";
            lastMonthCButton.style.backgroundColor = "#fff";
            lastMonthCButton.style.color = "#13abc4";
            selectedCompareChart = "2Days";
            chartCompareButtons();
        }
        /*
        /////////////////
        Refresh map data
        /////////////////
        */
        setInterval(function () {
            adjustIcon();
        }, 5 * 60000)

        /*
        ////////////////////////////////////////////////
        Sets functions for eacht chartcollection button
        ////////////////////////////////////////////////
        */
        last24hButton.onclick = function () {
            last24hButton.style.backgroundColor = "#13abc4";
            last24hButton.style.color = "#fff";
            lastWeekButton.style.backgroundColor = "#fff";
            lastWeekButton.style.color = "#13abc4";
            lastMonthButton.style.backgroundColor = "#fff";
            lastMonthButton.style.color = "#13abc4";
            lastYearButton.style.backgroundColor = "#fff";
            lastYearButton.style.color = "#13abc4";
            createSpecificChart(id);
            selectedChart = "24h";
        }

        lastWeekButton.onclick = function () {
            lastWeekButton.style.backgroundColor = "#13abc4";
            lastWeekButton.style.color = "#fff";
            last24hButton.style.backgroundColor = "#fff";
            last24hButton.style.color = "#13abc4";
            lastMonthButton.style.backgroundColor = "#fff";
            lastMonthButton.style.color = "#13abc4";
            lastYearButton.style.backgroundColor = "#fff";
            lastYearButton.style.color = "#13abc4";
            selectedChart = "week";
            chartButtons(localid);

        }

        lastMonthButton.onclick = function () {
            lastMonthButton.style.backgroundColor = "#13abc4";
            lastMonthButton.style.color = "#fff";
            last24hButton.style.backgroundColor = "#fff";
            last24hButton.style.color = "#13abc4";
            lastWeekButton.style.backgroundColor = "#fff";
            lastWeekButton.style.color = "#13abc4";
            lastYearButton.style.backgroundColor = "#fff";
            lastYearButton.style.color = "#13abc4";
            selectedChart = "month";
            chartButtons(localid);

        }

        lastYearButton.onclick = function () {
            lastYearButton.style.backgroundColor = "#13abc4";
            lastYearButton.style.color = "#fff";
            last24hButton.style.backgroundColor = "#fff";
            last24hButton.style.color = "#13abc4";
            lastWeekButton.style.backgroundColor = "#fff";
            lastWeekButton.style.color = "#13abc4";
            lastMonthButton.style.backgroundColor = "#fff";
            lastMonthButton.style.color = "#13abc4";
            selectedChart = "2Days";
            chartButtons(localid);

        }
        console.log("testteststestsklsadjfl;kajsd;flkajsd;lkfa;sldkfja;lksdfja;lksdjfa;lksdjf;lkasjdf;klasjdfl;kasdlkfasdklfa;lskdfajsdf")
        map.on('click', onMapClick);
    }, 1000);

}


///////////////////////////Script for search///////////////////////////////////


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
})(function (L) {


    L.Control.Search = L.Control.extend({

        includes: L.version[0] === '1' ? L.Evented.prototype : L.Mixin.Events,

        options: {
            url: '', //url for search by ajax request, ex: "search.php?q={s}". Can be function to returns string for dynamic parameter setting
            layer: null, //layer where search markers(is a L.LayerGroup)				
            sourceData: null, //function to fill _recordsCache, passed searching text by first param and callback in second				
            //TODO implements uniq option 'sourceData' to recognizes source type: url,array,callback or layer				
            jsonpParam: null, //jsonp param name for search by jsonp service, ex: "callback"
            propertyLoc: 'loc', //field for remapping location, using array: ['latname','lonname'] for select double fields(ex. ['lat','lon'] ) support dotted format: 'prop.subprop.title'
            propertyName: 'title', //property in marker.options(or feature.properties for vector layer) trough filter elements in layer,
            formatData: null, //callback for reformat all data from source to indexed data object
            filterData: null, //callback for filtering data from text searched, params: textSearch, allRecords
            moveToLocation: null, //callback run on location found, params: latlng, title, map
            buildTip: null, //function to return row tip html node(or html string), receive text tooltip in first param
            container: '', //container id to insert Search Control		
            zoom: null, //default zoom level for move to location
            minLength: 1, //minimal text length for autocomplete
            initial: true, //search elements only by initial text
            casesensitive: false, //search elements in case sensitive text
            autoType: true, //complete input with first suggested result and select this filled-in text.
            delayType: 400, //delay while typing for show tooltip
            tooltipLimit: -1, //limit max results to show in tooltip. -1 for no limit, 0 for no results
            tipAutoSubmit: true, //auto map panTo when click on tooltip
            firstTipSubmit: false, //auto select first result con enter click
            autoResize: true, //autoresize on input change
            collapsed: true, //collapse search control at startup
            autoCollapse: false, //collapse search control after submit(on button or on tips if enabled tipAutoSubmit)
            autoCollapseTime: 1200, //delay for autoclosing alert and collapse after blur
            textErr: 'Location not found', //error message
            textCancel: 'Cancel', //title in cancel button		
            textPlaceholder: 'Search...', //placeholder value			
            hideMarkerOnCollapse: false, //remove circle and marker on search control collapsed		
            position: 'topleft',
            marker: { //custom L.Marker or false for hide
                icon: false, //custom L.Icon for maker location or false for hide
                animate: true, //animate a circle over location found
                circle: { //draw a circle in location found
                    radius: 10,
                    weight: 3,
                    color: '#e03',
                    stroke: true,
                    fill: false
                }
            }
        },

        _getPath: function (obj, prop) {
            var parts = prop.split('.'),
                last = parts.pop(),
                len = parts.length,
                cur = parts[0],
                i = 1;

            if (len > 0)
                while ((obj = obj[cur]) && i < len)
                    cur = parts[i++];

            if (obj)
                return obj[last];
        },

        _isObject: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Object]";
        },

        initialize: function (options) {
            L.Util.setOptions(this, options || {});
            this._inputMinSize = this.options.textPlaceholder ? this.options.textPlaceholder.length : 10;
            this._layer = this.options.layer || new L.LayerGroup();
            this._filterData = this.options.filterData || this._defaultFilterData;
            this._formatData = this.options.formatData || this._defaultFormatData;
            this._moveToLocation = this.options.moveToLocation || this._defaultMoveToLocation;
            this._autoTypeTmp = this.options.autoType; //useful for disable autoType temporarily in delete/backspace keydown
            this._countertips = 0; //number of tips items
            this._recordsCache = {}; //key,value table! to store locations! format: key,latlng
            this._curReq = null;
        },

        onAdd: function (map) {
            this._map = map;
            this._container = L.DomUtil.create('div', 'leaflet-control-search');
            this._input = this._createInput(this.options.textPlaceholder, 'search-input');
            this._tooltip = this._createTooltip('search-tooltip');
            this._cancel = this._createCancel(this.options.textCancel, 'search-cancel');
            this._button = this._createButton(this.options.textPlaceholder, 'search-button');
            this._alert = this._createAlert('search-alert');

            if (this.options.collapsed === false)
                this.expand(this.options.collapsed);

            if (this.options.marker) {

                if (this.options.marker instanceof L.Marker || this.options.marker instanceof L.CircleMarker)
                    this._markerSearch = this.options.marker;

                else if (this._isObject(this.options.marker))
                    this._markerSearch = new L.Control.Search.Marker([0, 0], this.options.marker);

                this._markerSearch._isMarkerSearch = true;
            }

            this.setLayer(this._layer);

            map.on({
                // 		'layeradd': this._onLayerAddRemove,
                // 		'layerremove': this._onLayerAddRemove
                'resize': this._handleAutoresize
            }, this);
            return this._container;
        },
        addTo: function (map) {

            if (this.options.container) {
                this._container = this.onAdd(map);
                this._wrapper = L.DomUtil.get(this.options.container);
                this._wrapper.style.position = 'relative';
                this._wrapper.appendChild(this._container);
            } else
                L.Control.prototype.addTo.call(this, map);

            return this;
        },

        onRemove: function (map) {
            this._recordsCache = {};
            // map.off({
            // 		'layeradd': this._onLayerAddRemove,
            // 		'layerremove': this._onLayerAddRemove
            // 	}, this);
            map.off({
                // 		'layeradd': this._onLayerAddRemove,
                // 		'layerremove': this._onLayerAddRemove
                'resize': this._handleAutoresize
            }, this);
        },

        // _onLayerAddRemove: function(e) {
        // 	//without this, run setLayer also for each Markers!! to optimize!
        // 	if(e.layer instanceof L.LayerGroup)
        // 		if( L.stamp(e.layer) != L.stamp(this._layer) )
        // 			this.setLayer(e.layer);
        // },

        setLayer: function (layer) { //set search layer at runtime
            //this.options.layer = layer; //setting this, run only this._recordsFromLayer()
            this._layer = layer;
            this._layer.addTo(this._map);
            return this;
        },

        showAlert: function (text) {
            var self = this;
            text = text || this.options.textErr;
            this._alert.style.display = 'block';
            this._alert.innerHTML = text;
            clearTimeout(this.timerAlert);

            this.timerAlert = setTimeout(function () {
                self.hideAlert();
            }, this.options.autoCollapseTime);
            return this;
        },

        hideAlert: function () {
            this._alert.style.display = 'none';
            return this;
        },

        cancel: function () {
            this._input.value = '';
            this._handleKeypress({
                keyCode: 8
            }); //simulate backspace keypress
            this._input.size = this._inputMinSize;
            this._input.focus();
            this._cancel.style.display = 'none';
            this._hideTooltip();
            this.fire('search:cancel');
            return this;
        },

        expand: function (toggle) {
            toggle = typeof toggle === 'boolean' ? toggle : true;
            this._input.style.display = 'block';
            L.DomUtil.addClass(this._container, 'search-exp');
            if (toggle !== false) {
                this._input.focus();
                this._map.on('dragstart click', this.collapse, this);
            }
            this.fire('search:expanded');
            return this;
        },

        collapse: function () {
            this._hideTooltip();
            this.cancel();
            this._alert.style.display = 'none';
            this._input.blur();
            if (this.options.collapsed) {
                this._input.style.display = 'none';
                this._cancel.style.display = 'none';
                L.DomUtil.removeClass(this._container, 'search-exp');
                if (this.options.hideMarkerOnCollapse) {
                    this._map.removeLayer(this._markerSearch);
                }
                this._map.off('dragstart click', this.collapse, this);
            }
            this.fire('search:collapsed');
            return this;
        },

        collapseDelayed: function () { //collapse after delay, used on_input blur
            var self = this;
            if (!this.options.autoCollapse) return this;
            clearTimeout(this.timerCollapse);
            this.timerCollapse = setTimeout(function () {
                self.collapse();
            }, this.options.autoCollapseTime);
            return this;
        },

        collapseDelayedStop: function () {
            clearTimeout(this.timerCollapse);
            return this;
        },

        ////start DOM creations
        _createAlert: function (className) {
            var alert = L.DomUtil.create('div', className, this._container);
            alert.style.display = 'none';

            L.DomEvent
                .on(alert, 'click', L.DomEvent.stop, this)
                .on(alert, 'click', this.hideAlert, this);

            return alert;
        },

        _createInput: function (text, className) {
            var self = this;
            var label = L.DomUtil.create('label', className, this._container);
            var input = L.DomUtil.create('input', className, this._container);
            input.type = 'text';
            input.size = this._inputMinSize;
            input.value = '';
            input.autocomplete = 'off';
            input.autocorrect = 'off';
            input.autocapitalize = 'off';
            input.placeholder = text;
            input.style.display = 'none';
            input.role = 'search';
            input.id = input.role + input.type + input.size;

            label.htmlFor = input.id;
            label.style.display = 'none';
            label.value = text;

            L.DomEvent
                .disableClickPropagation(input)
                .on(input, 'keyup', this._handleKeypress, this)
                .on(input, 'paste', function (e) {
                    setTimeout(function (e) {
                        self._handleKeypress(e);
                    }, 10, e);
                }, this)
                .on(input, 'blur', this.collapseDelayed, this)
                .on(input, 'focus', this.collapseDelayedStop, this);

            return input;
        },

        _createCancel: function (title, className) {
            var cancel = L.DomUtil.create('a', className, this._container);
            cancel.href = '#';
            cancel.title = title;
            cancel.style.display = 'none';
            cancel.innerHTML = "<span>&otimes;</span>"; //imageless(see css)

            L.DomEvent
                .on(cancel, 'click', L.DomEvent.stop, this)
                .on(cancel, 'click', this.cancel, this);

            return cancel;
        },

        _createButton: function (title, className) {
            var button = L.DomUtil.create('a', className, this._container);
            button.href = '#';
            button.title = title;

            L.DomEvent
                .on(button, 'click', L.DomEvent.stop, this)
                .on(button, 'click', this._handleSubmit, this)
                .on(button, 'focus', this.collapseDelayedStop, this)
                .on(button, 'blur', this.collapseDelayed, this);

            return button;
        },

        _createTooltip: function (className) {
            var self = this;
            var tool = L.DomUtil.create('ul', className, this._container);
            tool.style.display = 'none';
            L.DomEvent
                .disableClickPropagation(tool)
                .on(tool, 'blur', this.collapseDelayed, this)
                .on(tool, 'mousewheel', function (e) {
                    self.collapseDelayedStop();
                    L.DomEvent.stopPropagation(e); //disable zoom map
                }, this)
                .on(tool, 'mouseover', function (e) {
                    self.collapseDelayedStop();
                }, this);
            return tool;
        },

        _createTip: function (text, val) { //val is object in recordCache, usually is Latlng
            var tip;

            if (this.options.buildTip) {
                tip = this.options.buildTip.call(this, text, val); //custom tip node or html string
                if (typeof tip === 'string') {
                    var tmpNode = L.DomUtil.create('div');
                    tmpNode.innerHTML = tip;
                    tip = tmpNode.firstChild;
                }
            } else {
                tip = L.DomUtil.create('li', '');
                tip.innerHTML = text;
            }

            L.DomUtil.addClass(tip, 'search-tip');
            tip._text = text; //value replaced in this._input and used by _autoType

            if (this.options.tipAutoSubmit)
                L.DomEvent
                .disableClickPropagation(tip)
                .on(tip, 'click', L.DomEvent.stop, this)
                .on(tip, 'click', function (e) {
                    this._input.value = text;
                    this._handleAutoresize();
                    this._input.focus();
                    this._hideTooltip();
                    this._handleSubmit();
                }, this);

            return tip;
        },

        //////end DOM creations

        _getUrl: function (text) {
            return (typeof this.options.url === 'function') ? this.options.url(text) : this.options.url;
        },

        _defaultFilterData: function (text, records) {

            var I, icase, regSearch, frecords = {};

            text = text.replace(/[.*+?^${}()|[\]\\]/g, ''); //sanitize remove all special characters
            if (text === '')
                return [];

            I = this.options.initial ? '^' : ''; //search only initial text
            icase = !this.options.casesensitive ? 'i' : undefined;

            regSearch = new RegExp(I + text, icase);

            //TODO use .filter or .map
            for (var key in records) {
                if (regSearch.test(key))
                    frecords[key] = records[key];
            }

            return frecords;
        },

        showTooltip: function (records) {


            this._countertips = 0;
            this._tooltip.innerHTML = '';
            this._tooltip.currentSelection = -1; //inizialized for _handleArrowSelect()

            if (this.options.tooltipLimit) {
                for (var key in records) //fill tooltip
                {
                    if (this._countertips === this.options.tooltipLimit)
                        break;

                    this._countertips++;

                    this._tooltip.appendChild(this._createTip(key, records[key]));
                }
            }

            if (this._countertips > 0) {
                this._tooltip.style.display = 'block';

                if (this._autoTypeTmp)
                    this._autoType();

                this._autoTypeTmp = this.options.autoType; //reset default value
            } else
                this._hideTooltip();

            this._tooltip.scrollTop = 0;

            return this._countertips;
        },

        _hideTooltip: function () {
            this._tooltip.style.display = 'none';
            this._tooltip.innerHTML = '';
            return 0;
        },

        _defaultFormatData: function (json) { //default callback for format data to indexed data
            var self = this,
                propName = this.options.propertyName,
                propLoc = this.options.propertyLoc,
                i, jsonret = {};

            if (L.Util.isArray(propLoc))
                for (i in json)
                    jsonret[self._getPath(json[i], propName)] = L.latLng(json[i][propLoc[0]], json[i][propLoc[1]]);
            else
                for (i in json)
                    jsonret[self._getPath(json[i], propName)] = L.latLng(self._getPath(json[i], propLoc));
            //TODO throw new Error("propertyName '"+propName+"' not found in JSON data");
            return jsonret;
        },

        _recordsFromJsonp: function (text, callAfter) { //extract searched records from remote jsonp service
            L.Control.Search.callJsonp = callAfter;
            var script = L.DomUtil.create('script', 'leaflet-search-jsonp', document.getElementsByTagName('body')[0]),
                url = L.Util.template(this._getUrl(text) + '&' + this.options.jsonpParam + '=L.Control.Search.callJsonp', {
                    s: text
                }); //parsing url
            //rnd = '&_='+Math.floor(Math.random()*10000);
            //TODO add rnd param or randomize callback name! in recordsFromJsonp
            script.type = 'text/javascript';
            script.src = url;
            return {
                abort: function () {
                    script.parentNode.removeChild(script);
                }
            };
        },

        _recordsFromAjax: function (text, callAfter) { //Ajax request
            if (window.XMLHttpRequest === undefined) {
                window.XMLHttpRequest = function () {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP.6.0");
                    } catch (e1) {
                        try {
                            return new ActiveXObject("Microsoft.XMLHTTP.3.0");
                        } catch (e2) {
                            throw new Error("XMLHttpRequest is not supported");
                        }
                    }
                };
            }
            var IE8or9 = (L.Browser.ie && !window.atob && document.querySelector),
                request = IE8or9 ? new XDomainRequest() : new XMLHttpRequest(),
                url = L.Util.template(this._getUrl(text), {
                    s: text
                });

            //rnd = '&_='+Math.floor(Math.random()*10000);
            //TODO add rnd param or randomize callback name! in recordsFromAjax			

            request.open("GET", url);


            request.onload = function () {
                callAfter(JSON.parse(request.responseText));
            };
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    this.onload();
                }
            };

            request.send();
            return request;
        },

        _searchInLayer: function (layer, retRecords, propName) {
            var self = this,
                loc;

            if (layer instanceof L.Control.Search.Marker) return;

            if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
                if (self._getPath(layer.options, propName)) {
                    loc = layer.getLatLng();
                    loc.layer = layer;
                    retRecords[self._getPath(layer.options, propName)] = loc;
                } else if (self._getPath(layer.feature.properties, propName)) {
                    loc = layer.getLatLng();
                    loc.layer = layer;
                    retRecords[self._getPath(layer.feature.properties, propName)] = loc;
                } else {
                    //throw new Error("propertyName '"+propName+"' not found in marker"); 
                    console.warn("propertyName '" + propName + "' not found in marker");
                }
            } else if (layer instanceof L.Path || layer instanceof L.Polyline || layer instanceof L.Polygon) {
                if (self._getPath(layer.options, propName)) {
                    loc = layer.getBounds().getCenter();
                    loc.layer = layer;
                    retRecords[self._getPath(layer.options, propName)] = loc;
                } else if (self._getPath(layer.feature.properties, propName)) {
                    loc = layer.getBounds().getCenter();
                    loc.layer = layer;
                    retRecords[self._getPath(layer.feature.properties, propName)] = loc;
                } else {
                    //throw new Error("propertyName '"+propName+"' not found in shape"); 
                    console.warn("propertyName '" + propName + "' not found in shape");
                }
            } else if (layer.hasOwnProperty('feature')) //GeoJSON
            {
                if (layer.feature.properties.hasOwnProperty(propName)) {
                    if (layer.getLatLng && typeof layer.getLatLng === 'function') {
                        loc = layer.getLatLng();
                        loc.layer = layer;
                        retRecords[layer.feature.properties[propName]] = loc;
                    } else if (layer.getBounds && typeof layer.getBounds === 'function') {
                        loc = layer.getBounds().getCenter();
                        loc.layer = layer;
                        retRecords[layer.feature.properties[propName]] = loc;
                    } else {
                        console.warn("Unknown type of Layer");
                    }
                } else {
                    //throw new Error("propertyName '"+propName+"' not found in feature");
                    console.warn("propertyName '" + propName + "' not found in feature");
                }
            } else if (layer instanceof L.LayerGroup) {
                layer.eachLayer(function (layer) {
                    self._searchInLayer(layer, retRecords, propName);
                });
            }
        },

        _recordsFromLayer: function () { //return table: key,value from layer
            var self = this,
                retRecords = {},
                propName = this.options.propertyName;

            this._layer.eachLayer(function (layer) {
                self._searchInLayer(layer, retRecords, propName);
            });

            return retRecords;
        },

        _autoType: function () {

            //TODO implements autype without selection(useful for mobile device)

            var start = this._input.value.length,
                firstRecord = this._tooltip.firstChild ? this._tooltip.firstChild._text : '',
                end = firstRecord.length;

            if (firstRecord.indexOf(this._input.value) === 0) { // If prefix match
                this._input.value = firstRecord;
                this._handleAutoresize();

                if (this._input.createTextRange) {
                    var selRange = this._input.createTextRange();
                    selRange.collapse(true);
                    selRange.moveStart('character', start);
                    selRange.moveEnd('character', end);
                    selRange.select();
                } else if (this._input.setSelectionRange) {
                    this._input.setSelectionRange(start, end);
                } else if (this._input.selectionStart) {
                    this._input.selectionStart = start;
                    this._input.selectionEnd = end;
                }
            }
        },

        _hideAutoType: function () { // deselect text:

            var sel;
            if ((sel = this._input.selection) && sel.empty) {
                sel.empty();
            } else if (this._input.createTextRange) {
                sel = this._input.createTextRange();
                sel.collapse(true);
                var end = this._input.value.length;
                sel.moveStart('character', end);
                sel.moveEnd('character', end);
                sel.select();
            } else {
                if (this._input.getSelection) {
                    this._input.getSelection().removeAllRanges();
                }
                this._input.selectionStart = this._input.selectionEnd;
            }
        },

        _handleKeypress: function (e) { //run _input keyup event
            var self = this;

            switch (e.keyCode) {
                case 27: //Esc
                    this.collapse();
                    break;
                case 13: //Enter
                    if (this._countertips == 1 || (this.options.firstTipSubmit && this._countertips > 0)) {
                        if (this._tooltip.currentSelection == -1) {
                            this._handleArrowSelect(1);
                        }
                    }
                    this._handleSubmit(); //do search
                    break;
                case 38: //Up
                    this._handleArrowSelect(-1);
                    break;
                case 40: //Down
                    this._handleArrowSelect(1);
                    break;
                case 8: //Backspace
                case 45: //Insert
                case 46: //Delete
                    this._autoTypeTmp = false; //disable temporarily autoType
                    break;
                case 37: //Left
                case 39: //Right
                case 16: //Shift
                case 17: //Ctrl
                case 35: //End
                case 36: //Home
                    break;
                default: //All keys
                    if (this._input.value.length)
                        this._cancel.style.display = 'block';
                    else
                        this._cancel.style.display = 'none';

                    if (this._input.value.length >= this.options.minLength) {
                        clearTimeout(this.timerKeypress); //cancel last search request while type in				
                        this.timerKeypress = setTimeout(function () { //delay before request, for limit jsonp/ajax request

                            self._fillRecordsCache();

                        }, this.options.delayType);
                    } else
                        this._hideTooltip();
            }

            this._handleAutoresize();
        },

        searchText: function (text) {
            var code = text.charCodeAt(text.length);

            this._input.value = text;

            this._input.style.display = 'block';
            L.DomUtil.addClass(this._container, 'search-exp');

            this._autoTypeTmp = false;

            this._handleKeypress({
                keyCode: code
            });
        },

        _fillRecordsCache: function () {

            var self = this,
                inputText = this._input.value,
                records;

            if (this._curReq && this._curReq.abort)
                this._curReq.abort();
            //abort previous requests

            L.DomUtil.addClass(this._container, 'search-load');

            if (this.options.layer) {
                //TODO _recordsFromLayer must return array of objects, formatted from _formatData
                this._recordsCache = this._recordsFromLayer();

                records = this._filterData(this._input.value, this._recordsCache);

                this.showTooltip(records);

                L.DomUtil.removeClass(this._container, 'search-load');
            } else {
                if (this.options.sourceData)
                    this._retrieveData = this.options.sourceData;

                else if (this.options.url) //jsonp or ajax
                    this._retrieveData = this.options.jsonpParam ? this._recordsFromJsonp : this._recordsFromAjax;

                this._curReq = this._retrieveData.call(this, inputText, function (data) {

                    self._recordsCache = self._formatData.call(self, data);

                    //TODO refact!
                    if (self.options.sourceData)
                        records = self._filterData(self._input.value, self._recordsCache);
                    else
                        records = self._recordsCache;

                    self.showTooltip(records);

                    L.DomUtil.removeClass(self._container, 'search-load');
                });
            }
        },

        _handleAutoresize: function () {
            var maxWidth;

            if (this._input.style.maxWidth !== this._map._container.offsetWidth) {
                maxWidth = this._map._container.clientWidth;

                // other side margin + padding + width border + width search-button + width search-cancel
                maxWidth -= 10 + 20 + 1 + 30 + 22;

                this._input.style.maxWidth = maxWidth.toString() + 'px';
            }

            if (this.options.autoResize && (this._container.offsetWidth + 20 < this._map._container.offsetWidth)) {
                this._input.size = this._input.value.length < this._inputMinSize ? this._inputMinSize : this._input.value.length;
            }
        },

        _handleArrowSelect: function (velocity) {

            var searchTips = this._tooltip.hasChildNodes() ? this._tooltip.childNodes : [];

            for (i = 0; i < searchTips.length; i++)
                L.DomUtil.removeClass(searchTips[i], 'search-tip-select');

            if ((velocity == 1) && (this._tooltip.currentSelection >= (searchTips.length - 1))) { // If at end of list.
                L.DomUtil.addClass(searchTips[this._tooltip.currentSelection], 'search-tip-select');
            } else if ((velocity == -1) && (this._tooltip.currentSelection <= 0)) { // Going back up to the search box.
                this._tooltip.currentSelection = -1;
            } else if (this._tooltip.style.display != 'none') {
                this._tooltip.currentSelection += velocity;

                L.DomUtil.addClass(searchTips[this._tooltip.currentSelection], 'search-tip-select');

                this._input.value = searchTips[this._tooltip.currentSelection]._text;

                // scroll:
                var tipOffsetTop = searchTips[this._tooltip.currentSelection].offsetTop;

                if (tipOffsetTop + searchTips[this._tooltip.currentSelection].clientHeight >= this._tooltip.scrollTop + this._tooltip.clientHeight) {
                    this._tooltip.scrollTop = tipOffsetTop - this._tooltip.clientHeight + searchTips[this._tooltip.currentSelection].clientHeight;
                } else if (tipOffsetTop <= this._tooltip.scrollTop) {
                    this._tooltip.scrollTop = tipOffsetTop;
                }
            }
        },

        _handleSubmit: function () { //button and tooltip click and enter submit

            this._hideAutoType();

            this.hideAlert();
            this._hideTooltip();

            if (this._input.style.display == 'none') //on first click show _input only
                this.expand();
            else {
                if (this._input.value === '') //hide _input only
                    this.collapse();
                else {
                    var loc = this._getLocation(this._input.value);

                    if (loc === false)
                        this.showAlert();
                    else {
                        this.showLocation(loc, this._input.value);
                        this.fire('search:locationfound', {
                            latlng: loc,
                            text: this._input.value,
                            layer: loc.layer ? loc.layer : null
                        });
                    }
                }
            }
        },

        _getLocation: function (key) { //extract latlng from _recordsCache

            if (this._recordsCache.hasOwnProperty(key))
                return this._recordsCache[key]; //then after use .loc attribute
            else
                return false;
        },

        _defaultMoveToLocation: function (latlng, title, map) {
            if (this.options.zoom)
                this._map.setView(latlng, this.options.zoom);
            else
                this._map.panTo(latlng);
        },

        showLocation: function (latlng, title) { //set location on map from _recordsCache
            var self = this;

            self._map.once('moveend zoomend', function (e) {

                if (self._markerSearch) {
                    self._markerSearch.addTo(self._map).setLatLng(latlng);
                }

            });

            self._moveToLocation(latlng, title, self._map);
            //FIXME autoCollapse option hide self._markerSearch before visualized!!
            if (self.options.autoCollapse)
                self.collapse();

            return self;
        }
    });

    L.Control.Search.Marker = L.Marker.extend({

        includes: L.version[0] === '1' ? L.Evented.prototype : L.Mixin.Events,

        options: {
            icon: new L.Icon.Default(),
            animate: true,
            circle: {
                radius: 10,
                weight: 3,
                color: '#e03',
                stroke: true,
                fill: false
            }
        },

        initialize: function (latlng, options) {
            L.setOptions(this, options);

            if (options.icon === true)
                options.icon = new L.Icon.Default();

            L.Marker.prototype.initialize.call(this, latlng, options);

            if (L.Control.Search.prototype._isObject(this.options.circle))
                this._circleLoc = new L.CircleMarker(latlng, this.options.circle);
        },

        onAdd: function (map) {
            L.Marker.prototype.onAdd.call(this, map);
            if (this._circleLoc) {
                map.addLayer(this._circleLoc);
                if (this.options.animate)
                    this.animate();
            }
        },

        onRemove: function (map) {
            L.Marker.prototype.onRemove.call(this, map);
            if (this._circleLoc)
                map.removeLayer(this._circleLoc);
        },

        setLatLng: function (latlng) {
            L.Marker.prototype.setLatLng.call(this, latlng);
            if (this._circleLoc)
                this._circleLoc.setLatLng(latlng);
            return this;
        },

        _initIcon: function () {
            if (this.options.icon)
                L.Marker.prototype._initIcon.call(this);
        },

        _removeIcon: function () {
            if (this.options.icon)
                L.Marker.prototype._removeIcon.call(this);
        },

        animate: function () {
            //TODO refact animate() more smooth! like this: http://goo.gl/DDlRs
            if (this._circleLoc) {
                var circle = this._circleLoc,
                    tInt = 200, //time interval
                    ss = 5, //frames
                    mr = parseInt(circle._radius / ss),
                    oldrad = this.options.circle.radius,
                    newrad = circle._radius * 2,
                    acc = 0;

                circle._timerAnimLoc = setInterval(function () {
                    acc += 0.5;
                    mr += acc; //adding acceleration
                    newrad -= mr;

                    circle.setRadius(newrad);

                    if (newrad < oldrad) {
                        clearInterval(circle._timerAnimLoc);
                        circle.setRadius(oldrad); //reset radius
                        //if(typeof afterAnimCall == 'function')
                        //afterAnimCall();
                        //TODO use create event 'animateEnd' in L.Control.Search.Marker 
                    }
                }, tInt);
            }

            return this;
        }
    });

    L.Map.addInitHook(function () {
        if (this.options.searchControl) {
            this.searchControl = L.control.search(this.options.searchControl);
            this.addControl(this.searchControl);
        }
    });

    L.control.search = function (options) {
        return new L.Control.Search(options);
    };

    return L.Control.Search;

});





/*
////////////////////////////////////////////////////////////////////////////////
Pick the right icon for each value, set zoom and set set values for chemical
////////////////////////////////////////////////////////////////////////////////
*/
function iconPicker(temperature, zoom, good, moderate, bad, lat, lon) {
    var iconSize = zoom + 10;
    var shadowSize = Math.pow((zoom * 10), zoom / (30 - (zoom - zoom / 10))) + 50;
    if (temperature == "" || temperature == null || temperature < 0) {
        var icon = L.circle([lat, lon],{
                    color: "black",
                    fillColor: "#262626",
                    fillOpacity: 0.5,
                    radius: 50.0
                })
        return icon;
    }
    if (temperature >= 0 && temperature < good) {
        var icon = L.circle([lat, lon],{
                    color: "green",
                    fillColor: "#0aff00",
                    fillOpacity: 0.5,
                    radius: 50.0
                })
        return icon;
    }
    if (temperature >= good && temperature < moderate) {
        var icon = L.circle([lat, lon],{
                    color: "yellow",
                    fillColor: "#e2ff00",
                    fillOpacity: 0.5,
                    radius: 50.0
                })
        return icon;
    }
    if (temperature >= moderate && temperature < bad) {
        var icon = L.circle([lat, lon],{
                    color: "orange",
                    fillColor: "#ff9300",
                    fillOpacity: 0.5,
                    radius: 50.0
                })
        return icon;
    }
    if (temperature >= bad) {
        var icon = L.circle([lat, lon],{
                    color: "red",
                    fillColor: "#f03",
                    fillOpacity: 0.5,
                    radius: 50.0
                })
        return icon;
    }
}
/*
////////////////////////////////////////////////
Pull the last measured data for given sensor
////////////////////////////////////////////////
*/
function lastMomentDataPull(id) {
    //Fill in right API link for last measured data for each sensor
    
        var idInPull = false;
        allData[0].forEach(function (d) {
            if (d.deviceId == id) {
                idInPull = true;
                document.getElementById("lastDate").innerHTML = d.date;
                document.getElementById("lastTime").innerHTML = d.time;
                if (d.so2 != null) {
                    document.getElementById("SO2").innerHTML = d.so2 + " ug/m3";
                }
                if (d.no2 != null) {
                    document.getElementById("NO2").innerHTML = d.no2 + " ug/m3";
                }
                if (d.o3 != null) {
                    document.getElementById("O3").innerHTML = d.o3 + " ug/m3";
                }
                if (d.pm10 != null) {
                    document.getElementById("PM1").innerHTML = d.pm10 + " ug/m3";
                }
            }
        })
        if (!idInPull) {
            document.getElementById("SO2").innerHTML = "NA";
            document.getElementById("NO2").innerHTML = "NA";
            document.getElementById("O3").innerHTML = "NA";
            document.getElementById("PM1").innerHTML = "NA";
            document.getElementById("lastDate").innerHTML = "NA";
            document.getElementById("lastTime").innerHTML = "NA";
        }
    
}

/*
////////////////////////////////////////////////////////////////
Sets the general location of the sensors (usually a city)
////////////////////////////////////////////////////////////////
*/
function getCurrentLocation(latitude, longitude) {
    fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + OWM_API_KEY).then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            cityname = data.name;
            document.getElementById("locationCity").innerHTML = cityname;
        }).catch(function () {
            // catch any errors
        });
}

/*
/////////////////////////////////////////////////
Adjusts icons size when zoomed out or zoomed in
/////////////////////////////////////////////////
*/
function adjustIcon() {
    var currentZoom = map.getZoom();
    //JSON file that contains the sensor names, longitude, latitude and it's device id
        var newLayerGroup = L.layerGroup();
        allData[3].forEach(function (sensord) {
            markersTemp.eachLayer(function (d) {
                if (d._latlng.lat == sensord.lat && d._latlng.lng == sensord.lon) {
                    //Fill in API link that returns last measurament for each sensor
                        
                        allData[0].forEach(function (meting) {
                            var icon = null;
                            if (sensord.Deviceid == meting.deviceId && displaystate == "SO2") {
                                //Values can be adjusted to whatever fits best for you
                                icon = iconPicker(meting.so2, currentZoom, 38, 59, 80, sensord.lat, sensord.lon);
                                newLayerGroup.addLayer(icon);
                            }
                            if (sensord.Deviceid == meting.deviceId && displaystate == "NO2") {
                                //Values can be adjusted to whatever fits best for you
                                icon = iconPicker(meting.no2, currentZoom, 80, 180, 122, sensord.lat, sensord.lon);
                                newLayerGroup.addLayer(icon);
                            }
                            if (sensord.Deviceid == meting.deviceId && displaystate == "O3") {
                                //Values can be adjusted to whatever fits best for you
                                icon = iconPicker(meting.o3, currentZoom, 17, 20, 24, sensord.lat, sensord.lon);
                                newLayerGroup.addLayer(icon);
                            }
                            if (sensord.Deviceid == meting.deviceId && displaystate == "PM10") {
                                //Values can be adjusted to whatever fits best for you
                                icon = iconPicker(meting.pm10, currentZoom, 50, 75, 100, sensord.lat, sensord.lon);
                                newLayerGroup.addLayer(icon);//NOG VERANDEREN
                            }
                        })
                 
                }
            });
        });
    markersTemp = newLayerGroup;
    map.removeLayer(markersTemp);
    /*console.log("ADDED")
    markersTemp.addTo(map);*/
    
}


/*
//////////////////////////////////////////////////////////////////
When clicked on map, set visibility from chartcollection to hidden
//////////////////////////////////////////////////////////////////
*/
function onMapClick(e) {
    document.getElementById("chartCollection").style.visibility = "hidden";
}

/*
///////////////////////////////////////////
When icon is clicked, execute this function
///////////////////////////////////////////
*/
function onCircleClick(obj) {
    //Set current measuraments to "Loading"
    document.getElementById("SO2").innerHTML = "Loading";
    document.getElementById("NO2").innerHTML = "Loading";
    document.getElementById("O3").innerHTML = "Loading";
    document.getElementById("PM1").innerHTML = "Loading";
    document.getElementById("lastDate").innerHTML = "Loading";
    document.getElementById("lastTime").innerHTML = "Loading";
    //Creates empty chart
    createSpecificChart(0);
    //Execute if we are not comparing charts
    if (compare == false) {
        document.getElementById("chartCollection").style.visibility = "visible";
        //Select correct id for clicked icon
        //JSON file that contains the sensor names, longitude, latitude and it's device id
            allData[3].forEach(function (d) {
                if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                    document.getElementById("sensorName").innerHTML = d.naam;
                    id = d.Deviceid;
                }
            })
            //Pull right data for given id and add to chartcollection
            lastMomentDataPull(id);
            chartButtons(id);

        //Refresh last measuraments every 10 seconds
        setInterval(function () {
            lastMomentDataPull(id);
        }, 10 * 1000);
    }
    //Execute if we are comparing charts
    if (compare == true) {
        document.getElementById("comparePart").style.display = "contents";
        comparegraphs += 1;
        //Add clicked sensor to sensorlist and display on compare screen
        //JSON file that contains the sensor names, longitude, latitude and it's device id

            allData[3].forEach(function (d) {
                if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                    document.getElementById("sensorName").innerHTML = d.naam;
                    id = d.Deviceid;
                    idList.push(d.Deviceid);
                    selectedSensors(d.naam);
                }
            })
            //Pull latest data for given id
            lastMomentDataPull(id);

    }
}

/*
///////////////////////////////////////////
Function to create compare graphs
///////////////////////////////////////////
*/
function selectedSensors(naam) {
    //Sets max compareable sensors to 5
    if (ssensor.length >= 5) {
        return window.alert("maximum 5 sensors to be selected");
    }
    selected = false;
    //Checks if clicked sensor is already selected
    ssensor.forEach(function (s) {
        if (" " + naam + " " == s) {
            selected = true;
            return window.alert("sensor already selected");
        }
    })
    //Create graphs for each clicked sensor
    if (selected == false) {
        ssensor.push(" " + naam + " ");
        labelList.push(naam);
        setsensornames();
        chartCompareButtons();
        setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
        setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
        setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
        setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);
    }
}
/*
/////////////////////////////////////////////////
Gives color to each clicked sensor when comparing
/////////////////////////////////////////////////
*/
function setsensornames() {
    var l = ssensor.length;
    var n = 1;
    ssensor.forEach(function (v) {
        var sensor = document.getElementById("selectedsensor" + n);
        sensor.style.display = "block";
        document.getElementById("sesensor" + n).innerHTML = v;
        if (n == 1) {
            sensor.style.backgroundColor = "#ff3434";
        } else if (n == 2) {
            sensor.style.backgroundColor = "#00bc0f";
        } else if (n == 3) {
            sensor.style.backgroundColor = "#34d8ff";
        } else if (n == 4) {
            sensor.style.backgroundColor = "#c834ff";
        } else if (n == 5) {
            sensor.style.backgroundColor = "#0000e3";
        }
        n++;
    })
}
/*
///////////////////////////////////////////////////////////
Removes sensor from compare sensors list (executed in HTML)
///////////////////////////////////////////////////////////
*/
function remove(num) {
    var n = 1;
    document.getElementById("selectedsensor" + ssensor.length).style.display = "none";
    document.getElementById("sesensor" + ssensor.length).innerHTML = "no";
    ssensor.splice(num - 1, 1);
    setsensornames();
    chartSO2List = [];
    chartNO2List = [];
    chartO3List = [];
    chartPM10List = [];
    labelsList = [];
    idList.splice(num - 1, 1);
    console.log(idList)
    chartCompareButtons();
    /*   setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
       setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
       setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
       setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);*/
}
/*
///////////////////////////////////////////////
Set compare screen to visible and create charts
///////////////////////////////////////////////
*/
function comparePage() {
    compare = true;
    document.getElementById("comparePart").style.visibility = "visible";
    document.getElementById("comparePart").style.display = "contents";
    document.getElementById("compare").style.visibility = "hidden";
    document.getElementById("map").style.height = "50%";
    document.getElementById("legendCollection").style.bottom = "52%";
    document.getElementById("chartCollection").style.visibility = "hidden";
    chartCompareButtons();
    setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
    setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
    setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
    setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);
}
/*
/////////////////////////////////////////////////////////////
Add data for specific id from specific link to comparecharts
/////////////////////////////////////////////////////////////
*/
//Uses the API link for respective format given in labelformat 
//(example: link=www.localhost/24hData.com, labelformat=24h)
function addDataId(link, labelFormat) {
    var chartLabelsId = [];
    var chartDataTempId = [];
    var chartDataPressureId = [];
    var chartDataO3Id = [];
    var chartDataPM1Id = [];
        if (idList.length != 0) {
            for (i = 0; i < idList.length; i++) {
                var idFromList = idList[i];
                link.forEach(function (d) {
                    if (d.deviceId == idFromList) {
                        if (labelFormat == "24h") {
                            chartLabelsId.push(d.time);
                        }
                        if (labelFormat == "week") {
                            chartLabelsId.push(d.date);
                        }
                        if (labelFormat == "month") {
                            chartLabelsId.push(d.date);
                        }
                        if (labelFormat == "2Days") {
                            var time = d.time;
                            var date = d.date.substr(5, 10);
                            chartLabelsId.push(date + " " + time);
                        }
                        chartDataTempId.push(d.so2);
                        chartDataPressureId.push(d.no2);
                        chartDataO3Id.push(d.o3);
                        chartDataPM1Id.push(d.pm10);
                    }
                })
                if (labelFormat != "24h") {
                    chartLabelsId.reverse();
                }
                chartSO2List.push(chartDataTempId);
                chartNO2List.push(chartDataPressureId);
                chartO3List.push(chartDataO3Id);
                chartPM10List.push(chartDataPM1Id);
                labelsList = chartLabelsId;
                chartLabelsId = [];
                chartDataTempId = [];
                chartDataPressureId = [];
                chartDataO3Id = [];
                chartDataPM1Id = [];
                setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
                setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
                setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
                setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);
            }
        } else {
            setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
            setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
            setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
            setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);
        }

}
/*
//////////////////////////////////////////
Creates a compare chart with given sensors
//////////////////////////////////////////
*/
function createChartCompare(chartLabels, chartData, chart, labelList, beginAtZero, borderColor) {
    var dangerLine = [];
    var mediumLine = [];
    var goodLine = [];
    for (i = 0; i < chartLabels.length; i++) {
        if (chart == tempChart2) {
            dangerLine.push(100);
            mediumLine.push(59);
            goodLine.push(38);
        }
        if (chart == pressureChart2) {
            dangerLine.push(200);
            mediumLine.push(122);
            goodLine.push(80);
        }
        if (chart == O3Chart2) {
            dangerLine.push(100);
            mediumLine.push(20);
            goodLine.push(17);
        }
        if (chart == PM1Chart2) {
            dangerLine.push(100);
            mediumLine.push(75);
            goodLine.push(50);
        }

    }
    console.log(chartData[0])
    let LineChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                    data: chartData[0],
                    pointRadius: 0,
                    borderColor: borderColor[0],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                    }
                         , {
                    data: chartData[1],
                    pointRadius: 0,
                    borderColor: borderColor[1],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                    },

                {
                    data: chartData[2],
                    pointRadius: 0,
                    borderColor: borderColor[2],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                     }
                         , {
                    data: chartData[3],
                    pointRadius: 0,
                    borderColor: borderColor[3],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                    }
                         , {
                    data: chartData[4],
                    pointRadius: 0,
                    borderColor: borderColor[4],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                    }
                                , {
                    data: goodLine,
                    pointRadius: 0,
                    borderColor: "rgba(38, 255, 0, 0.48)",
                    backgroundColor: "rgba(0, 255, 38, 0.83)"
                    }, {
                    data: mediumLine,
                    pointRadius: 0,
                    borderColor: "rgba(226, 255, 0, 0.71)",
                    backgroundColor: "rgba(206, 255, 0, 0.92)"
                    },
                {
                    data: dangerLine,
                    pointRadius: 0,
                    borderColor: "rgba(195, 0, 0, 0.22)",
                    backgroundColor: "rgba(255, 0, 0, 0.51)"
                    }
                        ]
        },
        options: {
            legend: {
                display: false
            },
            responsive: true,
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: beginAtZero
                        }
                }
                ]
            }
        }
    })
}
/*
////////////////////////////////////////////////////
Fills charts with right data with addDataId function
////////////////////////////////////////////////////
*/
function chartCompareButtons() {
    chartSO2List = [];
    chartNO2List = [];
    chartO3List = [];
    chartPM10List = [];
    labelsList = [];
    if (selectedCompareChart == "24h") {
        //Fill in rith API link to return the last 24h data for all sensors
        addDataId(allData[1], "24h");
    }
    if (selectedCompareChart == "week") {
        //Fill in rith API link to return the last week data for all sensors
        addDataId(allData[0], "week");
    }
    if (selectedCompareChart == "month") {
        //Fill in rith API link to return the last month data for all sensors
        addDataId("http://localhost:8080/Controller?action=returnWeekData", "month");
    }
    if (selectedCompareChart == "2Days") {
        //Fill in rith API link to return the last 2 days data for all sensors
        addDataId(allData[2], "2Days");
    }
}

/*
////////////////////////////////////////////////////
Get data for chartcollection charts
////////////////////////////////////////////////////
*/
function getData(id) {
    chartLabels = [];
    chartDataTemp = [];
    chartDataPressure = [];
    chartDataO3 = [];
    chartDataPM1 = []

        allData[1].forEach(function (d) {
            if (d.deviceId == id) {
                chartLabels.push(d.time);
                chartDataTemp.push(d.so2);
                chartDataPressure.push(d.no2);
                chartDataO3.push(d.o3);
                chartDataPM1.push(d.pm10);
            }
        })

}
/*
////////////////////////////////////////////////////
Get data for chartcollection charts with link
////////////////////////////////////////////////////
*/
function getDataLink(id, link, labelFormat) {
    chartLabels = [];
    chartDataTemp = [];
    chartDataPressure = [];
    chartDataO3 = [];
    chartDataPM1 = []
        link.forEach(function (d) {
            if (d.deviceId == id) {
                if (labelFormat == "24h") {
                    chartLabels.push(d.time);
                }
                if (labelFormat == "week") {
                    chartLabels.push(d.date);
                }
                if (labelFormat == "month") {
                    chartLabels.push(d.date);
                }
                if (labelFormat == "2Days") {
                    var time = d.time;
                    var date = d.date.substr(5, 10);
                    chartLabels.push(date + " " + time);
                }
                chartDataTemp.push(d.so2);
                chartDataPressure.push(d.no2);
                chartDataO3.push(d.o3);
                chartDataPM1.push(d.pm10);
            }
        })
        if (labelFormat != "24h") chartLabels.reverse()
}
/*
//////////////////////////////////////////////////////
Create specific chart given id, link, and labelformat
//////////////////////////////////////////////////////
*/
function createSpecificChartLink(id, link, labelFormat) {
    if (id == 0) {
        chartLabels = [];
        chartDataTemp = [];
        chartDataPressure = [];
        chartDataO3 = [];
        chartDataPM1 = []
    }
    if (id != 0) {
        getDataLink(id, link, labelFormat);
    }
    setTimeout(createChart, 100, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
    setTimeout(createChart, 100, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
    setTimeout(createChart, 100, chartLabels, chartDataO3, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
    setTimeout(createChart, 100, chartLabels, chartDataPM1, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');
}
/*
/////////////////////////////////////
Create specific chart given sensor id
/////////////////////////////////////
*/
function createSpecificChart(id) {
    if (id == 0) {
        chartLabels = [];
        chartDataTemp = [];
        chartDataPressure = [];
        chartDataO3 = [];
        chartDataPM1 = []
    }
    if (id != 0) {
        getData(id);
    }
    setTimeout(createChart, 100, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
    setTimeout(createChart, 100, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
    setTimeout(createChart, 100, chartLabels, chartDataO3, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
    setTimeout(createChart, 100, chartLabels, chartDataPM1, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');
}
/*
//////////////////////////////////////////////////////
Create basic chart given labels, data, canvas and name
//////////////////////////////////////////////////////
*/
function createChart(chartLabels, chartData, chart, label, backgroundcolor, beginAtZero, borderColor) {

    let LineChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: label,
                data: chartData,
                backgroundColor: backgroundcolor,
                pointRadius: 0,
                borderColor: borderColor
        }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: beginAtZero
                        }
                }
                ]
            }
        }
    })

}

/*
//////////////////////////////////////////////////////
Creates right chartCollection chart given id 
//////////////////////////////////////////////////////
*/
function chartButtons(id) {
    localid = id;
    if (selectedChart == "24h") {
        createSpecificChart(id);
    }
    if (selectedChart == "week") {
        createSpecificChartLink(id, allData[0], "week");
    }
    if (selectedChart == "month") {
        createSpecificChartLink(id, "http://localhost:8080/Controller?action=returnWeekData", "month");
    }
    if (selectedChart == "2Days") {
        createSpecificChartLink(id, allData[2], "2Days");
    }

}
    
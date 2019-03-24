<template>

  <!--<div class="container mt-3 mt-sm-5" id="app">-->
  <!--<div class="row">-->
    <!--<div class="col-md-9">-->
      <div class="map" id="map"></div>
    <!--</div>-->
    <!--<div class="col-md-3">-->
      <!--<div-->
        <!--class="form-check"-->
        <!--v-for="layer in layers"-->
        <!--:key="layer.id"-->
      <!--&gt;-->
        <!--<label class="form-check-label">-->
          <!--<input-->
            <!--class="form-check-input"-->
            <!--type="checkbox"-->
            <!--v-model="layer.active"-->
            <!--@change="layerChanged(layer.id, layer.active)"-->
          <!--/>-->
          <!--{{ layer.name }}-->
        <!--</label>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
  <!--</div>-->
</template>


<script>
  import * as L from 'leaflet'

  export default{
    el: '#app',
    data () {
      return {
        map: null,
        tileLayer: null,
        layers: [
          {
            id: 0,
            name: 'Restaurants',
            active: false

          }
        ]
      }
    },
    mounted () {
      this.initMap()
      this.initLayers()
    },
    methods: {
      layerChanged (layerId, active) {
        const layer = this.layers.find(layer => layer.id === layerId)

        layer.features.forEach((feature) => {
          if (active) {
            feature.leafletObject.addTo(this.map)
          } else {
            feature.leafletObject.removeFrom(this.map)
          }
        })
      },
      initLayers () {
        this.layers.forEach((layer) => {
          const markerFeatures = layer.features.filter(feature => feature.type === 'marker')
          const polygonFeatures = layer.features.filter(feature => feature.type === 'polygon')

          markerFeatures.forEach((feature) => {
            feature.leafletObject = L.marker(feature.coords)
              .bindPopup(feature.name)
          })

          polygonFeatures.forEach((feature) => {
            feature.leafletObject = L.polygon(feature.coords)
              .bindPopup(feature.name)
          })
        })
      },
      initMap () {
        this.map = L.map('map').setView([38.63, -90.23], 12)
        this.tileLayer = L.tileLayer(
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          }
        )

        this.tileLayer.addTo(this.map)
      }
    }
  }
</script>

<style>
  .map { height: 400px;
          width: 400px;
  }
</style>

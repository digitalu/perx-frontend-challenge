<template>
  <div>
    <div class="google-map"
      :id="mapName"
      :markers="markers">
    </div>

  </div>


</template>

<script>
  export default {
    name: 'google-map',
    props: ['name', 'markers'],
    data: function() {
      return {
        mapName: this.name + "-map",
        markerCoordinates: [{
          lat: 1.352083,
          lng: 103.819836
        }],
        map: null,
        bounds: null,
      }
    },
    mounted() {
      console.log("markers: ", this.markers)
      window.addEventListener('load', () => {
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)
        const mapCenter = this.markerCoordinates[0]
        const options = {
          zoom: 11,
          center: new google.maps.LatLng(mapCenter.lat, mapCenter.lng)
        }
        this.map = new google.maps.Map(element, options);
      })
    },
    updated() {
      console.log("Updated");
      this.markers.forEach((marker) => {
        const position = new google.maps.LatLng(marker.location.lat, marker.location.lng);
        const pin = new google.maps.Marker({
          position,
          map: this.map,
          animation: google.maps.Animation.DROP
        });
        this.map.fitBounds(this.bounds.extend(position))
      });
    },
  }
</script>

<style scoped>
  .google-map {
    width: 100%;
    height: 480px;
    margin: 0 auto;
    background: gray;
  }
</style>

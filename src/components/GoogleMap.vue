<template>
  <div>
    <div class="google-map"
      :id="mapName"
      :addresses="addresses">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'google-map',
    props: ['name', 'addresses'],
    data: function() {
      return {
        mapName: this.name + "-map",
        map: null,
        categories: [],
        colors: [
          "#d50000",
          "#c51162",
          "#aa00ff",
          "#6200ea",
          "#304ffe",
          "#2962ff",
          "#0091ea",
          "#0091ea",
          "#00bfa5",
          "#00c853",
          "#64dd17",
          "#aeea00",
          "#ffd600",
          "#ffab00",
          "#ff6d00",
          "#dd2c00",
          "#3e2723",
          "#212121",
          "#263238",
          "#37474f"
        ],
        markers: [],
      }
    },
    methods: {
      addMarker(lat, lng, category) {
        const position = new google.maps.LatLng(lat, lng);
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            strokeColor: this.colors[this.categories.indexOf(category)] || "#000000"
          }
        });
        this.markers.push(marker);
      },
      clearMarkers() {
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
        this.markers = [];
      },
    },
    mounted() {
      // Sets the default view of map
      // [TODO]- use correct Event to listen to while binding Google maps
      // This will show an empty map object when you navigate to a different page
      window.addEventListener('load', () => {
        const element = document.getElementById(this.mapName);
        const options = {
          zoom: 11,
          center: new google.maps.LatLng(1.352083, 103.819836)
        }
        this.map = new google.maps.Map(element, options);
      })
    },
    watch: {
      addresses() {
        if (this.markers.length !== 0) {
          this.clearMarkers();
        }
        this.addresses.forEach((address) => {
          if (this.categories.indexOf(address.category) === -1) {
            this.categories.push(address.category);
          }
          this.addMarker(address.location.lat, address.location.lng, address.category);
        })
      }
    }
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

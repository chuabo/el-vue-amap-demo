<template>
  <div id="app">
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'" :center="center" :zoom="zoom" :events="events">
        <el-amap-marker  :position="marker.position" :content="marker.content" :events="marker.events"></el-amap-marker>

        <!-- eslint-disable-next-line -->
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :content="marker.content" :events="marker.events"></el-amap-marker>

        <el-amap-marker-cluster />
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: 'vue amap',
      zoom: 7,
      center: [121.59996, 31.197646],
      markerRefs: [],
      events: {
        init(o) { // eslint-disable-line no-unused-vars
          setTimeout(() => {
            console.log(self.markerRefs);
            let cluster = new AMap.MarkerClusterer(o, self.markerRefs,{ // eslint-disable-line
              gridSize: 80,
              renderCluserMarker: self._renderCluserMarker
            });
            console.log(cluster);
          }, 1000);
        }
      },
      marker: {
        position: [121.59996, 31.197646],
        content: 'aaaa',
        events: self.events
      },
      markers: []
    };
  },
  created() {
    let self = this;
      let markers = [];
      let index = 0;

      let basePosition = [121.59996, 31.197646];

      while (++index <= 30) {
        markers.push({
          position: [basePosition[0] + 0.01 * index, basePosition[1]],
          content: '<div style="text-align:center; background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
          events: {
            init(o) {
              self.markerRefs.push(o);
            }
          }
        });
      }

      this.markers = markers;
  },
  methods: {
    _renderCluserMarker(context) {
      const count = this.markers.length;

      let factor = Math.pow(context.count/count, 1/18)
      let div = document.createElement('div');
      let Hue = 180 - factor* 180;
      let bgColor = 'hsla('+Hue+',100%,50%,0.7)';
      let fontColor = 'hsla('+Hue+',100%,20%,1)';
      let borderColor = 'hsla('+Hue+',100%,40%,1)';
      let shadowColor = 'hsla('+Hue+',100%,50%,1)';
      div.style.backgroundColor = bgColor
      let size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
      div.style.width = div.style.height = size+'px';
      div.style.border = 'solid 1px '+ borderColor;
      div.style.borderRadius = size/2 + 'px';
      div.style.boxShadow = '0 0 1px '+ shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size+'px';
      div.style.color = fontColor;
      div.style.fontSize = '14px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
      context.marker.setContent(div)
    }
  }
};
</script>

<style>
.amap-wrapper {
  width: 1500px;
  height: 600px;
}
</style>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>

import Vue from 'vue'
import App from './App.vue'

/*import AmapVue from '@amap/amap-vue';

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = 'cb47dfa486d9dc0955b0e1624d17df29';
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);*/

import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
	key: 'cb47dfa486d9dc0955b0e1624d17df29',
	plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.MarkerClusterer'],
	v: '1.4.4'
	//v: '2.0'
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

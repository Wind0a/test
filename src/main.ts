import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(ArcoVue);
app.mount('#app')

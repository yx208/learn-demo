// 脚本处理文件
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

// 样式文件
import('normalize.css');
import('highlight.js/styles/github.css');
import './common/styles/base.css';
import './common/styles/common.css';

createApp(App).use(router).mount('#app');

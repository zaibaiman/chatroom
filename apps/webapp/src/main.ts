import { isNil } from 'lodash';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './app/app.vue';
import ChatRoomPage from './app/pages/chat-room.page.vue';
import LoginPage from './app/pages/login.page.vue';
import { AuthService } from './app/services';

const routes = [
  { name: 'login', path: '/login', component: LoginPage },
  { name: 'chat', path: '/', component: ChatRoomPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (isNil(AuthService.instance.username) && to.name !== 'login') {
    return { name: 'login' };
  }
  return true;
});

createApp(App).use(router).mount('#app');

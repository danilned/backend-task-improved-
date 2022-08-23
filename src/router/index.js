import { createRouter, createWebHistory } from 'vue-router';
var routes = [
    {
        path: '/',
        name: 'credentials',
        alias: '/registration',
        component: import('../components/Credentials.vue')
    },
];
var router = createRouter({
    history: createWebHistory(),
    routes: routes
});
export default router;
//# sourceMappingURL=index.js.map
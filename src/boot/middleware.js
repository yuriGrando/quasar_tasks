import { boot, route } from 'quasar/wrappers';

const token = localStorage.getItem('token');
const isAuthenticated= localStorage.getItem('isAuthenticated');
export default boot(({
    router,
}) => {
    router.beforeEach((to, from, next) => {
        if (to.matched.some((record) => record.meta.requireAuth)) {
            if(token && isAuthenticated) {
                next();
            }else {
                next({ name: 'login' });
            }
        } else {
            next();
        }
    });
});

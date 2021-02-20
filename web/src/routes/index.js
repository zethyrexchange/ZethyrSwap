/*
* create by Falcon
*/
import Vue from 'vue'
import Router from 'vue-router'

import HomeContainer from '../containers/Home';
import DexAggregatorContainer from '../containers/DexAggregator'

Vue.use(Router)

// const StableRoute    = { path: '/stable', name: 'stable', component: HomeContainer, meta: { title: 'Swap USDT between TRON and ETHEREUM | Zethyr Swap' } };
const HomeRoute  = { path: '/', name: 'home', component: DexAggregatorContainer, meta: { title: 'Dex Aggregator | Zethyr Swap' } };


const routes = [
  // StableRoute,
  HomeRoute
];
const router = new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;

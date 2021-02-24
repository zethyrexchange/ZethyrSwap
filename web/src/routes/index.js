/*
* create by Falcon
*/
import Vue from 'vue'
import Router from 'vue-router'

import DexAggregatorContainer from '../containers/DexAggregator'

Vue.use(Router)

const HomeRoute  = { path: '/', name: 'home', component: DexAggregatorContainer, meta: { title: 'Dex Aggregator | Zethyr Swap' } };
const SwapRoute  = { path: '/:fromToken/:toToken', name: 'swapDetail', component: DexAggregatorContainer, meta: { title: 'Dex Aggregator | Zethyr Swap' } };

const routes = [
  // StableRoute,
  HomeRoute,
  SwapRoute
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

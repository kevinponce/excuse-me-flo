import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import FlowCharts from '@/components/FlowCharts'
import FlowChart from '../components/FlowChart'
import { requireAuth, requireNoAuth } from '../api/AuthApi'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/signup', component: Signup, name: 'Signup', beforeEnter: requireNoAuth },
    { path: '/signin', component: Signin, name: 'Signin', beforeEnter: requireNoAuth },
    { path: '/flowcharts', component: FlowCharts, name: 'FlowCharts', beforeEnter: requireAuth },
    { path: '/flowcharts/new', component: FlowChart, name: 'FlowChartNew', beforeEnter: requireAuth },
    { path: '/flowcharts/:id', component: FlowChart, name: 'FlowChartEdit', beforeEnter: requireAuth },
    { path: '', name: 'Home', component: Home }
  ]
})

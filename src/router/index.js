import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Profile from '../components/User/Profile'
import Signin from '../components/User/Signin'
import Signup from '../components/User/Signup'
import Meetups from '../components/Meetup/Meetups'
import Meetup from '../components/Meetup/Meetup'
import CreateMeetup from '../components/Meetup/CreateMeetup'
import AuthGuard from './auth-guard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetup/detail/:id',
    name: 'MeetupDetails',
    component: Meetup,
    beforeEnter: AuthGuard,
    props: true
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

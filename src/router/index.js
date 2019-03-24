import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Configuration from '@/components/Configuration'
import Auth from '@okta/okta-vue'
import CarteRuches from '../components/CarteRuches'
import VisitesRuches from '../components/VisitesRuches'

Vue.use(Auth, {
  issuer: 'https://dev-460170.okta.com/oauth2/default',
  client_id: '0oacjg2t3NmT8M91w356',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Hello
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/configuration',
      name: 'Configuration',
      component: Configuration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/carteRuches',
      name: 'carteRuches',
      component: CarteRuches,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/visiteRuches',
      name: 'VisitesRuches',
      component: VisitesRuches,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router

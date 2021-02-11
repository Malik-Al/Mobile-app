import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Notify, Loading } from 'quasar'

Vue.use(Quasar, {
  plugins: {
    Loading,
    Notify
  },
  config: {
    loading: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ },
    notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
  }
})

// main.js e dahil edilen eklentiler
import vuetify from './vuetify'
import router from '@/router'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
}

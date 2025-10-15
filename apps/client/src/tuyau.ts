/// <reference path="../../server/adonisrc.ts" />

import { createTuyau } from '@tuyau/client'
import { api } from '@my-app/server/api'

export const tuyau = createTuyau({
  api,
  baseUrl: 'https://animals-api-ymzhkn-5477be-188-245-240-223.traefik.me',
})

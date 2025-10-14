/// <reference path="../../server/adonisrc.ts" />

import { createTuyau } from '@tuyau/client'
import { api } from '@my-app/server/schema'

export const tuyau = createTuyau({
  api,
  baseUrl: 'http://localhost:3333',
})

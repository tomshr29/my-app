/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import { middleware } from '#start/kernel'

const HomeController = () => import('#controllers/home_controller')
const PropertyController = () => import('#controllers/properties_controller')
const AuthController = () => import('#controllers/auth_controller')
const ProfilesController = () => import('#controllers/profiles_controller')

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger")
  // return AutoSwagger.default.rapidoc("/swagger", "view")
})

router.get('/', [HomeController, 'index'])

router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me').use(middleware.auth())

router
  .group(() => {
    router.get('/mine', [PropertyController, 'mine']).use(middleware.auth())
    router.get('/', [PropertyController, 'list'])
    router.get('/:id', [PropertyController, 'show'])
    router.post('/', [PropertyController, 'create']).use(middleware.auth())
    router.put('/:id', [PropertyController, 'update'])
    router.delete('/:id', [PropertyController, 'delete'])
  })
  .prefix('/properties')

router.get('/profile/edit', [ProfilesController, 'edit']).use(middleware.auth())
router.put('/profiles', [ProfilesController, 'update']).use(middleware.auth())

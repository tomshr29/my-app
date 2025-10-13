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
const AnimalsController = () => import('#controllers/animals_controller')
const AuthController = () => import('#controllers/auth_controller')

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
    router.get('/', [AnimalsController, 'list'])
    router.get('/:id', [AnimalsController, 'show'])
    router.post('/', [AnimalsController, 'create'])
    router.put('/:id', [AnimalsController, 'update'])
    router.delete('/:id', [AnimalsController, 'delete'])
  })
  .prefix('/animals')

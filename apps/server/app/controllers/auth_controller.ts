import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * @register
   * @requestBody <RegisterValidator>
   * @responseBody 201 - { "token": "string", "type": "Bearer", "expires_at": "2024-01-01T00:00.000Z" }
   * @responseBody 422 - { "errors": [{ "message": "The email field must be a valid email address.", "rule": "email", "field": "email" }] }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    return User.accessTokens.create(user, ['*'], {
      expiresIn: '60s',
    })
  }

  /**
   * @login
   * @requestBody <LoginValidator>
   * @responseBody 200 - { "token": "string", "type": "Bearer", "expires_at": "2024-01-01T00:00.000Z" }
   * @responseBody 422 - { "errors": [{ "message": "The email field must be a valid email address.", "rule": "email", "field": "email" }] }
   * @responseBody 400 - { "message": "Invalid credentials" }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user, ['*'], {
      expiresIn: '60s',
    })
  }

  /**
   * @logout
   * @responseBody 200 - { "message": "success" }
   * @responseBody 401 - { "message": "E_UNAUTHORIZED: Unauthorized access" }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  }

  /**
   * @me
   * @responseBody 200 - { "user": <User> }
   * @responseBody 401 - { "message": "E_UNAUTHORIZED: Unauthorized access" }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  async me({ auth }: HttpContext) {
    await auth.check()
    return { user: auth.user }
  }
}

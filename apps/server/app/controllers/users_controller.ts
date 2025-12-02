import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async update({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const { fullName } = await request.input('fullName')

    user.fullName = fullName
    await user.save()

    return response.ok({
      message: 'Nom complet mis à jour avec succès',
      user,
    })
  }
}

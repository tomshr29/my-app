import ProfileService from '#services/profile_service'
import { profileUpdateValidator } from '#validators/profile'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProfilesController {
  constructor(protected profileService: ProfileService) {}

  async edit({}: HttpContext) {
    const profile = await this.profileService.find()
    return profile
  }

  async update({ request }: HttpContext) {
    const { fullName } = await request.validateUsing(profileUpdateValidator)
    const profile = await this.profileService.find()

    await profile.merge({ fullName }).save()
    return profile
  }
}

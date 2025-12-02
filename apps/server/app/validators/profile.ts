import vine from '@vinejs/vine'

export const profileUpdateValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(100).optional(),
  })
)

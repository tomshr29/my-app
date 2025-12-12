import Message from '#models/message'
import type { HttpContext } from '@adonisjs/core/http'

export default class MessagesController {
  public async index({ auth }: HttpContext) {
    const me = auth.user!.id

    const messages = await Message.query()
      .orderBy('created_at', 'desc')
      .where('sender_id', me)
      .orWhere('receiver_id', me)

    return messages
  }

  public async show({ auth, params }: HttpContext) {
    const me = auth.user!.id
    const otherId = Number(params.userId)

    const messages = await Message.query()
      .where((query) => {
        query.where('sender_id', me).andWhere('receiver_id', otherId)
      })
      .orWhere((query) => {
        query.where('sender_id', otherId).andWhere('receiver_id', me)
      })
      .orderBy('created_at', 'asc')

    return messages
  }

  public async store({ auth, request }: HttpContext) {
    const senderId = auth.user!.id
    const { content, receiverId } = request.only(['content', 'receiverId'])

    const message = await Message.create({
      content,
      senderId,
      receiverId,
    })

    return message
  }
}

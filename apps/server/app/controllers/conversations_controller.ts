import Conversation from '#models/conversation'
import type { HttpContext } from '@adonisjs/core/http'

export default class ConversationsController {
  public async index({ auth }: HttpContext) {
    const user = auth.user!

    const conversations = await Conversation.query()
      .where('buyer_id', user.id)
      .orWhere('owner_id', user.id)
      .preload('owner')
      .preload('messages', (query) => {
        query.orderBy('created_at', 'desc').limit(1)
      })
      .orderBy('updated_at', 'desc')

    return conversations
  }

  public async show({ auth, params }: HttpContext) {
    const user = auth.user!
    const conversationId = params.id

    const conversation = await Conversation.query()
      .where('id', conversationId)
      .preload('owner')
      .preload('buyer')
      .preload('property')
      .firstOrFail()

    let otherUserEmail = ''
    if (conversation.ownerId === user.id) {
      otherUserEmail = conversation.buyer.email
    } else if (conversation.buyerId === user.id) {
      otherUserEmail = conversation.owner.email
    }

    return {
      ...conversation.serialize(),
      otherUserEmail,
    }
  }
}

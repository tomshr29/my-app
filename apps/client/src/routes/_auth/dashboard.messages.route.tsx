import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_auth/dashboard/messages')({
  component: RouteComponent,
})

function RouteComponent() {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    fetch('http://localhost:3333/conversations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConversations(data)
      })
  }, [])

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="h-full border-r border-stone-800 min-w-64 p-4">
        <Link to="/dashboard/messages">
          <h2 className="text-lg mb-4">Messages</h2>
        </Link>

        {conversations.map((conv: any) => {
          const lastMessage = conv.messages?.[0]

          return (
            <Link
              key={conv.id}
              to="/dashboard/messages/$conversationId"
              params={{ conversationId: conv.id }}
              className="block py-2 border-b border-stone-700 cursor-pointer hover:bg-stone-700"
            >
              <div>{conv.owner.email}</div>
              <div className="text-xs text-stone-500 italic">
                {lastMessage ? `${lastMessage.content}` : 'No messages yet'}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Content */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

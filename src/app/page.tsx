'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const Home = () => {
  const socket = io('http://localhost:8080')

  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState<string>('')

  const handleSendMessage = () => {
    socket.emit('message', newMessage)
    setNewMessage('')
  }

  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages([...messages, message])
    })
  })

  return (
    <main className='flex flex-col items-center justify-center h-screen p-10'>
      <div className='flex flex-col items-center justify-center gap-4 h-full w-full'>
        <ul className='flex flex-col gap-2 border rounded-md h-full w-full px-4 py-2'>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>

        <div className='flex gap-2 w-full'>
          <input
            type='text'
            value={newMessage}
            placeholder='Message'
            className='w-full border border-gray-300 rounded-md p-2'
            onChange={e => setNewMessage(e.target.value)}
          />

          <button
            onClick={handleSendMessage}
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
          >
            Send
          </button>
        </div>
      </div>
    </main>
  )
}

export default Home

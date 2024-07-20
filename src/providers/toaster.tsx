'use client'

import { Toaster as ToasterProvider } from 'react-hot-toast'

export const Toaster = () => {
  return (
    <ToasterProvider
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  )
}

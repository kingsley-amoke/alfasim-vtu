import React from 'react'
import AdminPage from '@/app/components/AdminPage'
import { fetchUser, getLoggedUser } from '@/lib/data'


const page = async() => {
  return (
    <div>
        
        <AdminPage />
    </div>
  )
}

export default page
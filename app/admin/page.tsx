import React from 'react'
import AdminPage from '@/app/components/AdminPage'
import { fetchUser, getLoggedUser } from '@/lib/data'
import { Suspense } from 'react'

const page = async() => {
  return (
    <div>
<Suspense>
        
        <AdminPage />
</Suspense>
    </div>
  )
}

export default page
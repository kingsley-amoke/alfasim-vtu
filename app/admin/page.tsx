import React from 'react'
import AdminPage from '@/app/components/AdminPage'
import { Suspense } from 'react'
import { fetchRefs } from '@/lib/data'

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
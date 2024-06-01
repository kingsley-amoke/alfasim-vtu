'use client'

import { getLoggedUser } from '@/lib/data';
import { userDataTypes } from '@/lib/types';
import React, { useEffect, useState } from 'react'

const AdminPage = () => {

    const [user, setUser] = useState<userDataTypes>();

    const fetchLoggedUser = async () => {
        const data = await getLoggedUser();
    
        data && setUser(data);
        };
        
         useEffect(() => {
         fetchLoggedUser();
        
       }, []);
  return (
    <div>
        {user?.balance}
    </div>
  )
}

export default AdminPage
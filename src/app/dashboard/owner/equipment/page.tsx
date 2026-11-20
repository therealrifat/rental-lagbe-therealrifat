import { getMyEquipments } from '@/lib/api/users';
import { getUserSessionServer } from '@/lib/core/session-server';
import React from 'react';

const MyEquipments = async() => {
    const userInfo = await getUserSessionServer()
    const result = await getMyEquipments(userInfo?.user.id as string)
    console.log(result)
    return (
        <div>
            <h1>My Equipments </h1>


            
        </div>
    );
};

export default MyEquipments;
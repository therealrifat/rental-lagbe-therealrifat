import { getEquipment } from '@/lib/api/users';
import React from 'react';

const EquipmentDetailsPage = async({params}: {
  params: Promise<{ Id: string }>;
}) => {
    const {Id} = await params


    const result = await getEquipment(Id)

    console.log(result)

    return (
        <div>
            <h1>Details Page {Id}</h1>
        </div>
    );
};

export default EquipmentDetailsPage;
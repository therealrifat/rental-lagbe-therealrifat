import { requireRole } from '@/lib/core/session-server';
import React from 'react';

const RecruiterLayout = async ({children}:{children:React.ReactNode}) => {
    await requireRole("owner")
    return children
};

export default RecruiterLayout;
"use client"
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import React from 'react';

const LogOut = () => {
    const handleLogout =()=>{
        

    }
    return (
       <div >
         <Button onClick={handleLogout} className={"bg-orange-400"} >
            Logout
            <LogOutIcon/>


        </Button> 
       </div>
    );
};

export default LogOut;
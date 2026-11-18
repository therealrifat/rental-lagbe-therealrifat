"use client"
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogOut = () => {
    const router = useRouter()
    const handleLogout =async()=>{
        console.log("logout")
       await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login"); // redirect to login page
    },
  },
});

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
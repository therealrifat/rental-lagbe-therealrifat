import { authClient } from "../auth-client"


export const getUseSessionClient =()=>{
     const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 
    return session
}
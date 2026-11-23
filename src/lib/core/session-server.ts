import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSessionServer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),

  });
  return session
};


export const requireRole = async (role: string)=>{
  const session =await getUserSessionServer()

  if(!session || session.user.role !== role){
    redirect("/unathorized")
  }
  return session

}
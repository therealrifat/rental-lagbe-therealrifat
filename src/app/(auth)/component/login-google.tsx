import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const LoginWithGoogle = (mode:{mode:string}) => {
  const handleGoogleLogin = async() => {
    const data = await authClient.signIn.social({
      provider: "google",
    })
    
    console.log(data)

  };

  return (
    <div>
      <Button className="w-full cursor-pointer" variant="outline" onClick={handleGoogleLogin}>
        <FcGoogle /> {mode.mode} with Google
      </Button>
    </div>
  );
};

export default LoginWithGoogle;

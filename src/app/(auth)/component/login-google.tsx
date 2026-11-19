import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const LoginWithGoogle = () => {
  const handleGoogleLogin = async() => {
    const data = await authClient.signIn.social({
      provider: "google",
    })
    
    console.log(data)

  };

  return (
    <div>
      <Button variant="outline" onClick={handleGoogleLogin}>
        Register with Google
      </Button>
    </div>
  );
};

export default LoginWithGoogle;

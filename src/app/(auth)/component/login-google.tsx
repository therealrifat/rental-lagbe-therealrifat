import { Button } from "@/components/ui/button";

const LoginWithGoogle = () => {
  const handleGoogleLogin = () => {
    console.log('Google login')
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

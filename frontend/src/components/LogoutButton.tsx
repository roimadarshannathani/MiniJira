import { useLogout } from "@/api/generated";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = useLogout({
    mutation: {
      onSuccess: () => {
        toast.success("Logged out");
        navigate("/login");
      },
      onError: () => {
        toast.error("Logout failed");
      },
    },
    axios: { withCredentials: true },
  });

  return (
    <Button className="bg-red-500" onClick={() => mutate()}>
      Logout
    </Button>
  );
};

export default LogoutButton;
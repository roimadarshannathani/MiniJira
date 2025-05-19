import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use location.state?.from to go back to the previous page if available
  const handleBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(-1); // fallback to browser back
    }
  };

  return (
    <footer className="flex items-center justify-center py-4 bg-neutral-900 text-white mt-8">
      <Button onClick={handleBack} variant="secondary">Back</Button>
    </footer>
  );
};

export default Footer;

import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUsername } from "@/api/generated";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/login":
      return "Login";
    case "/itemlist":
      return "Item List";
    default:
      return "MiniJira";
  }
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const username = getUsername();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["/auth/get-user"],
    queryFn: () => getUsername(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

     const user: string = data?.data?.data || "Guest";

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-neutral-900 text-white shadow">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold">{pageTitle}</span>
        <Button variant="secondary" size="sm">Demo Button</Button>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">User: <b>{user}</b></span>
        <ModeToggle />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;

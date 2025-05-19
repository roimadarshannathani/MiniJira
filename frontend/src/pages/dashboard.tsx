import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/pages/shared/navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
    axios.get("/item/get-all-items", { withCredentials: true })
      .then(res => {
        // Authenticated, do nothing
      })
      .catch(err => {
        // Not authenticated, redirect to login
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <Card className="cursor-pointer hover:shadow-lg transition border-1 bg-amber-400/30" onClick={() => navigate("/itemlist", { state: { from: "/" } })}>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage your inventory items.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
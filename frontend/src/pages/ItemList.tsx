import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AddItemForm from "@/components/AddItemForm";
import { getAll } from "@/api/generated";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/pages/shared/navbar";
import Footer from "@/components/Footer";

const ItemList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/item/get-all-items"],
    queryFn: () => getAll({ withCredentials: true }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (isError && error && error instanceof Object && 'status' in error) {
      if ((error.status === 401 || error.status === 403)) {
        navigate("/login");
      }
    } else if (isError && error && error instanceof Error && 'response' in error && error.response && (error.response.status === 401 || error.response.status === 403)) {
      navigate("/login");
    }
  }, [isError, error, navigate]);

  const [open, setOpen] = useState(false);

  if (isLoading) return <div>Loading items...</div>;
  if (isError) return <div>Error fetching items</div>;

  interface Item {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
  }

  const items: Item[] = data?.data?.data || [];
  const categorisedItems = {
    todo: items.filter((item) => item.status === "TODO"),
    inProgress: items.filter((item) => item.status === "IN_PROGRESS"),
    done: items.filter((item) => item.status === "DONE"),
  };

  return (
    <>
      <Navbar />
      <div>
        <LogoutButton/>
        <ModeToggle/>
        <h1>All Items</h1>
        
        <Button
          className="mb-4 text-gray-50 bg-lime-400 hover:bg-lime-500"
          onClick={() => setOpen(true)}
        >
          Add Item
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right">
            <AddItemForm onSuccess={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex gap-4">
          <div className="flex-1 min-w-[300px]">
            <h2 className="font-bold mb-2">TODO</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categorisedItems.todo.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex-1 min-w-[300px]">
            <h2 className="font-bold mb-2">IN PROGRESS</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categorisedItems.inProgress.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex-1 min-w-[300px]">
            <h2 className="font-bold mb-2">DONE</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categorisedItems.done.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemList;
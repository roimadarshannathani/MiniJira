import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addItem } from "@/api/generated";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";

interface AddItemFormProps {
  onSuccess?: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "TODO",
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (params: typeof formData) => addItem(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/item/get-all-items"] });
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        status: "TODO",
      });
      onSuccess && onSuccess();
    },
    onError: (error) => {
      console.error("Failed to add item:", error);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Tabs will control the status
  const handleTabChange = (value: string) => {
    setFormData({
      ...formData,
      status: value,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        dueDate: date.toISOString().split("T")[0], // format as YYYY-MM-DD
      });
      setCalendarOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Item added successfully!");
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <Input
        className="bg-neutral-900/80 border-0 mb-2"
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Input
        className="bg-neutral-900/80 border-0 mb-2"
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <div className="mb-2">
        <Button
          type="button"
          className="w-full bg-neutral-900/80 border-0 mb-2"
          onClick={() => setCalendarOpen((open) => !open)}
        >
          {formData.dueDate ? formData.dueDate : "Select Date"}
        </Button>
        {calendarOpen && (
          <div className="z-50 bg-background rounded-md shadow-md p-2 mt-2">
            <Calendar
              mode="single"
              selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
              onSelect={handleDateSelect}
              initialFocus
            />
          </div>
        )}
      </div>

      <Tabs value={formData.status} onValueChange={handleTabChange} className="mb-4">
        <TabsList>
          <TabsTrigger value="TODO">TODO</TabsTrigger>
          <TabsTrigger value="IN_PROGRESS">IN PROGRESS</TabsTrigger>
          <TabsTrigger value="DONE">DONE</TabsTrigger>
        </TabsList>
      </Tabs>
      <Button className="bg-lime-400" variant="secondary" disabled={isPending} type="submit">
        {isPending ? "Adding" : "Add Item"}
      </Button>
    </form>
  );
};

export default AddItemForm;
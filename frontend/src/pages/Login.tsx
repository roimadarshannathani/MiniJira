import React, { useState } from "react";
import { useLogin } from "@/api/generated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin({
    mutation: {
      onSuccess: (res) => {
        navigate("/");
        toast.success("Login successful!");
      },
      onError: () => {
        toast.error("Invalid credentials");
      },
    },
    axios: { withCredentials: true },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ data: form });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-32 p-6 bg-neutral-900 rounded shadow">
      <h2 className="text-xl mb-4 text-center">Login</h2>
      <Input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        className="mb-2"
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="mb-4"
      />
      <Button className="w-full bg-lime-400" type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default Login;
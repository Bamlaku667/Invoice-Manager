"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "@/redux/api/apiSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginUser, { isSuccess, isError, isLoading }] = useLoginUserMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password }).unwrap();
      toast.success("Login successful!");
      router.push("/"); // Redirect to home or any other page
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const loginAsGuestUser = async () => {
    try {
      await loginUser({
        email: "guest@example.com",
        password: "guest123",
      }).unwrap();
      toast.success("Logged in as guest!");
      router.push("/"); // Redirect to home or any other page
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <section id="login" className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text capitalize">Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary "
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span>
                Loging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary "
            onClick={loginAsGuestUser}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span>
                Loging in...
              </>
            ) : (
              "Guest User"
            )}
          </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            href="/register"
            className="ml-2 link link-hover link-green-1 capitalize"
          >
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;

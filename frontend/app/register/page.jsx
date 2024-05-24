"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import {  useRegisterUserMutation } from "@/redux/api/apiSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [registerUser, {isSuccess, isLoading, isError}] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, username }).unwrap();
      toast.success("register successful!");
      router.push("/login"); // Redirect to home or any other page
    } catch (err) {
      console.log(err)
      console.log(isError)
      toast.error(err?.data?.msg || "registration failed. Might be server error");
    }
  };

  return (
    <section id="login" className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <div className="form-control">
          <label htmlFor="username" className="label">
            <span className="label-text capitalize">Username</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>

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
                  Registering...
                </>
              ) : (
                 "Create"
              )}
            </button>
        </div>
        
        <p className="text-center">
          Already a member?{" "}
          <Link
            href="/login"
            className="ml-2 link link-hover link-green-1 capitalize"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;

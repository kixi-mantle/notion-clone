"use client"


import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserSchema } from "../../../schemaType";
import { login } from "../../../server-action";
import { useRouter } from "next/navigation";



export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserSchema>>();
  const router = useRouter();

  const onSubmit = async(data: z.infer<typeof UserSchema> ) => {
    const res = await login(data);
    if(res){
      router.push('/');
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">

    <div className="max-w-[500px] w-full mx-auto  p-4 border rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold text-center">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="name"
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "email is requred"
              
            })}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
    </div>
  );
}

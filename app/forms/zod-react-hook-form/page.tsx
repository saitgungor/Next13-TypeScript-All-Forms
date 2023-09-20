"use client";

import { Button } from "@/components/ui/button";

import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = Record<string, string>;

const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your username
        </label>
        <input
          type="text"
          id="username"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Your name"
          {...register("username")}
        />
      </div>
      <Button type="submit">Create Account</Button>
    </form>
  );
};

export default Page;

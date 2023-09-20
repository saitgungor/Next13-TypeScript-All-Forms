"use client";

import { NextPage } from "next";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

type FormSchemaType = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(1, "Password is required").min(6, "Password must have more than 6 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (formData) => console.log(formData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <label htmlFor="username" className="text-sm font-medium text-gray-900">
          Your username
        </label>
        <input
          type="text"
          id="username"
          className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Your name"
          {...register("username")}
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-900">
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="name@company.com"
          {...register("email")}
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("password")}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900">
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("confirmPassword")}
        />
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            {...register("terms")}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
            I accept the{" "}
            <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>
      <Button type="submit" className="!mt-4 w-full">
        Create Account
      </Button>
    </form>
  );
};

export default Page;

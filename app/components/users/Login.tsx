"use client";

import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInData } from "@/app/types/auth";
import { LoginSchema } from "@/app/schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorFeedback from "../ErrorFeedback";
import { signIn } from "next-auth/react";
import { fail_notify } from "@/app/utils/constants";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });
    if (result?.error) {
      fail_notify(result?.error);
      setIsLoading(false);
    } else {
      router.push("/redirect");
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="hidden lg:block w-1/2 bg-green-300"></div>

      <div className="w-full lg:w-1/2 bg-gray-500">
        <div className="flex flex-col items-center justify-center mt-10 mx-auto">
          <p className="font-bold text-4xl tracking-[1px] text-white">
            Login Form
          </p>
          <small className="font-bold text-2xl tracking-[1px] text-white mt-5">
            Fill the form below to login
          </small>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center justify-center mt-3 space-y-4">
              <div className="flex flex-col items-start w-full">
                <label className="w-full font-bold text-[16px] leading-4 text-white mb-2">
                  Username/Email Address/Phone Number:
                </label>
                <Input
                {...register("username")}
                  type="text"
                  placeholder="Enter your username or email address or phone number"
                  className="w-full pl-5 lg:pr-28 pr-10 py-3 font-normal rounded-lg"
                  required
                  invalid={!!errors.username}
                />
                <ErrorFeedback invalid={!!errors.username}>
                  {errors.username?.message}
                </ErrorFeedback>
              </div>

              <div className="flex flex-col items-start w-full relative">
                <label className="w-full font-bold text-[16px] leading-4 text-white mb-2">
                  Password:
                </label>
                <Input
                {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-5 lg:pr-28 pr-10 py-3 font-normal rounded-lg"
                  minLength={6}
                  required
                  invalid={!!errors.password}
                />
                <ErrorFeedback invalid={!!errors.password}>
                  {errors.password?.message}
                </ErrorFeedback>
                <button
                  type="button"
                  className="absolute right-3 top-12 transform -translate-y-1/2"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex flex-col mt-4 space-y-3">
              <Button
                className="bg-green-500 border border-gray-400 px-4 py-3 rounded-lg font-bold text-[16px] hover:bg-green-700 hover:font-extrabold"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Log in
              </Button>
              <div className="flex items-center space-x-4">
                <p className="font-bold text-white">
                  Don&apos;t have an account?
                </p>
                <Link
                  href={"/auth/signup"}
                  className="font-bold text-blue-800 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

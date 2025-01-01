"use client";

import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupData } from "@/app/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "@/app/schemas/authSchema";
import ErrorFeedback from "../ErrorFeedback";
import { fail_notify, success_notify } from "@/app/utils/constants";
import { useSignUp } from "@/app/hooks/auth";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [confirmPwd, setConfirmPwd] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true)

  const router = useRouter ()

  const toggleShowPassword = (option: string) => {
    if (option === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateEmail = (email: string) => { 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email); 
  };

  const mutation = useSignUp();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    const pwd = getValues().password;
    if (confirmPwd !== pwd) {
      fail_notify("Passwords do not match")
      return;
    }

    if (!validateEmail(data.email)) {
      setIsValidEmail(false)
      fail_notify("Invalid email address")
      return;
    }
    setIsLoading(true)
    mutation.mutate(data, {
      onSuccess: (response) => {
        if (response.status === "success") {
          reset()
          success_notify(response.message)
          router.push('/auth/login')
        }
        setIsLoading(false)
      },
      onError: (error) => {
        console.log({error});
        setIsLoading(false)
      }
    });
  }
  return (
    <div className="w-full h-screen flex">
      <div className="hidden lg:block w-1/2 bg-green-300"></div>

      <div className="w-full lg:w-1/2 bg-gray-500">
        <div className="flex flex-col items-center justify-center mt-10 mx-auto">
          <p className="font-bold text-4xl tracking-[1px] text-white">
            Sign up Form
          </p>
          <small className="font-bold text-2xl tracking-[1px] text-white mt-5">
            Fill the form below to start
          </small>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center justify-center mt-3 space-y-4">
              <div className="flex flex-col items-start w-full">
                <label className="w-full font-bold text-[16px] leading-4 text-white mb-2">
                  Username:
                </label>
                <Input
                  {...register("username")}
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-5 lg:pr-28 pr-10 py-3 font-normal rounded-lg"
                  required
                  invalid={!!errors.username}
                />
                <ErrorFeedback invalid={!!errors.username}>
                  {errors.username?.message}
                </ErrorFeedback>
              </div>

              <div className="flex flex-col items-start w-full">
                <label className="w-full font-bold text-[16px] leading-4 text-white mb-2">
                  Email:
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-5 lg:pr-28 pr-10 py-3 font-normal rounded-lg"
                  required
                  invalid={!!errors.email}
                />
                {!isValidEmail && <p className="text-red-500 text-sm font-bold">Please enter a valid email address.</p>}
                <ErrorFeedback invalid={!!errors.email}>
                  {errors.email?.message}
                </ErrorFeedback>
              </div>

              <div className="flex flex-col items-start w-full">
                <label className="w-full font-bold text-[16px] leading-4 text-white mb-2">
                  Phone Number:
                </label>
                <Input
                {...register("phoneNumber")}
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full pl-5 lg:pr-28 pr-10 py-3 font-normal rounded-lg"
                  required
                  invalid={!!errors.phoneNumber}
                />
                
                <ErrorFeedback invalid={!!errors.phoneNumber}>
                  {errors.phoneNumber?.message}
                </ErrorFeedback>
              </div>

              <div className="flex flex-col items-start w-full relative">
                <label className="w-full font-bold text-[16px] leading-4 text-white mb-2">
                  Password:
                </label>
                <Input
                {...register('password')}
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
                  onClick={() => toggleShowPassword("password")}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex flex-col items-start w-full relative">
                <label className="w-full font-bold text-[16px] leading-4 text-white mb-2">
                  Confirm Password:
                </label>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full pl-5 lg:pr-28 pr-10 py-3 font-normal rounded-lg"
                  minLength={6}
                  required
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-12 transform -translate-y-1/2"
                  onClick={() => toggleShowPassword("confirmPassword")}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                Register
              </Button>
              <div className="flex items-center space-x-4">
                <p className="font-bold text-white">Already have an account?</p>
                <Link
                  href={"/auth/login"}
                  className="font-bold text-blue-800 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

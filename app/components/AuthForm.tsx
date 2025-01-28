"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type FormType = {
  type: "sign-in" | "sign-up";
};

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email({ message: '이메일 형식으로 입력해주세요.'}),
    fullName:
      formType.type === "sign-up"
        ? z
            .string()
            .min(2, {
              message: "최소 2글자 이상 입력해 주세요.",
            })
            .max(50, {
              message: "최대 50글자까지 입력할 수 있어요.",
            })
        : z.string().optional(),
  });
};

export default function AuthForm({ type }: FormType) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema({ type });

  // 1. form 정의.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  // 2. submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 auth-form"
        >
          <h1 className="form-title">
            {type === "sign-in" ? "로그인" : "회원가입"}
          </h1>
          {type === "sign-up" && (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">이름</FormLabel>
                        <FormControl>
                          <Input
                            className="shad-input"
                            placeholder="이름을 입력해 주세요"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message " />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          이메일
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="shad-input"
                            placeholder="이메일을 입력해 주세요"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message " />
                    </FormItem>
                  );
                }}
              />
            </>
          )}
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-up" ? "회원가입" : "로그인"}
            {isLoading && (
              <Image
                src={"/assets/icons/loader.svg"}
                width={24}
                height={24}
                className="ml-2 animate-spin"
                alt="loading"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">* {errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "계정이 없으신가요?"
                : "이미 계정을 가지고 계신가요?"}
            </p>
            <Link
              className="ml-1 font-medium text-brand"
              href={type === "sign-in" ? "sign-up" : "sign-in"}
            >
              {type === "sign-in" ? "회원가입" : "로그인 "}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}

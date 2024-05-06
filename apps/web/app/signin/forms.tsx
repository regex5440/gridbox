"use client";
import { Input, Select as SelectElem } from "@repo/ui";
import { useFormState } from "react-dom";
import { HTMLAttributes, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginFormErrorState, SignupFormErrorState } from "@types";
import FormButton from "@components/FormButton";
import login from "@app/actions/login";
import signup from "@app/actions/signup";

type FormProps = {
  className?: HTMLAttributes<HTMLFormElement>["className"];
  withinModal?: boolean;
};

export function Login({ className, withinModal = false, ...rest }: FormProps) {
  const [state, action] = useFormState<LoginFormErrorState, FormData>(
    login,
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      const redirect = new URLSearchParams(window.location.search).get(
        "redirect"
      );
      if (withinModal) {
        router.back();
      } else {
        router.push(redirect || "/");
      }
    }
  }, [state, router, withinModal]);

  const singleError =
    state?.error?.message || state?.error?.email || state?.error?.password;
  return (
    <form action={action} className={`mt-4 *:mb-4 w-60 ${className}`} {...rest}>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Email Address"
        className={singleError ? `border-2 border-error` : ""}
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className={singleError ? `border-2 border-error` : ""}
      />
      {singleError && <div className="text-error text-sm">{singleError}</div>}
      <FormButton className="bg-primary text-regular-inverted w-full">
        Login
      </FormButton>
    </form>
  );
}

const { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } =
  SelectElem;

export function Signup({ className, withinModal, ...rest }: FormProps) {
  const [state, action] = useFormState<SignupFormErrorState, FormData>(
    signup,
    undefined
  );
  return (
    <form action={action} className={`mt-4 *:mb-2 w-72 ${className}`} {...rest}>
      {state?.error?.message && (
        <div className="text-error text-sm">{state.error.message}</div>
      )}
      <div className="flex justify-between gap-3">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          className={
            (state?.error?.firstName ? "border-2 border-error" : "") + " w-1/2"
          }
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-1/2"
        />
      </div>
      {state?.error?.firstName && (
        <div className="text-error text-sm">{state?.error.firstName?.[0]}</div>
      )}
      <div className="flex justify-between gap-3">
        <Input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          title="Date of Birth"
          defaultValue={"2000-01-01"}
          className={state?.error?.dob ? "border-2 border-error" : ""}
        />
        <Select>
          <SelectTrigger>
            <SelectValue
              placeholder="Gender"
              className="w-5/12"
              title="Gender"
            />
          </SelectTrigger>
          <SelectContent className="w-full bg-surface">
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {state?.error?.dob && (
        <div className="text-error text-sm">{state?.error.dob?.[0]}</div>
      )}
      <Input
        type="email"
        name="email"
        placeholder="Email Address"
        className={state?.error?.email ? "border-2 border-error" : ""}
      />
      {state?.error?.email && (
        <div className="text-error text-sm">{state?.error.email?.[0]}</div>
      )}
      <Input
        type="password"
        name="password"
        placeholder="Password"
        className={
          state?.error?.password || state?.error?.passwordConfirm
            ? "border-2 border-error"
            : ""
        }
      />
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="Confirm Password"
        className={state?.error?.passwordConfirm ? "border-2 border-error" : ""}
      />
      {(state?.error?.password || state?.error?.passwordConfirm) && (
        <div className="text-error text-sm">
          {state?.error?.password?.[0] || state?.error.passwordConfirm?.[0]}
        </div>
      )}
      <FormButton className="bg-primary text-regular-inverted w-full">
        Signup
      </FormButton>
    </form>
  );
}

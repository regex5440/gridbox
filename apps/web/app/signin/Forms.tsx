"use client";
import { Input, Loader, Select as SelectElem } from "@repo/ui";
import { useFormState } from "react-dom";
import type { HTMLAttributes } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginFormErrorState, SignupFormErrorState } from "@types";
import FormButton from "@components/FormButton";
import login from "actions/login";
import signup from "actions/signup";
import useMiniCart from "@lib/store/minicart";
import useUserStore from "@lib/store/user";

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
  const { fetchCart } = useMiniCart();
  const { fetchUser, user } = useUserStore();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (state?.success && !user) {
      fetchUser();
      fetchCart();
    }
  }, [state, user, fetchCart, fetchUser]);
  useEffect(() => {
    if (state?.success) {
      const redirect = window.location.search?.split("redirect=")[1];
      if (redirect) {
        setRedirecting(true);
        router.push(decodeURIComponent(redirect));
      } else if (withinModal) {
        router.back();
      } else {
        router.push("/");
      }
    }
    return () => {
      setRedirecting(false);
    };
  }, [state, router, withinModal]);

  const singleError =
    state?.error?.message || state?.error?.email || state?.error?.password;
  return (
    <form action={action} className={`mt-4 w-60 ${className}`} {...rest}>
      <Input
        className={singleError ? `border-2 border-alert` : "mb-4"}
        id="email"
        name="email"
        placeholder="Email Address"
        type="email"
      />
      <Input
        className={singleError ? `border-2 border-alert` : "mb-4"}
        id="password"
        name="password"
        placeholder="Password"
        type="password"
      />
      {singleError ? (
        <div className="text-alert text-sm mb-4">{singleError}</div>
      ) : null}
      <FormButton className="bg-primary text-regular-inverted w-full mb-4">
        Login
      </FormButton>
      {redirecting ? (
        <div className="absolute inset-0 w-full h-full grid place-content-center bg-overlay">
          <Loader iconSize={40} />
        </div>
      ) : null}
    </form>
  );
}

const { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } =
  SelectElem;

export function Signup({ className, ...rest }: FormProps) {
  const [state, action] = useFormState<SignupFormErrorState, FormData>(
    signup,
    undefined
  );
  return (
    <form action={action} className={`mt-4 *:mb-2 w-72 ${className}`} {...rest}>
      {state?.error?.message ? (
        <div className="text-alert text-sm">{state.error.message}</div>
      ) : null}
      <div className="flex justify-between gap-3">
        <Input
          className={`${state?.error?.firstName ? "border-2 border-alert" : ""} w-1/2`}
          name="firstName"
          placeholder="First Name"
          type="text"
        />
        <Input
          className="w-1/2"
          name="lastName"
          placeholder="Last Name"
          type="text"
        />
      </div>
      {state?.error?.firstName ? (
        <div className="text-alert text-sm">{state.error.firstName[0]}</div>
      ) : null}
      <div className="flex justify-between gap-3">
        <Input
          className={state?.error?.dob ? "border-2 border-alert" : ""}
          defaultValue="2000-01-01"
          name="dob"
          placeholder="Date of Birth"
          title="Date of Birth"
          type="date"
        />
        <Select>
          <SelectTrigger>
            <SelectValue
              className="flex-auto"
              placeholder="Gender"
              title="Gender"
            />
          </SelectTrigger>
          <SelectContent align="end" className="w-fit bg-surface z-[53]">
            <SelectItem
              className="px-2 data-[highlighted]:bg-surface-secondary hover:bg-surface-secondary data-[state=checked]:bg-surface-inverted data-[state=checked]:text-regular-inverted"
              value="male"
              withIndicator={false}
            >
              Male
            </SelectItem>
            <SelectItem
              className="px-2 data-[highlighted]:bg-surface-secondary hover:bg-surface-secondary data-[state=checked]:bg-surface-inverted data-[state=checked]:text-regular-inverted"
              value="female"
              withIndicator={false}
            >
              Female
            </SelectItem>
            <SelectItem
              className="px-2 data-[highlighted]:border hover:bg-surface-secondary data-[state=checked]:bg-surface-dark data-[state=checked]:text-regular-inverted"
              value="other"
              withIndicator={false}
            >
              Other
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {state?.error?.dob ? (
        <div className="text-alert text-sm">{state.error.dob[0]}</div>
      ) : null}
      <Input
        className={state?.error?.email ? "border-2 border-alert" : ""}
        name="email"
        placeholder="Email Address"
        type="email"
      />
      {state?.error?.email ? (
        <div className="text-alert text-sm">{state.error.email[0]}</div>
      ) : null}
      <Input
        className={
          state?.error?.password || state?.error?.passwordConfirm
            ? "border-2 border-alert"
            : ""
        }
        name="password"
        placeholder="Password"
        type="password"
      />
      <Input
        className={state?.error?.passwordConfirm ? "border-2 border-alert" : ""}
        name="passwordConfirm"
        placeholder="Confirm Password"
        type="password"
      />
      {state?.error?.password || state?.error?.passwordConfirm ? (
        <div className="text-alert text-sm">
          {state.error.password?.[0] || state.error.passwordConfirm?.[0]}
        </div>
      ) : null}
      <FormButton className="bg-primary text-regular-inverted w-full">
        Signup
      </FormButton>
    </form>
  );
}

"use client";
import { Input, Select as SelectElem } from "@repo/ui";
import { useFormState } from "react-dom";
import type { HTMLAttributes } from "react";
import { useEffect } from "react";
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
  const { fetchUser } = useUserStore();

  useEffect(() => {
    if (state?.success) {
      fetchCart();
      fetchUser();
      const redirect = window.location.search?.split("redirect=")[1];
      if (redirect) {
        router.push(decodeURIComponent(redirect));
      } else if (withinModal) {
        router.back();
      } else {
        router.push("/");
      }
    }
  }, [state, router, fetchCart, fetchUser, withinModal]);

  const singleError =
    state?.error?.message || state?.error?.email || state?.error?.password;
  return (
    <form action={action} className={`mt-4 *:mb-4 w-60 ${className}`} {...rest}>
      <Input
        className={singleError ? `border-2 border-alert` : ""}
        id="email"
        name="email"
        placeholder="Email Address"
        type="email"
      />
      <Input
        className={singleError ? `border-2 border-alert` : ""}
        id="password"
        name="password"
        placeholder="Password"
        type="password"
      />
      {singleError ? (
        <div className="text-alert text-sm">{singleError}</div>
      ) : null}
      <FormButton className="bg-primary text-regular-inverted w-full">
        Login
      </FormButton>
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
          <SelectContent className="w-fit bg-surface z-[53]" align="end">
            <SelectItem
              value="male"
              className="px-2 data-[highlighted]:bg-surface-secondary hover:bg-surface-secondary data-[state=checked]:bg-surface-inverted data-[state=checked]:text-regular-inverted"
              withIndicator={false}
            >
              Male
            </SelectItem>
            <SelectItem
              value="female"
              className="px-2 data-[highlighted]:bg-surface-secondary hover:bg-surface-secondary data-[state=checked]:bg-surface-inverted data-[state=checked]:text-regular-inverted"
              withIndicator={false}
            >
              Female
            </SelectItem>
            <SelectItem
              value="other"
              className="px-2 data-[highlighted]:border hover:bg-surface-secondary data-[state=checked]:bg-surface-dark data-[state=checked]:text-regular-inverted"
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

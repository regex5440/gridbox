import { NextRequest } from "next/server";

export type RestProps = {
  [key: string]: any;
};
export type NextPageProps = {
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string;
  };
} & RestProps;

export type NextRoute = (
  request: NextRequest,
  URLSearchParams: {
    params:
      | {
          [key: string]: string;
        }
      | undefined;
  }
) => Promise<Response>;

export type LoginFormErrorState =
  | (({
      error?: {
        email?: string[];
        password?: string[];
      };
    } & {
      error?: {
        message?: string;
      };
    }) & {
      success?: boolean;
    })
  | undefined;
export type SignupFormErrorState =
  | ({
      error?: {
        firstName?: string[];
        email?: string[];
        password?: string[];
        passwordConfirm?: string[];
        dob?: string[];
        gender?: string[];
      };
    } & {
      error?: {
        message?: string;
      };
    })
  | undefined;

export type ProductPurchaseFormState =
  | {
      error: {
        message?: string;
        redirect?: string;
      };
    }
  | {
      success: {
        redirect: string;
      };
    }
  | undefined;

export type AddressBook = {
  id: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
};

export type AddressFormState =
  | {
      error?:
        | {
            fullName?: string[];
            address?: string[];
            city?: string[];
            state?: string[];
            zip?: string[];
            country?: string[];
            phone?: string[];
          }
        | {
            message?: string;
            common: true;
          };
    }
  | { success?: { data: AddressBook } }
  | undefined;
//TODO: Separate files for different types

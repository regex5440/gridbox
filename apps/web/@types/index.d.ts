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

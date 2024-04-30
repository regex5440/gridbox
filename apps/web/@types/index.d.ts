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

type ListingProp = {
  children: React.ReactNode;
  params: {
    [key: string]: string;
  };
};

export default function ListingTemplate({ children, ...rest }: ListingProp) {
  return (
    <div className="grid grid-cols-4 px-common-x gap-10">
      {/* <div className="border max-64">Filters</div> */}
      {children}
    </div>
  );
}

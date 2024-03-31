//TODO: Replace the temp JSX with proper product templates
const ProductTemplate = ({ product }: any) => {
  return (
    <div>
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full aspect-square object-fill"
      />
      <h1 className="capitalize">{product.title}</h1>
    </div>
  );
};

const ProductTemplateWithControl = () => {
  return (
    <div>
      <h1>ProductWithControl</h1>
    </div>
  );
};

export { ProductTemplate, ProductTemplateWithControl };

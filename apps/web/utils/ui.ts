const discountedPrice = (price: number, discount: number) => {
  return Number((price - (price * discount) / 100).toFixed(2));
};

export { discountedPrice };

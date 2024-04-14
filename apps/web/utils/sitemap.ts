const SiteMap = {
  Home: {
    type: "page",
    path: "/",
    absolutePath: "/",
  },
  PDP: {
    type: "page",
    path: "/product_description",
    absolutePath: "/product_description/:product_id",
  },
  PLP: {
    Search: {
      type: "page",
      path: "/listing",
      absolutePath: "/listing",
    },
    CategoryWise: {
      type: "page",
      path: "/listing",
      absolutePath: "/listing/:category",
    },
  },
  Cart: {
    type: "page",
    path: "/cart",
    absolutePath: "/cart",
  },
  Checkout: {
    type: "page",
    path: "/checkout",
    absolutePath: "/checkout",
  },
};

export default SiteMap;

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
  Account: {
    Orders: {
      type: "page",
      path: "/account/orders",
      absolutePath: "/account/orders",
    },
    Profile: {
      type: "page",
      path: "/account/profile",
      absolutePath: "/account/profile",
    },
    Addresses: {
      type: "page",
      path: "/account/addresses",
      absolutePath: "/account/addresses",
    },
    Payment: {
      type: "page",
      path: "/account/payment",
      absolutePath: "/account/payment",
    },
    Logout: {
      type: "page",
      path: "/account/logout",
      absolutePath: "/account/logout",
    },
  },
  Verify: {
    type: "page",
    path: "/verify",
    absolutePath: "/verify",
  },
  Signin: {
    type: "page",
    path: "/signin",
    absolutePath: "/signin",
  },
};

export default SiteMap;

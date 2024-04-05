const fetchProduct = (path: string) => {
  return fetch(path)
    .then((res) => res.json())
    .then((data) => data.data);
};

export { fetchProduct };

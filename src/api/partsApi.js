import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({ baseUrl: "/api" });

const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.data?.error) {
    return { error: { status: "API_ERROR", data: result.data.error } };
  }
  return result;
};

const cleanGoods = (list) =>
  (list || []).filter((item) => item && item.brand && item.number);

const toOffers = (item, isOriginal) => {
  const base = {
    brand: item.brand,
    number: item.number,
    name: item.name,
    isOriginal,
  };
  const warehouses = item.warehouses || [];

  if (warehouses.length === 0) {
    return [
      {
        ...base,
        key: `${item.goodsID}-none`,
        price: null,
        stock: 0,
        shipmentDate: null,
      },
    ];
  }

  return warehouses.map((w, i) => ({
    ...base,
    key: `${item.goodsID}-${w.id}-${i}`,
    price: w.price,
    stock: w.stock,
    shipmentDate: w.shipmentDate,
  }));
};

const byPrice = (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity);

export const partsApi = createApi({
  reducerPath: "partsApi",
  baseQuery,
  endpoints: (build) => ({
    searchBrands: build.query({
      query: (number) => ({ url: "", params: { number } }),
      transformResponse: (response) => cleanGoods(response?.goods),
    }),
    getOffers: build.query({
      query: ({ number, brand }) => ({
        url: "",
        params: { number, brand, analogues: "on" },
      }),
      transformResponse: (response) => {
        const [original] = cleanGoods(response?.goods);
        if (!original) return [];

        return [
          ...toOffers(original, true),
          ...cleanGoods(original.analogues).flatMap((item) =>
            toOffers(item, false),
          ),
        ].sort(byPrice);
      },
    }),
  }),
});

export const { useSearchBrandsQuery, useGetOffersQuery } = partsApi;

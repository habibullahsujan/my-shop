import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Product from "./Product";

//total data
//per page item
//how many page render
const Products = () => {
  // const { products, totalData } = useLoaderData();
  const [products, setProducts] = useState([]);
  const [totalData, setTotalData] = useState(0);
  //how many item we want to show one page
  const [perPageItemShow, setPerPageItemShow] = useState(10);
  //get current page
  const [currentPage, setCurrentPage] = useState(0);
  //how many page system render
  const pageRender = Math.ceil(totalData / perPageItemShow);

  useEffect(() => {
    fetch(
      `https://shop-server-kappa.vercel.app/products?size=${perPageItemShow}&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalData(data.totalData);
      });
  }, [perPageItemShow, currentPage]);
  return (
    <div>
      <div> Current page:{currentPage}</div>
      <nav
        aria-label="Pagination"
        className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-100 my-5"
      >
        <button
          type="button"
          className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-700"
        >
          <span
            className="sr-only"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {[...Array(pageRender).keys()].map((number) => (
          <button
            onClick={() => setCurrentPage(number)}
            type="button"
            aria-current="page"
            className={`${
              currentPage === number
                ? "bg-orange-600 inline-flex items-center px-4 py-2 text-sm font-semibold border"
                : ""
            } p-3`}
          >
            {number + 1}
          </button>
        ))}
        <button
          type="button"
          className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-700"
        >
          <span className="sr-only">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="ml-5">
          <select onChange={(e) => setPerPageItemShow(e.target.value)}>
            <option value="5">5</option>
            <option value="10" selected>
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryProduct,
  deleteProduct,
  getProducts,
  searchProducts,
} from "../../features/Products/productsSlice";
import { ProductDetailModal } from "./ProductDetailsModel";
import {
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletedProduct, setDeletedProduct] = useState(null);
  const [searchString, setSearchString] = useState("");
  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      await dispatch(getProducts({ currentPage }));
      // setProductList(response.data.products);
      // setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Error fetching products:" + error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    // console.log(product);
    // dispatch(setSelectedProduct(product));
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    await dispatch(searchProducts({ input: searchString }));
  };
  const handleCategorySelect = async (e) => {
    const selectedCategoryValue = e.target.value;
    if (selectedCategoryValue === "") {
      const currentPage = 1;
      await dispatch(getProducts({ currentPage }));
    } else await dispatch(categoryProduct({ category: selectedCategoryValue }));
  };
  const handleDeleteConfirm = async (product) => {
    try {
      await dispatch(deleteProduct({ delProduct: product }));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const openDeleteModal = (product) => {
    // console.log(product);
    // setSelectedProduct(product);
    setDeletedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Pagination start

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "blue",
    onClick: () => setCurrentPage(index),
    className: "rounded-full",
  });

  const next = () => {
    if (currentPage === Math.ceil(totalProducts / 8)) return;

    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };
  // Pagination end

  return (
    <>
      <div className="py-4 w-9/12 flex flex-row gap-2">
        <Input
          label="Search Product by Name"
          className="bg-white"
          onChange={handleSearch}
        />
        <Button ripple={true} onClick={handleSearchSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </Button>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Typography variant="h5">Category:</Typography>
        <select
          className="bg-white rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-bold text-blue-gray-700"
          onChange={handleCategorySelect}
        >
          <option value="">All</option>
          <option value="smartphones">smartphones</option>
          <option value="laptops">laptops</option>
          <option value="fragrances">fragrances</option>
          <option value="skincare">skincare</option>
          <option value="groceries">groceries</option>
          <option value="home-decoration">home-decoration</option>
          <option value="furniture">furniture</option>
          <option value="tops">tops</option>
          <option value="womens-dresses">women's-dresses</option>
          <option value="womens-shoes">women's-shoes</option>
          <option value="womens-watches">women's-watches</option>
          <option value="womens-bags">women's-bags</option>
          <option value="womens-jewellery">women's-jewellery</option>
          <option value="mens-shirts">mens-shirts</option>
          <option value="mens-shoes">mens-shoes</option>
          <option value="mens-watches">mens-watches</option>
          <option value="sunglasses">sunglasses</option>
          <option value="automotive">automotive</option>
          <option value="motorcycle">motorcycle</option>
          <option value="lighting">lighting</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-6 p-6 pr-8  bg-[#F4F6F9]">
        {productList.map((product) => (
          <div
            key={product?.id}
            // onClick={() => handleProductClick(product)}
            className="bg-white p-4 rounded-lg shadow hover:opacity-80"
          >
            <div
              className="cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product?.thumbnail}
                alt={product?.title}
                className="h-40 w-72 object-cover mx-auto"
              />
              <Typography variant="h5" className="py-2">
                {product?.title}
              </Typography>
              <p>Price: ${product?.price}</p>
            </div>
            <Button
              size="sm"
              color="red"
              className="mt-2 cursor-pointer"
              onClick={() => {
                openDeleteModal(product);
              }}
            >
              Delete
            </Button>
            {/*{console.log(product.id)}*/}
          </div>
          // </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.ceil(totalProducts / 8) }).map(
            (_, index) => (
              <IconButton
                key={index}
                {...getItemProps(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </IconButton>
            ),
          )}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={currentPage === Math.ceil(totalProducts / 8)}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="py-4">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <Typography color="gray" className="mb-5 text-2xl py-2.5">
              Are you sure you want to delete the product?
            </Typography>
            <div className="flex justify-end">
              <Button
                ripple={true}
                className="bg-blue-700"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="red"
                ripple={true}
                onClick={() => handleDeleteConfirm(deletedProduct)}
                className="ml-2"
              >
                YES
              </Button>
            </div>
          </div>
        </div>
      )}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      {/*<AddProduct selectedProduct={selectedProduct} />*/}
    </>
  );
};

export default Products;

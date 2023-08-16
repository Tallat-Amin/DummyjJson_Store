import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../features/Products/productsSlice";
import AddProduct from "./AddProduct";
import EditProductModel from "./EditProductModel";

const EditProduct = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

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

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
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
      <div>
        <div className="grid grid-cols-4 gap-6 p-6 pr-8  bg-[#F4F6F9]">
          {productList.map((product) => (
            <div
              key={product?.id}
              className="bg-white p-4 rounded-lg shadow hover:opacity-80 cursor-pointer"
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
              <Button
                size="sm"
                color="blue"
                className="mt-2"
                onClick={() => handleEditProduct(product)}
              >
                Update
              </Button>
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
      </div>
      {selectedProduct && (
        <EditProductModel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};
export default EditProduct;

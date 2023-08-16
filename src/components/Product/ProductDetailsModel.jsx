import { useEffect, useState } from "react";
import { dummyJson } from "../../axios/axios";
import { Button, Carousel } from "@material-tailwind/react";

export const ProductDetailModal = ({ product, onClose }) => {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getProductDetails = async () => {
    try {
      const response = await dummyJson.get(`/products/${product?.id}`);
      setProductDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [product?.id]);

  const {
    id,
    images,
    title,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    description,
  } = productDetails;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div key={id} className="bg-white p-6 rounded-lg flex flex-col gap-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-gray-600">${price}</p>
              </div>
              <Carousel className="rounded-xl w-80 h-64 mx-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image} // Assuming each image in 'images' array is a URL
                    alt={`image ${index + 1}`}
                    className="h-full w-full"
                  />
                ))}
              </Carousel>
              <p className="text-gray-500 pt-2 mb-4 w-[428px]">{description}</p>
              <div className="flex items-center mb-4">
                <p className="text-gray-500 mr-2">Discount:</p>
                <p className="text-green-500 font-semibold">
                  {discountPercentage}%
                </p>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-gray-500 mr-2">Rating:</p>
                <p className="text-yellow-500 font-semibold">{rating}⭐</p>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-gray-500 mr-2">Stock:</p>
                <p>{stock}</p>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-gray-500 mr-2">Brand:</p>
                <p>{brand}</p>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-gray-500 mr-2">Category:</p>
                <p>{category}</p>
              </div>
            </div>
            <Button
              variant="outlined"
              onClick={onClose}
              className="mt-4 border-black text-black px-4 py-2 hover:bg-black hover:text-white"
            >
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

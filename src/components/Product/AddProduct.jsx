import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/Products/productsSlice";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddProduct = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    thumbnail: "",
    title: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    description: "",
  });
  const handleInputChange = (fieldName, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addProduct(formValues));
    toast.success("Product added successfully!");
  };
  return (
    <>
      <div>
        <Card color="white" shadow={true} className="p-4 mt-4">
          <Typography variant="h4" color="blue-gray">
            Add Product
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="mb-4 bg-white">
              <Input
                size="lg"
                label="thumbnail"
                onChange={(e) => handleInputChange("thumbnail", e.target.value)}
              />
            </div>
            <div className="mb-4 bg-white">
              <Input
                size="lg"
                label="Title"
                value={formValues.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="mb-4 bg-white">
              <Input
                type="number"
                size="lg"
                label="Price"
                value={formValues.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
            <div className="mb-4 bg-white">
              <Input
                type="number"
                size="lg"
                label="discountPercentage"
                onChange={(e) =>
                  handleInputChange("discountPercentage", e.target.value)
                }
              />
            </div>
            <div className="mb-4 bg-white">
              <Input
                type="number"
                size="lg"
                label="Rating"
                value={formValues.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
              />
            </div>
            <div className="mb-4 bg-white">
              <Input
                type="number"
                size="lg"
                label="Stock"
                value={formValues.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
              />
            </div>
            <div className="mb-4 bg-white">
              <Input
                size="lg"
                label="Brand"
                value={formValues.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>
            <div className="mb-4 bg-white">
              <Input
                size="lg"
                label="Category"
                value={formValues.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              />
            </div>
            <div className="mb-4 bg-white">
              <Textarea
                size="md"
                label="Description"
                value={formValues.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <Button className="mt-6" fullWidth type={"submit"}>
              Add Product
            </Button>
          </form>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
};
export default AddProduct;

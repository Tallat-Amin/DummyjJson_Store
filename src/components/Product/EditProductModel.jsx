import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { editProduct } from "../../features/Products/productsSlice";
import { toast } from "react-toastify";

const EditProductModel = ({ product, onClose }) => {
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
  useEffect(() => {
    if (product) {
      setFormValues({
        thumbnail: product.thumbnail,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        description: product.description,
      });
    }
  }, [product]);
  const handleInputChange = (fieldName, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    console.log(product.id);
    await dispatch(
      editProduct({ editProduct: formValues, productId: product.id }),
    );
    toast.success("Product edit successfully!");
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
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
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
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
            <Button color="red" variant={"outlined"} onClick={() => onClose()}>
              Close
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditProductModel;

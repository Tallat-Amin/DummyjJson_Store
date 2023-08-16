import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dummyJson } from "../../axios/axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ currentPage }) => {
    try {
      const response = await dummyJson.get(
        `/products?limit=8&skip=${(currentPage - 1) * 8}`,
      );
      return response.data.products;
    } catch (error) {
      console.log("Error fetching data: " + error.message);
    }
  },
);
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async ({ input }) => {
    try {
      const response = await dummyJson.get(`/products/search?q=${input}`);
      return response.data.products;
    } catch (error) {
      console.log("Error fetching data: " + error.message);
    }
  },
);
export const categoryProduct = createAsyncThunk(
  "products/categoryProducts",
  async ({ category }) => {
    try {
      const response = await dummyJson.get(`/products/category/${category}`);
      return response.data.products;
    } catch (error) {
      console.log("Error fetching data: " + error.message);
    }
  },
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData) => {
    try {
      const response = await dummyJson.post(`/products/add`, formData);
      return response.data;
    } catch (error) {
      console.log("Error fetching data: " + error.message);
    }
  },
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ productId, editProduct }) => {
    try {
      const response = await dummyJson.put(`/products/${productId}`, {
        editProduct,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching data: " + error.message);
    }
  },
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, delProduct }) => {
    try {
      const response = await dummyJson.delete(`/products/${delProduct.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching data: " + error.message);
    }
  },
);
const initialState = {
  products: [],
  // selectedProduct: [],
  status: "idle",
  error: "",
};
const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setSelectedProduct: (state, action) => {
    //   state.selectedProduct = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      //   for get all products
      .addCase(getProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      //   For search product
      .addCase(searchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      //   For category product
      .addCase(categoryProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(categoryProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(categoryProduct.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      //   For add product form
      .addCase(addProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      // For update of product
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "success";
        // Find and update the product in the state
        const updatedProduct = action.payload; // Use the updatedProduct from action payload
        console.log(updatedProduct);
        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id,
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});
export default productsSlice.reducer;

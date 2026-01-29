import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import DeleteModal from "../../components/DeleteModal";
import config from "../../config";

const Products = () => {
  const [products, setProducts] = useState();
  const { apiBaseUrl } = config;

  useEffect(() => {
    axios.get(`${apiBaseUrl}/products`).then((response) => {
      setProducts(response.data.data);
    });
  }, [apiBaseUrl]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleDeleteClick(product) {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (!selectedProduct) return;
    try {
      await axios.delete(`${apiBaseUrl}/products/${selectedProduct.id}`);
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2>Products</h2>
        </div>
        <div className="col-md-6 text-end">
          <NavLink to="/products/add">Add Product</NavLink>
        </div>

        <div className="col-md-12">
          <table className="table table-hover mt-3">
            <thead className="table-info">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price (Rs.)</th>
                <th>Type</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>Rs.{product.price.toFixed(2)}</td>
                    <td>{product.type}</td>
                    <td>
                      {new Date(product.updatedAt).toLocaleDateString()}{" "}
                      {new Date(product.updatedAt).toLocaleTimeString()}
                    </td>
                    <td>
                      <NavLink to={`/products/edit/${product.id}`}>
                        <button className="btn btn-primary btn-sm">Edit</button>
                      </NavLink>
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDeleteClick(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        title="Delete Product"
        message={
          selectedProduct
            ? `Delete ${selectedProduct.name}?`
            : "Delete this product?"
        }
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Products;

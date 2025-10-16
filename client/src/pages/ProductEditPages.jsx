// client/src/pages/ProductEditPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

function ProductEditPage() {
  const { id } = useParams(); // Obtiene el ID de la URL, si existe
  const navigate = useNavigate();
  const { token } = useAuth();

  // Un estado para todos los campos del producto
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    ingredients: "", // string separado por comas
    presentations: [{ weight: "", price: "", stock: "" }],
  });

  const isCreating = !id; // Si no hay ID, estamos creando

  useEffect(() => {
    if (!isCreating) {
      // Si estamos editando, carga los datos del producto
      const fetchProduct = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );
        const data = await res.json();
        setProductData({
          ...data,
          ingredients: data.ingredients.join(", "), // Convierte el array a string
        });
      };
      fetchProduct();
    }
  }, [id, isCreating]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresentationChange = (index, e) => {
    const { name, value } = e.target;
    const newPresentations = [...productData.presentations];
    newPresentations[index][name] = value;
    setProductData((prev) => ({ ...prev, presentations: newPresentations }));
  };

  const addPresentation = () => {
    setProductData((prev) => ({
      ...prev,
      presentations: [
        ...prev.presentations,
        { weight: "", price: "", stock: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...productData,
      ingredients: productData.ingredients
        .split(",")
        .map((item) => item.trim()), // Convierte el string a array
    };

    const url = isCreating
      ? `${import.meta.env.VITE_API_URL}/api/products/`
      : `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const method = isCreating ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el producto");
      }
      toast.success(
        `Producto ${isCreating ? "creado" : "actualizado"} exitosamente!`
      );
      navigate("/admin/productlist"); // Redirige a la lista de productos
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al guardar el producto.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Link
        to="/admin/productlist"
        className="text-teal-600 hover:text-teal-800 hover:underline mb-4 inline-block"
      >
        &larr; Volver a la lista de productos
      </Link>
      <h1 className="text-3xl font-bold mb-8">
        {isCreating ? "Crear Nuevo Producto" : "Editar Producto"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow"
      >
        {/* Campos de texto principales */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Categoría
          </label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            URL de la Imagen
          </label>
          <input
            type="text"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Ingredientes (separados por coma)
          </label>
          <input
            type="text"
            name="ingredients"
            value={productData.ingredients}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <hr className="my-6" />

        {/* Manejo de Presentaciones */}
        <h2 className="text-xl font-bold mb-4">Presentaciones</h2>
        {productData.presentations.map((p, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4 items-center">
            <input
              type="text"
              name="weight"
              placeholder="Peso (ej: 100gr)"
              value={p.weight}
              onChange={(e) => handlePresentationChange(index, e)}
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={p.price}
              onChange={(e) => handlePresentationChange(index, e)}
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={p.stock}
              onChange={(e) => handlePresentationChange(index, e)}
              className="px-3 py-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addPresentation}
          className="text-teal-600 font-semibold mb-6"
        >
          + Añadir otra presentación
        </button>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-bold py-3 rounded hover:bg-teal-700 transition-colors"
        >
          {isCreating ? "Crear Producto" : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
export default ProductEditPage;

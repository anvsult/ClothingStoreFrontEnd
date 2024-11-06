import { useEffect, useState } from "react";
import { deleteData, getData, postData, putData } from "../services/api-services";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm"; // Ensure correct import

export default function ProductsPage({ mode, setMode }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8080/api/v1/products';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getData(API_URL);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products: ', error);
            setError(error.message);
        }
    };

    async function handleDelete(productIdentifier) {
        console.log("delete : " + productIdentifier);
        try {
            await deleteData(API_URL, productIdentifier);
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product: ', error);
            setError(error.message);

        }
    }


    function handleEditProduct (product) {
        setSelectedProduct(product);
        setMode('edit');
    }

    const handleAddNew = () => {
        setSelectedProduct(null);
        setMode('create');
    };

    const handleSaveProduct = async (data, id) => {
        try {
            if (id) {
                // Update existing product
                await putData(API_URL, id, data);
            } else {
                // Create a new product
                await postData(API_URL, data);
                console.log('Data being sent', data);
            }
            await fetchProducts(); // Refresh the list of products after saving
            setMode('list'); // Go back to the list view after saving
        } catch (error) {
            console.error('Error saving product: ', error);
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!products) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            {mode === 'list' && (
                <ProductList
                    products={products} // Use 'products' for clarity
                    onDelete={handleDelete}
                    onEdit={handleEditProduct}
                    onCreate={handleAddNew}
                />
            )}
            {mode === 'create' && (
                <ProductForm onSave={handleSaveProduct} /> // No parentheses
            )}
            {mode === 'edit' && selectedProduct && (
                <ProductForm onSave={handleSaveProduct} product={selectedProduct} /> // No parentheses, prop name corrected
            )}
        </div>
    );
}
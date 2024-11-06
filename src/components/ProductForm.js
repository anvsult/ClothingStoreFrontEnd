import {useEffect, useState} from "react";

export default function ProductForm({product, onSave}) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        size: '',
        price: '',
        quantity: '',
        product_status: 'OUT_OF_STOCK'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData, product ? product.productIdentifier : null);
    };

    const handleInStockChange = (event) => {
        const { name, checked } = event.target;
        setFormData({
            ...formData,
            [name]: checked ? "IN_STOCK" : "OUT_OF_STOCK" // Toggle logic
        });
    };

    useEffect(() => {
        if (product) {
            setFormData({
                productIdentifier: product.productIdentifier,
                name: product.name,
                description: product.description,
                size: product.size,
                price: product.price,
                quantity: product.quantity,
                product_status: product.product_status
            });
        }
    }, [product]);


    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-center">{product ? "Edit Product" : "Add New Product"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Product ID:</label>
                        <input
                            type="text"
                            className="form-control text-muted"
                            value={product ? product.productIdentifier : 'New ID'}
                            readOnly
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Description:</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Size:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label>Product Status:</label>
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="product_status"
                                checked={formData.product_status === "IN_STOCK"}
                                onChange={handleInStockChange}
                            />
                            <label className="form-check-label">
                                {formData.product_status === "IN_STOCK" ? "IN STOCK" : "OUT OF STOCK"}
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        {product ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}
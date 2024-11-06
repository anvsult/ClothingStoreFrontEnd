import { useEffect, useState } from "react";

export default function OrdersForm({ order, onSave }) {
    const [formData, setFormData] = useState({
        orderIdentifier: '',
        customerIdentifier: '',
        productIdentifier: '',
        name: '',
        price: '',
        deliveryStatus: '',
        shippingPrice: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData, order ? order.orderIdentifier : null);
    };

    useEffect(() => {
        if (order) {
            setFormData({
                orderIdentifier: order.orderIdentifier,
                customerIdentifier: order.customerIdentifier,
                productIdentifier: order.productIdentifier,
                name: order.name,
                price: order.price,
                deliveryStatus: order.deliveryStatus,
                shippingPrice: order.shippingPrice,
            });
        }
    }, [order]);

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-center">{order ? "Edit Order" : "Add New Order"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Order ID:</label>
                        <input
                            type="text"
                            className="form-control text-muted"
                            value={order ? order.orderIdentifier : 'New ID'}
                            readOnly
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Customer ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="customerIdentifier"
                            value={formData.customerIdentifier}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Product ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="productIdentifier"
                            value={formData.productIdentifier}
                            onChange={handleChange}
                            required
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
                        <label>Price:</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Delivery Status:</label>
                        <select
                            className="form-control"
                            name="deliveryStatus"
                            value={formData.deliveryStatus}
                            onChange={handleChange}
                        >
                            <option value="PENDING">Pending</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                    <div className="form-group mb-4">
                        <label>Shipping Price:</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="shippingPrice"
                            value={formData.shippingPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        {order ? "Update Order" : "Add Order"}
                    </button>
                </form>
            </div>
        </div>
    );
}
import {useEffect, useState} from "react";


export default function CustomerForm({customer, onSave}) {

    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        emailAddress: '',
        streetAddress: '',
        postalCode: '',
        city: '',
        province: '',
        password1: 'pwd',
        password2: 'pwd'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData, customer ? customer.customerIdentifier : null);
    };

    useEffect(() => {
        if (customer) {
            setFormData({
                lastName: customer.lastName,
                firstName: customer.firstName,
                emailAddress: customer.emailAddress,
                streetAddress: customer.streetAddress,
                postalCode: customer.postalCode,
                city: customer.city,
                province: customer.province
            });
        }
    }, [customer]);


    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-center">{customer ? "Edit Customer" : "Add New Customer"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Customer ID:</label>
                        <input
                            type="text"
                            className="form-control text-muted"
                            value={customer ? customer.customerIdentifier : 'New ID'}
                            readOnly
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Street Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Postal Code:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>City:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label>Province:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        {customer ? "Update Customer" : "Add Customer"}
                    </button>
                </form>
            </div>
        </div>
    );
}
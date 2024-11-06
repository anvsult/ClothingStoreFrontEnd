import {useEffect, useState} from "react";
import {deleteData, getData, postData, putData} from "../services/api-services";
import CustomerList from "../components/CustomerList";
import CustomerForm from "../components/CustomerForm";

export default function CustomersPage({mode, setMode}) {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8080/api/v1/customers';

    useEffect(() => {
        fetchCustomers();
    }, []);
    const fetchCustomers = async () => {
        try {
            const data = await getData(API_URL);
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers: ', error);
            setError(error.message);
        }
    }
    async function handleDelete(customerIdentifier) {
        console.log("delete : " + customerIdentifier)
        try {
            await deleteData(API_URL, customerIdentifier);
            await fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer: ', error);
            setError(error.message);
        }


    }

    function handleEditCustomer(customer) {
        setSelectedCustomer(customer);
        setMode('edit');
    }

    function handleAddNew() {
        setSelectedCustomer(null);
        setMode('create');
    }

    // Handle save (create or update) function to pass to CustomerForm
    const handleSaveCustomer = async (data, id) => {
        try {
            if (id) {
                //Update existing customer
                await putData(API_URL, id, data);
            } else {
                // Create a new customer
                await postData(API_URL, data);
                console.log('Data being sent', data);
            }
            await fetchCustomers(); // Refresh the list of customers after saving
            setMode('list'); // Go back to the list view after saving

        } catch (error) {
            console.error('Error saving customer: ', error);
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!customers) return <p>Loading...</p>;
    return (
        <div className={'container mt-4'}>
            {mode === 'list' && (
                <CustomerList
                    customers={customers}
                    onDelete={handleDelete}
                    onEdit={handleEditCustomer}
                    onCreate={handleAddNew}
                />
            )}
            {mode === 'create' && (
                <CustomerForm onSave={handleSaveCustomer} />)
            }
            {mode === 'edit' && selectedCustomer && (
                <CustomerForm onSave={handleSaveCustomer} customer={selectedCustomer} />
            )}
        </div>
    )
}
import {useEffect, useState} from "react";
import {deleteData, getData, postData, putData} from "../services/api-services";
import OrderList from "../components/OrderList";
import OrderForm from "../components/OrderForm";

export default function OrdersPage({mode, setMode}) {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8080/api/v1/orders';

    useEffect(() => {
        fetchOrders();
    }, []);
    const fetchOrders = async () => {
        try {
            const data = await getData(API_URL);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders: ', error);
            setError(error.message);
        }
    }
    async function handleDelete(orderIdentifier) {
        console.log("delete : " + orderIdentifier)
        try {
            await deleteData(API_URL, orderIdentifier);
            await fetchOrders();
        } catch (error) {
            console.error('Error deleting order: ', error);
            setError(error.message);
        }
    }

    function handleEditOrder(order) {
        setSelectedOrder(order);
        setMode('edit');
    }

    function handleAddNew() {
        setSelectedOrder(null);
        setMode('create');
    }

    // Handle save (create or update) function to pass to CrderForm
    const handleSaveOrder = async (data, id) => {
        try {
            if (id) {
                //Update existing crder
                await putData(API_URL, id, data);
            } else {
                // Create a new crder
                await postData(API_URL, data);
                console.log('Data being sent', data);
            }
            await fetchOrders(); // Refresh the list of crders after saving
            setMode('list'); // Go back to the list view after saving

        } catch (error) {
            console.error('Error saving order: ', error);
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!orders) return <p>Loading...</p>;
    return (
        <div className={'container mt-4'}>
            {mode === 'list' && (
                <OrderList
                    orders={orders}
                    onDelete={handleDelete}
                    onEdit={handleEditOrder}
                    onCreate={handleAddNew}
                />
            )}
            {mode === 'create' && (
                <OrderForm onSave={handleSaveOrder} />)
            }
            {mode === 'edit' && selectedOrder && (
                <OrderForm onSave={handleSaveOrder} order={selectedOrder} />
            )}
        </div>
    )
}
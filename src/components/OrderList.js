import {Button, Tab, Table} from 'react-bootstrap';
function OrderList({orders, onCreate, onDelete, onEdit}) {
    return (
        <div>
            <h1>Orders</h1>
            <Button onClick={() => onCreate()} variant="primary" >Add New Orders</Button>
            <Table className={'mt-3 table table-striped table-bordered'}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Delivery Status</th>
                    <th>Total Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {orders.map((order) => (
                    <tr key={order.orderIdentifier}>
                        <td>{order.orderIdentifier}</td>
                        <td>{order.name}</td>
                        <td>{order.price}</td>
                        <td>{order.deliveryStatus}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                            <Button onClick={() => onEdit(order)} variant={'info'}>Edit</Button>
                            <Button onClick={() => onDelete(order.orderIdentifier)} variant={'danger'}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
export default OrderList;
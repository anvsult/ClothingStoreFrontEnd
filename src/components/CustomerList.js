import {Button, Tab, Table} from 'react-bootstrap';
function CustomerList({customers, onCreate, onDelete, onEdit}) {
    return (
        <div>
            <h1>Customers</h1>
            <Button onClick={() => onCreate()} variant="primary" >Add New Customer</Button>
            <Table className={'mt-3 table table-striped table-bordered'}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Street Address</th>
                    <th>Postal Code</th>
                    <th>City</th>
                    <th>Province</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerIdentifier}>
                            <td>{customer.customerIdentifier}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.emailAddress}</td>
                            <td>{customer.streetAddress}</td>
                            <td>{customer.postalCode}</td>
                            <td>{customer.city}</td>
                            <td>{customer.province}</td>
                            <td>
                                <Button onClick={() => onEdit(customer)} variant={'info'}>Edit</Button>
                                <Button onClick={() => onDelete(customer.customerIdentifier)} variant={'danger'}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    </div>
    );
}
export default CustomerList;
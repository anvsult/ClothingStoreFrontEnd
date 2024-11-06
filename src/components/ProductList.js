import { Button, Container, Row, Col } from 'react-bootstrap';
import ProductCardComponent from './ProductCardComponent'; // Adjust the path as necessary

export default function ProductList({ products, onCreate, onDelete, onEdit }) {
    return (
        <Container className="mt-5">
            <h1 className="text-center">Products</h1>
            <div className="text-center mb-4">
                <Button onClick={onCreate} variant="primary">
                    Add New Product
                </Button>
            </div>
            <Row className="justify-content-center">
                {products.map((product) => (
                    <Col sm={6} md={4} lg={3} key={product.productIdentifier} className="mb-4">
                        <ProductCardComponent
                            productIdentifier={product.productIdentifier}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            size={product.size}
                            quantity={product.quantity}
                            product_status={product.product_status}
                        />
                        <div className="d-flex justify-content-center mt-2">
                            <Button variant="info" onClick={() => onEdit(product)}>Edit</Button>
                            <Button variant="danger" onClick={() => onDelete(product.productIdentifier)}>Delete</Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
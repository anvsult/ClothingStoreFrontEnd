import {Button, Card} from "react-bootstrap";


export default function ProductCardComponent({productIdentifier, name, description, price, size, quantity, product_status}) {
    return (
        <Card className="m-3" style={{ maxWidth: '30rem', height: '20rem', textAlign: 'left' }}>

        <Card.Body>
                {/*<Card.Img src={image} alt={"image"}></Card.Img>*/}
                <Card.Title>{name}</Card.Title>
            <Card.Text>
                <span style={{fontWeight: 'bold'}}>ID :</span> {productIdentifier}<br/>
                <span style={{fontWeight: 'bold'}}>Description :</span> {description}<br/>
                <span style={{fontWeight: 'bold'}}>Price :</span> {price}<br/>
                <span style={{fontWeight: 'bold'}}>Size :</span> {size}<br/>
                <span style={{fontWeight: 'bold'}}>Quantity :</span> {quantity}<br/>
                <span style={{fontWeight: 'bold'}}>Product Status :</span> {product_status}<br/>
            </Card.Text>
        </Card.Body>
        </Card>
    );
}
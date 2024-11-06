import { Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

export default function MyNavBar({onNavLinkClick}) {
    const links = [
        {
            to: "",
            title: "Home"
        },
        {
            to: "customers",
            title: "Customers"
        },
        {
            to: "products",
            title: "Products"
        },
        {
            to: "orders",
            title: "Orders"
        }
    ]
    return (
        <Navbar bg='dark' data-bs-theme='dark'>
            <Container>
                <LinkContainer to='/' style={{ cursor: 'pointer' }}>
                    <Navbar.Brand className='fs-2'>LOGO</Navbar.Brand>
                </LinkContainer>
                <Nav className={"me-auto fs-4"}>
                    {
                        links.map((link) =>
                            <LinkContainer to={`/${link.to}`} key={link.to}>
                                <Nav.Link onClick={() => onNavLinkClick()}>
                                    {link.title}
                                </Nav.Link>
                            </LinkContainer>
                        )
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}
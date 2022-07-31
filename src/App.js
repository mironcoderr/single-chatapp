import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import StyledComponents from "./components/StyledComponents";
import { ReduxPractice } from "./components/ReduxPractice";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./pages/Home";
import Miron from "./pages/Miron";
import Hasan from "./pages/Hasan";
import Other from "./pages/Other";


function App() {
    const auth = getAuth();
    let navigate = useNavigate('');

    let userLogout = () => {
        signOut(auth).then(() => {
            navigate('/login', { state: 'Your account successfully loged in!' });
        }).catch((error) => {
            console.log(error);
        })
    }

    let homePath = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) navigate('/');
            else navigate('/login', { state: 'Please login here!' })
        })
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="#home" className="fw-bold">React Practice</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Button onClick={homePath} style={homeLink}>Home</Button>
                            <Link style={navlink} to="/redux">Redux</Link>
                            <Link style={navlink} to="/styled">Styled</Link>
                            <Link style={navlink} to="/miron">Miron's Post</Link>
                            <Link style={navlink} to="/hasan">Hasan's Post</Link>
                            <Link style={navlink} to="/other">Other's Post</Link>
                            <Button onClick={userLogout} className="ms-3" variant="dark">Log Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Registration />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/redux" element={<ReduxPractice />}></Route>
                <Route path="/styled" element={<StyledComponents />}></Route>
                <Route path="/miron" element={<Miron />}></Route>
                <Route path="/hasan" element={<Hasan />}></Route>
                <Route path="/other" element={<Other />}></Route>
            </Routes>
        </>
    );
}

let navlink = {
    textDecoration: 'none',
    marginLeft: '24px',
    fontWeight: '500',
    color: '#555',
}

let homeLink = {
    color: '#555',
    fontWeight: '500',
    padding: '0px',
    border: 'none',
    background: 'none',
    boxShadow: 'none',
}

export default App;

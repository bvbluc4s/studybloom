import { Link } from "react-router";



function Header() {
    return (
        <header className="main-header">
            <h2 className="logo">App</h2>
            <nav className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/calendario">Calendário</Link>
                <Link to="/materias">Matérias</Link>
                <Link to="/gastos">Gastos</Link>
                <Link to="/humor">Humor</Link>
            </nav>
        </header>
    )
}

export default Header;
// No import from react-router-dom needed for now!

function Header() {
    return (
        <header className="main-header">
            <h2 className="logo">App</h2>
            <nav className="nav-links">
                <span>Dashboard</span>
                <span>Matérias</span>
                <span>Calendário</span>
                <span>Gastos</span>
                <span>Humor</span>
            </nav>
        </header>
    )
}

export default Header;
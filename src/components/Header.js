function Header({ text, classHeader }) {
    return (
        <header >
            <h1 className={classHeader}>{text}</h1>
        </header>
    )
};

export default Header;
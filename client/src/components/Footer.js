
const Footer = () => {
    return (
        <div className = "footer">
            <div className = "footerInfo">
                <h2>Адрес и контакты</h2>
                <p>ул. Заречная, д.38 к1</p>
                <p>тел. админа: 89871234567</p>
            </div>
            <img src = { require("../images/map.png") }/>
        </div>
    )
}

export default Footer;
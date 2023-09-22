import { Link } from "react-router-dom";

function NotFound({ loggedIn }) {
    //const location = useLocation();

    return (
        <div className="not-found">
            <h1 className="not-found__title">Страница не найдена</h1>
            <Link className="not-found__link" /* to="/" */ to={loggedIn ? "/" : "/sign-in"}>
                Перейти на главную страницу
            </Link>
        </div>
    )
}

export default NotFound;
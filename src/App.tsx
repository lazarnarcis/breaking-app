import React from "react";
import "./style.scss";
import axios from "axios";

export default function App() {
    const [users, setUsers] = React.useState<any[]>([]);
    const input = React.useRef<any>(null);
    const [apiLink, setApiLink] = React.useState("https://www.breakingbadapi.com/api/characters/");
    const [usersMap, setUsersMap] = React.useState<any[]>([]);
    const [text, setText] = React.useState<string>("Sort Users");
    const [hideLoader, setHideLoader] = React.useState<boolean>(false);

    React.useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(apiLink);
            setUsers(data);
            setHideLoader(true);
        }
        getData();
    }, [apiLink]);

    React.useEffect(() => {
        setUsersMap(
            users.map((user, key) => {
                return <div key={key} className="card" style={{ width: "18rem" }}>
                        <img src={user.img} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{ user.name }</h5>
                            <p className="card-text">{ user.portrayed }</p>
                        </div>
                    </div>;
            })
        );
    }, [users]);

    const onChangeHandler = () => {
        let inputValue = input.current.value;
        setApiLink(`https://www.breakingbadapi.com/api/characters/?name=${inputValue}`);
    }

    const sortCharacterAscending = () => {
        setUsers(users => [...users].sort((a, b) => a.name.localeCompare(b.name)));
        setText("Character name ascending");
    }

    const sortCharacterDescending = () => {
        setUsers(users => [...users].sort((a, b) => b.name.localeCompare(a.name)));
        setText("Character name descending");
    }

    const sortActorsAscending = () => {
        setUsers(users => [...users].sort((a, b) => a.portrayed.localeCompare(b.portrayed)));
        setText("Actor name ascending");
    }

    const sortActorsDescending = () => {
        setUsers(users => [...users].sort((a, b) => b.portrayed.localeCompare(a.portrayed)));
        setText("Actor name descending");
    }

    return (
        <div>
            <p className="fs-1">Breaking Bad App</p>
            <div className="input-element">
                <div className="input-group mb-3">
                    <input type="text" placeholder="Name..." className="form-control" aria-label="Text input with dropdown button" ref={input} onChange={onChangeHandler} />
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{text}</button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="/#" onClick={sortCharacterAscending}>Character name ascending</a></li>
                        <li><a className="dropdown-item" href="/#" onClick={sortCharacterDescending}>Character name descending</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="/#" onClick={sortActorsAscending}>Actor name ascending</a></li>
                        <li><a className="dropdown-item" href="/#" onClick={sortActorsDescending}>Actor name descending</a></li>
                    </ul>
                </div>
            </div>
            <div className="cards">
                <div className="fs-2" style={{ display: hideLoader ? "none" : "block" }}>Loading...</div>
                {usersMap}
            </div>
        </div>
    );
}
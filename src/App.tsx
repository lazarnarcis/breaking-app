import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import axios from "axios";

export default function App() {
    const [users, setUsers] = useState<any[]>([]);
    const input = useRef<any>(null);
    const [apiLink, setApiLink] = useState("https://www.breakingbadapi.com/api/characters/");
    const [usersMap, setUsersMap] = useState<any[]>([]);
    const [text, setText] = useState<string>("Sort Users");

    useEffect(() => {
        axios.get(apiLink)
            .then(data => {
                setUsers(data.data);
            });
    }, [apiLink]);

    useEffect(() => {
        console.log(users);
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
        setApiLink(`https://www.breakingbadapi.com/api/characters/?name=` + inputValue);
    }

    const sortCharacterAscending = () => {
        setUsers(users => {
            const usersToSort = [...users];
            usersToSort.sort((a, b) => a.name.localeCompare(b.name));
            return usersToSort;
        });
        setText("Character name ascending");
    }

    const sortCharacterDescending = () => {
        setUsers(users => {
            const usersToSort = [...users];
            usersToSort.sort((a, b) => b.name.localeCompare(a.name));
            return usersToSort;
        });
        setText("Character name descending");
    }

    const sortActorsAscending = () => {
        setUsers(users => {
            const usersToSort = [...users];
            usersToSort.sort((a, b) => a.portrayed.localeCompare(b.portrayed));
            return usersToSort;
        });
        setText("Actor name ascending");
    }

    const sortActorsDescending = () => {
        setUsers(users => {
            const usersToSort = [...users];
            usersToSort.sort((a, b) => b.portrayed.localeCompare(a.portrayed));
            return usersToSort;
        });
        setText("Actor name descending");
    }

    return (
        <div>
            <h1>Breaking Bad App</h1>
            <div className="input-element">
                <div className="input-group mb-3">
                    <input type="text" placeholder="Text field" className="form-control" aria-label="Text input with dropdown button" ref={input} onChange={onChangeHandler} />
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{ text }</button>
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
                { usersMap }
            </div>
        </div>
    );
}
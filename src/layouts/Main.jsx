import { useEffect, useState } from "react";

const Main = () => {
    const [users, setUser] = useState([])
    useEffect(() =>{
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => setUser(data))
    } ,[])
    const handleSubmit = (e) =>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = { name , email}
        console.log(user);
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            const newUsers = [...users , data]
            setUser(newUsers)
        })
    }
    return (
        <div>
            <h1>I am from main.</h1>
            <h1> Total user:  {users.length} </h1>

            <div>
                {
                    users.map(e => <p key={e.id}> {e.id} {e.name} {e.email}  </p>)
                }
            </div>
            <form  onSubmit={handleSubmit}>
                <input type="text" name="name" id="" />
                <br />
                <input type="text" name="email" id="" />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Main;
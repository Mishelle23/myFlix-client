import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export function ProfileView({ user, onLoggedOut }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length < 5) return setError('Username requires 5 or more characters');
    if (password.length < 4) return setError('Password requires 4 or moer characters');

    axios.put(`https://safe-coast-49930.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
    const handleDelete = () => {
      axios.delete(`https://berkdislimyflix.herokuapp.com/users/${user.Username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          console.log(response.data);
          onLoggedOut()
        })
        .catch(err => {
          console.error(err)
        });
    }
  }
}

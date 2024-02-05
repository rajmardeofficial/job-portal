import React, {useState, useEffect} from 'react';
import logo from "../logo.png"

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://test-jobs.onrender.com/auth/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

      // Store the access token in local storage
      localStorage.setItem('accessToken', data.access);

      // You can redirect to another page or perform other actions after successful login
      window.location.href = "/candidatetable"
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login error, display an alert, or update state accordingly
    }
  };

  return (
    <div className="container-md">
    <main className="form-signin text-center" style={{ maxWidth: '400px', margin: 'auto', marginTop: '80px' }}>
      <form onSubmit={handleLogin}>
        <img className="mb-4" src={logo} alt="" width="50%" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button className="btn btn-primary btn-custom-width py-2" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </main>
  </div>
  );
};

export default Login;

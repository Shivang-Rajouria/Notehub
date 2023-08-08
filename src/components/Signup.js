import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent page from reloading
    const { name, email, password } = credentials;

    // API call
    const response = await fetch("http://localhost:3500/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showalert("Account created Successfully", "success");
    } else {
      props.showalert("Invalid details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: "url('path/to/background/image.jpg')",
      backgroundSize: 'cover',
    }}>
      <div style={{ width: '600px' }}>
        <div className="card" style={{ padding: '20px', borderRadius: '10px' }}>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <h1 className="block text-4xl font-bold mb-2 underline justify-center text-blue-900">Create an Account</h1>
            </div>
            <div className="mb-2 ">
              <label htmlFor="name" className="form-label font-bold font-sans underline">Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Enter your name" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label font-bold font-sans underline">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} placeholder="Enter your email" />
              <div id="emailHelp" className="form-text font-bold font-sans ">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label font-bold font-sans underline">Password</label>
              <input type="password" className="form-control" id="Password" name="password" onChange={onChange} placeholder="Enter your password" minLength={5} required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label font-bold font-sans underline">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Confirm your password" minLength={5} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

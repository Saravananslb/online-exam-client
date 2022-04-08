import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import "./Login.css";
import { cookie, signInUser } from '../../apiCall';
import { useNavigate } from "react-router-dom";

let captcha;
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

const generate = () => {
  // console.log(status)
  let first = alphabets[Math.floor(Math.random() * alphabets.length)];
  let second = Math.floor(Math.random() * 10);
  let third = Math.floor(Math.random() * 10);
  let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
  let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
  let sixth = Math.floor(Math.random() * 10);
  captcha = first.toString()+second.toString()+third.toString()+fourth.toString()+fifth.toString()+sixth.toString();
  console.log(captcha);
  return captcha;
}

export const Login = () => {
  const [user, setUser] = React.useState({
    regNo: '',
    password: '',
    captcha: ''
  });

  const [captcha, setCaptcha] = useState('');

  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, [])

  const generateCaptcha = () => {
    const captcha = generate();
    setCaptcha(captcha)
  }

  const handleLogin = () => {
    let error = [];
    Object.keys(user).map(item => {
      if (user[item] == '') {
        error.push(item)
      }
    })
    if (error.length) {
      setError(error.join(', ') + ' is required');
      return;
    }
    if (!(captcha === user.captcha)) {
      setError('Incorrect captcha!');
      generateCaptcha();
      return;
    }
    setError('');
    signInUser(user).then(res => {
      if (res.data.status) {
        cookie.set('Authorization', res.data.authToken);
        cookie.set('name', res.data.name);
        cookie.set('type', res.data.type);
        navigate('/Examination');
      }
      else {
        setError(res.data.error)
      }
    })
  }
  return (
    <>
      <Header />
      <div className="row" style={{ paddingTop: "70px" }}>
        <div className="col-4"></div>
        <div className="col-4">
          <div class="card">
            <div class="card-header list-group-item-info">Applicant Login</div>
            <div class="card-body">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1" style={{width: '50px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/></svg>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Registration No."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={user.regNo}
                  onChange={(e) => setUser({ ...user, regNo: e.target.value })}
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1" style={{width: '50px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/></svg>
                </span>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <div class="input-group mb-3" >
                <span className="generated-captcha">{captcha}</span>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1" style={{width: '50px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M480 80C480 53.49 458.5 32 432 32h-288C117.5 32 96 53.49 96 80V384h384V80zM378.9 166.8l-88 112c-4.031 5.156-10 8.438-16.53 9.062C273.6 287.1 272.7 287.1 271.1 287.1c-5.719 0-11.21-2.019-15.58-5.769l-56-48C190.3 225.6 189.2 210.4 197.8 200.4c8.656-10.06 23.81-11.19 33.84-2.594l36.97 31.69l72.53-92.28c8.188-10.41 23.31-12.22 33.69-4.062C385.3 141.3 387.1 156.4 378.9 166.8zM528 288H512v112c0 8.836-7.164 16-16 16h-416C71.16 416 64 408.8 64 400V288H48C21.49 288 0 309.5 0 336v96C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48v-96C576 309.5 554.5 288 528 288z"/></svg>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="ENTER CAPTCHA"
                  aria-label="ENTER CAPTCHA"
                  aria-describedby="basic-addon1"
                  value={user.captcha}
                  onChange={(e) => setUser({ ...user, captcha: e.target.value })}
                />
                <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={generateCaptcha}>
                  <img src="https://crsuonlineexam.in/Images/refresh.png" alt="" />
                </span>
              </div>
              <div class="input-group mb-3 bg-danger">
                {error}
              </div>
              <div className="row">
                  <div className="col-2" style={{marginLeft: '10px'}}>
                      <button className="btn-success-1" onClick={handleLogin}>Login</button>
                  </div>
                  <div className="col-2" style={{marginLeft: '10px'}}>
                      <button className="btn-danger-1"onClick={() => navigate(-1)}>Back</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

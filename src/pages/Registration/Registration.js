import React from "react";
import { Header } from "../../components/Header/Header";
import "./Registration.css";
import { signUpUser } from '../../apiCall';
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [user, setUser] = React.useState({
    regNo: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const handleRegistration = () => {
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
    if (user.password !== user.confirmPassword) {
      setError('password and confirm password not matching');
      return;
    }
    setError('');
    signUpUser(user).then(res => {
      if (res.data.status) {
        navigate('/MyExams');
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
            <div class="card-header list-group-item-info">Applicant Registration</div>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
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
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1" style={{width: '50px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/></svg>
                </span>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  value={user.confirmPassword}
                  onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                />
              </div>
              <div class="input-group mb-3 bg-danger">
                {error}
              </div>
              <div className="row">
                  <div className="col-2" style={{marginLeft: '10px'}}>
                      <button className="btn-success-1" onClick={handleRegistration}>Register</button>
                  </div>
                  <div className="col-2" style={{marginLeft: '10px'}}>
                      <button className="btn-danger-1" onClick={() => navigate(-1)}>Back</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

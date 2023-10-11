import { Field, Form, Formik } from "formik";
import React from "react";


import { Link, useNavigate } from "react-router-dom";
import { addJwtTokentoLocalStore, getDecode, inforFromToken, loginByEmailAndPassword } from "../service/WinesService";
import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const result = await loginByEmailAndPassword(values);
            console.log(result);
          
            if (result && result.status === 403) {
              Swal.fire({
                icon: 'error',
                timer: 2000,
                title: 'Email or Password incorrect'
              });
            } else {
              addJwtTokentoLocalStore(result.token);
              const jwt = inforFromToken(result.token);
              console.log(jwt.users);
          
              Swal.fire({
                icon: 'success',
                title: 'Login success',
                timer: 2000
              });
              navigate('/home');
            }
          } catch (error) {
        
            console.log(error);
          }
       

    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }
                }
                onSubmit={(values) => handleLogin(values)}
            >
                <div>
                    <section className="ftco-section" style={{ backgroundImage: 'url(https://wineudesign.com/wp-content/uploads/2022/04/anna-hecker-cJdwPzls6kg-unsplash.jpg)', height: '747px' }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-6 text-center mb-3">
                                    <h1 style={{ color: "white", fontSize: 50 }}>Login</h1>
                                </div>
                            </div>
                            <div>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="login-wrap p-0">
                                            <Form action="#" className="signin-form">
                                                <div className="form-group">
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        name="email"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <Field
                                                        id="password-field"
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="form-control btn btn-primary submit px-3"
                                                    >
                                                        Sign In
                                                    </button>
                                                </div>
                                                <div className="form-group d-md-center">
                                                    <div
                                                        className="text-md-center"

                                                    >
                                                        <a className="checkbox-wrap checkbox-primary" style={{ fontSize: '25px', color: 'white' }}>Sign up</a>
                                                    </div>

                                                </div>
                                            </Form>
                                            <p className="w-100 text-center" style={{ fontSize: '15px', color: 'white ' }}>— Or Sign In With —</p>
                                            <div className="social d-flex text-center">
                                                <a href="#" className="btn btn-primary py-3 px-4" style={{ width: '205px', marginRight: '4px' }}>
                                                    <span className="ion-logo-facebook mr-2" />
                                                    Facebook
                                                </a>
                                                <a href="#" className="btn btn-primary py-3 px-4" style={{ width: '200px' }}>
                                                    <span className="ion-logo-twitter mr-2" />
                                                    Google
                                                </a>
                                            </div>
                                            <div className="social d-flex text-center">
                                                <Link to={`/home`} className="btn btn-primary py-3 px-4" style={{ width: '50%', marginTop: '10px', marginLeft: '82px' }}>

                                                    Back
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Formik>
        </>

    )
}
export default Login;
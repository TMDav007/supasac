import React, { useState } from 'react';
import { all_routes } from '../../../Router/all_routes';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../utils/schema';
import { useLoginMutation } from '../../../core/redux/api/admin/authApiSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../../core/redux/auth/authSlice';

function Signin({ superAdminSignin }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const dispatch = useDispatch();
  const route = all_routes;

  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const res = await login(formData).unwrap();
      toast.success('login successfully', {
        autoClose: 2000,
        closeOnClick: true,
        theme: 'light',
      });
      dispatch(setCredentials(res.data.userInfo));
      localStorage.setItem('token', res.data.accessToken);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper bg-img">
            <div className="login-content authent-content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-userset">
                  <div className="login-logo logo-normal">
                    <ImageWithBasePath src="assets/img/logo.png" alt="img" />
                  </div>
                  <Link to={route.dashboard} className="login-logo logo-white">
                    <ImageWithBasePath
                      src="assets/img/logo-white.png"
                      alt="Img"
                    />
                  </Link>
                  <div className="login-userheading">
                    <h3>Sign In</h3>
                    <h4 className="fs-16">
                      Access the Dreamspos panel using your email and passcode.
                    </h4>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Email <span className="text-danger"> *</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        {...register('email')}
                        className="form-control border-end-0"
                      />
                      <span className="input-group-text border-start-0">
                        <i className="ti ti-mail" />
                      </span>
                    </div>
                    {errors.email && (
                      <span className="text-red">{errors.email.message}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Password <span className="text-danger"> *</span>
                    </label>
                    <div className="pass-group">
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        {...register('password')}
                        className="pass-input form-control"
                      />
                      <span
                        className={`ti toggle-password ${
                          isPasswordVisible ? 'ti-eye' : 'ti-eye-off'
                        }`}
                        onClick={togglePasswordVisibility}
                      ></span>
                    </div>
                    {errors.password && (
                      <div className="text-red">{errors.password.message}</div>
                    )}
                  </div>
                  <div className="form-login authentication-check">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="custom-control custom-checkbox">
                          <label className="checkboxs ps-4 mb-0 pb-0 line-height-1 fs-16 text-gray-6">
                            <input type="checkbox" className="form-control" />
                            <span className="checkmarks" />
                            Remember me
                          </label>
                        </div>
                        <div className="text-end">
                          <Link
                            className="text-orange fs-16 fw-medium"
                            to={route.forgotPassword}
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-login">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      {isSubmitting ? (
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </div>
                  {!superAdminSignin && (
                    <>
                      <div className="signinform">
                        <h4>
                          New on our platform?
                          <Link to={route.register} className="hover-a">
                            {' '}
                            Create an account
                          </Link>
                        </h4>
                      </div>
                      <div className="form-setlogin or-text">
                        <h4>OR</h4>
                      </div>

                      <div className="mt-2">
                        <div className="d-flex align-items-center justify-content-center flex-wrap">
                          <div className="text-center me-2 flex-fill">
                            <Link
                              to="#"
                              className="br-10 p-2 btn btn-info d-flex align-items-center justify-content-center"
                            >
                              <ImageWithBasePath
                                className="img-fluid m-1"
                                src="assets/img/icons/facebook-logo.svg"
                                alt="Facebook"
                              />
                            </Link>
                          </div>
                          <div className="text-center me-2 flex-fill">
                            <Link
                              to="#"
                              className="btn btn-white br-10 p-2  border d-flex align-items-center justify-content-center"
                            >
                              <ImageWithBasePath
                                className="img-fluid m-1"
                                src="assets/img/icons/google-logo.svg"
                                alt="Facebook"
                              />
                            </Link>
                          </div>
                          <div className="text-center flex-fill">
                            <Link
                              to="#"
                              className="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center"
                            >
                              <ImageWithBasePath
                                className="img-fluid m-1"
                                src="assets/img/icons/apple-logo.svg"
                                alt="Apple"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="my-4 position-absolute bottom-0 start-50 translate-middle-x copyright-text">
                    <p>Copyright © 2025 DreamsPOS</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
}

export default Signin;

import { Formik, Form } from 'formik';
import useSigninForm from './useSignin';
import styles from './signin.module.scss';
import { NavLink } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import CustomInput from '../../../components/inputs/customInput/customInput';

const Signin = () => {
    const {
        SigninSchema,
        initialValues,
        handleSubmit,
        loading
    } = useSigninForm();

    return (
        <main className={styles.signin}>
            <section className="container-fluid">
                <div className="justify-content-center">
                    <div className={`p-sm-5 p-3 ${styles.signinForm}`}>
                        <h2 className="mb-4">Sign In</h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={SigninSchema}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form className='w-100'>

                                    {/* Email Field */}
                                    <CustomInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                    />

                                    {/* Password Field with Eye Toggle */}
                                    <CustomInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                    />

                                    <NavLink to='/auth/forget-password'>
                                        <p className='text-end mt-3'>Forget Password?</p>
                                    </NavLink>

                                    <button type="submit" className="btn-filled w-100 mt-3">
                                        {loading ? <PulseLoader color="#ffffff" size={5} /> : 'Sign In'}
                                    </button>

                                    <p className='text-center mt-3'>
                                        Not have an account? <NavLink to='/auth/signup'>Signup</NavLink>
                                    </p>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Signin;

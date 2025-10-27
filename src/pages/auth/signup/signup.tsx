import { Formik, Form } from 'formik';
import useSignupForm from './useSignup';
import styles from './signup.module.scss';
import { NavLink } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import CustomInput from '../../../components/inputs/customInput/customInput';
import CustomCheckbox from '../../../components/inputs/customCheckbox/customCheckbox';

const Signup = () => {
    const {
        SignupSchema,
        initialValues,
        passwordStrength,
        setPasswordStrength,
        passwordChecker,
        handleSubmit,
        loading
    } = useSignupForm();

    return (
        <main className={styles.signup}>
            <section className="container-fluid">
                <div>
                    <div className={`p-sm-5 p-3 ${styles.signupForm}`}>
                        <h2 className="">Sign Up</h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ handleChange }) => (
                                <Form className="w-100">

                                    <CustomInput
                                        label="Full Name"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                    />

                                

                                    <CustomInput
                                                label="Work Email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter email"
                                            />

                                    <CustomInput
                                                label="Phone (optional)"
                                                name="phone"
                                                placeholder="Enter phone number"
                                            />

                                    {/* Password with strength meter */}
                                    <CustomInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Create password"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleChange(e);
                                            setPasswordStrength(passwordChecker(e.target.value));
                                        }}
                                    />
                                    <div className={`mt-1 ${styles.passwordStrength}`}>
                                        Password strength:{' '}
                                        <span
                                            style={{
                                                color:
                                                    passwordStrength === 'Weak'
                                                        ? 'red'
                                                        : passwordStrength === 'Medium'
                                                            ? 'orange'
                                                            : 'green',
                                            }}
                                        >
                                            {passwordStrength}
                                        </span>
                                    </div>

                                    <CustomInput
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Re-enter password"
                                    />

                                    
                                    <CustomCheckbox name="acceptTerms" label="I accept the terms and conditions" />


                                    <button type="submit" className="btn-filled w-100 mt-3">
                                        {loading ? <PulseLoader color="#ffffff" size={5} /> : "Create Account"}
                                    </button>

                                    <p className='text-center mt-3'>
                                        Already have an account? <NavLink to='/auth/signin'>Signin</NavLink>
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

export default Signup;

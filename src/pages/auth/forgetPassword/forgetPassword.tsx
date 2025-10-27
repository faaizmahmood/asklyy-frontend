/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import styles from "./forgetPassword.module.scss";
import CustomInput from "../../../components/inputs/customInput/customInput";
import apiService from "../../../utils/apiClient";
import { PulseLoader } from "react-spinners";
import Modal from "../../../components/modal/modal";
import doneImg from '../../../assets/imgs/done.gif'

// ✅ Validation schema with Yup
const ForgetPasswordSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
});

const ForgetPassword = () => {
    // 🔹 State for modal
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    // ✅ Form submission handler
    const handleSubmit = async (values: { email: string }, { resetForm }: any) => {
        try {
            // 🔹 API call

            const res = await apiService.post("/email/request-password-reset", {
                email: values.email,
            });

            console.log(res)

            // 🔹 Show modal + success toast
            setShowModal(true);
            // toast.success(res.data?.msg || "Reset link sent!");

            // Optional: clear form
            resetForm();
        } catch (error: any) {
            console.error(error);
            toast.error(
                error.response?.data?.msg || "Failed to send reset email. Try again."
            );
        }
    };

    return (
        <section className={styles.forgetPassword}>
            <div className={styles.wrapper}>
                <h3 className="text-start">Forget Password</h3>
                <p className="mb-5">
                    Enter your email so that we can send you password reset link.
                </p>

                {/* ✅ Wrap with Formik */}
                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={ForgetPasswordSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <CustomInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                            />

                            {/* ✅ Submit button */}
                            <button
                                type="submit"
                                className="btn-filled mt-4 w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <PulseLoader color="#ffffff" size={5} /> : "Send Reset Link"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <NavLink to="/auth/signin">
                    <p className="text-center mt-4">
                        Back to <span>Login</span>
                    </p>
                </NavLink>
            </div>

            {/* ✅ Success Modal */}
            <Modal showModal={showModal} handleClose={handleClose}>
                <div className={styles.successContainer}>
                    <div>
                        <img src={doneImg} width={100}/>
                    </div>
                </div>
                <h4 className="mt-sm-2">Reset Email Sent!</h4>
                <p className="text-muted">
                    Please check your inbox and follow the link to reset your password.
                </p>

            </Modal>
        </section >
    );
};

export default ForgetPassword;

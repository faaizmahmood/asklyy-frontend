/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./resetPassword.module.scss"; // ✅ reuse same styles
import CustomInput from "../../../components/inputs/customInput/customInput";
import apiService from "../../../utils/apiClient";
import { PulseLoader } from "react-spinners";
import Modal from "../../../components/modal/modal";
import doneImg from '../../../assets/imgs/done.gif'
import { toast } from "sonner";

// ✅ Validation schema with Yup
const ResetPasswordSchema = Yup.object({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

const ResetPassword = () => {
    const { token } = useParams();

    const navigate = useNavigate();

    // 🔹 State for modal
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    // ✅ Form submission handler
    const handleSubmit = async (
        values: { password: string; confirmPassword: string },
        { resetForm }: any
    ) => {
        try {
            const res = await apiService.post("/auth/reset-password", {
                token,
                newPassword: values.password,
            });

            // ✅ Backend success message
            toast.success(res.data?.msg || "Password reset successful!");

            setShowModal(true);
            resetForm();

            setTimeout(() => navigate("/auth/signin"), 2000);
        } catch (error: any) {
            console.error("Full error:", error);

            const message =
                error.response?.data?.msg ||
                error.response?.data?.message ||
                error.customMessage || // ✅ from interceptor
                error.message ||       // ✅ fallback
                "Failed to reset password. Try again.";

            toast.error(message);
        }
    };


    return (
        <section className={styles.resetPassword}>
            <div className={styles.wrapper}>
                <h3 className="text-start">Reset Password</h3>
                <p className="mb-4">Enter your new password below.</p>

                {/* ✅ Wrap with Formik */}
                <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <CustomInput
                                label="New Password"
                                name="password"
                                type="password"
                                placeholder="Enter new password"
                            />

                            <CustomInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter new password"
                            />

                            {/* ✅ Submit button */}
                            <button
                                type="submit"
                                className="btn-filled mt-4 w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <PulseLoader color="#ffffff" size={5} />
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* ✅ Success Modal */}
            <Modal showModal={showModal} handleClose={handleClose}>
                <div className={styles.successContainer}>
                    <div>
                        <img src={doneImg} width={100} />
                    </div>
                    <h4 className="mt-sm-5">Password Updated!</h4>
                    <p className="text-muted">
                        Your password has been reset successfully. You can now log in with
                        your new password.
                    </p>
                </div>
            </Modal>
        </section>
    );
};

export default ResetPassword;

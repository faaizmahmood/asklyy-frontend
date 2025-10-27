/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import * as Yup from 'yup';
import apiService from '../../../utils/apiClient';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const useSignup = () => {

    const [passwordStrength, setPasswordStrength] = useState('');
    const [loading, setLoading] = useState(false)

    const passwordChecker = (password: string) => {
        if (password.length < 8) return 'Weak';
        if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])/.test(password)) return 'Strong';
        return 'Medium';
    };

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Must contain an uppercase letter')
            .matches(/[a-z]/, 'Must contain a lowercase letter')
            .matches(/\d/, 'Must contain a number')
            .matches(/[@$!%*#?&]/, 'Must contain a special character')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
        phone: Yup.string().optional(),
        acceptTerms: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions'),
    });

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        acceptTerms: false,
    };

    const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
        try {
            console.log('Form Submitted', values);
            setLoading(true);

            const response = await apiService.post('/auth/signup', values);

            // ✅ Expecting same response structure as signin
            const { accessToken } = response.data;

            // ✅ Store access token
            Cookies.set('authToken', accessToken, { expires: 7 });

            toast.success("Signup successful! Welcome 🎉");
            resetForm();
            setPasswordStrength('');

            window.location.href = '/chatbots';

        } catch (error: any) {
            console.error('Signup Error:', error?.response?.data || error.message);
            toast.error(error?.response?.data?.message || 'Signup Failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        SignupSchema,
        initialValues,
        passwordStrength,
        setPasswordStrength,
        passwordChecker,
        handleSubmit,
        loading
    };
}

export default useSignup;

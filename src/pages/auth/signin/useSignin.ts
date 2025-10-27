/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import * as Yup from 'yup';
import apiService from '../../../utils/apiClient';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const useSigninForm = () => {
    const [loading, setLoading] = useState(false);

    const SigninSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            setLoading(true);

            const res = await apiService.post('/auth/signin', values);

            // ✅ Expecting both tokens in response
            const { accessToken } = res.data;

            // ✅ Store access token in cookie (or memory if you prefer)
            Cookies.set('authToken', accessToken, { expires: 7 });


            toast.success('Login successful');

            window.location.href = '/chatbots';

        } catch (error: any) {
            console.error('Signin Error:', error?.response?.data || error.message);
            toast.error(error?.response?.data?.message || 'Signin Failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        SigninSchema,
        initialValues,
        handleSubmit,
        loading
    };
};

export default useSigninForm;

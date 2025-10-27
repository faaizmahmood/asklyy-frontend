/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { toast } from "sonner"
import apiService from "../../utils/apiClient"

const useEmailVerificationBanner = () => {

    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const handleSendVerificationEmail = async () => {
        try {
            setLoading(true)
            await apiService.post('/email/verification-mail', {})
            setOpenModal(true)
        } catch (err: any) {
            toast.error(err?.response?.data?.msg || "Failed to send email")
        } finally {
            setLoading(false)
        }
    }

    return {
        handleSendVerificationEmail,
        loading,
        openModal,
        setOpenModal
    }
}

export default useEmailVerificationBanner

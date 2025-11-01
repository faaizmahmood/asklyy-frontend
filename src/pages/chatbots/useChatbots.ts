/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import apiService from "../../utils/apiClient";
import { toast } from "sonner";
import NProgress from "../../utils/nprogressConfig";
import { useNavigate } from "react-router-dom";


const useChatbots = () => {

    const [showModal, setShowModal] = useState(false)

    const [chatBotCreationLoading, setChatBotCreationLoading] = useState(false)

    const [loading, setLoading] = useState(false);

    const [rows, setRows] = useState([])

    const navigate = useNavigate()

    const fetchChatbots = async () => {
        try {
            setLoading(true);
            const res = await apiService.get('/bot/get-bots');
            if (res?.data?.success) {
                setRows(res.data.data);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChatbots()
    }, [])



    const handleSubmit = async (values: any) => {
        try {

            setChatBotCreationLoading(true)

            const res = await apiService.post('/bot/create-bot', values);

            if (res.data?.success) {
                toast.success("Chatbot created successfully!");

                setShowModal(false);

                await fetchChatbots();
            } else {
                toast.error(res.data?.message || "Failed to create chatbot");
            }
        } catch (error: any) {
            console.error("Create Bot Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setChatBotCreationLoading(false)
        }
    };



    const handleDelete = async (id: any) => {

        try {
            NProgress.start();
            await apiService.delete(`/bot/delete/${id}`);
            toast.success("Chatbot deleted successfully!");
            fetchChatbots(); // ✅ Refresh list after success
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete chatbot. Please try again.");
        } finally {
            NProgress.done();
        }
    };

    const handleBlock = async (id: any) => {
        try {
            NProgress.start();
            const res = await apiService.patch(`/bot/${id}/block`);
            toast.success(res.data.message || "Chatbot status updated successfully!");
            fetchChatbots(); // Refresh list
        } catch (error) {
            console.error("Block bot error:", error);
            toast.error("Failed to block chatbot");
        } finally {
            NProgress.done();
        }
    };


    const handleEdit = (id: number) => console.log("Edit bot:", id);
    const handleTest = (id: any, name: string) => navigate(`/chatbots?test=${id}&name=${name}`);
    const handleCDNCopy = (id: any) =>{

        const cdnLink = `<script src="https://t5u8yd0o9j.execute-api.ap-south-1.amazonaws.com/widget.js" data-bot-id="${id}" async crossorigin="anonymous"></script>`;
    
        navigator.clipboard.writeText(cdnLink)
            .then(() => {
                toast.success("CDN link copied to clipboard!");
            })
            .catch((err) => {
                console.error("Could not copy text: ", err);
                toast.error("Failed to copy CDN link.");
            });

    };


    return {
        rows,
        handleDelete,
        handleBlock,
        handleEdit,
        handleTest,
        setShowModal,
        showModal,
        handleSubmit,
        chatBotCreationLoading,
        loading,
        handleCDNCopy
    }
}

export default useChatbots
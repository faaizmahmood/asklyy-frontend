/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid } from "@mui/x-data-grid";
import ActionsMenu from "./components/actionsMenu";
import useChatbots from "./useChatbots";
import Modal from "../../components/modal/modal";
import ChatbotForm from "./components/chatbotForm";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import TestBot from "../../components/testBot/testBot";


const Chatbots = () => {

    const {
        rows,
        handleDelete,
        handleBlock,
        handleEdit,
        handleTest,
        setShowModal,
        showModal,
        handleSubmit,
        chatBotCreationLoading,
        loading
    } = useChatbots()

    const [searchParams] = useSearchParams();
    const test = searchParams.get("test");

    const navigate = useNavigate()

    const columns = [
        { field: "botId", headerName: "Bot ID", width: 80 },
        { field: "name", headerName: "Bot Name", flex: 1 },
        { field: "purpose", headerName: "Purpose", flex: 1 },
        { field: "organization", headerName: "Organization", width: 120 },
        { field: "targetAudience", headerName: "Target Audience", width: 160 },
        { field: "persona", headerName: "Persona", width: 140 },
        { field: "tone", headerName: "Tone", width: 120 },
        { field: "entriesCount", headerName: "Entries", width: 80 },
        {
            field: "createdAt",
            headerName: "Created",
            width: 80,
            valueGetter: (params: any) => dayjs(params.value).format("DD MMM YYYY"),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 80,
            renderCell: (params: any) => (
                <ActionsMenu
                    status={params.row.status}
                    id={params.row.id}
                    name={params.row.name}
                    onEdit={handleEdit}
                    onBlock={handleBlock}
                    onDelete={handleDelete}
                    onTest={handleTest}
                />
            ),
        },
    ];

    return (
        <>
            <div style={{ height: 400, width: "100%" }}>
                <div className="text-end mb-3">
                    <button className="btn-filled" onClick={() => { setShowModal(true) }}>Add New Bot</button>
                </div>
                <DataGrid rows={rows} loading={loading} columns={columns} pageSizeOptions={[5, 10]} />
            </div>

            <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
                <ChatbotForm onSubmit={(values) => handleSubmit(values)} chatBotCreationLoading={chatBotCreationLoading} />
            </Modal>

            <>
                {test && <TestBot handleClose={()=> navigate('/chatbots') }/>}
            </>

        </>
    );
};

export default Chatbots;

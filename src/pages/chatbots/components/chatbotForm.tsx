/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import CustomInput from "../../../components/inputs/customInput/customInput";
import CustomSelect from "../../../components/inputs/customSelect/customSelect";
import CustomTextArea from "../../../components/inputs/customTextArea/customTextArea";
import { PulseLoader } from "react-spinners";

const initialValues = {
    organization: "",
    name: "",
    purpose: "",
    targetAudience: "",
    persona: "",
    fallback: "",
    tone: "",
    entries: [{ question: "", answer: "" }],
};

const validationSchema = Yup.object({
    organization: Yup.string().required("Organization name is required"),
    name: Yup.string().required("Bot name is required"),
    purpose: Yup.string().required("Purpose is required"),
    targetAudience: Yup.string().required("Target audience is required"),
    persona: Yup.string().required("Bot persona description is required"),
    fallback: Yup.string().required("Fallback response is required"),
    tone: Yup.string().required("Tone is required"),
    entries: Yup.array()
        .of(
            Yup.object({
                question: Yup.string().required("Question is required"),
                answer: Yup.string().required("Answer is required"),
            })
        )
        .min(1, "At least one entry is required")
        .max(20, "Cannot exceed 20 entries"),
});

type ChatbotFormProps = {
  onSubmit: (values: any) => void;
  chatBotCreationLoading: boolean;
};

const ChatbotForm: React.FC<ChatbotFormProps> = ({ onSubmit, chatBotCreationLoading }) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values }) => (
                <Form className="text-start">
                    
                    <CustomInput name="organization" label="Organization / Brand Name" placeholder="E.g. Phoenix Solar Solutions" />

                    <CustomInput name="name" label="Bot Name" placeholder="E.g. Phoenix Support Bot" />

                    <CustomTextArea name="purpose" label="What is the purpose of this bot?" placeholder="Explain why you're creating this bot" />

                    <CustomInput name="targetAudience" label="Target Audience" placeholder="E.g. New website visitors / Existing Customers" />

                    <CustomTextArea name="persona" label="Bot Persona Description" placeholder='E.g. "Friendly and polite, short replies"' />

                    <CustomTextArea name="fallback" label="Fallback Reply" placeholder='E.g. "I’m not sure about that yet, please ask something else!"' />

                    <CustomSelect
                        name="tone"
                        label="Tone"
                        options={[
                            { value: "friendly", label: "Friendly" },
                            { value: "formal", label: "Formal" },
                            { value: "casual", label: "Casual" },
                        ]}
                    />

                    {/* Dynamic Entries */}
                    <FieldArray name="entries">
                        {({ push, remove }) => (
                            <>
                                {values.entries.map((_, index) => (
                                    <div key={index} className="entry-group">
                                        <CustomInput name={`entries.${index}.question`} label={`Question ${index + 1}`} placeholder="Type question" />
                                        <CustomInput name={`entries.${index}.answer`} label={`Answer ${index + 1}`} placeholder="Type answer" />

                                        {index > 0 && (
                                            <div className="text-end" onClick={() => remove(index)}>
                                                <AiOutlineDelete style={{ cursor: 'pointer' }} />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {values.entries.length < 20 && (
                                    <button
                                        type="button"
                                        className="btn-outlined mt-2"
                                        onClick={() => push({ question: "", answer: "" })}
                                    >
                                        <AiOutlinePlus /> Add Entry
                                    </button>
                                )}
                            </>
                        )}
                    </FieldArray>

                    <button type="submit" className="btn-filled mt-4 w-100" disabled={chatBotCreationLoading}>{chatBotCreationLoading ? <PulseLoader color="#ffffff" size={5} /> : "Create Bot"}</button>
                </Form>
            )}
        </Formik>
    );
};

export default ChatbotForm;

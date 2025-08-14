import { useForm, useController } from "react-hook-form";
import { Input } from "@material-tailwind/react";

const InputComp = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => console.log(data);

    const { field, fieldState } = useController({
        control,
        defaultValue: "",
        name: "email",
        rules: {
            required: "email is",
            pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email format",
            },
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...field} label="email" error={!!fieldState.error} />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
};

export default InputComp;

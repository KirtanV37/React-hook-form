/*
isDirty is a property from the formState object in React Hook Form. It tells you whether any of the form fields have been modified from their initial values (the defaultValues).
*/

import { useForm } from "react-hook-form";

const FormTweleve = () => {
    const {
        register,
        handleSubmit,
        formState: { isDirty, errors },
    } = useForm({ defaultValues: { email: "" } });

    const onSubmit = (data) => {
        console.log("data", data);
        alert(`Submitted: ${JSON.stringify(data)}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                    },
                })}
                placeholder="Enter your email"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            <button type="submit" disabled={!isDirty}>
                Submit
            </button>
            <div>
                <small>Form isDirty: {isDirty ? "true" : "false"}</small>
            </div>
        </form>
    );
};

export default FormTweleve;

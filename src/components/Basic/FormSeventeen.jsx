/*
isReady is a boolean property from formState that indicates whether the form has finished its initial mount and is ready for user interaction.
*/


import { useForm } from "react-hook-form";

const FormSeventeen = () => {
    const {
        register,
        handleSubmit,
        formState: { isReady },
    } = useForm({
        defaultValues: { email: "" }
    });

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
    };

    if (!isReady) {
        return <p>Loading form...</p>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", { required: "Email is required" })} placeholder="Email" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormSeventeen;

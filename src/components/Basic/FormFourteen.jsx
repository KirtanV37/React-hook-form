/*
touchedFields is part of formState and tracks which fields have been focused and then blurred (i.e., interacted with).
*/

import { useForm } from "react-hook-form";

const FormFourteen = () => {
    const {
        register,
        handleSubmit,
        formState: { touchedFields, errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("touchedFields", touchedFields);
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
            />
            {touchedFields.username && <p>Username field was touched.</p>}
            {errors.username && (
                <p style={{ color: "red" }}>{errors.username.message}</p>
            )}
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormFourteen;

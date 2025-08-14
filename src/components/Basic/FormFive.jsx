import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormFive = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("username", "JohnDoe");
    }, [setValue]);

    const onSubmit = (data) => console.log("data", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username:</label>
                <input
                    {...register("username", { required: "username is required" })}
                />
                {errors.username && (
                    <p style={{ color: "red" }}>{errors.username.message}</p>
                )}
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default FormFive;

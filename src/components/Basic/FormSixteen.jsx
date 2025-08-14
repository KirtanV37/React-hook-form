import React from "react";
import { useForm } from "react-hook-form";

const FormSixteen = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValidating },
        trigger,
    } = useForm();

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
    };

    const validateUsername = async () => {
        const result = await trigger("username");
        if (result) {
            alert("Username is valid!");
        } else {
            alert("Username is invalid!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ maxWidth: 300, margin: "auto" }}
        >
            <input
                placeholder="Username"
                {...register("username", {
                    required: "Username is required",
                    validate: async (value) => {
                        // Simulate async validation (e.g., checking username availability)
                        await new Promise((r) => setTimeout(r, 1000));
                        return value !== "admin" || "Username 'admin' is not allowed";
                    },
                })}
            />
            {errors.username && (
                <p style={{ color: "red" }}>{errors.username.message}</p>
            )}

            <button type="button" onClick={validateUsername} disabled={isValidating}>
                {isValidating ? "Validating..." : "Validate Username"}
            </button>

            <button type="submit">Submit</button>
        </form>
    );
};

export default FormSixteen;

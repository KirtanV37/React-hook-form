import React from "react";
import { useForm } from "react-hook-form";

const FormSeven = () => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm();

    const onValidateClick = async () => {
        const isValid = await trigger(["email", "password"]); // Validate both fields
        if (isValid) {
            alert("All fields are valid!");
        } else {
            alert("Please fix validation errors.");
        }
    };

    const onSubmit = (data) => {
        console.log("Submitted Data:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Min 6 characters required" },
                    })}
                />
                {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
            </div>

            <button type="button" onClick={onValidateClick}>
                Validate Fields
            </button>

            <button type="submit">Submit</button>
        </form>
    );
};

export default FormSeven;

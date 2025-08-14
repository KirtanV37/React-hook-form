import React from "react";
import { useForm } from "react-hook-form";

const FormSix = () => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };

    const handleBlur = async () => {
        const result = await trigger("email");
        console.log("Validation result:", result);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                    onBlur={handleBlur}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormSix;

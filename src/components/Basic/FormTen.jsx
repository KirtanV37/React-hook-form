// onTouched

import { useForm } from "react-hook-form";

const FormTen = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onTouched" });

    const onSubmit = (data) => {
        console.log("Submitted:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-10">
            <label>
                Email:
                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                />
            </label>
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

            <button type="submit">Submit</button>
        </form>
    );
};

export default FormTen;

//  All :- onBlur, onChange, onTouched
import { useForm } from "react-hook-form";

const FormEleven = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "all" });

    const onSubmit = (data) => {
        console.log("Submitted:", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm mx-auto mt-10 space-y-4"
        >
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    className="block border px-3 py-2 w-full"
                    placeholder="Enter email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    className="block border px-3 py-2 w-full"
                    placeholder="Enter password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                {errors.password && (
                    <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={!isValid}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
                Submit
            </button>
        </form>
    );
};

export default FormEleven;

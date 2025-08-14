// onChange event

import { useForm } from "react-hook-form";

const FormNine = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log("Submitted:", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm mx-auto mt-10 space-y-4"
        >
            <div>
                <label className="block font-medium">Username:</label>
                <input
                    type="text"
                    placeholder="Enter username"
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters",
                        },
                    })}
                    className={`mt-1 w-full border px-3 py-2 rounded ${errors.username ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.username && (
                    <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
};

export default FormNine;

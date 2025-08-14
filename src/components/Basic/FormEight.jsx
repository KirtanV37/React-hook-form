// onBlur event

import { useForm } from "react-hook-form";

const FormEight = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({ mode: "onBlur" });

    const onSubmit = (data) => {
        console.log("Submitted:", data);
    };

    // const handleFocus = async () => {
    //     const isValid = await trigger('email')
    //     if (isValid) {
    //         console.log('Email is valid');

    //     } else {
    //         alert('enter the email')
    //     }
    // }  it goes on ∞ loop

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
        >
            <label className="font-medium text-gray-700">
                Email:
                <input
                    type="email"
                    className={`mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${errors.email
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-blue-200"
                        }`}
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Email is not valid",
                        },
                    })}
                    onFocus={() => trigger("email")}
                />
            </label>
            {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
            <button
                type="submit"
                className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </form>
    );
};

export default FormEight;

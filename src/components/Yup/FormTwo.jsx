import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
    name: yup.string().required("Name is required"),

    email: yup.string().email("Invalid email").required("Email is required"),

    age: yup
        .number()
        .typeError("Age must be a number")
        .positive("Age must be positive")
        .integer("Age must be an integer")
        .required("Age is required"),

    gender: yup.string().required("Gender is required"),

    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),

    country: yup.string().required("Country is required"),

    terms: yup.boolean().oneOf([true], "You must accept the terms"),

    profilePic: yup
        .mixed()
        .test(
            "required",
            "Profile picture is required",
            (value) => value && value.length > 0
        )
        .test(
            "fileSize",
            "File too large",
            (value) => !value || (value[0] && value[0].size <= 1024 * 1024)
        ),

    skills: yup.array().min(1, "Select at least one skill").required(),
});


const FormOne = () => {
    const {
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid,
            isSubmitted,
            isSubmitSuccessful,
        },
        register,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            gender: "male",
            country: "ind",
            skills: ["Vue", "Node"],
        },
    });

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            profilePic: data.profilePic[0]?.name,
        };
        console.log("Form Data:", formattedData);
        alert(JSON.stringify(formattedData));
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
            noValidate
        >
            {/* Name */}
            <div>
                <label
                    className="block mb-1 font-semibold text-gray-700"
                    htmlFor="name"
                >
                    Name:
                </label>
                <input
                    id="name"
                    placeholder="Name"
                    {...register("name")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.name && (
                    <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
                )}
            </div>

            {/* Age */}
            <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="age">
                    Age:
                </label>
                <input
                    id="age"
                    placeholder="Age"
                    type="number"
                    {...register("age")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.age ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.age && (
                    <p className="text-red-600 mt-1 text-sm">{errors.age.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label
                    className="block mb-1 font-semibold text-gray-700"
                    htmlFor="email"
                >
                    Email:
                </label>
                <input
                    id="email"
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.email && (
                    <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label
                    className="block mb-1 font-semibold text-gray-700"
                    htmlFor="password"
                >
                    Password:
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.password && (
                    <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label
                    className="block mb-1 font-semibold text-gray-700"
                    htmlFor="confirmPassword"
                >
                    Confirm Password:
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.confirmPassword && (
                    <p className="text-red-600 mt-1 text-sm">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* Gender (Radio buttons) */}
            <fieldset className="mb-4">
                <legend className="font-semibold text-gray-700 mb-2">Gender:</legend>
                <label className="inline-flex items-center mr-4">
                    <input
                        type="radio"
                        value="male"
                        {...register("gender")}
                        className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value="female"
                        {...register("gender")}
                        className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Female</span>
                </label>
                {errors.gender && (
                    <p className="text-red-600 mt-1 text-sm">{errors.gender.message}</p>
                )}
            </fieldset>

            {/* Country (Select) */}
            <div>
                <label
                    className="block mb-1 font-semibold text-gray-700"
                    htmlFor="country"
                >
                    Select Country:
                </label>
                <select
                    id="country"
                    {...register("country")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.country ? "border-red-500" : "border-gray-300"
                        }`}
                >
                    <option value="">Select Country</option>
                    <option value="ind">IND</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                </select>
                {errors.country && (
                    <p className="text-red-600 mt-1 text-sm">{errors.country.message}</p>
                )}
            </div>

            {/* Skills (Checkboxes) */}
            <fieldset className="mb-4">
                <legend className="font-semibold text-gray-700 mb-2">Skills:</legend>
                <label className="inline-flex items-center mr-4">
                    <input
                        type="checkbox"
                        value="React"
                        {...register("skills")}
                        className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2">React</span>
                </label>
                <label className="inline-flex items-center mr-4">
                    <input
                        type="checkbox"
                        value="Vue"
                        {...register("skills")}
                        className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2">Vue</span>
                </label>
                <label className="inline-flex items-center mr-4">
                    <input
                        type="checkbox"
                        value="Angular"
                        {...register("skills")}
                        className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2">Angular</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        value="Node"
                        {...register("skills")}
                        className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2">Node</span>
                </label>
                {errors.skills && (
                    <p className="text-red-600 mt-1 text-sm">{errors.skills.message}</p>
                )}
            </fieldset>

            {/* Profile Picture (File input) */}
            <div>
                <label
                    className="block mb-1 font-semibold text-gray-700"
                    htmlFor="profilePic"
                >
                    Profile Picture:
                </label>
                <input
                    id="profilePic"
                    type="file"
                    {...register("profilePic")}
                    className={`w-full text-gray-700 border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.profilePic ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.profilePic && (
                    <p className="text-red-600 mt-1 text-sm">
                        {errors.profilePic.message}
                    </p>
                )}
            </div>

            {/* Terms (Checkbox) */}
            <div className="flex items-center">
                <input
                    id="terms"
                    type="checkbox"
                    {...register("terms")}
                    className="form-checkbox text-blue-600"
                />
                <label htmlFor="terms" className="ml-2 text-gray-700 font-semibold">
                    Accept Terms and Conditions
                </label>
            </div>
            {errors.terms && (
                <p className="text-red-600 mt-1 text-sm">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full py-2 mt-4 rounded-md text-white font-semibold transition-colors duration-200 ${isSubmitting
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {/* Status Messages */}
            {isSubmitted && !isSubmitting && (
                <p className="text-yellow-600 mt-3 text-center font-medium">
                    Form was submitted.
                </p>
            )}
            {isSubmitSuccessful && (
                <p className="text-green-600 mt-2 text-center font-medium">
                    Submit was successful!
                </p>
            )}
        </form>
    );
};

export default FormOne;

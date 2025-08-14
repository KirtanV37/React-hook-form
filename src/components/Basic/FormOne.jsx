import { useForm } from "react-hook-form";
import { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react"; // <-- Import Material Tailwind

const FormOne = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        trigger,
    } = useForm({
        defaultValues: {
            skills: ["js", "no"],
        },
    });

    const [step, setStep] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("profilePicture", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const stepsCount = 5;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                {/* Stepper */}
                <Stepper
                    activeStep={step - 1}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                    className="mb-8"
                >
                    <Step onClick={() => setStep(1)}>1</Step>
                    <Step onClick={() => setStep(2)}>2</Step>
                    <Step onClick={() => setStep(3)}>3</Step>
                    <Step onClick={() => setStep(4)}>4</Step>
                    <Step onClick={() => setStep(5)}>5</Step>
                </Stepper>
                <h1 className="text-3xl font-bold text-center text-slate-900 mb-6">
                    Form
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {step === 1 && (
                        <>
                            <h2 className="text-xl font-semibold text-center mb-4">
                                Personal Information
                            </h2>
                            <div className="flex flex-col gap-6">
                                {/* ...existing fields... */}
                                {/* First Name, Last Name, Gender */}
                                {/* ...existing code... */}
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">
                                        First Name:
                                        <input
                                            type="text"
                                            placeholder="Enter a name"
                                            autoComplete="name"
                                            className={`mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${errors.name
                                                    ? "border-red-500 focus:ring-red-200"
                                                    : "border-gray-300 focus:ring-blue-200"
                                                }`}
                                            {...register("name", {
                                                required: "Name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Name must be at least 2 letters",
                                                },
                                            })}
                                        />
                                    </label>
                                    {errors.name && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">
                                        Last Name (Optional):
                                        <input
                                            type="text"
                                            placeholder="Enter last name"
                                            className={`mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${errors.last
                                                    ? "border-red-500 focus:ring-red-200"
                                                    : "border-gray-300 focus:ring-blue-200"
                                                }`}
                                            {...register("last", {
                                                minLength: {
                                                    value: 4,
                                                    message: "Last name must be at least 4 letters",
                                                },
                                            })}
                                        />
                                    </label>
                                    {errors.last && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.last.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <span className="block mb-1 font-medium text-gray-700">
                                        Gender:
                                    </span>
                                    <div className="flex gap-6 items-center">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                value="male"
                                                className="accent-blue-600"
                                                {...register("gender", {
                                                    required: "Gender is required",
                                                })}
                                            />
                                            Male
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                value="female"
                                                className="accent-blue-600"
                                                {...register("gender", {
                                                    required: "Gender is required",
                                                })}
                                            />
                                            Female
                                        </label>
                                    </div>
                                    {errors.gender && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.gender.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <h2 className="text-xl font-semibold text-center mb-4">
                                Account Information
                            </h2>
                            <div className="flex flex-col gap-6">
                                {/* ...existing fields... */}
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">
                                        Email:
                                        <input
                                            type="email"
                                            placeholder="Enter Email"
                                            autoComplete="email"
                                            className={`mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${errors.email
                                                    ? "border-red-500 focus:ring-red-200"
                                                    : "border-gray-300 focus:ring-blue-200"
                                                }`}
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                    message: "Email is not valid",
                                                },
                                                validate: {
                                                    notInDomain: (value) =>
                                                        value.includes(".in") ? ".in is not allowed" : true,
                                                },
                                            })}
                                        />
                                    </label>
                                    {errors.email && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">
                                        Password:
                                        <input
                                            type="password"
                                            placeholder="Enter password"
                                            autoComplete="current-password"
                                            className={`mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${errors.password
                                                    ? "border-red-500 focus:ring-red-200"
                                                    : "border-gray-300 focus:ring-blue-200"
                                                }`}
                                            {...register("password", {
                                                required: "password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "must be at least 6 letters",
                                                },
                                            })}
                                        />
                                    </label>
                                    {errors.password && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <h2 className="text-xl font-semibold text-center mb-4">
                                Career Information
                            </h2>
                            <div className="flex flex-col gap-6">
                                <label className="block mb-1 font-medium text-gray-700">
                                    Skills:
                                    <select
                                        multiple
                                        className={`mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${errors.skills
                                                ? "border-red-500 focus:ring-red-200"
                                                : "border-gray-300 focus:ring-blue-200"
                                            }`}
                                        {...register("skills", { required: "Skills is required" })}
                                    >
                                        <option value="js">Javascript</option>
                                        <option value="no">NodeJS</option>
                                        <option value="mo">MongoDb</option>
                                        <option value="re">ReactJS</option>
                                        <option value="ht">HTML</option>
                                    </select>
                                </label>
                                {errors.skills && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.skills.message}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <h2 className="text-xl font-semibold">Profile Setup</h2>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border p-2 w-full"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 w-32 h-32 object-cover rounded-full"
                                />
                            )}

                            <textarea
                                placeholder="Short Bio"
                                {...register("bio")}
                                className="border p-2 w-full"
                            ></textarea>
                        </>
                    )}
                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <Button
                            type="button"
                            onClick={() => setStep((s) => s - 1)}
                            disabled={isFirstStep}
                            color="gray"
                        >
                            Prev
                        </Button>
                        {step < stepsCount && (
                            <Button
                                type="button"
                                onClick={async () => {
                                    let valid = true;
                                    if (step === 1) {
                                        valid = await trigger(["name", "gender"]);
                                    }
                                    if (step === 2) {
                                        valid = await trigger(["email", "password"]);
                                    }
                                    if (step === 3) {
                                        valid = await trigger("skills");
                                    }
                                    if (step === 4) {
                                        valid = await trigger();
                                    }
                                    if (valid) setStep((s) => s + 1);
                                }}
                                disabled={isLastStep}
                                color="blue"
                            >
                                Next
                            </Button>
                        )}
                        {step === stepsCount && (
                            <Button type="submit" color="green">
                                Submit
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormOne;

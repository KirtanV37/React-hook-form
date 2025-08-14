/*

-> isSubmitted:- It is a boolean property from the formState object that becomes true after the form is submitted, regardless of whether the submission is successful or not.
-> isSubmitSuccessful:- Indicate the form was successfully submitted without any runtime error.
-> isSubmitting:- true if the form is currently being submitted. false otherwise.

*/

import { useForm } from "react-hook-form";

const FormFifteen = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitted, isSubmitting, isSubmitSuccessful },
    } = useForm();

    const onSubmit = async (data) => {
        // Simulate async operation
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Submitted Data:", data);
                resolve();
            }, 2000);
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-72 mx-auto mt-10"
        >
            <input
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="border px-3 py-2"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {/* Status indicators */}
            {isSubmitted && <p className="text-yellow-600">Form was submitted.</p>}
            {isSubmitSuccessful && (
                <p className="text-green-600">Submit was successful!</p>
            )}
        </form>
    );
};

export default FormFifteen;

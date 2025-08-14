import React from "react";
import { useForm, useFormState } from "react-hook-form";

function UseFormStateExample() {
    const { register, handleSubmit, control } = useForm();

    const { isDirty, errors } = useFormState({ control, name: ["firstName"] });

    console.log("UseFormStateExample re-rendered");

    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName", { required: true })} placeholder="First Name" />
            {errors.firstName && <p>First name is required</p>}

            <input {...register("lastName")} placeholder="Last Name" />

            <button type="submit" disabled={!isDirty}>
                Submit
            </button>
        </form>
    );
}

export default UseFormStateExample
import React from "react";
import { useForm } from "react-hook-form";

function FormStateExample() {
    const { register, handleSubmit, formState } = useForm();
    const { errors, isDirty } = formState;

    console.log("FormStateExample re-rendered");

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

export default FormStateExample
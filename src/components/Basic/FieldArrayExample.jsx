import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const FieldArrayExample = () => {

    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            users: [{ email: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "users"
    });

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>User Emails</h3>
            {fields.map((field, index) => (
                <div key={field.id} style={{ marginBottom: 8 }}>
                    <input
                        {...register(`users.${index}.email`, { required: "Email required" })}
                        placeholder="Enter email"
                        style={{ marginRight: 8 }}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ email: "" })}
                style={{ marginBottom: 16 }}
            >
                Add Email
            </button>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FieldArrayExample;
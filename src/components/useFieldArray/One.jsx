import { useForm, useFieldArray } from "react-hook-form";

const One = () => {
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            names: [{ name: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "names" }); // control:- used to connect useFieldArray to useForm.

    const onSubmit = (data) => console.log("data", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>List of names</h3>

            {fields.map((field, index) => (
                <div key={field.id} style={{ marginBottom: "10px" }}>
                    <input
                        {...register(`names.${index}.name`)}
                        placeholder={`Name ${index + 1}`}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Remove
                    </button>
                </div>
            ))}

            <button type="button" onClick={() => append({ name: "" })}>
                Add Name
            </button>

            <br />

            <button type="submit">Submit</button>
        </form>
    );
};

export default One;

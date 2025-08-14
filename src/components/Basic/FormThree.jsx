import { useForm, useWatch } from "react-hook-form";

const WatchField = ({ control }) => {
    const email = useWatch({ control, name: "email" });
    return <p>You type : {email}</p>;
};

const FormThree = () => {
    const { register, handleSubmit, control } = useForm();

    const onSubmit = (data) => console.log("data", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email:
                <input type="text" {...register("email")} />
            </label>

            <WatchField control={control} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default FormThree;

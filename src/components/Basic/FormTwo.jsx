import { useForm } from "react-hook-form";

const FormTwo = () => {

    const { watch, register, handleSubmit } = useForm();

    const emailVal = watch("email");

    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email:
                <input type="text" {...register("email")} />
            </label>

            <p>You typed: {emailVal}</p>
            <input type="number" {...register("age", { min: 18, max: 99 })} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormTwo;

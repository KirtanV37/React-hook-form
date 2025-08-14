import Zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = Zod.object({
    email: Zod.string().email("Email is required"),
});

const One = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => console.log("data", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} />
            {errors.email && <p className='text-red-900'>{errors.email.message}</p>}

            <button type="submit">Submit</button>
        </form>
    );
};

export default One;

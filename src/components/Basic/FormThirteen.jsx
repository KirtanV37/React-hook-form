/* 
dirtyFields is a property of the formState object. It tracks which specific fields have been modified from their defaultValues.
*/

import { useForm } from "react-hook-form";

const FormThirteen = () => {
    const {
        formState: { dirtyFields },
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        console.log("dirtyFields", dirtyFields);
        console.log("data", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="name" />
            {dirtyFields.name && <p>Name has changed</p>}

            <input {...register("email")} placeholder="email" />
            {dirtyFields.email && <p> Email has changed</p>}

            <button type="submit">Submit</button>
        </form>
    );
};

export default FormThirteen;

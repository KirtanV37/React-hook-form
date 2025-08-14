import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { useForm } from "react-hook-form";

const FormInput = () => {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <EmailInput control={control} />
            <PasswordInput control={control} />
            <button type="submit" style={{ marginTop: 16 }}>
                Submit
            </button>
        </form>
    );
};

export default FormInput;

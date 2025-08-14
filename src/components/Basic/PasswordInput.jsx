import { useController } from "react-hook-form";
import { Input } from "@material-tailwind/react";

const PasswordInput = ({ control }) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        control,
        name: "password",
        defaultValue: "",
        rules: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
            },
        },
    });

    return (
        <div>
            <label htmlFor="password">Password</label>
            <Input
                {...field}
                id="password"
                type="password"
                label="Password"
                error={!!error}
            />
            {error && <p style={{ color: "red", fontSize: 12 }}>{error.message}</p>}
        </div>
    );
};

export default PasswordInput;

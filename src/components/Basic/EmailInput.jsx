import { useController } from 'react-hook-form'
import { Input } from '@material-tailwind/react'

const EmailInput = ({ control }) => {
    const {
        field,
        fieldState: { error }
    } = useController({
        control,
        name: 'email',
        defaultValue: '',
        rules: {
            required: 'Email is required',
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
            }
        }
    });

    return (
        <div>
            <label htmlFor="email">Email</label>
            <Input
                {...field}
                id="email"
                type="email"
                label="Email"
                error={!!error}
            />
            {error && <p style={{ color: 'red', fontSize: 12 }}>{error.message}</p>}
        </div>
    )
}

export default EmailInput;
import { useForm, useFieldArray } from 'react-hook-form'

const Two = () => {

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            names: [{ name: '' }]
        }
    })
    const { fields, append, remove } = useFieldArray({ control, name: 'names' }) // control:- used to connect useFieldArray to useForm.

    const onSubmit = data => console.log('data', data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Names</h3>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <input {...register(`names.${index}.name`)} placeholder={`Name ${index + 1}`} />

                    <button type='button' onClick={() => remove(index)}>Remove</button>
                </div>
            ))}

            <button type='button' onClick={() => append({ name: '' })}>Append</button>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Two;
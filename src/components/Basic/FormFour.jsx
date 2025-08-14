import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const PreviewFields = ({ control }) => {
    const agreed = useWatch({ control, name: "terms" });
    const country = useWatch({ control, name: "country" });
    const imageFile = useWatch({ control, name: "image" });

    const [imageUrl, setImageUrl] = useState(null);

    React.useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            setImageUrl(URL.createObjectURL(file));
        }
    }, [imageFile]);

    return (
        <div style={{ marginTop: "1rem" }}>
            <p>Terms accepted: {agreed ? "Yes" : "No"}</p>
            <p>Selected country: {country}</p>
            {imageUrl && <img src={imageUrl} alt="preview" width={100} />}
        </div>
    );
};

const FormFour = () => {
    const { register, handleSubmit, control } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Country:
                <select {...register("country")}>
                    <option value="">Select...</option>
                    <option value="usa">USA</option>
                    <option value="canada">Canada</option>
                </select>
            </label>

            <br />

            <label>
                Upload Image:
                <input type="file" accept="image/*" {...register("image")} />
            </label>

            <br />

            <label>
                <input type="checkbox" {...register("terms")} />
                Accept Terms
            </label>

            <PreviewFields control={control} />

            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormFour;

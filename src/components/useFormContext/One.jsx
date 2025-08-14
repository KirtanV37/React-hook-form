import { FormProvider, useForm } from "react-hook-form";
import OneNest from "./OneNest";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button } from "@material-tailwind/react";

const schema = yup.object().shape({
    firstName: yup.string().required("Firstname is required"),
    addressList: yup.array().of(
        yup.object().shape({
            street: yup.string().required("Street is required"),
            city: yup.string().required("City is required"),
            zip: yup.string().when("city", {
                is: (val) => val?.toLowerCase() === "new york",
                then: (schema) => schema.required("Zip is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
        })
    ),
});

const One = () => {
    const methods = useForm({
        mode: "all",
        defaultValues: {
            firstName: "",
            addressList: [{ street: "", city: "", zip: "" }],
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log("data", data);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow space-y-8"
            >
                <Input
                    label="First Name"
                    {...methods.register("firstName")}
                    error={!!methods.formState.errors.firstName}
                />
                {methods.formState.errors.firstName && (
                    <p className="text-red-600 text-sm">
                        {methods.formState.errors.firstName.message}
                    </p>
                )}

                <OneNest />

                <Button type="submit" color="blue" fullWidth>
                    Submit
                </Button>
            </form>
        </FormProvider>
    );
};

export default One;

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input, Button } from "@material-tailwind/react";

const OneNest = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "addressList",
    });

    const addressList = watch("addressList");

    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Address List</h3>
            {fields.map((field, index) => {
                const city = addressList?.[index]?.city;

                return (
                    <div key={field.id} className="mb-6 pb-6 border-b border-gray-200">
                        <div className="mb-4">
                            <Input
                                label="Street"
                                {...register(`addressList.${index}.street`)}
                                error={!!errors.addressList?.[index]?.street}
                            />
                            {errors.addressList?.[index]?.street && (
                                <p className="text-red-600 text-sm">
                                    {errors.addressList[index].street.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Input
                                label="City"
                                {...register(`addressList.${index}.city`)}
                                error={!!errors.addressList?.[index]?.city}
                            />
                            {errors.addressList?.[index]?.city && (
                                <p className="text-red-600 text-sm">
                                    {errors.addressList[index].city.message}
                                </p>
                            )}
                        </div>

                        {city?.toLowerCase() === "new york" && (
                            <div className="mb-4">
                                <Input
                                    label="Zip Code"
                                    {...register(`addressList.${index}.zip`)}
                                    error={!!errors.addressList?.[index]?.zip}
                                />
                                {errors.addressList?.[index]?.zip && (
                                    <p className="text-red-600 text-sm">
                                        {errors.addressList[index].zip.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <Button
                            onClick={() => remove(index)}
                            variant="outlined"
                            color="red"
                            className="mt-2"
                        >
                            Remove
                        </Button>
                    </div>
                );
            })}

            <Button
                onClick={() => append({ street: "", city: "", zip: "" })}
                color="green"
            >
                Add Address
            </Button>
        </div>
    );
};

export default OneNest;

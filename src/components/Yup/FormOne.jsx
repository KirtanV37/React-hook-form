import { useForm, useController } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Input,
    Checkbox,
    Radio,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    age: yup
        .number()
        .typeError("Age must be a number")
        .positive("Age must be positive")
        .integer("Age must be an integer")
        .required("Age is required"),
    gender: yup.string().required("Gender is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    country: yup.string().required("Country is required"),
    terms: yup.boolean().oneOf([true], "You must accept the terms"),
    profilePic: yup
        .mixed()
        .test(
            "required",
            "Profile picture is required",
            (value) => value && value.length > 0
        )
        .test(
            "fileSize",
            "File too large",
            (value) => !value || (value[0] && value[0].size <= 1024 * 1024)
        ),
    skills: yup.array().min(1, "Select at least one skill").required(),
});

const COUNTRIES = [
    { value: "ind", label: "IND" },
    { value: "usa", label: "USA" },
    { value: "uk", label: "UK" },
];

const SKILLS = ["React", "Vue", "Angular", "Node"];

const FormOne = () => {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, isValid, isSubmitted, isSubmitSuccessful },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            gender: "male",
            country: "ind",
            skills: ["Vue", "Node"],
        },
    });

    // Name
    const {
        field: nameField,
        fieldState: { error: nameError },
    } = useController({ name: "name", control });

    // Age
    const {
        field: ageField,
        fieldState: { error: ageError },
    } = useController({ name: "age", control });

    // Email
    const {
        field: emailField,
        fieldState: { error: emailError },
    } = useController({ name: "email", control });

    // Password
    const {
        field: passwordField,
        fieldState: { error: passwordError },
    } = useController({ name: "password", control });

    // Confirm Password
    const {
        field: confirmPasswordField,
        fieldState: { error: confirmPasswordError },
    } = useController({ name: "confirmPassword", control });

    // Gender
    const {
        field: genderField,
        fieldState: { error: genderError },
    } = useController({ name: "gender", control });

    // Country
    const {
        field: countryField,
        fieldState: { error: countryError },
    } = useController({ name: "country", control });

    // Skills
    const {
        field: skillsField,
        fieldState: { error: skillsError },
    } = useController({ name: "skills", control });

    // Terms
    const {
        field: termsField,
        fieldState: { error: termsError },
    } = useController({ name: "terms", control });

    // Profile Pic
    const {
        field: profilePicField,
        fieldState: { error: profilePicError },
    } = useController({ name: "profilePic", control });

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            profilePic: data.profilePic[0]?.name,
        };
        console.log("Form Data:", formattedData);
        alert(JSON.stringify(formattedData));
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
            noValidate
        >
            {/* Name */}
            <div>
                <Input
                    {...nameField}
                    label="Name"
                    error={!!nameError}
                    color={nameError ? "red" : "blue"}
                />
                {nameError && (
                    <p className="text-red-600 mt-1 text-sm">{nameError.message}</p>
                )}
            </div>

            {/* Age */}
            <div>
                <Input
                    {...ageField}
                    label="Age"
                    type="number"
                    error={!!ageError}
                    color={ageError ? "red" : "blue"}
                />
                {ageError && (
                    <p className="text-red-600 mt-1 text-sm">{ageError.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <Input
                    {...emailField}
                    label="Email"
                    type="email"
                    error={!!emailError}
                    color={emailError ? "red" : "blue"}
                />
                {emailError && (
                    <p className="text-red-600 mt-1 text-sm">{emailError.message}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <Input
                    {...passwordField}
                    label="Password"
                    type="password"
                    error={!!passwordError}
                    color={passwordError ? "red" : "blue"}
                />
                {passwordError && (
                    <p className="text-red-600 mt-1 text-sm">{passwordError.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <Input
                    {...confirmPasswordField}
                    label="Confirm Password"
                    type="password"
                    error={!!confirmPasswordError}
                    color={confirmPasswordError ? "red" : "blue"}
                />
                {confirmPasswordError && (
                    <p className="text-red-600 mt-1 text-sm">
                        {confirmPasswordError.message}
                    </p>
                )}
            </div>

            {/* Gender */}
            <fieldset className="mb-4">
                <legend className="font-semibold text-gray-700 mb-2">Gender:</legend>
                <div className="flex gap-6">
                    <Radio
                        name={genderField.name}
                        value="male"
                        checked={genderField.value === "male"}
                        onChange={() => genderField.onChange("male")}
                        label="Male"
                        color="blue"
                        crossOrigin=""
                    />
                    <Radio
                        name={genderField.name}
                        value="female"
                        checked={genderField.value === "female"}
                        onChange={() => genderField.onChange("female")}
                        label="Female"
                        color="blue"
                        crossOrigin=""
                    />
                </div>
                {genderError && (
                    <p className="text-red-600 mt-1 text-sm">{genderError.message}</p>
                )}
            </fieldset>

            {/* Country */}
            <div>
                <Select
                    label="Select Country"
                    value={countryField.value}
                    onChange={countryField.onChange}
                    error={!!countryError}
                    color={countryError ? "red" : "blue"}
                >
                    <Option value="">Select Country</Option>
                    {COUNTRIES.map((c) => (
                        <Option key={c.value} value={c.value}>
                            {c.label}
                        </Option>
                    ))}
                </Select>
                {countryError && (
                    <p className="text-red-600 mt-1 text-sm">{countryError.message}</p>
                )}
            </div>

            {/* Skills */}
            <fieldset className="mb-4">
                <legend className="font-semibold text-gray-700 mb-2">Skills:</legend>
                <div className="flex flex-wrap gap-4">
                    {SKILLS.map((skill) => (
                        <Checkbox
                            key={skill}
                            label={skill}
                            value={skill}
                            checked={skillsField.value?.includes(skill)}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                let newValue = skillsField.value || [];
                                if (checked) {
                                    newValue = [...newValue, skill];
                                } else {
                                    newValue = newValue.filter((s) => s !== skill);
                                }
                                skillsField.onChange(newValue);
                            }}
                            color="blue"
                            crossOrigin=""
                        />
                    ))}
                </div>
                {skillsError && (
                    <p className="text-red-600 mt-1 text-sm">{skillsError.message}</p>
                )}
            </fieldset>

            {/* Profile Picture */}
            <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="profilePic">
                    Profile Picture:
                </label>
                <input
                    id="profilePic"
                    type="file"
                    onChange={(e) => profilePicField.onChange(e.target.files)}
                    className={`w-full text-gray-700 border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${profilePicError ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {profilePicError && (
                    <p className="text-red-600 mt-1 text-sm">
                        {profilePicError.message}
                    </p>
                )}
            </div>

            {/* Terms */}
            <div className="flex items-center">
                <Checkbox
                    label="Accept Terms and Conditions"
                    checked={!!termsField.value}
                    onChange={(e) => termsField.onChange(e.target.checked)}
                    color="blue"
                    crossOrigin=""
                />
            </div>
            {termsError && (
                <p className="text-red-600 mt-1 text-sm">{termsError.message}</p>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full py-2 mt-4 rounded-md text-white font-semibold transition-colors duration-200 ${isSubmitting
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {/* Status Messages */}
            {isSubmitted && !isSubmitting && (
                <p className="text-yellow-600 mt-3 text-center font-medium">
                    Form was submitted.
                </p>
            )}
            {isSubmitSuccessful && (
                <p className="text-green-600 mt-2 text-center font-medium">
                    Submit was successful!
                </p>
            )}
        </form>
    );
};

export default FormOne;
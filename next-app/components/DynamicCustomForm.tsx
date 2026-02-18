"use client";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { stegaClean } from "next-sanity";

interface RowLayout {
  columnType: "one" | "two" | "three";
  formFields: any[];
}

interface Props {
  rows: RowLayout[];
  formButtonText: string;
  formTitle: string;
  formDescription: string;
}
const DynamicCustomForm = ({
  rows,
  formButtonText,
  formTitle,
  formDescription,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm({ mode: "onBlur", defaultValues: {} });
  const onSubmit = (data: any) => {
    console.log("Submitted Data: ", data);
    reset();
  };
  return (
    <div>
      <div className="mb-6 md:mb-9">
        {formTitle && (
          <h3 className="font-medium font-body">{stegaClean(formTitle)}</h3>
        )}
        {formDescription && (
          <p className="mt-4 font-body">{stegaClean(formDescription)}</p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 items-start">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`w-full grid gap-6 ${
              row.columnType === "one"
                ? "grid-cols-1"
                : row.columnType === "two"
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}>
            {row.formFields
              ?.filter((field) => field?.type)
              .map((field) => (
                <FormField
                  key={field._key}
                  field={field}
                  register={register}
                  errors={errors}
                  touchedFields={touchedFields}
                />
              ))}
          </div>
        ))}
        <button type="submit" className="btn-primary">
          {isSubmitting == true ? "Submitting..." : stegaClean(formButtonText)}
        </button>
      </form>
    </div>
  );
};

export default DynamicCustomForm;

"use client";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { stegaClean } from "next-sanity";
type FieldType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "datetime"
  | "select"
  | "radio"
  | "checkbox"
  | "url"
  | "textarea";

interface Option {
  label: string;
  value: string;
}

interface FormFieldProps {
  field: {
    _key?: string;
    name: { current: string };
    label: string;
    type: FieldType;
    required?: boolean;
    placeholder?: string;
    defaultValue?: string;
    defaultChecked?: boolean;
    options?: Option[];
  };
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  touchedFields: Record<string, boolean | undefined>;
}

const FormField = ({
  field,
  register,
  errors,
  touchedFields,
}: FormFieldProps) => {
  const name = stegaClean(field.name.current);
  const error = errors[name];
  const touched = !!touchedFields[name];

  const rules = {
    required: field.required ? `Field is required` : false,
    ...(field.type === "email" && {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format",
      },
    }),
    ...(field.type === "phone" && {
      pattern: {
        value: /^[+]?[0-9\s\-()]{7,15}$/,
        message: "Invalid phone number",
      },
    }),
    ...(field.type === "url" && {
      pattern: {
        value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
        message: "Invalid URL",
      },
    }),
    ...(field.type === "number" && {
      pattern: { value: /^\d+$/, message: "Only numbers allowed" },
    }),
  };

  const inputClasses = `
    ${touched && error ? "border-red-500" : "border-gray-300"}
  `;

  const labelClasses = "block mb-1.5 font-medium text-gray-700 text-[11px]";

  return (
    <div className="space-y-1">
      <label className={labelClasses}>
        {field.label}
        {field.required && <span className="text-red-600 ml-1">*</span>}
      </label>

      {/* Text, Email, Phone, Number, URL, Date, Datetime */}
      {["text", "email", "phone", "number", "url", "date", "datetime"].includes(
        field.type,
      ) && (
        <input
          type={
            field.type === "phone"
              ? "tel"
              : field.type === "datetime"
                ? "datetime-local"
                : field.type
          }
          placeholder={stegaClean(field.placeholder)}
          defaultValue={stegaClean(field.defaultValue)}
          className={inputClasses}
          {...register(name, rules)}
        />
      )}

      {/* Textarea */}
      {field.type === "textarea" && (
        <textarea
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          rows={4}
          className={inputClasses}
          {...register(name, rules)}
        />
      )}

      {/* Select */}
      {field.type === "select" && (
        <select
          className={inputClasses}
          defaultValue={field.defaultValue || ""}
          {...register(name, rules)}>
          <option value="" disabled>
            Select an option
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* Radio Group */}
      {field.type === "radio" && (
        <div className="flex flex-wrap gap-6">
          {field.options?.map((opt, idx) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={opt.value}
                defaultChecked={idx === 0 && field.defaultChecked} // or logic for pre-select
                className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                {...register(name, rules)} // register on every → RHF handles group
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Checkbox Group */}
      {field.type === "checkbox" && (
        <div className="flex flex-wrap gap-6">
          {field.options?.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={opt.value}
                defaultChecked={field.defaultChecked} // only meaningful if single checkbox
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                {...register(name, rules)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      <AnimatePresence>
        {touched && error?.message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-600 text-sm">
            {error.message as string}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormField;

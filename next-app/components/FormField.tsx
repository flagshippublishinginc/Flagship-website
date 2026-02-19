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

// Sanity stores select options and radio values as plain strings

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
    options?: string[]; // used by select
    radioValues?: string[]; // used by radio
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
      {/* Field label — use <p> for radio/checkbox to avoid nesting <label> inside <label> */}
      {field.type === "radio" || field.type === "checkbox" ? (
        <p className={labelClasses}>
          {field.label}
          {field.required && <span className="text-red-600 ml-1">*</span>}
        </p>
      ) : (
        <label htmlFor={name} className={labelClasses}>
          {field.label}
          {field.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}

      {/* Text, Email, Phone, Number, URL, Date, Datetime */}
      {["text", "email", "phone", "number", "url", "date", "datetime"].includes(
        field.type,
      ) && (
        <input
          id={name}
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
          {field.options?.map((opt, idx) => {
            const optionValue = stegaClean(opt);
            return (
              <option key={idx} value={optionValue}>
                {optionValue}
              </option>
            );
          })}
        </select>
      )}

      {/* Radio Group — uses radioValues from Sanity */}
      {field.type === "radio" && (
        <div className="flex flex-wrap gap-6">
          {field.radioValues?.map((val, idx) => {
            const radioLabel = stegaClean(val);
            return (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={radioLabel}
                  className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                  {...register(name, rules)}
                />
                <span>{radioLabel}</span>
              </label>
            );
          })}
        </div>
      )}

      {/* Checkbox — must use defaultChecked (uncontrolled) NOT checked, so RHF manages state */}
      {field.type === "checkbox" && (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked={field.defaultChecked}
            className="h-4 w-4 cursor-pointer"
            {...register(name, {
              required: field.required ? `Field is required` : false,
            })}
          />
          <span>{stegaClean(field.label)}</span>
        </label>
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

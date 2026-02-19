"use client";

import { DynamicFormModule, RowLayout } from "@/types/componentsTypes";
import { stegaClean } from "next-sanity";
import React, { useMemo, useState } from "react";
import { z } from "zod";

const columnMap: Record<string, string> = {
  one: "grid-cols-1",
  two: "grid-cols-2",
  three: "grid-cols-3",
};

const getFieldKey = (label: string) =>
  stegaClean(label).replace(/\s+/g, "_").toLowerCase().replace(/[^\w]/g, "");

const generateZodSchema = (rowLayout: RowLayout[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  rowLayout.forEach((row) => {
    row.formFields.forEach((field) => {
      const key = getFieldKey(field.label);
      let validator: z.ZodTypeAny;

      switch (field.type) {
        case "email":
          validator = z
            .string()
            .email({ message: "Please enter a valid email address" });
          break;

        case "number":
          validator = z.string().refine((val) => !val || !isNaN(Number(val)), {
            message: `${field.label} must be a number`,
          });
          break;

        case "checkbox":
          validator = z.boolean();
          break;

        default:
          validator = z.string();
      }

      // Required logic
      if (field.required) {
        if (field.type === "checkbox") {
          validator = validator.refine((val: any) => val === true, {
            message: `${field.label} is required`,
          });
        } else {
          validator = validator.refine((val: any) => val.trim() !== "", {
            message: `${field.label} is required`,
          });
        }
      } else {
        validator = validator.optional();
      }

      shape[key] = validator;
    });
  });

  return z.object(shape);
};

const generateInitialValues = (rowLayout: RowLayout[]) => {
  const values: Record<string, string | boolean> = {};

  rowLayout.forEach((row) => {
    row.formFields.forEach((field) => {
      const key = getFieldKey(field.label);

      if (field.type === "checkbox") {
        // Use defaultChecked if provided, else false
        values[key] = field.defaultChecked ?? false;
      } else {
        // Use defaultValue if provided, else empty string
        values[key] = field.defaultValue ?? "";
      }
    });
  });

  return values;
};

const DynamicForm = ({ rowLayout }: DynamicFormModule) => {
  const [formValues, setFormValues] = useState<
    Record<string, string | boolean>
  >(generateInitialValues(rowLayout));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  if (rowLayout.length === 0) return null;

  const schema = useMemo(() => generateZodSchema(rowLayout), [rowLayout]);

  const getFieldSchema = (fieldName: string) => {
    return schema.shape[fieldName] as z.ZodTypeAny | undefined;
  };

  const validateField = (name: string, value: string | boolean) => {
    const fieldSchema = getFieldSchema(name);
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);

    setErrors((prev) => {
      const updated = { ...prev };
      if (result.success) {
        delete updated[name];
      } else {
        updated[name] = result.error.issues[0]?.message || "Invalid value";
      }
      return updated;
    });
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name } = e.target;
    let value: string | boolean = e.target.value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      value = e.target.checked;
    }

    setTouched((prev) => ({ ...prev, [name]: true }));
    setFormValues((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name } = e.target;
    let value: string | boolean = e.target.value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      value = e.target.checked;
    }

    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(formValues);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        formattedErrors[fieldName] = issue.message;
      });

      setErrors(formattedErrors);

      const allTouched: Record<string, boolean> = {};
      Object.keys(formValues).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      return;
    }

    console.log("Form submitted with valid data:", result.data);
    // → Add your API call / toast / reset here
  };

  return (
    <section className="section-spacing">
      <div className="container">
        <form onSubmit={handleSubmit} className="space-y-8">
          {rowLayout.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid gap-6 ${columnMap[row.columnType] || "grid-cols-1"}`}>
              {row.formFields.map((field) => {
                const key = getFieldKey(field.label);
                const fieldType = stegaClean(field.type);
                const placeholder = field.placeholder || ""; // fallback to empty

                return (
                  <div key={key} className="flex flex-col gap-1">
                    {fieldType !== "checkbox" && fieldType !== "radio" && (
                      <label htmlFor={key} className="font-medium">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                    )}

                    {/* Text-based inputs with placeholder & defaultValue */}
                    {(fieldType === "text" ||
                      fieldType === "email" ||
                      fieldType === "number" ||
                      fieldType === "date" ||
                      fieldType === "url") && (
                      <input
                        id={key}
                        type={fieldType}
                        name={key}
                        value={formValues[key] as string}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        className="input"
                      />
                    )}

                    {fieldType === "textarea" && (
                      <textarea
                        id={key}
                        name={key}
                        value={formValues[key] as string}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        className="input min-h-[100px]"
                      />
                    )}

                    {fieldType === "select" && (
                      <select
                        id={key}
                        name={key}
                        value={formValues[key] as string}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input">
                        <option value="" disabled>
                          {placeholder || `Select ${field.label}`}
                        </option>
                        {field.options?.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    {fieldType === "checkbox" && (
                      <div className="flex items-center gap-2">
                        <input
                          id={key}
                          type="checkbox"
                          name={key}
                          checked={formValues[key] as boolean}
                          onChange={handleChange}
                        />
                        <label htmlFor={key} className="cursor-pointer">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                      </div>
                    )}

                    {/* Radio example – extend if you need real radio groups */}
                    {fieldType === "radio" && (
                      <div className="flex items-center gap-2">
                        <input
                          id={key}
                          type="radio"
                          name={key} // same name for group if multiple radios
                          value="true" // or whatever value makes sense
                          checked={formValues[key] === "true"}
                          onChange={handleChange}
                        />
                        <label htmlFor={key}>{field.label}</label>
                      </div>
                    )}

                    {touched[key] && errors[key] && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors[key]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <button type="submit" className="btn-primary mt-6">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default DynamicForm;

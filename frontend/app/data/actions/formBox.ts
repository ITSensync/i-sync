import { addFormSchema } from "@/app/types/ZodSchema";
import { boxService } from "../services";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function addBoxAction(prevState: any, formData: FormData) {
  const validatedFields = addFormSchema.safeParse({
    name: formData.get("name"),
    number: Number(formData.get("number")),
    color: formData.get("color"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiErrors: null,
      message: "Missing Fields. Failed to Create",
    };
  }

  const bodyData = {
    name: validatedFields.data.name,
    color: validatedFields.data.color,
    number: validatedFields.data.number,
  };

  const response = await boxService.createBox(bodyData);

  if (!response) {
    return {
      ...prevState,
      isLoading: false,
      apiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (response.statusCode !== 201) {
    return {
      ...prevState,
      isLoading: false,
      isError: true,
      apiErrors: {
        code: response.code,
        message: response.message,
      },
      zodErrors: null,
      message: "Failed to create books",
    };
  }

  return {
    isLoading: false,
    isSuccess: true,
    apiErrors: null,
    zodErrors: null,
    message: response.message,
  };
}

export async function editBoxAction(prevState: any, formData: FormData) {
  const validatedFields = addFormSchema.safeParse({
    name: formData.get("name"),
    number: formData.get("number"),
    color: formData.get("color"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiErrors: null,
      message: "Missing Fields. Failed to Create",
    };
  }

  const bodyData = {
    name: validatedFields.data.name,
    color: validatedFields.data.color,
    number: validatedFields.data.number,
  };

  const boxId = formData.get("id")?.toString();
  const response = await boxService.editBox(bodyData, boxId ? boxId : "");

  if (!response) {
    return {
      ...prevState,
      isLoading: false,
      apiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (response.statusCode !== 201) {
    return {
      ...prevState,
      isLoading: false,
      isError: true,
      apiErrors: {
        code: response.code,
        message: response.message,
      },
      zodErrors: null,
      message: "Failed to create books",
    };
  }

  return {
    isLoading: false,
    isSuccess: true,
    apiErrors: null,
    zodErrors: null,
    message: response.message,
  };
}

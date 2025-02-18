import { stuffFormSchema } from "@/app/types/ZodSchema";
import { stuffService } from "../services";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function addStuffAction(prevState: any, formData: FormData) {
  const validatedFields = stuffFormSchema.safeParse({
    name: formData.get("name"),
    quantity: Number(formData.get("number")),
    merk: formData.get("merk"),
    detail: formData.get("detail"),
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
    quantity: validatedFields.data.quantity,
    merk: validatedFields.data.merk,
    detail: validatedFields.data.detail,
    boxId: formData.get('boxId'),
  };

  const response = await stuffService.createStuff(bodyData);

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

export async function editStuffAction(prevState: any, formData: FormData) {
  const validatedFields = stuffFormSchema.safeParse({
    name: formData.get("name"),
    quantity: Number(formData.get("quantity")),
    merk: formData.get("merk"),
    detail: formData.get("detail"),
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
    quantity: validatedFields.data.quantity,
    merk: validatedFields.data.merk,
    detail: validatedFields.data.detail,
    boxId: formData.get('boxId'),
  };

  const stuffId = formData.get("id")?.toString();
  const response = await stuffService.editStuff(bodyData, stuffId ? stuffId : "");

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

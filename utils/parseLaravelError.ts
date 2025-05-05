export const parseLaravelError = (error: any) => {
  if (error?.response?.data?.errors) {
    return error.response.data.errors;
  }
  return {};
};

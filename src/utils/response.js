export const successResponse = (data, message = "success") => {
  return { message, success: true, data };
};

export const errorResponse = (message = "error") => {
  return { message, success: false, data: null };
};

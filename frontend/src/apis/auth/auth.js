import axios from "axios";

export const login = async (data) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/user/login`;

    const response = await axios.post(url, data);

    localStorage.setItem("token", response.data.token);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const signup = async (data) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api/user/register`;

    const response = await axios.post(url, data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

function handleError(error) {
  console.error("API Error:", error);

  if (error.response) {
    return {
      success: false,
      status: error.response.status,
      message: error.response.data?.message || "An error occurred.",
      data: error.response.data,
    };
  }

  return {
    success: false,
    status: null,
    message: error.message || "Network error or server unreachable.",
    data: null,
  };
}

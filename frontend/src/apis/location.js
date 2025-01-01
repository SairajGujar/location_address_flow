import axios from "axios";

export async function saveAddress(address) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/address/save`,
      address,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function editAddress(address, id) {
  try {
    console.log(id)
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/address/edit/${id}`,
      address,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteAddress(id) {
  try {
    
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/address/delete/${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchAddresses() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/address`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return handleError(error);
    
  }
}

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

import useCreateMutation from "./useCreateMutation";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export const useRegister = () => {
  const mutation = useCreateMutation({
    method: "post",
    endpoint: API_ENDPOINTS.REGISTER,
    submitData: {}, // Initialized as empty, will be overwritten in mutate
    redirectPath: "/auth/login",
    isToast: true,
  });

  const register = (formData: any) => {
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      channel: "sms",
      roles: ["patient"],
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      blood_group: formData.blood_group,
      address: {
        address_line1: formData.address_line1,
        address_line2: formData.address_line2 || "",
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country || "India",
      },
    };

    return mutation.mutate({ extraSubmitData: payload });
  };

  return {
    ...mutation,
    register,
  };
};

export default useRegister;

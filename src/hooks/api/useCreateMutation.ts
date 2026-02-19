/* eslint-disable */

import postApiData from "@/utils/api-fetch/post-api-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteApiData from "@/utils/api-fetch/delete-api-data";
import patchApiData from "@/utils/api-fetch/patch-api-data";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useModal } from "@/context/modal-store";
import React from "react";
import ErrorPopupModal from "@/components/customize-components/modals/ErrorPopupModal";

function useCreateMutation(mutationData: {
    method: any;
    endpoint: string;
    submitData: Record<string, unknown>;
    redirectPath?: string;
    invalidateQueries?: string[];
    inputRefs?: any;
    handleSuccess?: (_response: any) => void;
    handleError?: (_error: any) => void;
    isToast?: boolean;
}) {
    const {
        method,
        endpoint,
        submitData,
        redirectPath,
        invalidateQueries,
        inputRefs,
        handleSuccess,
        handleError,
        isToast = false,
    } = mutationData;
    const router = useRouter();
    const queryClient = useQueryClient();
    const { openModal, closeModal } = useModal();

    const createMutation = useMutation({
        mutationFn: async (mutationProps: any = {}) => {
            const { extraEndpoint = "", extraSubmitData = {} } = mutationProps;

            const finalEndpoint = endpoint + extraEndpoint;
            const finalSubmitData = {
                ...submitData,
                ...extraSubmitData,
            };
            const response =
                method === "delete"
                    ? await deleteApiData(finalEndpoint, finalSubmitData)
                    : method === "patch"
                    ? await patchApiData(finalEndpoint, finalSubmitData)
                    : await postApiData(finalEndpoint, finalSubmitData);
            const { status_code, StatusCode, message, data, errors } = response;

            if (response?.success === false) {
                throw response;
            }

            const errorStatusCode = status_code || StatusCode;

            if (errorStatusCode === 6001) {
                const errorSource = errors || message;

                const form_errors = errorSource?.form_errors
                    ? Object.fromEntries(
                          Object.entries(errorSource.form_errors).map(
                              ([key, value]) => [
                                  key,
                                  Array.isArray(value)
                                      ? (value as string[])[0]
                                      : (value as string),
                              ]
                          )
                      )
                    : {};
                const normalizedGeneralErrors = Array.isArray(
                    errorSource?.general_errors
                )
                    ? (errorSource.general_errors as string[])
                    : [];
                const fallbackSingleMessage =
                    typeof errorSource?.message === "string"
                        ? [errorSource.message]
                        : [];
                const general_errors =
                    normalizedGeneralErrors.length > 0
                        ? normalizedGeneralErrors
                        : fallbackSingleMessage;
                throw { message, form_errors, general_errors, errors: data };
            }
            return response;
        },

        onSuccess: (response) => {
            toast.dismiss();
            const { message } = response;
            if (isToast) {
                toast.success(message?.title ?? "Request successful", {
                    description:
                        message?.body ||
                        "You have successfully completed the action",
                    position: "top-right",
                    style: {
                        backgroundColor: "white",
                        color: "green",
                        border: "1px solid green",
                    },
                    className: "text-green-600",
                });
            }
            if (invalidateQueries && invalidateQueries?.length) {
                invalidateQueries.forEach(async (invalidateQuery: string) => {
                    try {
                        await queryClient.invalidateQueries({
                            queryKey: [invalidateQuery],
                        });
                    } catch (error) {
                        throw error;
                    }
                });
            }
            if (handleSuccess) {
                handleSuccess(response);
            }
            if (redirectPath) {
                if (redirectPath === "ROUTER_BACK") {
                    router.back();
                } else if (redirectPath !== "") {
                    router.push(redirectPath);
                }
            }
        },

        onError: (error: any) => {
            if (handleError) {
                handleError(error);
            }

            if (inputRefs?.current && error?.form_errors) {
                focusInputFieldWithError(
                    inputRefs,
                    inputRefs?.current,
                    error.form_errors
                );
            }
            // toast.dismiss();

            if (error?.message) {
                const errorMessage =
                    typeof error.message === "string"
                        ? error.message
                        : error.message?.title ||
                          error.message?.body ||
                          "An error occurred";
                toast.error(errorMessage, {
                    position: "top-right",
                    style: {
                        backgroundColor: "white",
                        color: "red",
                        border: "1px solid red",
                    },
                    className: "text-red-600",
                });
            }

            const hasGeneralErrors =
                Array.isArray(error?.general_errors) &&
                error.general_errors.length > 0;
            const hasFormErrors =
                error?.form_errors && Object.keys(error.form_errors).length > 0;
            if (hasGeneralErrors || hasFormErrors) {
                const generalErrors = error?.general_errors || [];

                if (generalErrors.length > 0) {
                    openModal(
                        React.createElement(ErrorPopupModal, {
                            data: {
                                title:
                                    error?.message?.title ??
                                    "An error occurred!",
                                errors: generalErrors,
                            },
                            onClose: () => closeModal(),
                        })
                    );
                }
            }
        },
    });

    return {
        ...createMutation,
        mutate: (data?: any) => createMutation.mutate(data),
    };
}

const focusInputFieldWithError = (
    inputRefs: any,
    inputRefCurrents: any,
    errors: any
) => {
    const findFirstCommonKey = <T extends object, U extends object>(
        obj1: T,
        obj2: U
    ): string => {
        const keysObj1 = Object.keys(obj1);
        for (const key of keysObj1) {
            if (key in obj2) {
                return key;
            }
        }
        return "";
    };

    const firstCommonKey = findFirstCommonKey(inputRefCurrents, errors);
    const inputElement = inputRefs.current[firstCommonKey];

    if (inputElement) {
        inputElement.focus();
        inputElement?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
};

export default useCreateMutation;

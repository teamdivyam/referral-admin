import { useState } from "react";

/**
 * Custom hook to perform a GET request using the provided adminService.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {Function} params.adminService - The service function to perform the GET request.
 * @param {number} [params.page=undefined] - Optional page number to include in the request.
 *
 * @returns {Object} - An object containing the fetched data, loading state, and error state.
 * @returns {any} data - The data fetched from the GET request.
 * @returns {boolean} fetchLoading - A boolean representing the loading state of the request.
 * @returns {string|null} fetchError - An error message if the request fails, or null if no error.
 */
export const useAxiosGet = ({ adminService, page = undefined }) => {
    const [data, setData] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(false);

    useEffect(() => {
        setFetchError(null);
        setFetchLoading(true);

        const fetchData = async () => {
            try {
                const response = await adminService({ page });

                setData(response.data || null);
            } catch (error) {
                setFetchError(
                    error.response?.data?.error?.message ||
                        "Error in fetching data."
                );

                throw error;
            } finally {
                setFetchLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, fetchLoading, fetchError };
};



/**
 * Custom hook to perform POST requests using an admin service.
 *
 * @param {Object} adminService - The admin service function to handle the POST request.
 *
 * @returns {Object} - An object containing the loading state, error state, and function to post data.
 * @returns {boolean} fetchLoading - A boolean representing the loading state of the request.
 * @returns {string|null} fetchError - An error message if the request fails, or null if no error.
 * @returns {function} postData - A function to post data using the admin service.
 */
export const useAxiosPost = ({ adminService }) => {
    const [fetchLoading, setFetchLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const postData = async (formValues) => {
        setFetchLoading(true);
        try {
            const response = await adminService(formValues);

            return response;
        } catch (error) {
            setFetchError(
                error.response?.data?.error?.message ||
                    "Error in submitting data."
            );

            throw error;
        } finally {
            setFetchLoading(false);
        }
    };

    return { fetchLoading, fetchError, postData };
};



/**
 * Custom hook to perform PUT requests using an admin service.
 *
 * @param {Object} adminService - The admin service function to handle the PUT request.
 *
 * @returns {Object} - An object containing the loading state, error state, and function to put data.
 * @returns {boolean} fetchLoading - A boolean representing the loading state of the request.
 * @returns {string|null} fetchError - An error message if the request fails, or null if no error.
 * @returns {function} putData - A function to put data using the admin service.
 */
export const useAxiosPut = ({ adminService }) => {
    const [fetchLoading, setFetchLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const putData = async ({ filterPayload, data }) => {
        setFetchLoading(true);
        try {
            const response = await adminService({ filterPayload, data });

            return response;
        } catch (error) {
            setFetchError(
                error.response?.data?.error?.message ||
                    "Error in updating data."
            );

            throw error;
        } finally {
            setFetchLoading(false);
        }
    };

    return { fetchLoading, fetchError, putData };
};



/**
 * Custom hook to perform DELETE requests using an admin service.
 *
 * @param {Object} adminService - The admin service function to handle the DELETE request.
 *
 * @returns {Object} - An object containing the loading state, error state, and function to delete data.
 * @returns {boolean} fetchLoading - A boolean representing the loading state of the request.
 * @returns {string|null} fetchError - An error message if the request fails, or null if no error.
 * @returns {function} deleteData - A function to delete data using the admin service.
 */
export const useAxiosDelete = ({ adminService }) => {
    const [fetchLoading, setFetchLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const deleteData = async ({ filterPayload }) => {
        setFetchLoading(true);
        try {
            const response = await adminService({ filterPayload });

            return response;
        } catch (error) {
            setFetchError(
                error.response?.data?.error?.message ||
                    "Error in updating data."
            );

            throw error;
        } finally {
            setFetchLoading(false);
        }
    };

    return { fetchLoading, fetchError, deleteData };
};

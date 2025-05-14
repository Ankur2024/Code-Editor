import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../../utils/general";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../lib/defineTheme";
import useKeyPress from "../../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import LanguageOptions from "../../constants/LanguageOptions";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const Landing = ({ code, setCode, darkMode }) => {
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(LanguageOptions[0]);

    const apiUrl = import.meta.env.VITE_RAPID_API_URL;
    const apiHost = import.meta.env.VITE_RAPID_API_HOST;
    const apiKey = import.meta.env.VITE_RAPID_API_KEY;

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (sl) => {
        console.log("Selected Language:", sl);
        setLanguage(sl);
    };

    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    const onChange = (action, data) => {
        if (action === "code") {
            setCode(data);
        }
    };

    const handleCompile = () => {
        if (!language?.id) {
            showErrorToast("Please select a valid language!");
            return;
        }

        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(customInput),
        };

        axios
            .post(`${apiUrl}/submissions`, formData, {
                params: { base64_encoded: "true", fields: "*" },
                headers: {
                    "content-type": "application/json",
                    "X-RapidAPI-Host": apiHost,
                    "X-RapidAPI-Key": apiKey,
                },
            })
            .then((response) => {
                if (response.data.token) {
                    checkStatus(response.data.token);
                } else {
                    throw new Error("Token not received from the API");
                }
            })
            .catch((err) => {
                const status = err.response?.status;
                const error = err.response?.data || err.message;

                if (status === 429) {
                    showErrorToast(
                        "Quota exceeded! Please read the documentation to set up your own API key.",
                        10000
                    );
                } else {
                    showErrorToast(`Compilation failed: ${error.message || "Please check your code"}`);
                }
                setProcessing(false);
            });
    };

    const checkStatus = async (token) => {
        try {
            const response = await axios.get(`${apiUrl}/submissions/${token}`, {
                params: { base64_encoded: "true", fields: "*" },
                headers: {
                    "X-RapidAPI-Host": apiHost,
                    "X-RapidAPI-Key": apiKey,
                },
            });

            const statusId = response.data?.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => checkStatus(token), 2000);
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                if (statusId === 3) {
                    showSuccessToast("Compiled Successfully!");
                } else {
                    showErrorToast("Compilation failed!");
                }
            }
        } catch (err) {
            setProcessing(false);
            showErrorToast("Error checking submission status");
        }
    };

    const handleThemeChange = (th) => {
        if (["light", "vs-dark"].includes(th.value)) {
            setTheme(th);
        } else {
            defineTheme(th.value).then(() => setTheme(th));
        }
    };

    useEffect(() => {
        defineTheme("oceanic-next").then(() =>
            setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);

    const showSuccessToast = (msg) => {
        toast.success(msg || "Compiled Successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showErrorToast = (msg, timer) => {
        toast.error(msg || "Something went wrong! Please try again.", {
            position: "top-right",
            autoClose: timer || 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div className={`flex flex-col h-full ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <ToastContainer />
            <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
            <div className="flex flex-row p-2">
                <div className="px-2">
                    <LanguagesDropdown onSelectChange={onSelectChange} />
                </div>
                <div className="px-2">
                    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 items-start px-4 py-4 flex-1">
                <div className="flex flex-col w-full md:w-2/3 h-full">
                    <CodeEditorWindow
                        code={code}
                        onChange={onChange}
                        language={language?.value}
                        theme={theme.value}
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/3 space-y-4">
                    <OutputWindow outputDetails={outputDetails} />
                    <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
                    <button
                        onClick={handleCompile}
                        disabled={!code || processing}
                        className={classnames(
                            "border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-gray-900 text-white",
                            !code || processing ? "opacity-50 cursor-not-allowed" : ""
                        )}
                    >
                        {processing ? "Processing..." : "Compile and Execute"}
                    </button>
                    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                </div>
            </div>
        </div>
    );
};

export default Landing;
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown ";
import LanguageOptions from "../constants/LanguageOptions";

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

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(LanguageOptions[0]);

  const apiUrl = import.meta.env.VITE_RAPID_API_URL;
  const apiHost = import.meta.env.VITE_RAPID_API_HOST;
  const apiKey = import.meta.env.VITE_RAPID_API_KEY;
  
  console.log("API URL:", apiUrl);
  console.log("API Host:", apiHost);
  console.log("API Key:", apiKey);


  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("Selected Language:", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    console.log("Key press detected - Enter:", enterPress, "Ctrl:", ctrlPress);
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    console.log("Action:", action, "Data:", data);
    if (action === "code") setCode(data);
  };

  const handleCompile = () => {
    console.log("Compiling with language:", language);
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

    console.log("Form Data:", formData);

    axios
      .post(apiUrl, formData, {
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Host": apiHost,
          "X-RapidAPI-Key": apiKey,
        },
      })
      .then((response) => {
        console.log("Compile Response:", response);
        checkStatus(response.data.token);
      })
      .catch((err) => {
        const status = err.response?.status;
        const error = err.response?.data || err.message;

        console.error("Compilation Error:", status, error);

        if (status === 429) {
          showErrorToast(
            "Quota exceeded! Please read the documentation to set up your own API key.",
            10000
          );
        } else {
          showErrorToast("Compilation failed! Please check your code.");
        }
        setProcessing(false);
      });
  };

  const checkStatus = async (token) => {
    console.log("Checking Status for Token:", token);
    try {
      const response = await axios.get(`${apiUrl}/${token}`, {
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "X-RapidAPI-Host": apiHost,
          "X-RapidAPI-Key": apiKey,
        },
      });

      console.log("Status Response:", response);

      const statusId = response.data?.status?.id;

      if (statusId === 1 || statusId === 2) {
        console.log("Status is in progress. Retrying...");
        setTimeout(() => checkStatus(token), 2000);
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        console.log("Output Details:", response.data);
        if (statusId === 3) {
          showSuccessToast("Compiled Successfully!");
        } else {
          showErrorToast("Compilation failed!");
        }
      }
    } catch (error) {
      console.error("Error Checking Status:", error);
      setProcessing(false);
      showErrorToast("An error occurred while checking the status.");
    }
  };

  function handleThemeChange(th) {
    console.log("Theme Change:", th);
    if (["light", "vs-dark"].includes(th.value)) {
      setTheme(th);
    } else {
      defineTheme(th.value).then(() => setTheme(th));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then(() =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    console.log("Success Toast:", msg);
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
    console.error("Error Toast:", msg);
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
    <>
      <ToastContainer />
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  );
};

export default Landing;

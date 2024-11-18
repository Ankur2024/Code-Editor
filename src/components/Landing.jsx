import { useState,useEffect, act } from "react";
import CodeEditorWindow from "./CodeEditorWindow.jsx";
import { languageOptions } from "../constants/LanguageOptions.jsx";



const javascriptDefault = `//** some comment **//`;

const Landing = () => {
    const [code, setCode] = useState(javaScriptDefault);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("contorl");

    useEffect(() => {
        if(enterPress && ctrlPress){
            console.log("Enter pressed", enterPress);
            console.log("Control Pressed", ctrlPress);
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    const onChange = (action, data) => {
        switch(action) {
            case "code" : {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    }


    const handleCompile = () => {
        // We will come to the implementation later in the code
      };
    
      const checkStatus = async (token) => {
        // We will come to the implementation later in the code
      };
    
      function handleThemeChange(th) {
        // We will come to the implementation later in the code
      }
}
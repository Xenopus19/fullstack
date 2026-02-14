import { createContext } from "react";
import { DiagnosisContext, MessageContextType } from "./types";


export const DiagnosesContext = createContext<DiagnosisContext>({ diagnoses:[] });

export const MessageContext = createContext<MessageContextType>({setMessage: ()=>{}})
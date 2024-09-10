import { createContext } from "react";

// Define the shape of the context data
interface SchoolContextType {
    schoolData: any[];
    setSchoolData: React.Dispatch<React.SetStateAction<any[]>>;
}

// Initialize the context with a default value
export const CreateSchoolContext = createContext < SchoolContextType > ({
    schoolData: [],
    setSchoolData: () => { },
});

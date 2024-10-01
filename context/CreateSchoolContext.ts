import { createContext } from "react";


interface SchoolContextType {
    schoolData: any[];
    setSchoolData: React.Dispatch<React.SetStateAction<any[]>>;
}


export const CreateSchoolContext = createContext < SchoolContextType > ({
    schoolData: [],
    setSchoolData: () => { },
});

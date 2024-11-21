// CreateSchoolContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface SchoolData {
  year: string;
  // otras propiedades que pueda tener schoolData
}

interface CreateSchoolContextProps {
  schoolData: SchoolData[];
  setSchoolData: React.Dispatch<React.SetStateAction<SchoolData[]>>;
}

const CreateSchoolContext = createContext<CreateSchoolContextProps | undefined>(undefined);

export const CreateSchoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schoolData, setSchoolData] = useState<SchoolData[]>([]);

  return (
    <CreateSchoolContext.Provider value={{ schoolData, setSchoolData }}>
      {children}
    </CreateSchoolContext.Provider>
  );
};

export { CreateSchoolContext };
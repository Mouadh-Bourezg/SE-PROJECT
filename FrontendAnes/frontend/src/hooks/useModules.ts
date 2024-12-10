import { useState, useEffect } from "react";
import type { Subject } from "../types/subject";

export const useModules = (year: string) => {
  const [modules, setModules] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`/api/Modules?level=${year}`);
        console.log(response);
        const json = await response.json();
        if (response.ok) {
          setModules(json as Subject[]); // Cast the fetched data as Subject[]
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    if (year) {
      fetchModules();
    }
  }, [year]);

  return { modules, loading };
};

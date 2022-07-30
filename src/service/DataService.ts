import axios from "axios";

const DataService = {
  fetchData: async (codes: string) => {
    const response = await axios.post("/data", { codes });

    return response;
  },
};

export default DataService;

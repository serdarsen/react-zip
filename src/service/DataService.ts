import axios from "axios";

const DataService = {
  fetchData: async (codes: string) => {
    const response = await axios.post("/data", { codes }).catch((e) => {
      console.error("Error while fetching data e: ", e);
      return { data: {} };
    });

    return response;
  },
};

export default DataService;

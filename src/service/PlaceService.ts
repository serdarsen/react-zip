import axios from "axios";

const PlaceService = {
  findPlaces: async (codes) => {
    const response = await axios.post("/places", { codes });

    return response;
  },
};

export default PlaceService;

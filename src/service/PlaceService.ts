import axios from "axios";

const PlaceService = {
  findPlaces: async (zipcode) => {
    const response = await axios.get(
        `https://app.zipcodebase.com/api/v1/search?apikey=${process.env.REACT_APP_ZIPCODEBASE_API_KEY}&codes=${zipcode}&country=US`);

    return response;
  },
};

export default PlaceService;

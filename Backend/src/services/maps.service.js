import axios from 'axios';
import { Captain } from '../models/captain.model.js';

// Geocoding using Ola Maps
export const getAddressCoordinatesService = async (address) => {
  const API_KEY = process.env.OLA_MAPS_API_KEY;
  const url = `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(
    address
  )}&api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);

    if (
      response.data &&
      response.data.geocodingResults &&
      response.data.geocodingResults.length > 0
    ) {
      const location = response.data.geocodingResults[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error('No coordinates found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    return null;
  }
};

// Distance Matrix using Ola Maps
export const getDistanceTimeService = async (origin, destination) => {
  const API_KEY = process.env.OLA_MAPS_API_KEY;

  try {
    // Geocode origin & destination
    const originCoords = await getAddressCoordinatesService(origin);
    const destinationCoords = await getAddressCoordinatesService(destination);

    if (!originCoords || !destinationCoords) {
      throw new Error('Failed to geocode origin or destination');
    }

    // Call Ola Maps distanceMatrix
    const url = `https://api.olamaps.io/routing/v1/distanceMatrix/basic?origins=${originCoords.lat},${originCoords.lng}&destinations=${destinationCoords.lat},${destinationCoords.lng}&api_key=${API_KEY}`;

    const response = await axios.get(url);

    // console.log(
    //   "OLA DISTANCE MATRIX RESPONSE:",
    //   JSON.stringify(response.data, null, 2)
    // );

    if (
      response.data &&
      response.data.rows &&
      response.data.rows.length > 0 &&
      response.data.rows[0].elements &&
      response.data.rows[0].elements.length > 0
    ) {
      const element = response.data.rows[0].elements[0];

      if (element.status !== "OK") {
        throw new Error("Ola Maps returned error for this route");
      }

      const totalMinutes = Math.round(element.duration / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return {
        distance: `${(element.distance / 1000).toFixed(1)} km`, // meters → km
        duration: hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`,
        distanceValue: element.distance,  // meters
        durationValue: element.duration,  // seconds
      };

    } else {
      throw new Error('No distance data found');
    }
  } catch (error) {
    if (error.response) {
      console.error(
        "❌ OLA MATRIX ERROR RESPONSE:",
        JSON.stringify(error.response.data, null, 2)
      );
    } else {
      console.error("❌ OLA MATRIX ERROR:", error.message);
    }
    return null;
  }
};

export const getAutoCompleteSuggestionService = async (input) => {

  if (!input) {
    throw new Error('Query is required');
  }

  const API_KEY = process.env.OLA_MAPS_API_KEY;

  const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${API_KEY}`;

  try {

    const response = await axios.get(url);
    if (response.data &&
      response.data.predictions &&
      response.data.predictions.length > 0
    ) {
      return response.data.predictions;
    }

    else {
      throw new Error("No suggestions found")
    }

  } catch (error) {
    console.log("Error fetching in autoComplete suggestions :", error.message);
    throw error;

  }

}

const toRad = (val) => (val * Math.PI) / 180;

export const getCaptainInRadiusService = async (lat, lng, radiusKm) => {
  const captains = await Captain.find();

  const nearby = captains.filter((captain) => {
    if (!captain.location?.lat || !captain.location?.lng) return false;

    const dLat = toRad(captain.location.lat - lat);
    const dLng = toRad(captain.location.lng - lng);

    const lat1 = toRad(lat);
    const lat2 = toRad(captain.location.lat);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c; // Earth radius in km

    return distance <= radiusKm;
  });

  return nearby;
};


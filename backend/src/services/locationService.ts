import NodeGeocoder from "node-geocoder";
import { formatAddress } from "../helpers/addressHelper";
import * as Sentry from "@sentry/node";

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
  formatter: null, // Use default formatting
});

export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
) => {
  try {
    const res = await geocoder.reverse({ lat: latitude, lon: longitude });

    if (res.length > 0) {
      const { formattedAddress, streetNumber, streetName, city, zipcode } =
        res[0];

      return {
        address: formatAddress({
          formattedAddress,
          streetNumber,
          streetName,
          city,
          zipcode,
        }),
      };
    } else {
      throw new Error("No results found for the given coordinates.");
    }
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setContext("Location Service: Failed to retrieve location", {
        latitude,
        longitude,
      });
      Sentry.captureException(error);
    });
    return null;
  }
};

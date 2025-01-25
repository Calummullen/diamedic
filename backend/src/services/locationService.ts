import { IPinfoWrapper } from "node-ipinfo";

const ipinfo = new IPinfoWrapper(process.env.IPINFO_TOKEN!);

export const getLocation = async (ipAddress: string) => {
  try {
    const data = await ipinfo.lookupIp(ipAddress);

    const test = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      coordinates: data.loc, // Latitude,Longitude
      postal: data.postal,
      timezone: data.timezone,
    };
    console.log("test", test);
    return test;
  } catch (error) {
    console.error("Error fetching location from IPinfo:", error);
    throw new Error("Unable to fetch location data.");
  }

  //   const client = twilio(
  //     process.env.TWILIO_ACCOUNT_SID,
  //     process.env.TWILIO_AUTH_TOKEN
  //   );
  //   return await client.messages.create({
  //     body: message,
  //     from: "Diamedic",
  //     to: phoneNumber,
  //   });
};

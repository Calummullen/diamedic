export const formatAddress = ({
  formattedAddress,
  streetNumber,
  streetName,
  city,
  zipcode,
}: {
  formattedAddress: string | undefined;
  streetNumber: string | undefined;
  streetName: string | undefined;
  city: string | undefined;
  zipcode: string | undefined;
}) => {
  return (
    formattedAddress ||
    `${
      streetNumber ? streetNumber + " " : ""
    }${streetName}, ${city}, ${zipcode}`
  );
};

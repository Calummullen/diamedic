import { FC } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProfileData } from "../profile/profile";

export const ColourPalette: FC<{
  setValue: UseFormSetValue<ProfileData>;
  watch: UseFormWatch<ProfileData>;
}> = ({ setValue, watch }) => {
  const predefinedBorderColors = [
    { name: "Red", value: "#CC0000" },
    { name: "Blue", value: "#0000CC" },
    { name: "Green", value: "#00CC00" },
    { name: "Orange", value: "#CCA500" },
    { name: "Magenta", value: "#CC00CC" },
    { name: "Yellow", value: "#CCCC00" },
    { name: "Cyan", value: "#00CCCC" },
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
  ];

  const predefinedTextColors = [
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
  ];

  const borderColour = watch("meta.cardBorderColour");
  const textColour = watch("meta.cardTextColour");

  return (
    <div className="flex flex-col items-center w-fit">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-8 md:gap-4 p-4">
        {/* Card Border Colour Selection */}
        <div className="flex flex-col gap-6 md:gap-4 items-center md:text-xl text-3xl">
          <p>Border Colour</p>
          <div className="grid grid-cols-3 gap-4">
            {predefinedBorderColors.map((color) => (
              <button
                key={color.value}
                aria-label={`Select border ${color.name} colour`}
                type="button"
                className={`w-16 h-16 md:h-12 md:w-12 rounded-xl border-2 ${
                  borderColour === color.value
                    ? "border-black"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setValue("meta.cardBorderColour", color.value)}
              />
            ))}
          </div>
        </div>

        {/* Text Colour Selection */}
        <div className="flex flex-col gap-6 md:gap-4 items-center md:text-xl text-3xl">
          <p>Text Colour</p>
          <div className="flex gap-4">
            {predefinedTextColors.map((color) => (
              <button
                key={color.value}
                aria-label={`Select text colour ${color.name}`}
                type="button"
                className={`w-16 h-16 md:h-12 md:w-12 rounded-xl border-2 ${
                  textColour === color.value
                    ? "border-black"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setValue("meta.cardTextColour", color.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

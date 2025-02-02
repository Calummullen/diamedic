import { FC } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProfileData } from "../profile/profile";

export const ColourPalette: FC<{
  setValue: UseFormSetValue<ProfileData>;
  watch: UseFormWatch<ProfileData>;
}> = ({ setValue, watch }) => {
  const predefinedBorderColors = [
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#008000" },
    { name: "Orange", value: "#FFA500" },
    { name: "Magenta", value: "#FF00FF" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Purple", value: "#800080" },
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
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-12 lg:gap-4 p-4">
        {/* Card Border Colour Selection */}
        <div className="flex flex-col gap-12 lg:gap-4 items-center lg:text-xl text-5xl">
          <p>Card Border Colour</p>
          <div className="grid grid-cols-3 gap-4">
            {predefinedBorderColors.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`w-24 h-24 lg:h-12 lg:w-12 rounded-xl border-2 ${
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
        <div className="flex flex-col gap-12 lg:gap-4 items-center lg:text-xl text-5xl">
          <p>Text Colour</p>
          <div className="flex gap-4">
            {predefinedTextColors.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`w-24 h-24 lg:h-12 lg:w-12 rounded-xl border-2 ${
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

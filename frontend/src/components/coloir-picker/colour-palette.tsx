import { FC } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProfileData } from "../profile/profile";

export const ColourPalette: FC<{
  setValue: UseFormSetValue<ProfileData>;
  watch: UseFormWatch<ProfileData>;
  predefinedBorderColors: {
    name: string;
    value: string;
    singleColour?: string;
  }[];
  predefinedTextColors: {
    name: string;
    value: string;
    singleColour?: string;
  }[];
}> = ({ setValue, watch, predefinedBorderColors, predefinedTextColors }) => {
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
                onClick={() => {
                  setValue("meta.cardBorderColour", color.value);
                  if (color.name === "Yellow") {
                    setValue("meta.cardTextColour", "#000000");
                    setValue("meta.matchBorderColour", false);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Text Colour Selection */}
        <div className="flex flex-col gap-6 md:gap-4 items-center md:text-xl text-3xl">
          <p>Text Colour</p>
          <div className="flex gap-4">
            {borderColour === "#FFFF00" ? (
              <button
                key={"yellow"}
                aria-label={`Select text colour yellow`}
                type="button"
                className={`w-16 h-16 md:h-12 md:w-12 rounded-xl border-2 ${"border-green-500"}`}
                style={{ backgroundColor: "#000000" }}
              ></button>
            ) : (
              predefinedTextColors.map((color) => {
                return (
                  <button
                    key={color.value}
                    aria-label={`Select text colour ${color.name}`}
                    type="button"
                    className={`w-16 h-16 md:h-12 md:w-12 rounded-xl border-2 ${
                      textColour === color.value
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setValue("meta.cardTextColour", color.value)}
                  ></button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

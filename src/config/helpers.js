export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  /*
  The reason we multiply the red value by 299 is because 
  the human eye is most sensitive to changes in the color red. 
  The green value is multiplied by 587 and the blue value is multiplied by 114. 
  These values were determined by the NTSC (National Television System Committee) 
  in the United States to create a weighted average that approximates the way humans 
  perceive brightness. This weighted average is often referred to as the "luma" value. 
  The formula for calculating luma is often abbreviated as Y = 0.299R + 0.587G + 0.114B, 
  where R, G, and B are the red, green, and blue color values, respectively.
  */


  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};

export const getImageData = (data: any) => {
  const arrayBufferView = new Uint8Array(data.data);
  const blob = new Blob([arrayBufferView], { type: "image/jpeg" }); // You may need to set the appropriate image type here

  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
};

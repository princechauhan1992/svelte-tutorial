export const pickRandom = (array) => {
  const index = Math.floor(array.length * Math.random());
  return array[index];
};

export const sleep = (time) => {
  return new Promise((fulfilled) => {
    setTimeout(fulfilled, time);
  });
};

export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(error);
    img.src = src;
  });
};

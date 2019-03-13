export function delay (time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(true), time);
  });
}

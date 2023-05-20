export default function promiseClick(button) {
  console.log(button);
  return new Promise(function (resolve) {
    button.addEventListener(
      "click",
      (event) => {
        console.log(`эвент ${event}`);
        resolve(event);
      },
      { once: true }
    );
  });
}

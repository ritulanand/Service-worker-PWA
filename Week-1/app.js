// console.log("App Started");
if('serviceWorker' in navigator){
    navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("registered service worker"))
    .catch((err) => console.error(`service worker registeration failed : ${err}`) );
}
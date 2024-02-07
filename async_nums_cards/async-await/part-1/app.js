let favNumber = 9;
let baseURL = "http://numbersapi.com";

// 1.
async function numberFacts() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
}
numberFacts();

// 2.
const favNumbers = [9, 14, 42];
async function multiNumFacts() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
multiNumFacts();

// 3.
async function fourFacts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
fourFacts();

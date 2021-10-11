"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  // ******adding element**********

  const target = event.currentTarget;
  const feature = target.dataset.feature;

  console.log(target);
  console.log(feature);

  // TODO: Toggle feature in "model"
  document.querySelectorAll(".image").forEach((image) => {
    console.log(image.dataset.feature);
    if (image.dataset.feature === feature) {
      if (image.classList.contains("hide")) {
        image.classList.remove("hide");
        features[feature] = true;
      } else if (image.classList.contains("hide") === false) {
        image.classList.add("hide");
        features[feature] = false;
      }
    }
  });

  // ****trigger create or delete element****

  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);

    // TODO: More code
    createFeatureElement(feature);
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);
    removeFeatureElement(feature);
    // TODO: More code
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;
  console.log(feature);
  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  document.querySelector("ul").append(li);

  // *****adding animation*****

  const firstFrame = document
    .querySelector(`#options [data-feature=${feature}]`)
    .getBoundingClientRect();
  const lastFrame = li.getBoundingClientRect();

  const deltaX = firstFrame.left - lastFrame.left;
  const deltaY = firstFrame.top - lastFrame.top;

  li.animate(
    [
      {
        transformOrigin: "top left",
        transform: `translate(${deltaX}px, ${deltaY}px)`,
      },
      {
        transformOrigin: "top left",
        transform: "none",
      },
    ],
    {
      duration: 500,
      easing: "ease-in-out",
    }
  );

  return li;
}

function removeFeatureElement(feature) {
  const remBox = document.querySelector(`#selected [data-feature=${feature}]`);
  const firstFrame = remBox.getBoundingClientRect();
  const lastFrame = document
    .querySelector(`#options [data-feature=${feature}]`)
    .getBoundingClientRect();

  const deltaX = lastFrame.left - firstFrame.left;
  const deltaY = lastFrame.top - firstFrame.top;

  remBox.animate(
    [
      {
        transformOrigin: "top left",
        transform: "none",
      },
      {
        transformOrigin: "top left",
        transform: `translate(${deltaX}px, ${deltaY}px)`,
      },
    ],
    {
      duration: 500,
      easing: "ease-in-out",
    }
  );
  setTimeout(() => {
    document.querySelector(`#selected [data-feature=${feature}]`).remove();
  }, 500);
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}

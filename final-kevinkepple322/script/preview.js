// Dom Selections
const gridPerLine = document.getElementById("gridPerLine");
const gridContainer = document.getElementById("printablePart");
const printCount = document.getElementById("printCount");


// Print count
printCount.addEventListener("input", () => {
  const count = parseInt(printCount.value);
  const cards = gridContainer.querySelectorAll(".info-card");
  cards.forEach((card, index) => {
    if (index >= count) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });
});

// Print the datas
const printBtn = document.getElementById("print");
printBtn.addEventListener("click", () => {
  window.print();
});

// Change grid view function
gridPerLine.addEventListener("change", () => {
  gridContainer.style.gridTemplateColumns = `repeat(${gridPerLine.value}, 1fr)`;
});

const datas = localStorage.getItem("labelData");
const informationData = JSON.parse(datas);

// Function to create information cards dynamically
function createInfoCards() {
  const gridContainer = document.getElementById("printablePart");
  const fragment = document.createDocumentFragment();

  informationData.forEach((data, index) => {
    const card = document.createElement("div");
    card.classList.add("info-card");
    const deleteButton = document.createElement("div");
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>`;
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {
      const confirmed = confirm("Are you sure you want to delete this entry?");
      if (confirmed) {
        // Remove the card from the DOM
        card.remove();
        // Remove the data from localStorage
        informationData.splice(index, 1);
        localStorage.setItem("labelData", JSON.stringify(informationData));
      }
    });
    let oldDate = new Date(data.repackDate);
    let newDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(oldDate);
    const cardContent = `<h2>${data.productName}</h2>
        <p>Ingredients: ${data.ingredients}</p>
        <p>${
          data.allergens === "no" ? "" : "Allergens: " + data.allergens + ";"
        } ${
      data.handlingInstructions === "no" ? "" : data.handlingInstructions + ";"
    }</p>
        <div class="card-main-info">
          <div class="card-left">
            <p>${data.distributorLocation}</p>
          </div>
          <div class="card-right">
            <p>${data.productNumber}</p>
            <p>${newDate}</p>
            <p>${data.weight} ${data.weightUnit}</p>
          </div>
        </div>`;

    card.innerHTML = cardContent;

    card.appendChild(deleteButton);
    fragment.appendChild(card);
  });

  // Append all cards to the gridContainer at once
  gridContainer.appendChild(fragment);
}

// Call the function to create information cards
createInfoCards();

// Function to update gap property based on input values
// function updateGridGap() {
//   const upBottomValue = document.getElementById("gridGapUpBottom").value;
//   const leftRightValue = document.getElementById("gridGapLeftRight").value;

//   // Update gap property
//   const printablePart = document.getElementById("printablePart");
//   printablePart.style.gap = `${upBottomValue}px ${leftRightValue}px`;
// }

// // Add event listeners to input fields
// document
//   .getElementById("gridGapUpBottom")
//   .addEventListener("input", updateGridGap);
// document
//   .getElementById("gridGapLeftRight")
//   .addEventListener("input", updateGridGap);

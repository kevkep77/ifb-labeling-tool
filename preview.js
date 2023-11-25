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

    // Determine label dimensions
    const labelDimensions = gridPerLine.value === "3" ? "2\" x 4\"" : "1\" x 2 5/8\"";

    // Apply styles based on label dimensions
    card.style.width = labelDimensions === "2\" x 4\"" ? "200px" : "100px";
    card.style.height = labelDimensions === "2\" x 4\"" ? "400px" : "260px";

    const deleteButton = document.createElement("div");
    // ... (rest of the deleteButton code remains unchanged)

    // ... (rest of the card content generation remains unchanged)

    card.innerHTML = cardContent;

    card.appendChild(deleteButton);
    fragment.appendChild(card);
  });

  // Append all cards to the gridContainer at once
  gridContainer.appendChild(fragment);
}

// Call the function to create information cards
createInfoCards();

function addData(e) {
  e.preventDefault();
  // Get values from form elements
  var productName = document.getElementById("productName").value;
  var allergens = document.getElementById("allergens").value;
  var ingredients = document.getElementById("ingredients").value;
  var handlingInstructions = document.getElementById(
    "handlingInstructions"
  ).value;
  var productNumber = document.getElementById("productNumber").value;
  var repackDate = document.getElementById("repackDate").value;
  var weight = document.getElementById("weightInput").value;
  var weightUnit = document.getElementById("weightSelect").value;
  var distributorLocation = document.getElementById(
    "distributorLocation"
  ).value;
  var labelSize = document.getElementById("labelSize").value;

  // Create an object with the form data
  var formData = {
    productName: productName,
    allergens: allergens,
    ingredients: ingredients,
    handlingInstructions: handlingInstructions,
    productNumber: productNumber,
    repackDate: repackDate,
    weight: weight,
    weightUnit: weightUnit,
    distributorLocation: distributorLocation,
    labelSize: labelSize,
  };

  // Get existing data from local storage or initialize an empty array
  var existingData = JSON.parse(localStorage.getItem("labelData")) || [];

  // Add new data to the array
  existingData.push(formData);

  // Save the updated array back to local storage
  localStorage.setItem("labelData", JSON.stringify(existingData));

  alert("Data added successfully!");
}


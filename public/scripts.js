$(document).ready(function () {
	getBoats("");
});

// $("#txtKeyword").keyup(function (e) {
//   e.preventDefault();
//   const keyword = $("#txtKeyword").val();
//   getBoats(keyword);
// });

function formatAsCurrency(number) {
	return parseFloat(number)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function getBoats(keyword) {
	$("#boats").html(``);
	$.ajax({
		type: "POST",
		url: "http://localhost:3001/boats/all",
		dataType: "json",
		data: { keyword: keyword },
		success: function (data) {
			let html = ``;

			if (data.length === 0)
				html += `<p class="not-found">No boats found on this search criteria.</p>`;

			data.forEach(function (boat) {
				html += `<div class="boat">
					  <span class="model">${boat.model}
						  <span class="btns">
							  <button class="btn btn-sm btn-warning" onclick="editBoat('${boat._id
					}')">Edit</button>
							  <button class="btn btn-sm btn-danger" onclick="deleteBoat('${boat._id
					}')">Delete</button>
						  </span>
					  </span><br/>
					  <span class="year">${boat.year}</span><br/>
					  <span class="price">$${formatAsCurrency(
						boat.price
					)}</span><br/><br/>
					  
					  <span>Product Information</span><br/>
					  <span class="year">Is sail? ${boat.sail === true ? "Yes" : "No"
					}</span><br/>
					  <span class="price">Has motor? ${boat.motor === true ? "Yes" : "No"
					}</span><br/>
				  </div>`;
			});

			$("#boats").html(html);
		},
	});
}

function save() {
	let id = $("#txtId").val();
	let model = $("#txtModel").val();
	if (!model || model.length === 0) {
		alert("Please provide boat model.");
		return;
	}

	let year = $("#txtYear").val() || 2020;
	let price = $("#txtPrice").val() || 0;
	let sail = $("input[name='rdoSail']:checked").val();
	let motor = $("input[name='rdoMotor']:checked").val();
	const obj = {
		id,
		model,
		year,
		price,
		sail,
		motor,
	};

	if (id === "0") {
		create(obj);
	} else if (id.length === 24) {
		update(obj);
	}
	getBoats(``);
}

function editBoat(id) {
	get(id, function (boat) {
		$("#txtId").val(boat._id);
		$("#txtModel").val(boat.model);
		$("#txtYear").val(boat.year);
		$("#txtPrice").val(boat.price);
		if (boat.sail === true) $("#rdoSailYes").attr("checked", "checked");
		else $("#rdoSailNo").attr("checked", "checked");

		if (boat.motor === true) $("#rdoMotorYes").attr("checked", "checked");
		else $("#rdoMotorNo").attr("checked", "checked");
	});
}

function clearForm() {
	$("#txtId").val(0);
	$("#txtModel").val(``);
	$("#txtYear").val(``);
	$("#txtPrice").val(``);
	$("#rdoSailYes").removeAttr("checked");
	$("#rdoSailNo").removeAttr("checked");
	$("#rdoMotorYes").removeAttr("checked");
	$("#rdoMotorNo").removeAttr("checked");
}

function deleteBoat(id) {
	let confirmation = confirm(`Are you sure you want to delete this boat?`);
	if (confirmation) {
		remove(id, (result) => {
			if (result) {
				getBoats(``);
				alert(`Boat deleted successfully!`);
			}
		});
	}
}

function create(data) {
	$.ajax({
		type: "POST",
		url: "http://localhost:3001/boats/",
		dataType: "json",
		data: data,
		success: function (data) {
			getBoats("");
			clearForm();
			alert("New boat is created successfully!");
		},
	});
}

function get(id, callback) {
	return $.ajax({
		type: "GET",
		url: `http://localhost:3001/boats/${id}`,
		dataType: "json",
		async: false,
		success: function (data) {
			callback(data);
		},
	});
}

function remove(id, callback) {
	return $.ajax({
		type: "DELETE",
		url: `http://localhost:3001/boats/${id}`,
		dataType: "json",
		async: false,
		success: function (data) {
			callback(data);
		},
	});
}

function update(data) {
	$.ajax({
		type: "POST",
		url: `http://localhost:3001/boats/${data.id}`,
		dataType: "json",
		data: data,
		success: function (data) {
			getBoats("");
			clearForm();
			alert("Boat is updated successfully!");
		},
	});
}

function reset() {
	let confirmation = confirm(`Are you sure you want to reset boat list?`);
	if (confirmation) {
		resetDatabase(() => {
			getBoats("");
			clearForm();
			alert("Database is reset successfully!");
		});
	}
}

function resetDatabase(callback) {
	$.ajax({
		type: "POST",
		url: `http://localhost:3001/reset`,
		dataType: "json",
		async: false,
		success: function (data) {
			callback();
		},
	});
}
//will work when user press apply filter
function search() {
	var word = $("#txtKeyword").val();
	var maxPrice = $("#txtMaxPrice").val();
	//Call The API.
	//get the data
	//   return;
	$.ajax({
		type: "GET",
		url: `http://localhost:3001/search?word=${word}&maxPrice=${maxPrice}`,
		dataType: "json",
		async: false,
		success: function (data) {
			let html = ``;
			//append the data to the main div where boats are showing
			if (data.length === 0)
				html += `<p class="not-found">No boats found on this search criteria.</p>`;

			data.forEach(function (boat) {
				html += `<div class="boat">
					  <span class="model">${boat.model}
						  <span class="btns">
							  <button class="btn btn-sm btn-warning" onclick="editBoat('${boat._id
					}')">Edit</button>
							  <button class="btn btn-sm btn-danger" onclick="deleteBoat('${boat._id
					}')">Delete</button>
						  </span>
					  </span><br/>
					  <span class="year">${boat.year}</span><br/>
					  <span class="price">$${formatAsCurrency(
						boat.price
					)}</span><br/><br/>
					  
					  <span>Product Information</span><br/>
					  <span class="year">Is sail? ${boat.sail === true ? "Yes" : "No"
					}</span><br/>
					  <span class="price">Has motor? ${boat.motor === true ? "Yes" : "No"
					}</span><br/>
				  </div>`;
			});

			$("#boats").html(html);
		},
	});
}

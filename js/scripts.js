function Contact(firstName,lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state, address_type) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.address_type = address_type;

}

Address.prototype.fullAddress = function () {
  return "<h4>" + this.address_type + "</h4>" + "<br>" + this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("input.address-type").val("");
  $("div.new-address").not(":first").remove();
}

function createNewFields() {
  $("#new-addresses").append('<div class="new-address">' +
                              '<div class="form-group">' +
                                  '<label for="new-street">Street</label>' +
                                  '<input type="text" class="form-control new-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label for="new-city">City</label>' +
                                    '<input type="text" class="form-control new-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-state">State</label>' +
                                  '<input type="text" class="form-control new-state">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="address-type">Address Type</label>' +
                                  '<select id="address-type" class="form-control address-type">' +
                                      '<option>Work</option>' +
                                      '<option>Home</option>' +
                                  '</select>' +
                                '</div>' +
                            '</div>');
}

function saveContacts() {
  var inputtedFirstName = $("input#new-first-name").val();
  var inputtedLastName = $("input#new-last-name").val();

  newContact = new Contact(inputtedFirstName, inputtedLastName);

}

// function showContact() {
//
// }

// function saveAddresses() {
//   var inputtedStreet = $(this).find("input.new-street").val();
//   var inputtedCity = $(this).find("input.new-city").val();
//   var inputtedState = $(this).find("input.new-state").val();
//
//   newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
//   newContact.addresses.push(newAddress);
// }

function listContacts() {

    $("ul#contacts").append("<div class='fademe1'><li><span class='contact'>" + newContact.fullName() + "</span></li></div>");
    $(".fademe1").hide().fadeIn();
    $( ".fademe1" ).removeClass('fademe1').addClass('fadedme');

}
// $( "#book" ).fadeIn( "slow", function() {
//    // Animation complete
//  });

//
$(document).ready(function() {
  //add another address button
  $("#add-address").click(function() {
    createNewFields();
  });

  $("#poop").click(function() {
    $("#added_poop").hide().fadeIn();
  });
  //submit "add" and create new contact obj.
  $("form#new-contact").submit(function(event) {
      event.preventDefault();
      saveContacts();

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedType = $(this).find("#address-type :selected").text();
      //  $(this).find("input.new-type").val();
      console.log(inputtedType);

      newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedType);

      newContact.addresses.push(newAddress);



    });

    listContacts();

    //click on contact name
    $(".contact").last().click(function() {

      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");

      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress()  + "</li>");
      });

    });



    resetFields();


  });
});

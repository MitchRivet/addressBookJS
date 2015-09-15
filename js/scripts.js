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
  $("#new-addresses").append('<div class="fademe2"><div class="new-address">' +
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
                            '</div></div>');

                            $(".fademe2").hide().fadeIn();
                            $( ".fademe2" ).removeClass('fademe2').addClass('fadedme2 ');
}

function saveContacts() {
  var inputtedFirstName = $("input#new-first-name").val();
  var inputtedLastName = $("input#new-last-name").val();

  newContact = new Contact(inputtedFirstName, inputtedLastName);

}

function listContacts() {

    $("ul#contacts").append("<div class='fademe1'><li class = 'hover'><span class='contact'>" + newContact.fullName() + "</span></li></div>");
    $(".fademe1").hide().fadeIn();
    $( ".fademe1" ).removeClass('fademe1').addClass('fadedme');

}

i=0;

$(document).ready(function() {
  //add another address button
  $("#add-address").click(function() {
    createNewFields();
  });

  $(".hover").hover(function() {
  $( this ).fadeOut( 500 );
  $( this ).fadeIn( 500 );
  });

  $(".count").keypress(function() {
    $(".count").text(i += 1);
  });

  $(".btn").click(function() {
    $(".count").keypress();
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

      newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedType);

      newContact.addresses.push(newAddress);



    });

    listContacts();

    //click on contact name
    $(".contact").last().click(function() {

      $("#show-contact").fadeIn()
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

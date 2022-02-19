const input = document.querySelectorAll('.amount_form');
const button = document.querySelectorAll('.tip-res');
const cus = document.querySelector(".cus-hov");
const reset = document.querySelector(".reset-button");
const ppl = document.getElementById("ppl")
const err = document.querySelector('.error')

var custom_clicked = false;
var resetval = true;
var amount = document.getElementsByName("amount")[0]
var people = document.getElementsByName("people")[0]
var custom = document.getElementsByName("custom_amount")[0]
var percentage = 0
var tip_amount = 0
var total = 0


reset.addEventListener('mouseover', () => {
  if (!resetval) {
    reset.classList.add('reset-a')
  }
})
reset.addEventListener('mouseout', () => {
  reset.classList.remove('reset-a')
})
reset.addEventListener('click', ()=> {
  if (!resetval) {
    reset.classList.remove('reset-a')
    amount.value = ""
    people.value = ""
    custom.value = ""
    // percentage = 0

    if (!err.classList.contains("hide")) {
      err.classList.add("hide")
      ppl.classList.remove("peopleHoverError")
    }
    compute_display()
  
    reset.classList.add('op')
    // reset tip-box
    resetState()
  
    // reset custom_input
    hide_custom_input()
    resetval = true
  }
})

input.forEach(item => {
  item.addEventListener('mouseover', event => {
    item.classList.add('customHover')
  })
  
  item.addEventListener('mouseout', event => {
    item.classList.remove('customHover')
  })
})

function tipclicked(element) {
  percentage = element.id
  console.log(percentage)
  compute_display()
  unReset()
}

button.forEach(item => {

  // change color if the item is clicked
  item.addEventListener('click', event => {
    if (!item.classList.contains('bc1')) {
      item.classList.remove('bc3')
      resetState()
      hide_custom_input()
      item.classList.add('bc1')
    }
  })
})

button.forEach(item => {

  item.addEventListener('mouseover', something => {
    if (!item.classList.contains('bc1')) {
      item.classList.add('bc3')
    }
  })

  item.addEventListener('mouseout', something => {
    item.classList.remove('bc3')
  })
  })

  cus.addEventListener('click', event=> {
    resetState()
    custom_clicked = true;
  })
  cus.addEventListener('mouseenter', event=> {
    show_custom_input()
  })

  cus.addEventListener('mouseleave', event=> {
    if (!custom_clicked) {
      hide_custom_input()
    }
  })
// This function resets the state
function resetState() {
  button.forEach(item => {
    if (item.classList.contains('bc1')) {
      item.classList.remove('bc1')
    }
  })
  custom_clicked = false
}

// Function to handle change in form content
function formChanged(element) {
  
  console.log("percentage: ", custom.value)
  console.log("amount: ", amount.value)
  console.log("people: ", people.value)
  if (element.name == "custom_amount") {
    percentage = custom.value
  }
  
  if (element.name == "people" && element.value == 0) {
    ppl.classList.add("peopleHoverError")
    err.classList.remove('hide')
  }
  if (element.name == "people" && element.value != 0 && ppl.classList.contains("peopleHoverError")) {
    ppl.classList.remove("peopleHoverError")
    err.classList.add('hide')
  }
  compute_display()
  unReset()
}

function show_custom_input() {
  cus.children[0].classList.add('hide')
  cus.children[1].classList.remove('hide')
}

function hide_custom_input() {
  cus.children[1].classList.add('hide')
  cus.children[0].classList.remove('hide')
  cus.classList.remove('customHover')
}

// This function computes the tip_amount and total
function compute_tip_total() {
  if (!(amount.value == 0 || people.value == 0)) {
    tip_amount = parseInt(amount.value) * percentage / 100 / people.value;
    total = parseInt(amount.value) + amount.value * percentage / 100
    total = total / people.value // calculate total per person
  }
  else {
    tip_amount = 0
    total = 0
  }
}

// This function returns the tip_amount and total to the html document
function display_tip_total() {
  if (isNaN(tip_amount) || !isFinite(tip_amount)) {
    tip_amount = 0.00
  }
  if (isNaN(total)) {
    total = 0.00
  }

  var amtstring = "$" + tip_amount.toFixed(2).toString()
  var ttlstring = "$" + (total.toFixed(2)).toString()
  console.log("amtstring:", amtstring)
  console.log("ttlstring:", ttlstring)
  document.getElementById("tip-amt").innerHTML = amtstring
  document.getElementById("ttl").innerHTML = ttlstring
}

function compute_display() {
  compute_tip_total()
  display_tip_total()
}

function unReset() {
  if (reset.classList.contains('op')) {
    reset.classList.remove('op') // unreset
  }
  resetval = false
}
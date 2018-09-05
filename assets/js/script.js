let user_count = 0

$(document).ready(initialize);

function initialize() {
    create_board();
    assign_click_handler();
}

function create_board() {
    for (var i = 1; i < 81; i++) {
        $('<div>').addClass('box').html(i).appendTo('.game')
    }
}

function assign_click_handler() {
    $('.box').on('click', select_number);
}

function select_number() {
    if ($(this).hasClass('selected')) {
        user_count--
        $(this).removeClass('selected');
        return
    }
    if (user_count < 10) {
        user_count++
        $(this).addClass('selected')
    }
}

function generate_winning_numbers() {
    var winning_numbers = [];
    while (winning_numbers.length < 20) {
        var hold = Math.ceil(Math.random() * 80)
        if (!winning_numbers.includes(hold)) {
            winning_numbers.push(hold);
        }
    }
    console.log(winning_numbers.sort(function (a, b) { return a - b }))
}
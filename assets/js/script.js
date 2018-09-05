let user_count = 0

$(document).ready(initialize);

function initialize() {
    create_board();
    assign_click_handler();
}

function create_board() {
    for (let i = 1; i < 81; i++) {
        $('<div>').addClass('box').html(i).appendTo('.game')
    }
}

function assign_click_handler() {
    $('.box').on('click', picked_number);
    $('.play').on('click', generate_winning_numbers);
}

function picked_number() {
    if ($(this).hasClass('picked')) {
        user_count--
        $(this).removeClass('picked');
        return
    }
    if (user_count < 10) {
        user_count++
        $(this).addClass('picked')
    }
}

function generate_winning_numbers() {
    $('.box').off("click");
    let winning_numbers = [];
    while (winning_numbers.length < 20) {
        let hold = Math.ceil(Math.random() * 80)
        if (!winning_numbers.includes(hold)) {
            winning_numbers.push(hold);
        }
    }
    select_winning_numbers(winning_numbers);
    //console.log(winning_numbers.sort(function (a, b) { return a - b }))
}

function select_winning_numbers(array) {
    const interval = setInterval(function () {
        if (array.length === 0) {
            clearInterval(interval);
            return
        }
        $('.box:nth-child(' + array[0] + ')').addClass('selected')
        array.shift();
    }, 250)
}
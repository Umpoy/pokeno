let user_count = 0
let user_numbers = [];
let user_money = 10

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
        user_numbers.splice(user_numbers[user_numbers.indexOf($(this).html)], 1)
        console.log(user_numbers)
        return
    }
    if (user_count < 10) {
        user_count++
        $(this).addClass('picked')
        user_numbers.push($(this).html());
        console.log(user_numbers)
    }
}

function generate_winning_numbers() {
    if (user_money == 0 || user_numbers.length == 0) {
        return
    }
    user_money--
    console.log(user_money)
    $('.box').off("click");
    //$('.play').off("click");
    $('.box').removeClass('selected');
    let winning_numbers = [];
    while (winning_numbers.length < 20) {
        let hold = Math.ceil(Math.random() * 80)
        if (!winning_numbers.includes(hold)) {
            winning_numbers.push(hold);
        }
    }
    console.log(winning_numbers)

    select_winning_numbers(winning_numbers);

    //console.log(winning_numbers.sort(function (a, b) { return a - b }))
}

function select_winning_numbers(array) {

    const hold_array = array.slice();
    const interval = setInterval(function () {
        if (hold_array.length === 0) {
            clearInterval(interval);
            check_winnings(array);
            return
        }
        $('.box:nth-child(' + hold_array[0] + ')').addClass('selected')
        hold_array.shift();
    }, 100)

}

function check_winnings(array) {

    let correct_match = 0;
    for (let i = 0; i < user_numbers.length; i++) {
        if (array.includes(parseInt(user_numbers[i]))) {
            correct_match++
        }
    }
    if (correct_match === 0) {
        return
    }

    switch (user_numbers.length) {
        case 1:
            if (correct_match == 1) {
                user_money += 3
            }
    }
    console.log(user_money)
}
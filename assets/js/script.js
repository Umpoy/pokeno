let user_count = 0
let user_numbers = [];
let user_money = 10

$(document).ready(initialize);

function initialize() {
    create_board();
    assign_click_handler();
    render_DOM();
    give_credit();
}

function create_board() {
    for (let i = 1; i < 81; i++) {
        $('<div>').addClass('box').html(i).appendTo('.game')
    }
}

function assign_click_handler() {
    $('.box').on('click', picked_number);
    $('.play').on('click', generate_winning_numbers);
    $('.erase').on('click', erase_picks);
    $('.quick').on('click', quick_pick);
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
    render_DOM();
    console.log(user_money)
    $('.box').off("click");
    $('.play').off("click");
    $('.erase').off("click");
    $('.quick').off("click");
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
            break;
        case 2:
            if (correct_match == 2) {
                user_money += 9
            } else {
                user_money += 1
            }
            break;
        case 3:
            switch (correct_match) {
                case 1:
                    user_money += 1
                    break;
                case 2:
                    user_money += 2
                    break;
                case 3:
                    user_money += 16
                    break;
            }
            break;
        case 4:
            switch (correct_match) {
                case 2:
                    user_money += 2
                    break;
                case 3:
                    user_money += 6
                    break;
                case 4:
                    user_money += 12
                    break;
            }
            break;
        case 5:
            switch (correct_match) {
                case 2:
                    user_money += 1
                    break;
                case 3:
                    user_money += 3
                    break;
                case 4:
                    user_money += 15
                    break;
                case 5:
                    user_money += 50
                    break;
            }
            break;
        case 6:
            switch (correct_match) {
                case 2:
                    user_money += 1
                case 3:
                    user_money += 2
                    break;
                case 4:
                    user_money += 3
                    break;
                case 5:
                    user_money += 30
                    break;
                case 6:
                    user_money += 75
                    break;
            }
            break;
        case 7:
            switch (correct_match) {
                case 3:
                    user_money += 1
                    break;
                case 4:
                    user_money += 6
                    break;
                case 5:
                    user_money += 12
                    break;
                case 6:
                    user_money += 36
                    break;
                case 7:
                    user_money += 100
                    break;
            }
            break;
        case 8:
            switch (correct_match) {
                case 3:
                    user_money += 1
                    break;
                case 4:
                    user_money += 3
                    break;
                case 5:
                    user_money += 6
                    break;
                case 6:
                    user_money += 19
                    break;
                case 7:
                    user_money += 90
                    break;
                case 8:
                    user_money += 720
                    break;
            }
            break;
        case 9:
            switch (correct_match) {
                case 3:
                    user_money += 1
                    break;
                case 4:
                    user_money += 2
                    break;
                case 5:
                    user_money += 4
                    break;
                case 6:
                    user_money += 8
                    break;
                case 7:
                    user_money += 20
                    break;
                case 8:
                    user_money += 80
                    break;
                case 9:
                    user_money += 1200
                    break;
            }
            break;
        case 10:
            switch (correct_match) {
                case 3:
                    user_money += 1
                    break;
                case 4:
                    user_money += 2
                    break;
                case 5:
                    user_money += 3
                    break;
                case 6:
                    user_money += 5
                    break;
                case 7:
                    user_money += 10
                    break;
                case 8:
                    user_money += 30
                    break;
                case 9:
                    user_money += 600
                    break;
                case 10:
                    user_money += 1800
                    break;
            }
            break;
    }
    console.log(correct_match + '/' + user_numbers.length)
    console.log(user_money)
    render_DOM();
    assign_click_handler();
}

function erase_picks() {
    user_count = 0
    user_numbers = [];
    $('.box').removeClass('picked');
}

function quick_pick() {
    erase_picks();
    let hold_num = Math.ceil(Math.random() * 10);
    let hold_array = [];
    while (hold_array.length !== hold_num) {
        let hold = Math.ceil(Math.random() * 80)
        if (!hold_array.includes(hold)) {
            hold_array.push(hold);
        }
    }
    user_numbers = hold_array.slice();
    user_count = hold_num;
    const interval = setInterval(function () {
        if (hold_array.length === 0) {
            clearInterval(interval);
            return
        }
        $('.box:nth-child(' + hold_array[0] + ')').addClass('picked')
        hold_array.shift();
    }, 100)

}

function give_credit() {
    setInterval(function () {
        user_money++;
        render_DOM();
    }, 60000)
}

function render_DOM() {
    $('.credit_span').html(user_money);
}
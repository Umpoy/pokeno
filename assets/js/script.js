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
        $(this).removeClass('selected')
    } else {
        $(this).addClass('selected')
    }
}
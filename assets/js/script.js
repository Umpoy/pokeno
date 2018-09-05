$(document).ready(initialize);

function initialize() {
    create_board();
}

function create_board() {
    for (var i = 1; i < 81; i++) {
        $('<div>').addClass('box').html(i).appendTo('.game')
    }
}
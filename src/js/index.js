import $ from 'cash-dom';

$(function () {
  console.log('cash started');
  $('html').addClass('dom-loaded');
  $('<footer>Appended with Cash</footer>').appendTo(document.body);
});

import $ from 'cash-dom';

$(function () {
  console.log('cash started');
  $('html').addClass('dom-loaded');
  $('<footer>Appended with Cash [[test]]</footer>').appendTo(document.body);
});

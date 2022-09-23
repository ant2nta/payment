const regexEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const getCountries = () => {
  return fetch('countries.json')
    .then(data => data.json());
};

$(function() {
  const select = $('.form__country');
  const months = $('.form__month');
  const years = $('.form__year');

  const year_now = (new Date()).getFullYear();

  getCountries().then(data => {
    for (let country of data) {
      if (country === "Ukraine") {
        select.append(`<option selected>${country}</option>`);
      } else {
        select.append(`<option>${country}</option>`);
      }
    }
  });
  
  for (let i = 1; i <= 31; i++) {
    months.append(`<option>${i}</option>`);
  }

  for (let i = year_now; i <= year_now + 10; i++) {
    years.append(`<option>${i.toString().slice(2)}</option>`);
  }

  const testError = $('.main__error');

  $('.form__email').keyup(function() {
    const emailValue = $(this).val();

    if (!regexEmail.test(emailValue)) {
      $(this).css('border', '1px solid rgb(255, 0, 0)');
    } else {
      $(this).css('border', '1px solid rgb(0, 255, 0)');
    }
  });

  $('.form__visa').click(function() {
    $('.form__paypal').css({
      'border': '1px solid #D0DAE4',
      'background-color': '#ffffff',
    });
    $(this).css({
      'border-bottom': 'none',
      'background-color': '#e9f0fc',
    });
  });

  $('.form__paypal').click(function() {
    $('.form__visa').css({
      'border': '1px solid #D0DAE4',
      'background-color': '#ffffff',
    });
    $(this).css({
      'border-bottom': 'none',
      'background-color': '#e9f0fc',
    });
  });

  $('.form__submit').click(function() {
    if (regexEmail.test($('.form__email').val())) {
      alert('Form submitted');
    }
  });
});

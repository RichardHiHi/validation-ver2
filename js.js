function Validator(formSelector) {
  var formRule = {};

  /**
   *quy ước tạo rule:
   * - nếu có lỗi thì return `error message`
   * - nếu không có lỗi thì return `undifine``
   */

  var validatorRules = {
    required: function (value) {
      return value ? undefined : `bạn phải nhập trường này`;
    },
    email: function (value) {
      return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? `không phải email xin nhập lại`
        : undefined;
    },
    min: function (min) {
      return function (value) {
        value.length >= min ? undefined : `vui lòng nhập hơn ${min} kí tự`;
      };
    },
  };

  function vadidate(name, value) {
    var rules = formRule[name].split("|");
    rules.forEach(function (rule) {
      console.log(rule);
      validatorRules[rule](value);
    });
  }

  var formElement = document.querySelector(formSelector);
  var inputs = formElement.querySelectorAll("[name][rules]");
  if (formElement) {
    for (var input of inputs) {
      formRule[input.name] = input.getAttribute("rules");
    }
    Array.from(inputs).forEach(function (input) {
      var errorMessage;
      input.onblur = function () {
        errorMessage = vadidate(input.name, input.value);
      };
      if (errorMessage) {
      }
    });
  }
}

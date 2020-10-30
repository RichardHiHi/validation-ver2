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
        return value.length >= min
          ? undefined
          : `vui lòng nhập hơn ${min} kí tự`;
      };
    },
  };

  var formElement = document.querySelector(formSelector);
  var inputs = formElement.querySelectorAll("[name][rules]");
  if (formElement) {
    for (var input of inputs) {
      formRule[input.name] = input.getAttribute("rules");
    }

    Array.from(inputs).forEach(function (input) {
      var rules = formRule[input.name].split("|");
      rules.forEach(function (rule) {
        var funRule;
        var ruleInfo;
        isRulerHasValue = rule.includes(":");

        if (isRulerHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
          console.log(validatorRules[rule]);
        }
        funRule = validatorRules[rule];
        if (isRulerHasValue) {
          funRule = validatorRules[rule](ruleInfo[1]);
        }

        if (Array.isArray(formRule[input.name])) {
          formRule[input.name].push(funRule);
        } else {
          formRule[input.name] = [funRule];
        }
      });
      //lang nghe su kien
      input.onblur = handleValidate;
    });
    function handleValidate(event) {
      var funRules = formRule[event.target.name];
      console.log(funRules);
      var errormessage;

      for (funRule of funRules) {
        errormessage = funRule(event.target.value);
        if (errormessage) {
          break;
        }
      }

      console.log(errormessage);
    }
    console.log(formRule);
  }
}

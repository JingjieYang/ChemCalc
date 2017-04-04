var modes = [
    "molecule", "equation", "empirical", "alkane"
];
var currentMode = "equation";

// update render
function render(mode) {
    for (var i = 0; i < modes.length; i++) {
        var option = modes[i];
        if (option == mode) {
            $("#" +  option).addClass("selected");
        } else {
            $('#' + option).removeClass("selected");
        }
    } 
}

$(document).ready(function () {
    
    // set up input box
    var MQ = MathQuill.getInterface(2);
    var inputBox = $('#input')[0];
    var mainField = MQ.MathField(inputBox, {
        supSubsRequireOperand: true,
        charsThatBreakOutOfSupSub: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        handlers: {
            edit: function () {
                var latex = mainField.latex();
                console.log(latex);
                
                if (latex.toLowerCase().includes("rightarrow")) {
                    currentMode = "equation";
                } else if (latex.toLowerCase().includes("alkane")) {
                    currentMode = "alkane";
                } else if (latex.includes(":")) {
                    currentMode = "empirical";
                } else if (latex
                ) {
                    currentMode = "molecule";
                } else {
                    currentMode = null;
                }
                render(currentMode);
            }
        }
    });
    
    mainField.latex("C_6H_6");
    mainField.focus();
    mainField.select();

                   
    // confirm input
    $('#mainField').submit(function (event) {
        $('<input />').attr('type', 'hidden')
            .attr('name', 'input')
            .attr('value', currentMode + '||' + mainField.latex())
            .appendTo(this);
        return true;
    });

    // set up buttons for symbols for input box
    $('#rightarrow').click(function () {
        mainField.cmd('\\rightarrow');
        mainField.focus();
    });
    $('#sup').click(function () {
        mainField.cmd('^');
        mainField.focus();
    });
    $('#sub').click(function () {
        mainField.cmd('_');
        mainField.focus();
    });
    $('#left-parenthesis').click(function () {
        mainField.cmd('(');
        mainField.focus();
    });
    $('#right-parenthesis').click(function () {
        mainField.cmd(')');
        mainField.focus();
    });
    $('#plus').click(function () {
        mainField.cmd('+');
        mainField.focus();
    });
    $('#colon').click(function () {
        mainField.cmd(':') ;
        mainField.focus();
    });
    $('#semi-colon').click(function () {
        mainField.cmd(';');
        mainField.focus();
    });
    
    
    // show template when status label is clicked
    $('.status').click(function () {
        var mode = $(this).parent().parent().attr('id');
        var text;
        switch(mode) {
            case "molecule":
                text = "O_2";
                break;
            case "equation":
                text = "H_2 + O_2 \\rightarrow H_2O";
                break;
            case "empirical":
                text = "K: 1.82, I: 5.93, O: 2.24";
                break;
            case "alkane":
                text = "alkane::5";
                break;
            default:
                text = "H_2O";
        }
        mainField.latex(text);
        mainField.focus();
        mainField.moveToLeftEnd();
        mainField.select();
    });
});

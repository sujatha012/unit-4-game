// Creates variables.
var rv;
var nWins = 0;
var nLoss = 0;

var tmpTotalValue;


//Creating custom JQUERY NAMESPACE & Functions related to the problem
var CRYSTAL = {};
CRYSTAL = ({
    //Create Random value between 1-12
    randomCrystalVal: function () {
        return Math.floor(Math.random() * 11) + 1;
    },
// Create fresh set of 4 random values which are unique
    getCrystalValues: function () {
        var arr = [];
        for (var i = 0; i < 4; i++) {
            var j = this.randomCrystalVal();

            //TO Generate unique values for each crystal we need to check if the random gen
            //value already assigned to any other crystals.
            while (($.inArray(j, arr) != -1)) {
                j = this.randomCrystalVal();
            }
            arr[i] = j;
        }
        $(this).data('arr', arr);

        return arr;
    },
   //Create Random value between 19-120
    randomExpectVal: function () {
        return Math.floor(Math.random() * 102) + 19;
    },
    // Init function
    // 1. get Random values for crystal
    // 2. Assign it to the img based on id
    // 3. Bind event handler - onClick
    // 4. Populate Random value for the Target Score.
    initBindData: function () {
        var arr3 = [];
        tmpTotalValue = 0;
        arr3 = this.getCrystalValues();
        var attName = 'data-val';
        var cl = "click";
        for (var i = 0; i < 4; i++) {
            var cid = '#c' + (i + 1);
            $(cid).data(attName, arr3[i]);
            $(cid).bind(cl, {attName: arr3[i]}, this.onclick);
        }
        rv = this.randomExpectVal();
        $("#leftBox").html("<p> Target Score : " + rv + "</p>");

        $("#rightBox").html("<p> wins : " + nWins + "</p>"
            + "<p> losses : " + nLoss + "</p>");

        $("#div5").html("<p><font color=\"white\" size=\"4\">Your total score is:</font></p>");

        $("#div6").html("<p style=\"font-size:30px;color: white;padding-left: 20px;padding-top: 20px;\">"+ tmpTotalValue +"</p>");

        console.log($('#c1').data(attName));
        console.log($('#c2').data(attName));
        console.log($('#c3').data(attName));
        console.log($('#c4').data(attName));



    },
    // Remove(Reset) the binding which caused multiple events triggerd
    removeBinding: function () {
        var cl = "click";
        for (var i = 0; i < 4; i++) {
            var cid = '#c' + (i + 1);

            $(cid).unbind(cl, this.onclick);
        }
    },

    // Logic to handle the conditions -
    // 1. User Selected crystal value + total value === Target score -- Increase wins counter and reset
    // 2. User Selected Crystal value + Total Value > Target Score -- Increase losses counter and reset
    onclick: function (event) {
        console.log("You clicked " + event.data.attName + " , Event img Id " + event.target.id);

        tmpTotalValue += event.data.attName;
        if (tmpTotalValue === rv) {
            nWins++;
            CRYSTAL.removeBinding();
            CRYSTAL.initBindData();
            $("#rightBox").html("<p style=\"color: white;\"><b>You Won !!!</b> </p><p> wins : " + nWins + "</p>"
                + "<p> losses : " + nLoss + "</p>");

        }
        else if (tmpTotalValue > rv) {
            nLoss++;
            CRYSTAL.removeBinding();
            CRYSTAL.initBindData();
            $("#rightBox").html("<p style=\"color: red;\"><b>You Lost .... </b></p><p> wins : " + nWins + "</p>"
                + "<p> losses : " + nLoss + "</p>");
        }

        console.log("Target Value : " + rv);
        console.log("Your Value : " + tmpTotalValue);



        $("#div5").html("<p><font color=\"white\" size=\"4\">Your total score is:</font></p>");
        $("#div6").html("<p style=\"font-size:30px;color: white;padding-left: 20px;padding-top: 20px;\">"+ tmpTotalValue +"</p>");


    }
});


$(document).ready(function () {
    CRYSTAL.initBindData();

});


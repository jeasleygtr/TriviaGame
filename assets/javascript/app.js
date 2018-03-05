window.onload = function() {
    $("#start").on("click", clock.start);
};

var userGuess;
var correctAnswer;
correct = 0;
wrong = 0;
timedout = 0;
userClick = 0;

//Create an array with object to store all the questions
var quiz = [
    question1 = {
        question: "This actor is the first to play James Bond in the theatrically released movies",
        answer: ["Roger Moore",
            "Sean Connery",
            "Timothy Dalton",
            "George Lazenby"
        ]
    },
    question2 = {
        question: "Sean Bean played which villain in 'Goldeneye'",
        answer: ["Max Zorin",
            "Jaws",
            "'006' Alec Trevalyan",
            "Ernst Stavro Blofeld"
        ]
    },
    question3 = {
        question: "George Lazenby appears as James Bond in this film in which Bond gets married...shortly before his wife is assassinated",
        answer: ["On Her Majesty's Secret Service",
            "The Man with the Golden Gun",
            "Casino Royale",
            "The World is not Enough"
        ]
    },
    question4 = {
        question: "The title theme song 'Live and Let Die', is performed by this artist.",
        answer: ["Simon & Garfunkel",
            "John Lennon",
            "Jimi Hendrix",
            "Paul McCartney"
        ]
    },
    question5 = {
        question: "'Operation Grand Slam' is the code name of the evil plot in which movie?",
        answer: ["Spectre",
            "Goldfinger",
            "You Only Live Twice",
            "For your Eyes Only"
        ]
    },
    question6 = {
        question: "This deadly assassin, portrayed by Christopher Lee, likes to play head games with his targets.  He will send a single golden bullet to the intended victim with the victim's name engraved on it.",
        answer: ["Francisco Scaramanga",
            "Auric Goldfinger",
            "Dr. No",
            "Le Chiffre"
        ]
    },
    question7 = {
        question: "In the 'Austin Powers' series, Robert Wagner's character 'Number 2' is based off this 'Thunderball' villain, also known as 'Number 2'",
        answer: ["Brad Whitaker",
            "Xenis Onatopp",
            "Emilio Largo",
            "Nick Nack"
        ]
    },
    question8 = {
        question: "This title song won the Academy Award for 'Best Original Song'",
        answer: ["Paul McCartney - 'Live and Let Die'",
            "Nancy Sinatra - 'You Only Live Twice'",
            "Duran Durn - 'A View to a Kill'",
            "Adele - 'Skyfall'"
        ]
    },
    question9 = {
        question: "This Ian Fleming novel is adapted for the screen for the third time in 2006, the first time it is officially recognized as part of the James Bond movie series.",
        answer: ["Die Another Day",
            "Casino Royale",
            "Quantum of Solace",
            "Tomorrow Never Dies"
        ]
    },
    question10 = {
        question: "The traditional martini was always made with gin.  A partnership with this vodka company during the filming of the first movie 'Dr. No', caused a major shift in the way people consumed martinis, using vodka instead.  'Shaken, not stirred'",
        answer: ["Grey Goose",
            "Belvedere",
            "Absolut",
            "Smirnoff"
        ]
    },
]

//create an array to store all the answers by IDs in the html
var answers = ["option2", "option3", "option1", "option4", "option2", "option1", "option3", "option4", "option2", "option4"];

function questionGenerator(userClick) {
    i = userClick; //onclick function tracks the index
    if (userClick < 10) { //makes sure that nothing happens after the last question
        $("#question").html(quiz[i].question);
        $("#option1").html(quiz[i].answer[0]);
        $("#option2").html(quiz[i].answer[1]);
        $("#option3").html(quiz[i].answer[2]);
        $("#option4").html(quiz[i].answer[3]);
        $("#correctimg").remove(); //remove any image and messages
        $(".message").html("");
    }
}

$("#option1").on("click", checkAnswer);
$("#option2").on("click", checkAnswer);
$("#option3").on("click", checkAnswer);
$("#option4").on("click", checkAnswer);

function checkAnswer() {
    if (userClick < 10) { //makes sure nothing happens after 10 questions
        userGuess = this.id;
        correctAnswer = answers[i];
        userClick++
        clock.stop(); //stops the clock
        setTimeout(function() {
            clock.reset()
        }, 3000); //run next question after 3 seconds
        setInterval(function() {
            checkTime()
        }, 1000); //run the function to check time after second
        if (userGuess === correctAnswer) {
            correctStatement();
            correct++;
        } else {
            wrongStatement();
            wrong++;

        }
    }
}

function hideStart() {
    $("#start").hide();
}

function correctStatement() {
    i = userClick - 1; //This is important because the array index starts at 0.  So userClick needs to -1 to match array index
    $("#question").html("");
    $("#option1").html("");
    $("#option2").html("");
    $("#option3").html("");
    $("#option4").html("");
    var correctImage = ["sean-connery", "006alec-trevalyan", "on-her-majestys-secret-service", "paul-mccartney", "goldfinger", "scaramanga", "Emilio-Largo", "skyfall", "casino-royale", "smirnoff"];
    var img = $('<img id="correctimg">'); //create image
    img.attr("src", "assets/images/" + correctImage[i] + ".jpg");
    img.attr("width", "300");
    $("#line3").prepend(img);
    $(".message").html("<h2>" + "You are correct, the answer is " + correctImage[i] + "." + "</h2>");
    setTimeout(function() {
        endGame()
    }, 3000); //delay the endGame function so user can see the last answer
}

function wrongStatement() {
    i = userClick - 1;
    $("#question").html("");
    $("#option1").html("");
    $("#option2").html("");
    $("#option3").html("");
    $("#option4").html("");
    var correctImage = ["sean-connery", "006alec-trevalyan", "on-her-majestys-secret-service", "paul-mccartney", "goldfinger", "scaramanga", "Emilio-Largo", "skyfall", "casino-royale", "smirnoff"];
    var img = $('<img id="correctimg">');
    img.attr("src", "assets/images/" + correctImage[i] + ".jpg");
    img.attr("width", "300");
    $("#line3").prepend(img);
    $(".message").html("<h2>" + "You are wrong, the answer is " + correctImage[i] + "." + "</h2>");
    setTimeout(function() {
        endGame()
    }, 3000);
}

function timedOut() {
    i = userClick - 1;
    $("#question").html("");
    $("#option1").html("");
    $("#option2").html("");
    $("#option3").html("");
    $("#option4").html("");
    var correctImage = ["sean-connery", "006alec-trevalyan", "on-her-majestys-secret-service", "paul-mccartney", "goldfinger", "scaramanga", "Emilio-Largo", "skyfall", "casino-royale", "smirnoff"];
    var img = $('<img id="correctimg">');
    img.attr("src", "assets/images/" + correctImage[i] + ".jpg");
    img.attr("width", "300");
    $("#line3").prepend(img);
    $(".message").html("<h2>" + "Times up, the answer is " + correctImage[i] + "." + "</h2>");
    setTimeout(function() {
        clock.reset()
    }, 3000); //Since this function is in the checkAnswer question, reset is needed
    setTimeout(function() {
        endGame()
    }, 3000);
}

function checkTime() {
    if (clock.time === 0) {
        userClick++
        timedout++
        clock.stop(); //stops the clock
        timedOut(); //run time out message
        clock.time = 30;
    }
}

function endGame() {
    if (userClick === 10) {
        $("#counter").hide();
        $("#option1").html("Correct Answers: " + correct);
        $("#option2").html("Wrong Answers: " + wrong);
        $("#option3").html("Timed out: " + timedout);
        var reset = $('<div id="resetbutton">').html("<h2>" + "Click to Restart the quiz" + "</h2>");
        $("#option4").append(reset);
        $("#resetbutton").on("click", restart);
        $("h2").removeClass("hover");
        $("#correctimg").remove();
        $(".message").html("");
        clock.stop();
    }
}

function restart() {
    correct = 0;
    wrong = 0;
    timedout = 0;
    userClick = 0;
    clock.time = 30;
    clock.start();
    $("#resetbutton").remove();
    $("#counter").show();
    $("h2").addClass("hover");
}

//Here are the codes for all the time related functions stored in the object
var counter;
var clock = {
    time: 30,

    start: function() {
        counter = setInterval(clock.count, 1000);
        questionGenerator(userClick);
        hideStart();
    },

    reset: function() {
        clock.time = 30;
        counter = setInterval(clock.count, 1000);
        questionGenerator(userClick);
    },

    stop: function() {
        clearInterval(counter);
    },

    count: function() {
        clock.time--;
        //Get the current time, pass that into the clock.timeConverter function and save the result in a variable.
        var converted = clock.timeConverter(clock.time);
        //update the counter with the time
        $("#counter").html("Time remaining: " + converted);
    },
    //convert the time into seconds
    timeConverter: function(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};
$(document).ready(function () {
    $("#counter").hide();

    $("#start").on('click', quiz.gameReset);
    $(document).on('click', '.option', quiz.evalAnswer);
})


var quiz = {
    correct: 0,
    incorrect: 0,
    currentSet: 0,
    timer: 20,
    timerId: '',
    unanswered: 0,
    // timerBeg: false,

    questions: {
        q1: 'Whats the name of Ricks theme park?',
        q2: 'Where is Ricks theme park located?',
        q3: 'Whats beths favorite drink?',
        q4: 'Mortys son is half human, half what?',
        q5: 'Whats scary terrys catchphrase?',
        q6: 'What song saves the earth in season 1?',
        q7: 'Pickle rick AKA ',
        q8: 'How many shmeckles does it cost to go down the courthouse stairs with Slippery Stairs?',
        q9: 'What dimension is morty from? ',
        q10: 'What is blips and chits AKA Blitz and chitz?',
    },

    options: {
        q1: ['Blips & Chits', 'Anatomy Park', 'Pirates of the Pancreas'],
        q2: ['Austrailia', 'Inside a homeless man', 'Santas playground'],
        q3: ['Wine', 'Chardonay', 'Water'],
        q4: ['Gazorpian', 'Galorpalorp', 'Gazorpazorp'],
        q5: ['bi*ch', 'You can run but you cant hide!', 'Aww'],
        q6: ['Do you feel it', 'Stab him in the Throat', 'Get Schwifty'],
        q7: ['Solvetnya', 'Solenya', 'Soletya'],
        q8: ['25 monies', '15 shmeckles', '25 schmeckles'],
        q9: ['C-139', 'C-137', 'A-135'],
        q10: ['Amusment Park', 'Another planet', 'Arcade'],
    }
    ,
    answers: {
        q1: 'Anatomy Park',
        q2: 'Inside a homeless man',
        q3: 'Wine',
        q4: 'Gazorpazorp',
        q5: 'bi*ch',
        q6: 'Get Schwifty',
        q7: 'Solenya',
        q8: '25 schmeckles',
        q9: 'C-137',
        q10: 'Arcade',
    },

    answerImg: {
        q1: '<img src="assets/images/anatomypk.jpg" class="img-fluid">',
        q2: '<img src="assets/images/santa.gif"class="img-fluid">',
        q3: '<img src="assets/images/beth.gif"class="img-fluid">',
        q4: '<img src="assets/images/son.gif"class="img-fluid">',
        q5: '<img src="assets/images/bitch.gif" class="img-fluid">',
        q6: '<img src="assets/images/schwifty.gif" class="img-fluid">',
        q7: '<img src="assets/images/solenya.gif" class="img-fluid">',
        q8: '<img src="assets/images/slippery.gif"class="img-fluid">',
        q9: '<img src="assets/images/c137.gif" class="img-fluid">',
        q10: '<img src="assets/images/blitz.gif"class="img-fluid">',
    },

    //reset game
    gameReset: function () {
        quiz.currentSet = 0;
        quiz.correct = 0;
        quiz.incorrect = 0;
        quiz.unanswered = 0;

        // quiz.timerBeg = false;
        clearInterval(quiz.timerId);

        //update display
        $('#quiz').show();
        $('#results').html('');
        $('#remaining').text(quiz.timer);
        $('#start').hide();
        $('#counter').show();


        //Start the questions 
        quiz.nextQuestion();
    },

    nextQuestion: function () {
        quiz.timer = 10;
        $('#remaining').removeClass('warning-time');
        $('#remaining').text(quiz.timer);
        $('#image').text('');

        if (!quiz.timerBeg) {
            quiz.timerId = setInterval(quiz.timerStarted, 1000);
        }

        //images 
        var ansImg = Object.values(quiz.answerImg)[quiz.currentSet];


        //get the questions and index
        var questCont = Object.values(quiz.questions)[quiz.currentSet];
        $('#question').text(questCont);

        //array of options for current question 
        var questOpt = Object.values(quiz.options)[quiz.currentSet];

        //make option buttons 
        $.each(questOpt, function (index, key) {
            $('#options').append($('<button class="option btn btn-outline-secondary">' + key + '</button>'));
        })
    },

    timerStarted: function () {
        // clock still ticking 
        if (quiz.timer > -1 && quiz.currentSet < Object.keys(quiz.questions).length) {
            $('#remaining').text(quiz.timer);
            quiz.timer--;
            if (quiz.timer === 4) {
                $('#remaining').addClass('warning-time');

            }
        }
        //ran out of time 
        else if (quiz.timer === -1) {
            quiz.unanswered++;
            quiz.result = false;
            clearInterval(quiz.timerId);
            resultId = setTimeout(quiz.guessResult, 2500);
            $('#results').html('<h3>FAILURE TO GUESS. THE ANSWER WAS: <br>' + Object.values(quiz.answers)[quiz.currentSet]);
            $('#image').html(Object.values(quiz.answerImg)[quiz.currentSet]);

        }

        //all questions shown, end game, results are displayed 
        else if (quiz.currentSet === Object.keys(quiz.questions).length) {

            // display results on page 

            $('#results').html('<h3> Thanks for gettin Shwifty </h3>' +
                '<b>CORRECTTTT:</b> ' + quiz.correct + '<br>' +
                '<b>WRIGGITY WRIGGITY WRONG:</b> ' + quiz.incorrect + '<br>' +
                '<b>Abandoned:</b> ' + quiz.unanswered);

            $('#quiz').hide();
            $('#start').show();
            $('#question').hide();
            $('#image').hide();
        }
    },

    //check answer 

    evalAnswer: function () {
        var resultId;
        var currentAnswer = Object.values(quiz.answers)[quiz.currentSet];


        //if option picked is correct add count to correct, make button bootstrap success

        if ($(this).text() === currentAnswer) {

            $(this).addClass('btn-outline-success').removeClass('btn-outline-secondary');

            quiz.correct++;
            clearInterval(quiz.timerId);
            resultId = setTimeout(quiz.guessResult, 2500);
            $('#results').html('<h3> WOOO THATS CORRECT</h3>');
            $('#image').html(Object.values(quiz.answerImg)[quiz.currentSet]);

        }

        //wrong answer 
        else {
            $(this).addClass('btn-outline-danger').removeClass('btn-outline-secondary');

            quiz.incorrect++;
            clearInterval(quiz.timerId);
            resultId = setTimeout(quiz.guessResult, 2500);
            $('#results').html('<h3> DISAPPOINTMENT<br><span id="disappoint"> Correct answer:</span> <br>' + currentAnswer + '</h3>');



            $('#image').html(Object.values(quiz.answerImg)[quiz.currentSet]);

        }
    },

    //remove classes and move to next set 
    guessResult: function () {
        quiz.currentSet++;

        $('.option').remove();
        $('#results h3').remove();
        quiz.nextQuestion();
    }
}


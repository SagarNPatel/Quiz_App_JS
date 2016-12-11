$(document).ready(function () {
    $(".answer").click(function (event) {
        event.preventDefault();
        var selectedNumber = +$(this).attr("id").substring(6);
        answerQuestion(selectedNumber);
    });

    $("#playMovie").click(function (event) {
        newQuiz(event, 0);
    });
    $("#playMusic").click(function (event) {
        newQuiz(event, 1);
    });
    $("#playTelevision").click(function (event) {
        newQuiz(event, 2);
    });
});

/* Note: These question numbers are one based. Array index operations need to take one away from these numbers */
var quiz;
var totalQuestions;
var currentQuestionNumber;

function newQuiz(event, quizNumber) {
    event.preventDefault();
    $("#menu").hide();
    $("#quizBoard").show();
    quiz = data.quizzes[quizNumber];
    totalQuestions = quiz.questions.length;
    startTimer();
    currentQuestionNumber = 0;
    moveNext();
}

function answerQuestion(answerNumber) {
    var question = quiz.questions[currentQuestionNumber - 1];
    question.userAnswer = answerNumber;
    showAnswer(question.message, question.userAnswer == question.correctAnswer);
}

function moveNext() {
    if (currentQuestionNumber < totalQuestions) {
        currentQuestionNumber++;
        updateDisplayForQuestion(quiz.questions[currentQuestionNumber - 1]);
    }
    else {
        finish();
    }
}

function finish() {
    var score = 0;
    for (var i = 0; i < quiz.questions.length; i++) {
        var question = quiz.questions[i];
        if (question.correctAnswer == question.userAnswer) {
            score++;
        }
    }

    var message = "That's it! You're finished. You scored " + score + " out of a possible " + quiz.questions.length + ".";
    showFinish(message);
}

function updateDisplayForQuestion(question) {
    $("#questionNumber").text(question.number + "/" + totalQuestions);
    $("#question").text(question.question);
    for (var i = 0; i <= 3; i++) {
        $("#answer" + (i + 1)).text(question.answers[i].answer);
    }
}

function showAnswer(message, correct) {
    var title = "Correct";
    var type = BootstrapDialog.TYPE_SUCCESS;
    if (!correct) {
        title = "Incorrect";
        type = BootstrapDialog.TYPE_DANGER;
    }
    BootstrapDialog.show({
        message: message,
        title: title,
        type: type,
        onhidden: function (dialogRef) {
            moveNext();
        },
        buttons: [
            {
                id: 'btn-ok',
                icon: 'glyphicon glyphicon-check',
                label: 'OK',
                cssClass: 'btn-primary',
                autospin: false,
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }
        ]
    });
}

function showFinish(message) {
    BootstrapDialog.show({
        title: "Completed",
        message: message,
        buttons: [
            {
                id: 'btn-ok',
                icon: 'glyphicon glyphicon-check',
                label: 'OK',
                cssClass: 'btn-primary',
                autospin: false,
                action: function (dialogRef) {
                    dialogRef.close();
                    $("#quizBoard").hide();
                    $("#menu").show();
                }
            }
        ]
    });
}

function startTimer() {
    var timerDate = new Date();
    var minutesDuration = 1;
    timerDate.setMinutes(timerDate.getMinutes() + minutesDuration);
    $("#timer").countdown({until: timerDate, format: 'MS', layout: '{mnn}{sep}{snn}', onExpiry: finish});
}

var data =
{
    quizzes: [
        {
            title: "Movie Quiz",
            questions: [
                {
                    number: 1,
                    question: "Who is the director for the movie Athadu?",
                    correctAnswer: 2,
                    userAnswer: 0,
                    message: "Athadu directed by Trivikram Srinivas.",
                    answers: [
                        {
                            number: 1,
                            answer: "V. V. Vinayak"
                        },
                        {
                            number: 2,
                            answer: "Trivikram"
                        },
                        {
                            number: 3,
                            answer: "Bhaskar"
                        },
                        {
                            number: 4,
                            answer: "Srinu Vaitla"
                        }
                    ]
                },
                {
                    number: 2,
                    question: "Who is the villain in Eega movie?",
                    correctAnswer: 1,
                    userAnswer: 0,
                    message: "Sudeep, he won the Best villain Award for performance in Naan Ee.",
                    answers: [
                        {
                            number: 1,
                            answer: "Sudeep"
                        },
                        {
                            number: 2,
                            answer: "Pawan Kalyan"
                        },
                        {
                            number: 3,
                            answer: "Katraj"
                        },
                        {
                            number: 4,
                            answer: "Allpitre Tokyo"
                        }
                    ]
                },
                {
                    number: 3,
                    question: "Director Of The Film ‘The Dark Knight’ Is..?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "‘The Dark Knight’ Directed by  Christopher Nolan.",
                    answers: [
                        {
                            number: 1,
                            answer: "Zack Snyder"
                        },
                        {
                            number: 2,
                            answer: "Tim Burton"
                        },
                        {
                            number: 3,
                            answer: "Joel Schumacher"
                        },
                        {
                            number: 4,
                            answer: "Christopher Nolan"
                        }
                    ]
                },
                {
                    number: 4,
                    question: "Most Followed Hollywood Actor On Facebook?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "Vin Diesel has 100 million Followers.",
                    answers: [
                        {
                            number: 1,
                            answer: "Tom Cruise"
                        },
                        {
                            number: 2,
                            answer: "Will Smith"
                        },
                        {
                            number: 3,
                            answer: "Jackie Chan"
                        },
                        {
                            number: 4,
                            answer: "Vin Diesel"
                        }
                    ]
                },
                {
                    number: 5,
                    question: "Most Expensive Hollywood Film?",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "Pirates of the Carribean - On Stranger Tides(2011) had a budget of $397 million USD.",
                    answers: [
                        {
                            number: 1,
                            answer: "Titanic"
                        },
                        {
                            number: 2,
                            answer: "Avengers: Age of Ultron"
                        },
                        {
                            number: 3,
                            answer: "Pirates of the Carribean (2011)"
                        },
                        {
                            number: 4,
                            answer: "Spider-Man 3"
                        }
                    ]
                },
                {
                    number: 6,
                    question: "Which of these is the name of a romantic comedy film featuring Julia Roberts?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "Julia Roberts starred in Pretty Woman.",
                    answers: [
                        {
                            number: 1,
                            answer: "Titanic"
                        },
                        {
                            number: 2,
                            answer: "What Women Want"
                        },
                        {
                            number: 3,
                            answer: "Serendipity"
                        },
                        {
                            number: 4,
                            answer: "Pretty Woman"
                        }
                    ]
                },
                {
                    number: 7,
                    question: "Before Akshay Kumar became an actor, he worked as a...?",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "He Worked as a Waiter in Bangkok.",
                    answers: [
                        {
                            number: 1,
                            answer: "Clerk"
                        },
                        {
                            number: 2,
                            answer: "Reporter"
                        },
                        {
                            number: 3,
                            answer: "Waiter"
                        },
                        {
                            number: 4,
                            answer: "Model"
                        }
                    ]
                }
            ]
        },
        {
            title: "Music Quiz",
            questions: [
                {
                    number: 1,
                    question: "Which artist had hits with the songs 'When We Were Young' and 'Hello' in 2016?",
                    correctAnswer: 1,
                    userAnswer: 0,
                    message: "Both hits are from Adele's third studio album 25.",
                    answers: [
                        {
                            number: 1,
                            answer: "Adele"
                        },
                        {
                            number: 2,
                            answer: "Beyonce"
                        },
                        {
                            number: 3,
                            answer: "Lady Gaga"
                        },
                        {
                            number: 4,
                            answer: "Ariana Grande"
                        }
                    ]
                },
                {
                    number: 2,
                    question: "What did Mike Posner take in Ibiza to show Avicii he was cool?",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "From Mike's 2016 hit song 'I Took a Pill in Ibiza'.",
                    answers: [
                        {
                            number: 1,
                            answer: "Whiskey"
                        },
                        {
                            number: 2,
                            answer: "Marijuana"
                        },
                        {
                            number: 3,
                            answer: "Pill"
                        },
                        {
                            number: 4,
                            answer: "Beer"
                        }
                    ]
                },
                {
                    number: 3,
                    question: "Which of these songs was a 2016 hit for Barbadian singer Rihanna?",
                    correctAnswer: 1,
                    userAnswer: 0,
                    message: "Rihanna's full name is Robyn Rihanna Fenty.",
                    answers: [
                        {
                            number: 1,
                            answer: "Needed Me"
                        },
                        {
                            number: 2,
                            answer: "Lost Boy"
                        },
                        {
                            number: 3,
                            answer: "New Romantics"
                        },
                        {
                            number: 4,
                            answer: "Same Old Love"
                        }
                    ]
                },
                {
                    number: 4,
                    question: "Who performed a stunning half time show at the 2015 Superbowl?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "Katy Perry Performed at 2015 Superbowl.",
                    answers: [
                        {
                            number: 1,
                            answer: "Lady Gaga"
                        },
                        {
                            number: 2,
                            answer: "Madonna"
                        },
                        {
                            number: 3,
                            answer: "Beyonce"
                        },
                        {
                            number: 4,
                            answer: "Katy Perry"
                        }
                    ]
                },
                {
                    number: 5,
                    question: "Finish the title to this song by Walk the Moon - Shut Up And ...?",
                    correctAnswer: 2,
                    userAnswer: 0,
                    message: "Shut Up And Dance peaked at number 21 on the Billboard Hot 100 in March of 2015.",
                    answers: [
                        {
                            number: 1,
                            answer: "Eat"
                        },
                        {
                            number: 2,
                            answer: "Dance"
                        },
                        {
                            number: 3,
                            answer: "Kiss Me"
                        },
                        {
                            number: 4,
                            answer: "Love Me"
                        }
                    ]
                },
                {
                    number: 6,
                    question: "This artist's pop songs 'Style,' 'Blank Space' and 'Shake It Off' were all on the Billboard 'Hot 100' chart in March of 2015.",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "Taylor Swift - All three songs can be found on Taylor's fifth studio album titled '1989'.",
                    answers: [
                        {
                            number: 1,
                            answer: "Madonna"
                        },
                        {
                            number: 2,
                            answer: "Beyonce"
                        },
                        {
                            number: 3,
                            answer: "Taylor Swift"
                        },
                        {
                            number: 4,
                            answer: "Katy Perry"
                        }
                    ]
                },
                {
                    number: 7,
                    question: "Which Maroon 5 hit opens with the lyric - 'I am hurting, baby, I am broken down. I need your loving, loving. I need it now.'?",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "Sugar - Sugar peaked at number 2 on the Billboard Hot 100 in March of 2015.",
                    answers: [
                        {
                            number: 1,
                            answer: "Animals"
                        },
                        {
                            number: 2,
                            answer: "Maps"
                        },
                        {
                            number: 3,
                            answer: "Sugar"
                        },
                        {
                            number: 4,
                            answer: "It Was Always You"
                        }
                    ]
                },
                {
                    number: 8,
                    question: "Co-written and produced by Oren Yoel, who recorded the hit ballad 'Adore You'?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "Miley Cyrus - The song can be found on Cyrus' number-one hit album 'Bangerz'.",
                    answers: [
                        {
                            number: 1,
                            answer: "Taylor Swift"
                        },
                        {
                            number: 2,
                            answer: "Beyonce"
                        },
                        {
                            number: 3,
                            answer: "Selena Gomez"
                        },
                        {
                            number: 4,
                            answer: "Miley Cyrus"
                        }
                    ]
                }
            ]
        },
        {
            title: "Television Quiz",
            questions: [
                {
                    number: 1,
                    question: "What is the correct name of the 1984 sit-com starring Phylicia Rashad?",
                    correctAnswer: 1,
                    userAnswer: 0,
                    message: "Phylicia Rashad starred in 'The Cosby Show.'",
                    answers: [
                        {
                            number: 1,
                            answer: "The Cosby Show"
                        },
                        {
                            number: 2,
                            answer: "The Posby Show"
                        },
                        {
                            number: 3,
                            answer: "The Fosby Show"
                        },
                        {
                            number: 4,
                            answer: "The Losby Show"
                        }
                    ]
                },
                {
                    number: 2,
                    question: "What is the correct name of the 1989 sit-com starring Elizabeth Berkley?",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "Elizabeth Berkley starred in 'Saved By The Bell'.",
                    answers: [
                        {
                            number: 1,
                            answer: "Saved By The Ding"
                        },
                        {
                            number: 2,
                            answer: "Saved By The Dong"
                        },
                        {
                            number: 3,
                            answer: "Saved By The Bell"
                        },
                        {
                            number: 4,
                            answer: "Saved By The Chime"
                        }
                    ]
                },
                {
                    number: 3,
                    question: "Which character is played by William Roache in 'Coronation Street'?",
                    correctAnswer: 2,
                    userAnswer: 0,
                    message: "William Roache played Ken Barlow in 'Coronation Street.'",
                    answers: [
                        {
                            number: 1,
                            answer: "Keith Appleyard"
                        },
                        {
                            number: 2,
                            answer: "Ken Barlow"
                        },
                        {
                            number: 3,
                            answer: "Dev Alahan"
                        },
                        {
                            number: 4,
                            answer: "Jamie Baldwin"
                        }
                    ]
                },
                {
                    number: 4,
                    question: "Bullseye combined a quiz with which game?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "'Bullseye' combines a quiz game with Darts.",
                    answers: [
                        {
                            number: 1,
                            answer: "Snooker"
                        },
                        {
                            number: 2,
                            answer: "Tennis"
                        },
                        {
                            number: 3,
                            answer: "Football"
                        },
                        {
                            number: 4,
                            answer: "Darts"
                        }
                    ]
                },
                {
                    number: 5,
                    question: "What is the correct name of the 1985 sit-com starring Beatrice Arthur",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "Beatrice Arthur starred in 'The Golden Girls.'",
                    answers: [
                        {
                            number: 1,
                            answer: "The Murrh Girls"
                        },
                        {
                            number: 2,
                            answer: "The Bronze Girls"
                        },
                        {
                            number: 3,
                            answer: "The Golden Girls"
                        },
                        {
                            number: 4,
                            answer: "The Silver Girls"
                        }
                    ]
                }
            ]
        }
    ]
};
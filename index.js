const quizData = [
    {
      question: 'The capital city of ethiopia?',
      options: ['Nirobi', 'Akra', 'Addis abeba', 'Asmera'],
      answer: 'Addis abeba',
    },
    {
      question: 'Who is the last king in ethiopia?',
      options: ['Mengistu h/maryam', 'Hailemariam Desalegn', 'Meles zenawi', 'Haile selassie'],
      answer: 'Haile selassie',
    },
    {
      question: 'When did Ethiopia win African Cup?',
      options: ['1962', '1994', '1960', '1961'],
      answer: '1962',
    },
    {
      question: 'What is the tallest mountain in ethiopia?',
      options: ['Entoto ', 'Semien Mountains', 'Ras Dashen', 'Zuqualla'],
      answer: 'Ras Dashen',
    },
    {
      question: 'the longest river in eastern Africa called?',
      options: [
        'Nile',
        'Kasai',
        'Limpopo',
        'Kafue',
      ],
      answer: 'Nile',
    },
    {
      question: 'Who is the man who runs barefoot?',
      options: ['Mo farah', 'Kenenisa bekele', 'Eliud Kipchoge', 'Abebe bikila'],
      answer: 'Abebe bikila',
    },
    {
      question: 'Where did coffee originally come from?',
      options: [
        'Yemen',
        'Somalia',
        'Kaffa, Ethiopia',
        'southern Arabia',
      ],
      answer: 'Kaffa, Ethiopia',
    },
    {
      question: 'Which 800 year old church in Ethiopia carved from a single stone?',
      options: ['Bet Medhane Alem', 'Bet Giyorgis', 'Biete Mariam', 'Biete Maskal'],
      answer: 'Bet Medhane Alem',
    },
    {
      question: 'One of the following is Endemic Animals in Ethiopia?',
      options: [
        'Moose',
        'Wolf',
        'Tiger',
        'Galada',
      ],
      answer: 'Galada',
    },
    {
      question: 'When did the battle of Adwa start?',
      options: ['March 2, 1880', 'March 2, 1899', 'March 1, 1896', 'March 2, 1896'],
      answer: 'March 1, 1896',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
(function ($) {
    "use strict";
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Blogs carousel
    $(".blog-carousel").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Class filter
    var classIsotope = $('.class-container').isotope({
        itemSelector: '.class-item',
        layoutMode: 'fitRows'
    });

    $('#class-filter li').on('click', function () {
        $("#class-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        classIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const restartButton = document.getElementById('restart-btn')
const totalScoreButton = document.getElementById('totalscore')
const result=document.getElementById('Result')
const explain=document.getElementById('explaination')
const exit = document.getElementById('exit-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let score=0
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  score=0
  startButton.classList.add('hide')
  exit.classList.add('hide')
  restartButton.classList.add('hide')
  totalScoreButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  //console.log(score)
  questionElement.innerText = question.question
  explain.innerText=question.explain;
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  result.classList.add('hide')
  explain.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (selectedButton.dataset.correct){
    score++;
    console.log(score);
    result.innerText="Correct ✅";

  }
  else{
    result.innerText="Wrong ❌ ";
  }
  
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    restartButton.innerText = "RESTART!"
    restartButton.classList.add('correct')
    restartButton.classList.remove('hide')
    totalScoreButton.innerText = "Score: "+score;
    totalScoreButton.classList.add('correct')
    totalScoreButton.classList.remove('hide')
    exit.classList.remove('hide')
  }
  explain.classList.remove('hide')
  result.classList.remove('hide')
}

function setStatusClass(element, correct) {
   nextButton.classList.remove('correct')
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    
  } else {
    element.classList.add('wrong')
  }
  nextButton.classList.add('correct')
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What’s sexual orientation?',
    answers: [
      { text: 'Pattern of romantic or sexual attraction', correct: true },
      { text: 'How we present ourselves outwardly to other', correct: false },
      { text: 'Sense of being male,female,both, or neither', correct: false },
      { text: 'Same as gender Identity', correct: false }

    ],
    explain:'Pattern of romantic or sexual attraction to persons of the opposite sex or gender, the same sex or gender, or to both sexes or more than one gender.'
  },
  {
    question: 'Is LGBTQ+ community only related to sexual orientation?',
    answers: [
      { text: 'No', correct: true },
      { text: 'Yes', correct: false },
      
    ],
    explain:'The ‘transgender’represents gender identity and is completely separate from sexual orientation'
  },
  {
    question: 'What Pronouns should be used if you don\'t know a Person\'s pronouns?',
    answers: [
      { text: 'they/them/theirs', correct: true },
      { text: 'he/him', correct: false },
      { text: 'she/her', correct: false },
      { text: 'it', correct: false }
    ],
    explain:'Usually it’s safe to use they/them/theirs unless that person tells you otherwise.'
  },
  {
    question: 'Violence against LGBTQ+ people is a thing of the past.',
    answers: [
      { text: 'True', correct: false },
      { text: 'False', correct: true }
    ],
    explain:'20-25% of lesbian and gay people experience hate crimes sometime in their lives.Homicides against LGBTQ+ have surged since 2007'
  },
  {
    question: 'How many genders are there?',
    answers: [
      { text: 'One', correct: false },
      { text: 'Two', correct: false },
      { text: 'Three', correct: false },
      {text: 'More Than Three', correct: true }

    ],
    explain:'There are many different gender identities, including male, female, transgender, gender neutral, non-binary, agender, pangender etc'
  },
  {
    question: 'What does \'Q\' stand for in LGBTQ+ ?',
    answers: [
      { text: 'Does not mean anything', correct: false },
      { text: 'Quail', correct: false },
      { text: 'Queen', correct: false },
      {text: 'Queer', correct: true }

    ],
    explain:'Queer is a word that describes sexual and gender identities other than straight and cisgender'
  }
]
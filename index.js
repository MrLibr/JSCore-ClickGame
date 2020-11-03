const $startGame = document.querySelector( '#start' );
const $gameField = document.querySelector( '#game' );
const $time = document.querySelector( '#time' );
const $resalt = document.querySelector( '#result' );
const $resaltField = document.querySelector( '#result-header' );
const $timeField = document.querySelector( '#time-header' );
const $gameTime = document.querySelector( '#game-time' );

let score = 0;
let isGameStarted = false;

$startGame.addEventListener( 'click', startGame );
$gameField.addEventListener( 'click', handlerBoxClick );
$gameTime.addEventListener( 'input', setGameTime );

function startGame() {
  isGameStarted = true;
  $gameTime.setAttribute( 'disabled', 'true' );

  clearGameField()
  showTime()
  renderRandomBox();
};

function handlerBoxClick( event ) {

  if ( !isGameStarted ) {
    return;
  }

  if ( event.target.dataset.box ) {
    score++;
    renderRandomBox();
  }
}

function showTime() {
  let interval = setInterval( () => {
    let time = parseFloat( $time.textContent );

    if ( time <= 0 ) {
      clearInterval( interval );
      endGame();
    } else {
      $time.textContent = ( time - 0.1 )
      .toFixed( 1 );
    }
  }, 100 );
}

function endGame() {
  isGameStart = false
  $gameTime.removeAttribute( 'disabled' );
  dropingGameField();
  showResult();
}

function setGameTime() {
  $time.textContent = parseFloat( $gameTime.value )
  .toFixed( 1 );
  hideElement( $resaltField )
  showElement( $timeField )
}

function showResult() {
  $resalt.textContent = score;
  showElement( $resaltField )
}

function clearGameField() {
  hideElement( $startGame )
  $gameField.style.backgroundColor = 'white';
}

function dropingGameField() {
  $gameField.innerHTML = '';
  $gameField.style.backgroundColor = '#CCCCCC';
  showElement( $startGame );
  hideElement( $timeField );
}

function renderRandomBox() {
  $gameField.innerHTML = '';
  $gameField.insertAdjacentElement( 'afterbegin', createRandomBox() )
}

function createRandomBox() {
  const box = document.createElement( 'div' );
  const boxSize = random( 10, 75 );
  const gameFieldSize = $gameField.getBoundingClientRect();
  const maxTop = gameFieldSize.height - boxSize;
  const maxLeft = gameFieldSize.width - boxSize;

  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
  box.style.top = random( 0, maxTop ) + 'px';
  box.style.left = random( 0, maxLeft ) + 'px';
  box.style.cursor = 'pointer'
  box.setAttribute( 'data-box', 'true' )

  return box;
}

function random( min, max ) {
  let random = min + Math.random() * ( max + 1 - min );
  return Math.floor( random );
}

function showElement( $element ) {
  $element.classList.remove( 'hide' )
}

function hideElement( $element ) {
  $element.classList.add( 'hide' )
}

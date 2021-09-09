function start(){
    const speed = 10;
    const direction = [-1, 1];
    const mainFrame=createMainFrame();
    const snake = 
    {
      x: 0,
      y: 0,
      width:40,
      height: 40,
      color: 'green',
      mainFrame: mainFrame,
      dx: direction[Math.floor(Math.random() * direction.length)],
      dy: direction[Math.floor(Math.random() * direction.length)],
      node: null,
    }

    const node = createSnake(snake);
    

   

}

start();



function createMainFrame() {
    const mainFrame=document.getElementById('main-frame');
    mainFrame.style.width ='1200px';
    mainFrame.style.height = '600px';
    mainFrame.style.background = 'lightgray';
    mainFrame.style.position = 'relative';
    mainFrame.style.border='2px solid black';
  
    return mainFrame;
  }
  

function createSnake(props){
  const x = props.x;
  const y =props.y;
  const width = props.width;
  const height = props.height;
  const color = props.color;
  const mainFrame =props.mainFrame;

  const snake = document.createElement('div');

    snake.style.width = width + 'px';
    snake.style.height = height + 'px';
    snake.style.position = 'absolute';
    snake.style.left = x + 'px';
    snake.style.top = y + 'px';
    snake.style.background = color;
    snake.style.borderRadius = '50%';

  mainFrame.appendChild(snake);

  return snake;
}
const cellEl=document.querySelectorAll("[data-cell]")
const mainEl=document.querySelector('.main')
const winningMessageEl=document.getElementById('winning-message')
const winningMessageTextEl=document.querySelector("[data-winning-text]")
const resetEl=document.getElementById('restartButton')



const x_class='x';
const circle_class="circle";
const winning_combination=[
    [0,1,2],
    [3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let circleTurn;
 
    function startGame(){
        circleTurn=false;
        cellEl.forEach((cell)=>{
            cell.classList.remove(x_class);
            cell.classList.remove(circle_class);
            cell.removeEventListener('click',handleClick)
            cell.addEventListener('click',handleClick,{once:true})
        });
        setMainHoverClass();
        winningMessageEl.classList.remove('show')
    } 
    startGame(); 
    resetEl.addEventListener('click',startGame)

    function handleClick(e){
        const cell=e.target;//if we touch one cell that cell target
        const currentClass=circleTurn ? circle_class : x_class;
        placeMark(cell,currentClass)
        if(checkWin(currentClass)){
            endGame(false);
        }
        else if(isDraw()){
            endGame(true);
        }
        else{
            swapTurns();
            setMainHoverClass();
        }
    }

    function swapTurns(){
        circleTurn = !circleTurn;
    }

    function setMainHoverClass(){
        mainEl.classList.remove(circle_class);
        mainEl.classList.remove(x_class);
        if(circleTurn){
            mainEl.classList.add(circle_class );
        }
        else{
            mainEl.classList.add(x_class);
        }
    }

    function endGame(draw){
        if(draw){
            winningMessageTextEl.innerHTML="draw";
        }
        else{
            winningMessageTextEl.innerHTML=`${circleTurn ?"0's":"x's"} wins`
        }
        winningMessageEl.classList.add('show')
    }

    function placeMark(cell,currentClass){
         cell.classList.add(currentClass)
    }

    function isDraw(){
        return[...cellEl].every((cell)=>{
            return(
                cell.classList.contains(x_class) || cell.classList.contains(circle_class)
            );
        });
        }



    function checkWin(currentClass){
        return winning_combination.some((com)=>{
            return com.every((index)=>{
                return cellEl[index].classList.contains(currentClass);
            })
        })
    }


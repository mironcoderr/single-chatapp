export const plusMinus = (currentState = 0, action) => {
    if(action.type === 'PLUS') return currentState + 1;
    else if(action.type === 'MINUS') return currentState - 1;
    else return currentState;
}
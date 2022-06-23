const grocerySubmit = document.getElementById('addGrocery');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clear');

//initial state
const initialState = {
    groceries: []
};

//reducer
const groceryReducer = (state = initialState.groceries, action) => {
    switch(action.type){
        case 'grocery/add':
            return [
                ...state,
                {
                    text: action.text
                }
            ]
        case 'grocery/clear':
            return []
        default:
            return state
    } 
};

//store
const store = Redux.createStore(groceryReducer);

//actions
const clearList = () => {
    document.getElementById('newItem').value = ''
    store.dispatch({type: 'grocery/clear'})
};

const newGrocery = (e) => {
    e.preventDefault()
    const groceryText = document.getElementById('newItem').value
    store.dispatch({type: 'grocery/add', text: groceryText})
    console.log(store.getState())
};

//event listeners
grocerySubmit.addEventListener('click', (e) => {newGrocery(e)});
clearBtn.addEventListener('click', clearList);

//render
const renderList = (state) => {
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        let li = document.createElement('li')
        list.appendChild(li)
        li.textContent = grocery.text
    });
};

const render = () => {
    const state = store.getState()
    renderList(state)
};

store.subscribe(render);

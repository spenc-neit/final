const initialState = {
    pokemon: []
}

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return { pokemon: [...state.pokemon, action.payload] };
        case "REMOVE_ITEM":
            return {pokemon: state.pokemon.filter((item) => String(item.value) !== action.payload.value)};
        case "SHOW_ALL":
            return state;
        default:
            return state;
    }
};
import React from "react";
import { plus, minus } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";

export const ReduxPractice = ()=> {
    const data = useSelector(state => state.plusminus);
    const dispatch = useDispatch();

    return (
        <>
            <button onClick={()=> dispatch(minus())}>-</button>
            <h1>{data}</h1>
            <button onClick={()=> dispatch(plus())}>+</button>
        </>
    );
}
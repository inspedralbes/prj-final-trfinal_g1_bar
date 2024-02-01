'use client';

import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "@/lib/Features/counterSlice";
import socket from "@/sockets";

export default function ReduxEx() {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
      <div>
        {count}
      </div>
      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <br />
      <button onClick={() => dispatch(incrementByAmount(10))}>
        Increment by 10
      </button>
    </main>
  );
}

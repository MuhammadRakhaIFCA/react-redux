import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const CounterPage = () => {
    const [countInput, setCountInput] = useState(0)
    const dispatch = useDispatch()

    const incrementCounter = () => {
        dispatch({
            type: "INCREMENT_COUNT",
        })
    }
    const decrementCounter = () => {
        dispatch({
            type: "DECREMENT_COUNT"
        })
    }
    const setCounterWithInput = () => {
        dispatch({
            type: "SET_COUNT",
            payload: countInput
        })
    }

    const countSelector = useSelector((state) => state.counter)

    return (
        <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8 flex flex-col justify-center items-center gap-4">
            <p className="text-5xl font-bold">Count : {countSelector.count}</p>

            <div className="flex items-center gap-4">
                <Button size="icon">
                    <Minus className="w-6 h-6" onClick={decrementCounter} />
                </Button>
                <Button size="icon">
                    <Plus className="w-6 h-6" onClick={incrementCounter} />
                </Button>
            </div>

            <div className="flex gap-2 mt-8">
                <Input type="number" onChange={(e) => setCountInput(e.target.value)} />
                <Button onClick={setCounterWithInput}>Submit</Button>
            </div>
        </main>
    )
}

export default CounterPage
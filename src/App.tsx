import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import Calorytracker from "./components/Calorytracker";

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));

  }, [state.activities]);

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3"      >
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>

          <button
            className="bg-gray-800 hover:bg-gray-900
            p-2 font-bold uppercase cursor-pointer text-sm rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section
        className="bg-lime-500 p-20 px-5"
      >
        <div
          className="max-w-4xl mx-auto"
        >
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 p-10 ">
        <div className="max-w-4xl mx-auto">
          <Calorytracker
            activities={state.activities}
          />
        </div>
      </section>

      <section
        className="p-10 mx-auto max-w-4xl"
      >
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App

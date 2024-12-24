import { categories } from '../data/category'


function Form() {
    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
        >
            <div
                className="grid grid-cols-1 gap-3"
            >
                <label htmlFor="category">Categoría:</label>
                <select
                    id="category"
                    className="border border-slate-300 rounded-lg w-full bg-white"
                >
                    {
                        categories.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >{item.name}</option>
                        ))
                    }
                </select>
            </div>
        </form>
    )
}

export default Form;
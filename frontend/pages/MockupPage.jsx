
export default function MockupPage() {


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold mb-2 block">Mock data:</span>
                    <select
                        className="w-full p-2 border mb-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="mockData"
                    >
                        <option value="">Select location</option>
                        <option value="[13.000, 18.000]">13.000, 18.000</option>
                        <option value="[14.000, 19.000]">14.000, 19.000</option>
                        <option value="[15.000, 20.000]">15.000, 20.000</option>
                        <option value="[16.000, 21.000]">16.000, 21.000</option>
                    </select>
                    <span className="text-gray-700 font-semibold mb-2 block">Licenser Plate:</span>
                    <select
                        className="w-full p-2 border mb-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="mockData"
                    >
                        <option value="">Select licenser</option>
                        <option value="กค1442">กค1442</option>
                        <option value="ทส3423">ทส3423</option>
                        <option value="บล1633">บล1633</option>
                    </select>
                </label>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>

    )
}

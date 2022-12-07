import { useState } from "react";

const AddSkill = () => {
    const [skill, setSkill] = useState("");

    return ( 
        <div className="p-11 py-3 flex flex-col w-3/9 backdrop-blur  box-border border-y-8 border-x-2 border-gray-600 rounded-t-lg shadow-2xl">
        {/* <div> */}
            <div className="mb-8 font-sans font-bold text-xl text-center text-blue-800 underline">
                ADD A SKILL
            </div>

            <div>
                <form>
                    <label htmlFor="skill" className="mb-2 block font-sans font-semibold text-gray-700">
                        Skill Name: <br></br>
                        
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm mb-6">
                        <input
                                id="skill"
                                value={skill}
                                placeholder="Skill"
                                className="shadow appearance-none border block py-1 w-full rounded-md border-gray-400 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={(e) => setSkill(e.target.value)}
                            />
                    </div>
                    <div className="text-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full mb-3">Add</button>
                    </div>
                    
                </form>
            </div>
            
        </div>
     );
}
 
export default AddSkill;
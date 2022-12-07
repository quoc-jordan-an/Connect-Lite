import AddSkill from "./admin/AddSkill";
import DisplaySkills from "./admin/DisplaySkills";

const Admin  = () => {
    return (
        <div className="flex border flex-row w-full h- content-center p-4 justify-between items-center"> 
            <AddSkill />
            <DisplaySkills/>
        </div>
        
     );
}
 
export default Admin;
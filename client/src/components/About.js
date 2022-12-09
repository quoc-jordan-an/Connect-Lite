import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import AddUser from "./admin/AddUser";
import { gql, useQuery, useMutation } from "@apollo/client";
import ConnectUserToSkills from "./admin/ConnectUserToSkill";
// import ConnectUserToSkill from './admin/ConnectUserToSkill';

// const GET_SKILLS = gql`
//   query getAllSkills {
//     skills {
//       skill_name
//       id
//       users {
//         name
//       }
//     }
//   }
// `;

// const CONNECT_U_TO_S = gql`
//   mutation connectUTS($where: USERWhere, $connect: USERConnectInput) {
//     updateUsers(where: $where, connect: $connect) {
//       info {
//         bookmark
//       }
//     }
//   }
// `;

const About = () => {
  return (
    <div>
      About
      <div>
        <ConnectUserToSkills user_id="ffac07f5-f196-47f4-babb-e7631fb61556" />
      </div>
    </div>
  );
};

// function MyModal({user_id}) {
//   console.log(user_id);
//   let [isOpen, setIsOpen] = useState(false);
//   const { loading, error, data } = useQuery(GET_SKILLS);
//   const [skill, setSkill] = useState("");
//   const [skill_id, setSkillID] = useState("");
//   const [rating, setRating] = useState(1);

// //   useEffect(() => { console.log(rating)}, [rating, skill_id]);

//   const [connect, { data_c, loading_c, error_c }] = useMutation(
//     CONNECT_U_TO_S,
//     {
//       variables: {
//         where: {
//           id: null,
//         },
//         connect: {
//           has_skills: [
//             {
//               where: {
//                 node: {
//                   id: null,
//                 },
//               },
//               edge: {
//                 rating: 1,
//               },
//             },
//           ],
//         },
//       },
//       refetchQueries: ["getAllSkills", "getAllUsers"],
//     }
//   );

//   if (loading || loading_c) return <p>Loading...</p>;
//   if (error || error_c) return <p>Error in ConnectUserToSkill</p>;



//   function closeModal() {
//     setIsOpen(false);
//   }
  
//   function openModal() {
//     setIsOpen(true);
//   }

//   return (
//     <>
//       <div className="inset-0 flex">
//         <button
//           type="button"
//           onClick={openModal}
//           className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//         >
//           Open dialog
//         </button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   {/* <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Payment successful
//                   </Dialog.Title> */}
//                   {/* <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       Your payment has been successfully submitted. We’ve sent
//                       you an email with all of the details of your order.
//                     </p>
//                   </div> */}
//                   <form className="bg-white rounded p-4 py-5">
//                     <div className="mb-8 font-sans font-bold text-xl text-center text-blue-600 underline">
//                       ADD A SKILL
//                     </div>
//                     <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-2">
//                         Skill:
//                       </label>
//                       <select
//                         className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        
//                         disabled={!data.skills.length}
//                         id="skill"
//                         onChange={(e) => {
//                           // const arr = JSON.parse(e.target.value)
//                         //   const a = e.target.value;
//                           setSkillID(e.target.value);
//                         //   console.log(e.target.value);

//                         //   setSkill(a);
                          
//                         //   console.log(skill_id);
//                         //   console.log(skill);
//                         }}
//                         onBlur={(e) => {
//                           setSkillID(e.target.value);
//                           //   setSkill(e.target.value);
//                           //   setSkillID(e.target.key);
//                         }}
//                       >
//                         <option />
//                         {data.skills.map((skills, i) => (
//                           <option key={i} value={skills.id}>
//                             {skills.skill_name}
//                           </option>
//                         ))}
//                       </select>
//                       {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="skill" type="text" placeholder="Skill Name"/> */}
//                     </div>
//                     <div className="mb-6">
//                       <label className="block text-gray-700 text-sm font-bold mb-2">
//                         Rating
//                       </label>
//                       <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                         id="rating"
//                         type="number"
//                         min={1} step={1}
//                         placeholder="1"
//                         value={rating}
//                         onChange={(e) => setRating(e.target.valueAsNumber)}
//                         onBlur={(e) => setRating(e.target.valueAsNumber)}
//                       />
//                       {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <button
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         type="button"
//                         onClick={() => {
//                           connect({
//                             variables: {
//                               where: {
//                                 id: user_id,
//                               },
//                               connect: {
//                                 has_skills: [
//                                   {
//                                     where: {
//                                       node: {
//                                         id: skill_id,
//                                       },
//                                     },
//                                     edge: {
//                                       rating: rating,
//                                     },
//                                   },
//                                 ],
//                               },
//                             },
//                           });
//                           closeModal();
//                         }}
//                       >
//                         Add Skill
//                       </button>
//                       <button
//                         onClick={closeModal}
//                         className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//                       >
//                         Cancel
//                       </button>
//                       {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
//         Forgot Password?
//       </a> */}
//                     </div>
//                   </form>
//                   {/* <div className="mt-4">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={closeModal}
//                     >
//                       Got it, thanks!
//                     </button>
//                   </div> */}
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }

export default About;

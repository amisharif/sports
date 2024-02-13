import React, { useState } from 'react';
import SchoolListCard from '../SchoolListCard/SchoolListCard';
import { Link, useLoaderData } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const ShowSchool = () => {

    const schoolList  = useLoaderData();
  //  console.log(schoolList);
  const [school,setSchool]= useState(schoolList);

    const handleDelete = (id)=>{
      //  console.log(id);
    

        fetch(`http://localhost:3000/showschool/${id}`, {
            method:'POST'
        })
            .then(response =>response.json())
            .then(data => {
                console.log(data);
                if(data.count===1){


                const filteredItems = school.filter(item => {
                    return item._id !== id;
                });
                setSchool(filteredItems);
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });


    }

    return (
       <div className="ml-10">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                  
                    <tbody>

                      
                        {
                            school.map((sc,index)=>
                                <Link to={`/admin/showschool/${sc.email}`}>
                                    <tr className="hover">
                                        <th>{index + 1}</th>
                                        <td>{sc.email}</td>
                                        <td>{sc._id}</td>
                                        <td> <button

                                            onClick={() => { handleDelete(sc._id) }}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            <FaTrash className="h-4 w-4" />
                                        </button></td>
                                    </tr>
                            </Link>
                               
                            )
                        }
                       
                           
                        
                    </tbody>
                </table>
            </div>
       </div>
    );
};

export default ShowSchool;
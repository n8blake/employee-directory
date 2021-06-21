/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    // Get all employees
    getEmployees: function(){
        return axios.get('https://randomuser.me/api/?inc=id,name,email,dob,phone,cell,picture&nat=us&seed=n8&results=50')
        // const results = await fetch('https://randomuser.me/api/?inc=id,name,email,dob,phone,cell,picture&results=50')
		// 	.then(response => response.json())
        //     .then((json) => {
        //         return json;
        //     });
        // return results;
    },
    // Get a single employee
    getEmployee: function(userObj){

    }
};
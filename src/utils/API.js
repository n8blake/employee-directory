/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    // Get all employees
    getEmployees: function(){
        return axios.get('https://randomuser.me/api/?inc=id,name,email,dob,phone,cell,picture&nat=us,dk,fr,gb&seed=n8&results=50')
    },
    // Get a single employee
    getEmployee: function(userObj){

    }
};
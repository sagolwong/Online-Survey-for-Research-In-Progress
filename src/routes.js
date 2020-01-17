import Requests from "./views/Requests";
import Surveys from "./views/Surveys";
import Contacts from "./views/Contacts";


var routes = [
    {
      path: "/requests",
      name: "Requests",
      icon: "fas fa-inbox",
      component: Requests,

    },
    {
      path: "/surveys",
      name: "Surveys",
      icon: "fas fa-clipboard-list",
      component: Surveys,
 
    },
    {
      path: "/contacts",
      name: "Contacts",
      icon: "fas fa-user",
      component: Contacts,

    },
  ];
  export default routes;
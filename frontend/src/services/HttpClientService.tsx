import React from "react";
import { SigninInterface } from "../interfaces/ISignin";
import { SigninInAdminterface } from "../interfaces/ISignin_admin";
import { UsersInterface } from "../interfaces/Idim_User";
// import { IssueInterface } from "../interfaces/IWatchVideo";
import { IssueInterface } from "../interfaces/Ifact_Issue";
import { ProjectInterface } from "../interfaces/Idim_Project";
import { apiUrl } from "./utility";

//const apiUrl = "http://localhost:8080";
// const [imageStringQV, setImageStringQV] = React.useState<string | ArrayBuffer | null>(null);
// const [imageStringPowerBI, setImageStringPowerBI] = React.useState<string | ArrayBuffer | null>(null);

async function Login(data: SigninInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        // localStorage.setItem("uid_name", res.data.name);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function Login_admin(data: SigninInAdminterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/loginadmin`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        // localStorage.setItem("uid_name", res.data.Name);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
// async function CreatIssue(data: IssueInterface) {
//   const requestOptions = {
//       method: "POST",
//       headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/driver/recordtimein`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//           // if (res.data) {
//           //     return res.data;
//           // } else {
//           //     return false;
//           // }
//           if (res.data) {
//             return { status: true, message: res.data};
//           } else {
//             return { status: false, message: res.error};
//           }
//       });

//   return res;
// }

async function GetIssues() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/issues`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetUserByID() {
  let uid = localStorage.getItem("uid");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/user/${uid}`, 
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetAdminByID() {
  let uid = localStorage.getItem("uid");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/admin/${uid}`, 
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetUserByUID() {
  let uid = localStorage.getItem("uid");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/user/:id`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/users`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetAdmins() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/admins`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetStatus() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/status`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetImportance() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/importances`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetProject() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/projects`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}



async function CreateUser(data: UsersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/signup`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function CreateProject(data: ProjectInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/projects`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function UpdateUser(data: UsersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/users`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function Issues(data: IssueInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/issues`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetIssueByID() {
  let did = localStorage.getItem("did");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(
      `${apiUrl}/issue/${did}`,
      requestOptions
  )
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              // setImageStringQV(res.data.QVpic)
              return res.data;
          } else {
              return false;
          }
      });

  return res;

}

export {
  Login,
  Login_admin,
  GetAdminByID,
  GetUsers,
  GetUserByID,
  CreateUser,
  GetIssues,
  GetStatus,
  GetImportance,
  GetProject,
  Issues,
  GetIssueByID,
  GetAdmins,
  UpdateUser,
  CreateProject,
  // GetVideos,
  // GetWatchVideos,
  // GetResolution,
  // GetPlaylistByUID,
  // GetPlaylist,
  // WatchVideos,
};


export class HttpClientServices {
  //Method GET
  static async get(url: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(`${apiUrl}${url}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { error: false, results: res.data };
        } else {
          return { error: true, message: res.error };
        }
      });
    return res;
  }

  // Method: POST
  static async post(url: string, payload: any) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    let res = await fetch(`${apiUrl}${url}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          return { error: false, results: res.data };
        } else {
          console.log(res);
          return { error: true, message: res.error };
        }
      });
    return res;
  }

  static async patch(url: string, payload: any) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    let res = await fetch(`${apiUrl}${url}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          return { error: false, results: res.data };
        } else {
          console.log(res);
          return { error: true, message: res.error };
        }
      });
    return res;
  }
}

  
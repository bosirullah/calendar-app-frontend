// import React from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";

// const LoginComponent: React.FC = () => {
//   const { user, login } = useAuth();

//   const handleGoogleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       const { code } = tokenResponse;
//       try {
//         const tokenRes = await axios.post(
//           "http://localhost:5000/auth/create-tokens",
//           { code }
//         );

//         const { access_token } = tokenRes.data;

//         const userInfoResponse = await axios.get(
//           `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
//         );

//         login(userInfoResponse.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     },
//     flow: "auth-code",
//   });

//   return (
//     <div>
//       {!user ? (
//         <button onClick={() => handleGoogleLogin()}>Sign in with Google</button>
//       ) : (
//         <div>
//           <img src={user.picture} alt="User profile" />
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginComponent;

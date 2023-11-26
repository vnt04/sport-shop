import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Notify from '../Notify';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    // Kiểm tra trong localStorage nếu đã có thông tin về đăng nhập
    return localStorage.getItem('isLoggedIn') === 'true';
    }
  );

  const [showNoExistAccount, setNoExistAccount] = useState(false);
  const [showWrongPassword, setWrongPassword] = useState(false);
  const handleCloseNotify = () => {
      if(showNoExistAccount) setNoExistAccount(false);
      if(showWrongPassword) setWrongPassword(false);
      //window.location.href = '/';
    };

  const login =  (formLogin) => {
    // Xử lý xác thực ở đây
      axios.get('http://localhost:3005/login/read')
      .then(function(response){
        const account = response.data.find(acc => (acc.email === formLogin.email));
        if(!account){
            setNoExistAccount(true);
        }
        else if(account.password !== formLogin.password){
          setWrongPassword(true);
        }
        else {
          setIsLoggedIn(true);
          setWrongPassword(false);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loggedInUser', JSON.stringify({ email: formLogin.email, password: formLogin.password }));
          window.location.href = '/home';
        }
      })
      .catch(function(error){
        console.log(error);
      })
    };

  const logout = () => {
    // Xử lý đăng xuất ở đây
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
      {showNoExistAccount && (
        <Notify  massage={'Tài khoản không tồn tại!'} show={showNoExistAccount} handleClose={handleCloseNotify} />
      )}

      {showWrongPassword && (
        <Notify  massage={'Mật khẩu không đúng!'} show={showWrongPassword} handleClose={handleCloseNotify} />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

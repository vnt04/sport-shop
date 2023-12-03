import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Notify from '../Notify';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [showNoExistAccount, setNoExistAccount] = useState(false);
  const [showWrongPassword, setWrongPassword] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleCloseNotify = () => {
      if(showNoExistAccount) setNoExistAccount(false);
      if(showWrongPassword) setWrongPassword(false);
      if(showLoginSuccess) setShowLoginSuccess(false);
      if(showLogout) setShowLogout(false);
    };
  const handleOK = () =>{
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('loggedInUser');
        setShowLogout(false);
  }
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
          setShowLoginSuccess(true);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loggedInUser', JSON.stringify({ email: formLogin.email, password: formLogin.password,type: account.type }));
          
          
          setTimeout(() => {
          setShowLoginSuccess(false); 
          setTimeout(() => {
            handleCloseNotify();
          }, 700);
          window.location.href = '/products';
        }, 700);
        }
      })
      .catch(function(error){
        console.log(error);
      })
    };

  const logout = () => {

    setShowLogout(true);
    //handleOK(),handleCloseNotify() xử lí đăng xuất

  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
        <Notify color = {'#f44336'}  massage={'Tài khoản không tồn tại!'} show={showNoExistAccount} handleClose={handleCloseNotify} />
        <Notify color = {'#f44336'} massage={'Mật khẩu không đúng!'} show={showWrongPassword} handleClose={handleCloseNotify} />
        <Notify color = {'#4CAF50'} massage={'Đăng nhập thành công'} show={showLoginSuccess} handleClose={handleCloseNotify} />
        <Notify color = {'#ffeb3b'} massage={'Bạn đang thực hiện đăng xuất'} show={showLogout} type='2' handleOK={handleOK} handleClose={handleCloseNotify} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

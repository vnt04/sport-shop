import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.scss'
import classNames from 'classnames/bind';
import { useAuth } from './AuthContext';

const cx = classNames.bind(styles);


function Login() {
    const { login } = useAuth();

    const handleSubmit =  (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formLogin = {};
    formData.forEach((value,key) => {
      formLogin[key] = value;
    })

    login(formLogin);
  };

  return (
    <Form onSubmit={handleSubmit} className={cx('login-css')}>
      <Form.Label style={{marginLeft: '25%'}}>Đăng nhập</Form.Label>
      <Form.Group className={cx('group-css')} controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
            name = "email"
            className={cx('control-css')}
            type="email" 
            required
            placeholder="Nhập địa chỉ email"
        />
      </Form.Group>

      <Form.Group className={cx('group-css')} controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
            name = "password"
            className={cx('control-css')}
            type="password" 
            required
            placeholder="Nhập mật khẩu"
        />
      </Form.Group>
      <Button className={cx('button-css')} variant="primary" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
}

export default Login;
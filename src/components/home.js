import React, {useEffect, useState} from 'react';
import CarouselContainer from './carousel-container';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

const Home = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  
  const [backErrors, setBackErrors] = useState({});
  const history = useHistory();

  const [userFromApi, setUserFromApi] = useState('');
  const [passwordFromApi, setPasswordFromApi] = useState('');
  
  const [foundUser, setFoundUser] = useState('');

  const [allUsersFromApi, setAllUsersFromApi] = useState([]);
  const [actualUser, setActualUser] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  
  useEffect(() => (
    axios.get(`http://localhost:3004/posts/`)
    .then(res => {
      setAllUsersFromApi([res.data])  
      })
    ),[])

  
    useEffect(() => (
      allUsersFromApi.map(([user])=>{
        if(user.login == login){
          setActualUser(user.login)
          setActualPassword(user.password)
        }else{
          setActualUser('')
          setActualPassword('')
        }
      })
    ),[login])

  const ValidationSchema = Yup.object().shape({
    login: Yup.string()
        .nullable()
        .trim()
        .required('Este campo não pode ser vazio')
        .email('O e-mail está incorreto'),
    password: Yup.string()
        .nullable()
        .trim()
        .required('Este campo não pode ser vazio'),
  });

  const testCredencials = () => {
    if (login == actualUser && password == actualPassword){
      toast.success('Bem vindo ao seu refúgio!')
      history.push(`/welcome`)

    }else{
      toast.error('Não foi possível o seu acesso. Confiara suas credenciais.')
    }
  }


  return (
   <>
    <Formik
      initialValues={{
          login,
          password,
      }}
      enableReinitialize
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        axios.get(`http://localhost:3004/posts/?login=${login}&password=${password}`)
        .then(res => {
          setUserFromApi(res.data[0]?.login);
          setPasswordFromApi(res.data[0]?.password);
        })
        setSubmitting(true);
        testCredencials();
    }}>
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          }) => (
                  <div className="container login__border background1">
                    <div className="row">
                      <div className="col-sm-6 text-center">
                        <CarouselContainer/>
                      </div>
                      <div className="col-sm-6 text-center ">
                        <div className="text-right mt-3">
                          <label className="login__labels">SC System</label>
                        </div>
                        <div className="mt-3 mb-4">
                          <h3>Bem vindo ao Refúgio do Guerreiro!</h3>
                        </div>
                        <form>
                          <div className="form-row">
                            <label for="login" className="login__labels">E-mail/Login</label>
                            <input 
                              type="text" 
                              // className="form-control is-invalid" 
                              className="form-control"
                              id="login"
                              name="login"
                              placeholder="E-mail/Login" 
                              onChange={(login) => {
                                setLogin(login.target.value);
                                setFieldValue(
                                    'login',
                                    login.target.value,
                                );
                            }}
                              value={values.login}
                            />
                             <small className="col-12 p-0 text-left text-danger">
                              {(errors.login
                                  && touched.login
                                  && errors.login) || backErrors.login}
                              </small>
                          </div>
                          <div className="form-row mt-2">
                            <label for="password" className="login__labels">Senha</label>
                            <input 
                              type="password" 
                              className="form-control"
                              id="password"
                              name="password" 
                              placeholder="Senha" 
                              onChange={(password) => {
                                setPassword(password.target.value);
                                setFieldValue(
                                    'password',
                                    password.target.value,
                                );
                            }}
                              value={values.password} 
                            />
                            <small className="col-12 p-0 text-left text-danger">
                              {(errors.password
                                  && touched.password
                                  && errors.password) || backErrors.password}
                              </small>
                          </div>
                          <div className="text-right">
                            <Link to="/profile" className="login__labels">Esqueceu a senha?</Link>
                          </div>
                          <div className="mt-3">
                            <button 
                              className="btn btn-primary" 
                              type="submit"
                              disabled={submitting}
                              onClick={handleSubmit}
                            >
                              Entrar
                            </button>
                          </div>
                          <div className="row mt-4">
                            <div className="col-sm-5">
                              <hr/>
                            </div>
                            <div className="col-sm-2 mb-3">
                              <label>ou</label>
                            </div>
                            <div className="col-sm-5">
                              <hr/>
                            </div>
                          </div>

                          <div className="control">
                            <div className="login__newuser">
                              <div>
                                <button class="btn btn-primary" type="submit">Sing in with google</button>
                              </div>
                              <div>
                                <label className="mr-2 login__labels">Novo no Refúgio?</label>
                                <Link to="/profile" className="login__labels">Crie uma conta</Link>
                              </div>
                            </div>
                            <div className="background__img1--div">
                              <img src="katana2.png" className="background__img1" />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )
            }
      </Formik>
   </>
  );
}

export default Home;

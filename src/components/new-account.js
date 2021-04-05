import React, {useState, useEffect} from 'react';
import CarouselContainer from './carousel-container';
import { Link } from 'react-router-dom';
import './style.scss';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';


const Profile = () => {

  const [fullName, setFullName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [allUsersFromApi, setAllUsersFromApi] = useState([]);
  const [userExists, setUserExists] = useState('');
  const [userFromApi, setUserFromApi] = useState('');

  const [submitting, setSubmitting] = useState(false);
  
  const [backErrors, setBackErrors] = useState({});
  
  const testPassword = () => {
    if (password == confirmPassword){
      return true
    }else {
      return false
    }
  }

  useEffect(() => (
    axios.get(`http://localhost:3004/posts/`)
    .then(res => {
      setAllUsersFromApi([res.data])  
      })
    ),[])

    useEffect(() => (
      allUsersFromApi.map(([user])=>{
        if(user.login == login){
          setUserExists(true)
        }else{
          setUserExists(false)
        }
      })
    ),[login])

  const ValidationSchema = Yup.object().shape({
    fullName: Yup.string()
      .nullable()
      .trim()
      .required('Este campo não pode ser vazio'),
    login: Yup.string()
      .nullable()
      .trim()
      .required('Este campo não pode ser vazio')
      .email('O e-mail está incorreto'),
    password: Yup.string()
      .nullable()
      .trim()
      .required('Este campo não pode ser vazio'),
    confirmPassword: Yup.string()
      .nullable()
      .trim()
      .required('Este campo não pode ser vazio')
      .test('confirmPassword', 'As senhas precisam ser iguais', (value => testPassword(value))),
  });

  return (
   <>
    <Formik
      initialValues={{
        fullName,
        login,
        password,
        confirmPassword,
      }}
      enableReinitialize
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        let dataToSave = {
          fullName: fullName,
          login: login,
          password: password,
        }
       
        axios.get(`http://localhost:3004/posts/?login=${login}`)
        .then(res => {
          setUserFromApi(res.data[0]?.login);
        })

        if(userExists){
          toast.error('Este login/e-mail já pertence a um guerreiro. Tente entrar ou registrar outro e-mail');
          }else if(userFromApi != login){
            console.log("userExists",userFromApi)
            console.log("login", login)
            axios.post(`http://localhost:3004/posts`, dataToSave)
              .then(
                toast.success('Bem vindo guerreiro!! Sua conta foi criada.')
              ).catch(() => {
                toast.error('Não foi possível agora, tente mais tarde')
            })
            setSubmitting(true);
          }else{
            toast.error('Este login/e-mail já pertence a um guerreiro. Tente entrar ou registrar outro e-mail');
            setSubmitting(true);
          }
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
                      <div className="col-sm-6 text-center">
                        <div className="text-right mt-3">
                          <label className="login__labels">SC System</label>
                        </div>
                        <div className="mt-3 mb-4">
                          <h3>Registre-se no Refúgio do Guerreiro!</h3>
                        </div>
                        <form>
                          <div className="form-row">
                            <label for="fullName" className="login__labels">Nome completo</label>
                            <input 
                              type="text" 
                              // className="form-control is-invalid" 
                              className="form-control"
                              id="fullName"
                              name="fullName"
                              placeholder="Nome completo" 
                              onChange={(fullName) => {
                                setFullName(fullName.target.value);
                                setFieldValue(
                                    'fullName',
                                    fullName.target.value,
                                );
                            }}
                              value={values.fullName}
                            />
                             <small className="col-12 p-0 text-left text-danger">
                              {(errors.fullName
                                  && touched.fullName
                                  && errors.fullName) || backErrors.fullName}
                              </small>
                          </div>
                          <div className="form-row mt-2">
                            <label for="login" className="login__labels">Nome de usuário/e-mail</label>
                            <input 
                              type="text" 
                              // className="form-control is-invalid" 
                              className="form-control"
                              id="login"
                              name="login"
                              placeholder="Usuário/e-mail" 
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
                          <div className="row text-left">
                            <div className="col-sm-6 mt-2">
                              <label for="password" className="float-left login__labels">Senha</label>
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
                              <small className="col-12 p-0 ml-1 text-danger">
                                {(errors.password
                                    && touched.password
                                    && errors.password) || backErrors.password}
                                </small>
                            </div>
                          <div className="col-sm-6 mt-2">
                            <label for="confirmPassword" className="float-left login__labels">Confirme a senha</label>
                            <input 
                              type="password" 
                              className="form-control"
                              id="confirmPassword"
                              name="confirmPassword" 
                              placeholder="Confirme a Senha" 
                              onChange={(confirmPassword) => {
                                setConfirmPassword(confirmPassword.target.value);
                                setFieldValue(
                                    'confirmPassword',
                                    confirmPassword.target.value,
                                );
                            }}
                              value={values.confirmPassword} 
                            />
                            <small className="col-12 p-0 ml-1 text-danger">
                              {(errors.confirmPassword
                                  && touched.confirmPassword
                                  && errors.confirmPassword) || backErrors.confirmPassword}
                              </small>
                          </div>
                          </div>
                          <div className="mt-2">
                            <button 
                              className="btn btn-primary" 
                              type="submit"
                              disabled={submitting}
                              onClick={handleSubmit}
                            >
                              Enviar
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
                                <label className="mr-2 login__labels">Ao criar a sua conta, você concorda com os </label>
                              </div>
                              <div className="mt-n3">
                                <Link to="/terms" className="login__labels">Termos de uso </Link>
                                <label className="mr-2 login__labels">e com a</label>
                                <Link to="/policy" className="login__labels">Politica de privacidade</Link>
                              </div>
                              <div>
                                <label className="mr-1 login__labels">Já é um guerreiro?</label>
                                <Link to="/" className="login__labels">Entre</Link>
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

export default Profile;

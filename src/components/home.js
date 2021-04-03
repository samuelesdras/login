import React, {useState} from 'react';
import CarouselContainer from './carousel-container';
import { Link } from 'react-router-dom';
import './style.scss';


const Home = () => {
  
  const [inputType1, setInputType1] = useState('');

  return (
   <>
    <div className="container login__border">
      <div className="row">
        <div className="col-sm-6 text-center">
          <CarouselContainer/>
        </div>
        <div className="col-sm-6 text-center">
          <div className="text-right mt-3">
            <label>SC System</label>
          </div>
          <div className="mt-3 mb-3">
            <label>Bem vindo ao Refúgio do Guerreiro!</label>
          </div>
          <form>
            <div className="form-row">
              <label for="login">E-mail/Login</label>
              <input 
                type="text" 
                className="form-control is-invalid" 
                id="login"
                name="login"
                placeholder="E-mail/Login" 
                // value="" 
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                tente novamente!
              </div>
            </div>
            <div className="form-row">
              <label for="password">Senha</label>
              <input 
                type="password" 
                className="form-control is-valid" 
                id="password"
                name="password" 
                placeholder="Senha" 
                // value="Mark" 
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="text-right">
              <Link to="/profile">Esqueceu a senha?</Link>
            </div>
            <div>
              <button class="btn btn-primary" type="submit">Entrar</button>
            </div>
            <div className="row mt-4">
              <div className="col-sm-5">
                <hr/>
              </div>
              <div className="col-sm-2">
                <label>ou</label>
              </div><div className="col-sm-5">
                <hr/>
              </div>
            </div>
            <div>
              <button class="btn btn-primary" type="submit">Sing in with google</button>
            </div>
            <div className="mt-5">
              <label className="mr-2">Novo no Refugio?</label>
              <Link to="/profile">Crie uma conta</Link>
            </div>
          </form>
          </div>
        </div>
      </div>
   </>
  );
}

export default Home;

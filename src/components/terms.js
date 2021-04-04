import React, {useState} from 'react';
import CarouselContainer from './carousel-container';
import { Link } from 'react-router-dom';
import './style.scss';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

const Terms = () => {

  return (
   <>   
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
                <h3>Termos de uso</h3>
            </div>
            <form>
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
   </>
  );
}

export default Terms;

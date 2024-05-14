import React, { useState } from 'react';
//@ts-expect-error
import img from './assets/Tela-03.png';
//@ts-ignore 
import styles from './style.css'

const ContactForm: React.FC = () => { 
  const [formData, setFormData] = useState({
    nome: '',
    email: '',       
  }); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/dataentities/NL/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Exibir uma mensagem de sucesso ou redirecionar o usuário após o envio bem-sucedido.
        console.log('Dados enviados com sucesso!');
        const sucesso = document.getElementById('newsletter-modal-success');
        const cadastrar = document.getElementById('newsletter-modal');
        if (sucesso != null && cadastrar != null) {
          cadastrar.style.display = 'none'; 
          sucesso.style.display = 'block';
          sucesso.innerHTML = `<img src="${img}" alt="" />`;
        }
        setFormData({ 
            nome: '',
            email: '',   
          });
      } else { 
        // Lidar com erros, como validações do servidor.
        console.error('Ocorreu um erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao enviar os dados.', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
        <div className={styles.newslettermodal}> 
            <div>
                <input
                    type="text"
                    id="nome" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange} 
                    placeholder='Nome'
                    className={styles.input}
                    required
                /> 
            </div>
            <div>
            <input
                type="date"
                id="birthdate"
                name="birthdate"
                onChange={handleChange}
                className={styles.nascimento}
                required 
            />
            </div>
            <div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder='E-mail'
                    required
                />
            </div>
            <div>
                <button type="submit">Cadastrar e ver cupom</button> 
            </div>    
        </div>
    </form>
  ); 
};

export default ContactForm;
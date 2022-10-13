import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://cdn.pixabay.com/photo/2013/03/27/22/25/dress-shop-97261_960_720.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [edad, setEdad] = useState("")
  const [numCel, setNumCel] = useState("")

  const [file, setFile] = useState({})

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    
    let data = new FormData()

    data.append("username", username)
    data.append("email", email)
    data.append("password", password)
    data.append("nombre", nombre)
    data.append("direccion", direccion)
    data.append("edad", edad)
    data.append("numCel", numCel)
    data.append("file", file)
    
    register(dispatch, data)
  }

  return (
    <Container>
      <Wrapper>
        <Title>REGISTRARSE</Title>
        <Form>
          <Input id="username" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="nombre" onChange={(e) => setNombre(e.target.value)} />
          <Input placeholder="direccion" onChange={(e) => setDireccion(e.target.value)} />
          <Input placeholder="edad" onChange={(e) => setEdad(e.target.value)} />
          <Input placeholder="teléfono con codigo de país" onChange={(e) => setNumCel(e.target.value)} />
          <div>
            <Title className="mt-2">Imagen de Perfil</Title>
            <Input
              type="file"
              id="file"
              accept=".jpg"
              onChange={(e) => {
                const newFile = e.target.files[0];
                setFile(newFile)
              }}
            />
          </div>
          <Agreement>
            Al crear una cuenta, doy mi consentimiento para el procesamiento de mis datos personales de acuerdo con las <b>POLITICAS DE PRIVACIDAD</b>
          </Agreement>
          <Button type="submit" onClick={handleClick}>CREAR CUENTA</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;